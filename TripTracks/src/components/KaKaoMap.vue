<script setup>
import { ref, onMounted } from "vue";

const mapContainer = ref(null);

onMounted(() => {
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao maps SDK is not loaded.");
    return;
  }

  if (!mapContainer.value) {
    console.error("Map container is not available.");
    return;
  }

  const container = mapContainer.value;
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 중앙 위치 설정 (서울시청 좌표)
    level: 3, // 지도의 확대 레벨
  };
  const map = new kakao.maps.Map(container, options);

  kakao.maps.event.addListener(map, "click", (mouseEvent) => {
    // 클릭한 위치의 좌표 가져오기
    const latlng = mouseEvent.latLng;

    // 클릭한 위치에 마커 생성
    const marker = new kakao.maps.Marker({
      position: latlng,
    });

    marker.setMap(map);

    // 정보창 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">클릭한 위치입니다.<br>위도: ${latlng.getLat()}<br>경도: ${latlng.getLng()}</div>`,
    });

    // 정보창을 마커 위에 표시
    infowindow.open(map, marker);
  });
});
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 500px"></div>
</template>

<style scoped></style>
