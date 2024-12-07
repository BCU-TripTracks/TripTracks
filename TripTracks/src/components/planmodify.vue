<script setup>
import { ref, onMounted, defineProps } from "vue";
import axios from "../axios";
defineProps([planningID]);

// 여행 데이터
const travelDays = ref([]); // 날짜별 여행 데이터
const currentDay = ref(1); // 현재 선택된 날짜
const title = ref(""); // 여행 제목

const mapContainer = ref(null); // Kakao 지도 DOM 참조
const markers = ref([]); // 마커 배열
const polylines = ref([]); // 날짜별 폴리라인 배열

let map; // Kakao 지도 객체
let ps; // Kakao Places 서비스 객체
let infowindow; // Kakao 인포윈도우 객체

// Kakao 지도 초기화 및 저장된 데이터 로드
onMounted(async () => {
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao Maps SDK is not loaded.");
    return;
  }

  const options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도 중심 좌표
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer.value, options);
  ps = new kakao.maps.services.Places();
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 저장된 데이터 로드
  await loadSavedPlan();
});

// 저장된 플랜 정보를 로드
async function loadSavedPlan() {
  try {
    const response = await axios.get("/planning_route/1", {
      // API 호출 ("/planning_route/:planning_ID")
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = response.data.planning;

      // 제목 설정
      title.value = data.planning_title;

      // 날짜 및 장소 데이터 매핑
      travelDays.value = mapSavedDataToTravelDays(data.travelDays);

      // 지도와 폴리라인 갱신
      travelDays.value.forEach((_, index) => updatePolyline(index));
    }
  } catch (error) {
    console.error("저장된 데이터를 로드하는 중 오류 발생:", error);
  }
}

// 저장된 데이터를 travelDays 형식으로 변환
function mapSavedDataToTravelDays(savedData) {
  const days = [];

  savedData.forEach((place) => {
    const dayIndex = place.day - 1;

    if (!days[dayIndex]) {
      days[dayIndex] = {
        day: `Day ${place.day}`,
        places: [],
      };
    }

    days[dayIndex].places.push({
      place_name: place.place, // 장소 이름
      x: place.place_ID.split(",")[0], // x 좌표
      y: place.place_ID.split(",")[1], // y 좌표
    });
  });

  return days;
}

// 폴리라인 업데이트
function updatePolyline(dayIndex) {
  if (polylines.value[dayIndex]) {
    polylines.value[dayIndex].setMap(null); // 이전 폴리라인 제거
  }

  const places = travelDays.value[dayIndex]?.places || [];
  if (places.length < 2) return; // 장소가 2개 이상이어야 폴리라인 생성

  const path = places.map((place) => new kakao.maps.LatLng(place.y, place.x));
  const polyline = new kakao.maps.Polyline({
    path,
    strokeWeight: 5,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeStyle: "solid",
  });

  polyline.setMap(map);
  polylines.value[dayIndex] = polyline;
}

// 장소 추가
function addPlaceToDay(place) {
  const dayIndex = currentDay.value - 1; // 현재 날짜 인덱스
  travelDays.value[dayIndex].places.push({
    place_name: place.place_name,
    x: place.x,
    y: place.y,
  });

  updatePolyline(dayIndex); // 폴리라인 갱신
}

// 장소 삭제
function removePlace(dayIndex, placeIndex) {
  travelDays.value[dayIndex].places.splice(placeIndex, 1);
  updatePolyline(dayIndex); // 폴리라인 갱신
}

// 날짜 추가
function addDay() {
  travelDays.value.push({
    day: `Day ${travelDays.value.length + 1}`,
    places: [],
  });
}

// 날짜 삭제
function removeDay(dayIndex) {
  if (dayIndex < 0 || dayIndex >= travelDays.value.length) {
    alert("잘못된 날짜입니다.");
    return;
  }

  travelDays.value.splice(dayIndex, 1); // 날짜 삭제
  if (polylines.value[dayIndex]) {
    polylines.value[dayIndex].setMap(null); // 폴리라인 제거
    polylines.value.splice(dayIndex, 1);
  }
}

// Kakao 장소 검색
function searchPlaces() {
  if (!keyword.value.trim()) {
    alert("장소를 입력하세요.");
    return;
  }

  ps.keywordSearch(keyword.value, placesSearchCB);
}

// 장소 검색 콜백
function placesSearchCB(data, status) {
  if (status === kakao.maps.services.Status.OK) {
    displayPlaces(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 없습니다.");
  }
}

// 장소 표시
function displayPlaces(places) {
  removeMarkers();

  places.forEach((place, index) => {
    const position = new kakao.maps.LatLng(place.y, place.x);
    const marker = new kakao.maps.Marker({ position, map });
    markers.value.push(marker);

    kakao.maps.event.addListener(marker, "click", () => {
      addPlaceToDay(place);
    });
  });
}

// 마커 제거
function removeMarkers() {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = [];
}
</script>

<template>
  <div class="writepot">
    asd
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
              <li v-for="(place, i) in day.places" :key="i" class="dayplace">
                {{ place.place_name }}
                <button @click="removePlace(index, i)" class="remove-place-btn">
                  x
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="right-panel">
        <div class="menu-wrap">
          <input
            v-model="keyword"
            class="keyword"
            type="text"
            placeholder="장소를 입력하세요."
            @keyup.enter="searchPlaces"
          />
          <button @click="searchPlaces">검색</button>
        </div>
        <div ref="mapContainer" class="map-container"></div>
        <div class="buttonzone">
          <button class="save-btn mt10">완료</button>
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
