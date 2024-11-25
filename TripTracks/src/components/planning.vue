<script setup>
import { ref, onMounted, nextTick } from "vue";

// 여행 일자와 상태 변수
const travelDays = ref([]); // 생성된 여행 일자 목록
const currentDay = ref(1); // 현재 선택된 일자
const titleInput = ref(null); // 제목 입력 필드 참조

// onMounted(() => {
//   // 제목 입력란에 포커스
//   nextTick(() => {
//     const titleInput = document.querySelector(".title-input");
//     if (titleInput) {
//       titleInput.focus();
//     }
//   });
// });

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
          <h3>{{ day.day }}</h3>
          <ul class="place-list">
            <li v-for="(place, i) in day.places" :key="i">
              {{ place.place_name }}
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
        />
        <button @click="searchPlaces">검색</button>
      </div>
      <div ref="mapContainer" class="map-container"></div>
      <div class="buttonzone">
        <button class="mt10">완료</button>
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
</style>
