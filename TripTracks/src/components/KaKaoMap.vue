<script setup>
import { ref, onMounted } from "vue";

const mapContainer = ref(null); // 지도를 표시할 ref
const keyword = ref(""); // 검색어 입력 값
const markers = ref([]); // 마커 배열
let map; // Kakao 지도 객체
let ps; // Kakao 장소 검색 객체
let infowindow; // Kakao 인포윈도우 객체

onMounted(() => {
  // Kakao 지도 초기화
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao Maps SDK is not loaded.");
    return;
  }

  const container = mapContainer.value;
  const options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울 중심 좌표
    level: 3, // 지도 확대 레벨
  };

  map = new kakao.maps.Map(container, options); // 지도 생성
  ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 인포윈도우 생성
});

// 장소 검색 함수
function searchPlaces() {
  if (!keyword.value.trim()) {
    alert("키워드를 입력해주세요!");
    return;
  }

  // Kakao Places API로 장소 검색 요청
  ps.keywordSearch(keyword.value, placesSearchCB);
}

// 장소 검색 콜백 함수
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    displayPlaces(data); // 검색 결과 표시
    displayPagination(pagination); // 페이지네이션 표시
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 없습니다.");
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert("검색 중 오류가 발생했습니다.");
  }
}

// 검색 결과를 지도와 목록에 표시
function displayPlaces(places) {
  const listEl = document.getElementById("placesList");
  const bounds = new kakao.maps.LatLngBounds();

  removeAllChildNodes(listEl); // 기존 검색 결과 초기화
  removeMarkers(); // 기존 마커 제거

  places.forEach((place, index) => {
    const position = new kakao.maps.LatLng(place.y, place.x);
    const marker = addMarker(position, index); // 마커 생성
    const itemEl = createListItem(index, place); // 목록 항목 생성

    // 마커와 목록 항목에 이벤트 연결
    (function (marker, title) {
      kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, title);
      });
      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });

      itemEl.onmouseover = () => displayInfowindow(marker, title);
      itemEl.onmouseout = () => infowindow.close();
    })(marker, place.place_name);

    bounds.extend(position); // 지도의 범위를 검색 결과에 맞게 확장
    listEl.appendChild(itemEl); // 검색 결과 목록에 항목 추가
  });

  map.setBounds(bounds); // 지도 범위 설정
}

// 검색 결과 목록 항목 생성
function createListItem(index, place) {
  const el = document.createElement("li");
  el.className = "item";
  el.style.cssText = `
    list-style: none;
    padding: 10px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f9f9f9;
    transition: background-color 0.2s ease;
  `;

  el.innerHTML = `
    <span class="markerbg marker_${index + 1}"></span>
    <div class="info" style="font-size: 14px; line-height: 1.5;">
      <h5>${place.place_name}</h5>
      ${
        place.road_address_name ? `<span>${place.road_address_name}</span>` : ""
      }
      <span>${place.address_name}</span>
      <span class="tel" style="color: #007bff; font-size: 12px;">${
        place.phone
      }</span>
    </div>`;
  return el;
}

// 마커 생성
function addMarker(position, index) {
  const marker = new kakao.maps.Marker({
    position,
    map,
  });
  markers.value.push(marker); // 마커 배열에 추가
  return marker;
}

// 모든 마커 제거
function removeMarkers() {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = []; // 배열 초기화
}

// 정보창 표시
function displayInfowindow(marker, title) {
  infowindow.setContent(`<div style="padding:5px;">${title}</div>`);
  infowindow.open(map, marker);
}

// 검색 결과 페이지네이션 표시
function displayPagination(pagination) {
  const paginationEl = document.getElementById("pagination");
  removeAllChildNodes(paginationEl);

  for (let i = 1; i <= pagination.last; i++) {
    const el = document.createElement("a");
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = "on";
    } else {
      el.onclick = () => pagination.gotoPage(i);
    }

    paginationEl.appendChild(el);
  }
}

// HTML 요소의 모든 자식 노드 제거
function removeAllChildNodes(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
</script>

<template>
  <div class="mapzone">
    <div class="menu_wrap">
      <input
        class="keyword"
        type="text"
        v-model="keyword"
        placeholder="장소를 입력하세요"
      />
      <button @click="searchPlaces" class="searchPlaces">검색</button>
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.mapzone {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh; /* 화면 전체 높이를 사용 */
}

.menu_wrap {
  width: 300px;
  background: rgba(255, 255, 255, 0.7);
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 10px 10px 10px 10px;
  overflow-y: auto;
  height: 100%;
}

.map-container {
  flex: 1;
  height: 100%;
}

.keyword {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
ul > li {
  padding: 10px 5px 10px 0;
  border-bottom: 1px solid black;
}
#item {
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
}
#item:hover {
  opacity: 0.7;
}
#pagination > a {
  text-decoration: none;
}
.searchPlaces {
  margin-bottom: 10px;
}
</style>
