<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "../axios";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

defineEmits(["save-plan"]);

// 여행 데이터
const travelDays = ref([]); // 작성된 여행 데이터
const currentDay = ref(1); // 현재 선택된 날짜
const title = ref(""); // 여행 일정 제목

// 여행 데이터 DB 저장
const saveToDatabase = async () => {
  if (travelDays.value.length === 0 || !title.value.trim()) {
    alert("저장할 여행 데이터 또는 제목이 없습니다.");
    return;
  }

  try {
    const response = await axios.post(
      "/feeds/planning",
      {
        title: title.value.trim(), // 제목
        travelDays: travelDays.value, // 여행 데이터
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      alert("여행 계획이 성공적으로 저장되었습니다!");
      title.value = ""; // 제목 초기화
      travelDays.value = []; // 여행 데이터 초기화
      currentDay.value = 1; // 선택된 날짜 초기화
    }
  } catch (error) {
    console.error("저장 중 오류 발생:", error);
    alert("저장에 실패했습니다.");
  }
};

// Kakao 지도 관련 변수
const mapContainer = ref(null);
const keyword = ref("");
const markers = ref([]);
let map;
let ps;
let infowindow;

onMounted(() => {
  // Kakao 지도 초기화
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao Maps SDK is not loaded.");
    return;
  }

  const options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };
  map = new kakao.maps.Map(mapContainer.value, options);
  ps = new kakao.maps.services.Places();
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
});

// 여행 날짜 추가
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

  // 여행지가 포함되어 있는 경우에만 확인 메시지 표시
  if (travelDays.value[dayIndex].places.length > 0) {
    const confirmDelete = confirm(
      `Day ${dayIndex + 1} 안에 ${
        travelDays.value[dayIndex].places.length
      }개의 여행지가 포함되어 있습니다. 정말로 삭제하시겠습니까?`
    );

    if (!confirmDelete) {
      return; // 사용자가 취소를 누르면 삭제하지 않음
    }
  }

  // 날짜 제거
  travelDays.value.splice(dayIndex, 1);

  // 남아있는 날짜들의 순서 재설정
  travelDays.value = travelDays.value.map((day, index) => ({
    ...day,
    day: `Day ${index + 1}`, // 새 순서에 맞게 Day 이름 업데이트
  }));

  // 현재 선택된 날짜가 제거된 날짜 이후일 경우, 선택된 날짜 업데이트
  if (currentDay.value > travelDays.value.length) {
    currentDay.value = travelDays.value.length; // 마지막 날짜로 이동
  }
};

// Kakao 장소 검색 함수
const searchPlaces = () => {
  if (!keyword.value.trim()) {
    alert("장소를 입력해주세요!");
    return;
  }
  ps.keywordSearch(keyword.value, placesSearchCB);
};

// 장소 검색 콜백 함수
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    displayPlaces(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 없습니다.");
  }
}

// 검색 결과 표시
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

// 현재 선택된 날짜에 장소 추가
function addPlaceToDay(place) {
  travelDays.value[currentDay.value - 1].places.push(place);
}

// 마커 생성
function addMarker(position) {
  const marker = new kakao.maps.Marker({ position, map });
  markers.value.push(marker);
  return marker;
}

// 모든 마커 제거
function removeMarkers() {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = [];
}
</script>

<template>
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
    <!-- 좌측: 날짜 추가 및 내용 -->
    <div class="left-panel">
      <button @click="addDay" class="add-day-btn">+ 날짜 추가</button>

      <!-- 날짜 리스트 -->
      <ul class="day-list">
        <li
          v-for="(day, index) in travelDays"
          :key="index"
          :class="{ active: currentDay === index + 1 }"
          @click="currentDay = index + 1"
        >
          <div class="evenwide">
            <h3>
              {{ day.day }}
            </h3>
            <button @click="removeDay(index)" class="remove-day-btn">X</button>
          </div>
          <ul class="place-list">
            <li v-for="(place, i) in day.places" :key="i">
              {{ place.place_name }}
              <span class="hidden">{{ place.id }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 우측: Kakao 지도와 장소 검색 -->
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
</template>

<style scoped>
.planner {
  display: flex;
  height: 100vh;
}

/* 좌측: 날짜 추가 및 리스트 */
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
}

/* 우측: 지도와 검색 */
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
  background-color: #0056b3;
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
.remove-day-btn {
  background-color: #dc4939;
  padding: 5px;
}
.hidden {
  display: none;
}
.evenwide {
  display: flex;
  justify-content: space-between;
}
</style>
