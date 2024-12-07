<script setup>
import { ref, computed, onMounted, defineProps, watch, nextTick } from "vue";
import { useStore } from "vuex";
import axios from "../axios";
import { useRouter } from "vue-router";
import { Container, Draggable } from "vue3-smooth-dnd";

const router = useRouter();
const store = useStore();

const Planning_ID = computed(() => store.state.planningID);

const travelDays = ref([]);
const currentDay = ref(1);
const title = ref("");

watch(
  () => Planning_ID.value,
  async (newPlanningID) => {
    console.log("planning.vue - Received Planning_ID:", newPlanningID);

    if (newPlanningID) {
      try {
        // API 호출
        const url = `/feeds/my_plan_detail/${newPlanningID}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });

        // 응답 데이터에서 planning 객체 추출
        const { planning } = response.data;

        if (!planning) {
          console.error("planning.vue - Planning data is undefined or null");
          return;
        }

        // 데이터 설정
        title.value = planning.planning_title || "";
        console.log("planning.travelDays:", planning);

        // travelDays 처리: 같은 day 값을 기준으로 그룹화
        travelDays.value = planning.travelDays.reduce((acc, current) => {
          const existingDay = acc.find((day) => day.day === current.day); // 같은 day가 있는지 확인
          if (existingDay) {
            // 이미 존재하는 day에 places 추가
            existingDay.places.push({
              place_name: current.place, // 장소 이름
              place_ID: current.place_ID, // 장소 ID
              address: current.address || "주소 정보 없음", // 주소 추가
              x: current.x, // x 좌표 추가
              y: current.y, // y 좌표 추가
            });
          } else {
            // 새로운 day 객체 생성
            acc.push({
              day: current.day,
              places: [
                {
                  place_name: current.place, // 장소 이름
                  place_ID: current.place_ID, // 장소 ID
                  address: current.place_address || "주소 정보 없음", // 주소 추가
                  x: current.x, // x 좌표 추가
                  y: current.y, // y 좌표 추가
                },
              ],
            });
          }
          return acc;
        }, []);

        console.log(
          "planning.vue - Title and travelDays updated:",
          travelDays.value
        );

        currentDay.value = 1;
      } catch (error) {
        console.error("planning.vue - Error fetching planning data:", error);
      }
    } else {
      console.log("planning.vue - Planning_ID is null");
      title.value = "";
      travelDays.value = [];
    }
  },
  { immediate: true }
);

const saveToDatabase = async () => {
  console.log("Saving travel plan with data:", {
    title: title.value,
    travelDays: travelDays.value,
  });

  if (travelDays.value.length === 0 || !title.value.trim()) {
    alert("저장할 여행 데이터 또는 제목이 없습니다.");
    return;
  }

  try {
    const response = await axios.post(
      "/feeds/planning",
      {
        title: title.value.trim(),
        travelDays: travelDays.value,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      alert("여행 계획이 성공적으로 저장되었습니다!");
    }
  } catch (error) {
    console.error("저장 중 오류 발생:", error);
    alert("저장에 실패했습니다.");
  }
};

const mapContainer = ref(null);
const keyword = ref("");
const markers = ref([]);
let map;
let ps;
let infowindow;
let geocoder; // Kakao 주소 검색 객체

const polylines = ref([]);

onMounted(() => {
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao Maps SDK is not loaded.");
    return;
  }

  const options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer.value, options);
  geocoder = new kakao.maps.services.Geocoder(); // Geocoder 객체 생성
  ps = new kakao.maps.services.Places();
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  travelDays.value.forEach((_, index) => {
    updatePolyline(index);
  });
});

function updatePolyline(dayIndex) {
  if (polylines.value[dayIndex]) {
    polylines.value[dayIndex].setMap(null);
    polylines.value[dayIndex] = null;
  }

  const places = travelDays.value[dayIndex].places;
  if (places.length < 2) return;

  const path = places.map((place) => new kakao.maps.LatLng(place.y, place.x));

  const polyline = new kakao.maps.Polyline({
    map,
    path,
    strokeWeight: 5,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeStyle: "solid",
  });

  polylines.value[dayIndex] = polyline;
}

const addDay = () => {
  travelDays.value.push({
    day: `Day ${travelDays.value.length + 1}`,
    places: [],
  });
};

const removeDay = (dayIndex) => {
  if (dayIndex < 0 || dayIndex >= travelDays.value.length) {
    alert("유효하지 않은 날짜입니다.");
    return;
  }

  if (travelDays.value[dayIndex].places.length > 0) {
    const confirmDelete = confirm(
      `Day ${dayIndex + 1} 안에 ${
        travelDays.value[dayIndex].places.length
      }개의 여행지가 포함되어 있습니다. 정말로 삭제하시겠습니까?`
    );

    if (!confirmDelete) {
      return;
    }
  }

  travelDays.value.splice(dayIndex, 1);

  travelDays.value = travelDays.value.map((day, index) => ({
    ...day,
    day: `Day ${index + 1}`,
  }));

  if (currentDay.value > travelDays.value.length) {
    currentDay.value = travelDays.value.length;
  }
};

const removePlace = (dayIndex, placeIndex) => {
  travelDays.value[dayIndex].places.splice(placeIndex, 1);
  updatePolyline(dayIndex);
};

const searchPlaces = () => {
  if (!keyword.value.trim()) {
    alert("장소를 입력해주세요!");
    return;
  }
  ps.keywordSearch(keyword.value, placesSearchCB);
};

function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    displayPlaces(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 없습니다.");
  }
}

function displayPlaces(places) {
  const bounds = new kakao.maps.LatLngBounds();
  removeMarkers();

  places.forEach((place, index) => {
    const position = new kakao.maps.LatLng(place.y, place.x);
    const marker = addMarker(position, index);

    kakao.maps.event.addListener(marker, "click", () => {
      addPlaceToDay(place);
    });

    bounds.extend(position);
  });

  map.setBounds(bounds);
}

function addPlaceToDay(place) {
  travelDays.value[currentDay.value - 1].places.push({
    place_name: place.place_name,
    place_ID: place.id,
    address: place.address_name || "주소 정보 없음", // 'address_name' 필드를 'address'로 매핑
    y: place.y,
    x: place.x,
  });
  updatePolyline(currentDay.value - 1); // 현재 날짜의 폴리라인 업데이트
}

function addMarker(position) {
  const marker = new kakao.maps.Marker({ position, map });
  markers.value.push(marker);
  return marker;
}

function removeMarkers() {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = [];
}

const onPlaceDrop =
  (dayIndex) =>
  ({ removedIndex, addedIndex }) => {
    const dayPlaces = travelDays.value[dayIndex].places;
    const [movedPlace] = dayPlaces.splice(removedIndex, 1);
    dayPlaces.splice(addedIndex, 0, movedPlace);
    updatePolyline(dayIndex);
  };
</script>

<template>
  <div class="writepot">
    <div class="ml30 mr30">
      <input
        v-model="title"
        type="text"
        class="title"
        placeholder="새 여행일정 제목을 입력하세요."
        maxlength="25"
      />
    </div>
    <div class="planner">
      <div class="left-panel">
        <button @click="addDay" class="add-day-btn">+ 날짜 추가</button>
        <ul class="day-list">
          <li
            v-for="(day, index) in travelDays"
            :key="index"
            :class="{ active: currentDay === index + 1 }"
            @click="currentDay = index + 1"
          >
            <div class="evenwide">
              <h3>{{ day.day }}</h3>
              <button @click="removeDay(index)" class="remove-day-btn">
                X
              </button>
            </div>
            <ul class="place-list">
              <Container
                :getChildPayload="(i) => day.places[i]"
                :onDrop="onPlaceDrop(index)"
                group-name="places"
              >
                <Draggable v-for="(place, i) in day.places" :key="i">
                  <li class="dayplace">
                    <div class="evenwide">
                      <h3>
                        {{ place.place_name }}
                        <button
                          @click="removePlace(index, i)"
                          class="remove-place-btn"
                        >
                          x
                        </button>
                      </h3>
                    </div>
                    <p>{{ place.address }}</p>
                  </li>
                </Draggable>
              </Container>
            </ul>
          </li>
        </ul>
      </div>
      <div class="right-panel">
        <div class="menu-wrap">
          <input
            class="keyword"
            type="text"
            v-model="keyword"
            placeholder="장소를 입력하세요"
            @keyup.enter="searchPlaces"
          />
          <button @click="searchPlaces">검색</button>
        </div>
        <div ref="mapContainer" class="map-container"></div>
        <div class="buttonzone">
          <button @click="saveToDatabase" class="save-btn mt10">완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.planner {
  display: flex;
  height: 100vh;
}
.left-panel {
  width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}
.add-day-btn {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.add-day-btn:hover {
  background-color: #0056b3;
}
.day-list {
  list-style: none;
  padding: 0;
}
.day-list li {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.3s;
}
.day-list li.active {
  background-color: #62adfe;
  color: white;
}
.place-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}
.place-list li {
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.right-panel {
  height: 570px;
  flex: 1;
  padding: 20px;
  position: relative;
}
.menu-wrap {
  display: flex;
  margin-bottom: 10px;
}
.keyword {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}
button:hover {
  background-color: black;
  opacity: 0.7;
}
.map-container {
  width: 100%;
  height: calc(100% - 60px);
  border: 1px solid #ddd;
}
.title {
  width: 100%;
  padding: 15px 10px 10px 10px;
  font-size: larger;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #efefef;
  outline: none;
  transition: border-color 0.3s;
}
.buttonzone {
  display: flex;
  justify-content: flex-end;
}
.dayplace {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remove-day-btn {
  background-color: #dc4939;
  padding: 5px;
}
.remove-place-btn {
  padding: 0.1rem 0.5rem;
  margin-left: auto;
  background-color: white;
  color: black;
}
.remove-place-btn:hover {
  background-color: black;
  opacity: 0.7;
  color: white;
}
.hidden {
  display: none;
}
.evenwide {
  display: flex;
  justify-content: space-between;
}
</style>
