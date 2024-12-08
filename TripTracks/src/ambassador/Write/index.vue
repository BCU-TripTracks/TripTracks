<script setup>
import { ref, onMounted, watch } from "vue";
import { PinturaEditorModal } from "@pqina/vue-pintura";
import { getEditorDefaults, createDefaultImageReader, createDefaultImageWriter } from "@pqina/pintura";
import "@pqina/pintura/pintura.css";
import axios from "../../axios";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

// Pintura 기본 설정
const koreanLocale = {
  labels: {
    // 여기서 필요한 텍스트만 커스터마이징 가능합니다.
    crop: "자르기",
    rotate: "회전",
    flip: "뒤집기",
    edit: "편집",
    close: "닫기",
    apply: "적용",
    cancel: "취소",
  },
  tooltips: {
    crop: "이미지 자르기",
    rotate: "이미지 회전",
    flip: "이미지 뒤집기",
  },
  errors: {
    default: "오류가 발생했습니다.",
  },
};

const props = {
  ...getEditorDefaults(),
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter({
    mimeType: "image/jpeg", // 결과 이미지를 JPEG로 저장
    quality: 0.9, // 품질 설정 (0.1 ~ 1.0)
  }),
  locale: koreanLocale, // 한글 로케일 적용
};

const { locale } = getEditorDefaults();
const imageReader = createDefaultImageReader();

const ImgList = ref([]);
const currentImage = ref(null);
const isEditorOpen = ref(false);
const editingIndex = ref(null);
const input_title = ref("");
const input_content = ref("");
const input_tag = ref("");

const files = ref([]); // 업로드된 파일 데이터를 저장

const handleFileInput = (event) => {
  const selectedFiles = event.target.files;
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    files.value.push(file); // 파일 데이터를 저장
    const imageUrl = URL.createObjectURL(file);
    ImgList.value.push(imageUrl); // 미리보기용 URL 추가
  }
};

const removeImage = (index) => {
  ImgList.value.splice(index, 1);
};
// 편집기 열기
const openEditor = (image, index) => {
  currentImage.value = image;
  editingIndex.value = index;
  isEditorOpen.value = true;
};

// 편집 완료 처리
const handleProcess = (event) => {
  console.log("Image processed", event.detail);

  if (editingIndex.value !== null && event.detail.dest) {
    const updatedBlob = event.detail.dest; // Blob 형태의 편집된 이미지
    const updatedFile = new File([updatedBlob], `edited-image-${editingIndex.value}.jpg`, {
      type: "image/jpeg",
    }); // Blob을 File로 변환

    // 이전 URL 해제 및 업데이트
    URL.revokeObjectURL(ImgList.value[editingIndex.value]);
    ImgList.value.splice(editingIndex.value, 1, URL.createObjectURL(updatedBlob));

    // files 배열의 기존 파일을 편집된 파일로 대체
    files.value[editingIndex.value] = updatedFile;

    console.log("Updated files array:", files.value);
  }

  // 모달 닫기
  isEditorOpen.value = false;
};

// 핸들러: 에디터 이벤트
const handleShow = () => {
  console.log("Editor shown");
};
const handleClose = () => {
  console.log("Editor closed");
  isEditorOpen.value = false;
};
const handleLoad = (event) => {
  console.log("Editor loaded", event.detail);
};

watch(
  () => input_tag.value,
  async (newVal, oldVal) => {
    // 새로운 입력값이 없거나, 마지막으로 입력한 문자가 공백일 경우 처리하지 않음
    if (!newVal || newVal.endsWith(" ")) {
      return;
    }

    // 기존 태그 배열을 유지하면서 태그들을 처리
    const tags = newVal
      .split(" ")
      .map((tag) => (tag.startsWith("#") ? tag : "#" + tag))
      .join(" ");

    // 입력값을 업데이트
    input_tag.value = tags;
  }
);

const mapContainer = ref(null);
const keyword = ref("");
const markers = ref([]);
let map;
let ps;
let infowindow;

onMounted(() => {
  // Kakao Maps SDK 로드 여부 확인
  if (!window.kakao || !window.kakao.maps) {
    const kakaoScript = document.createElement("script");
    kakaoScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services`;
    kakaoScript.onload = () => {
      // SDK 로드가 완료되면 지도 및 Places 초기화
      kakao.maps.load(() => {
        initializeMap();
      });
    };
    document.head.appendChild(kakaoScript);
  } else {
    // 이미 로드된 경우 즉시 초기화
    kakao.maps.load(() => {
      initializeMap();
    });
  }
});

const initializeMap = () => {
  console.log("Initializing Kakao Map and Services");

  const options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 초기 중심 좌표
    level: 3, // 확대 레벨
  };

  // 지도 객체 생성
  map = new kakao.maps.Map(mapContainer.value, options);

  // Kakao Places 객체 생성
  ps = new kakao.maps.services.Places();

  // 정보 창 객체 생성
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  console.log("Map and PS initialized:", { map, ps });
};

const searchPlaces = () => {
  if (!keyword.value.trim()) {
    alert("장소를 입력해주세요!");
    return;
  }

  // 디버깅: PS 객체 확인
  if (!ps) {
    console.error("PS 객체가 초기화되지 않았습니다.");
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

const selectPlace = ref(null);

function displayPlaces(places) {
  const bounds = new kakao.maps.LatLngBounds();
  removeMarkers();

  places.forEach((place, index) => {
    const position = new kakao.maps.LatLng(place.y, place.x);
    const marker = addMarker(position, index);

    kakao.maps.event.addListener(marker, "click", () => {
      console.log(place);
      selectPlace.value = place;
    });

    bounds.extend(position);
  });

  map.setBounds(bounds);
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
const isLoading = ref(false);
const sendWrite = () => {
  Swal.fire({
    title: "엠버서더 피드를 업로드 하시겠습니까?",
    text: " ",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "업로드",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isLoading.value = true; // 로딩 상태 시작
      const formData = new FormData();
      formData.append("Title", input_title.value);
      formData.append("comment", input_content.value);
      formData.append("tag", input_tag.value);
      formData.append("Place", JSON.stringify(selectPlace.value));

      files.value.forEach((file) => {
        formData.append("image", file); // 실제 파일 데이터 추가
      });

      axios
        .post("/ambassador/Post_Save", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((result) => {
          if (result.status === 200) {
            console.log("게시물 작성 성공");

            Swal.fire("엠버서더 피드", "엠버서더 피드가 업로드 완료 되었습니다.", "success");
            router.push("/AmbassadorHome");
          }
        })
        .catch((error) => {
          console.error("오류 발생:", error);
        })
        .finally(() => {
          isLoading.value = false; // 로딩 상태 종료
        });
    }
  });
};
</script>

<template>
  <div class="home gp30 p30">
    <!-- 로딩 상태에 따라 화면에 로딩 인디케이터 표시 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>업로드 중입니다. 잠시만 기다려주세요...</p>
    </div>
    <div class="grid gc5 gr1 gp10 img_List">
      <div v-for="(image, index) in ImgList" :key="index" class="image-container">
        <img :src="image" class="preview-img" @click="openEditor(image, index)" />
        <div class="delete-btn" @click="removeImage(index)">X</div>
      </div>
      <label for="imgInput">
        <div class="flex br10 img_insert">+</div>
      </label>
      <input id="imgInput" type="file" accept="image/*" multiple @change="handleFileInput" />
    </div>
    <div class="grid gc4 gr2 gp10 input-form">
      <div>
        <h4>엠버서더 피드 제목</h4>
        <input v-model="input_title" class="input-title" type="text" placeholder="제목" />
      </div>
      <div>
        <h4>엠버서더 피드 내용</h4>
        <textarea v-model="input_content" class="input-content" placeholder="내용"></textarea>
      </div>
      <div>
        <h4>피드 태그</h4>
        <input v-model="input_tag" class="input-tag" type="text" placeholder="#태그" />
      </div>
    </div>
    <div class="grid gc2 gr2 gp10 input-form">
      <div class="menu-wrap">
        <input
          class="keyword"
          type="text"
          v-model="keyword"
          placeholder="장소를 입력하세요"
          @keyup.enter="searchPlaces"
        />
      </div>
      <div class="map-container" ref="mapContainer">
        <!-- 지도 상단에 정보 표시 -->
        <div v-if="selectPlace" class="map-info">
          <h3>선택된 플레이스</h3>
          <h3>{{ selectPlace.place_name }}</h3>
          <p>{{ selectPlace.address_name }}</p>
        </div>
      </div>
      <div class="buttonzone">
        <button @click="sendWrite()" class="save-btn mt10">작성완료</button>
      </div>
    </div>

    <PinturaEditorModal
      v-if="isEditorOpen"
      v-bind="props"
      :src="currentImage"
      :locale="locale"
      :imageReader="imageReader"
      @pintura:process="handleProcess"
      @pintura:show="handleShow"
      @pintura:close="handleClose"
      @pintura:load="handleLoad"
    />
  </div>
</template>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #007bff; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-overlay p {
  margin-top: 15px;
  font-size: 1.2rem;
  color: #333;
}

.keyword {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.buttonzone {
  display: flex;
  justify-content: flex-end;
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
  position: relative; /* 내부 요소를 절대 위치로 배치하기 위한 설정 */
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
}

.map-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 95%;
  overflow: hidden;
  overflow-x: auto;
}

.map-info h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  font-weight: bold;
}

.map-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.input-form {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  gap: 1rem;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}
.input-form > div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input::selection {
  background-color: var(--background-default);
}

.input-form > div > .input-title {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.25rem;
  font-weight: 600;
  background-color: var(--background-default);
}
.input-form > div > .input-tag {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 400;
  background-color: var(--background-default);
}

.input-form > div > .input-content {
  border: 1px solid #e0e0e0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  resize: none;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  background-color: var(--background-default);
}
input[type="file"] {
  display: none;
}
.image-container {
  position: relative;
  display: inline-block;
  margin: 10px;
  border-radius: 10px;
}

.preview-img {
  max-width: 120px;
  min-width: 100px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.preview-img:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.delete-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: rgba(200, 0, 0, 1);
} /* 페이드 인/아웃 + 확대/축소 애니메이션 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.home {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.img_List {
  display: flex;
  flex-direction: row;
  align-items: flex-end; /* 이미지 하단 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  overflow-x: scroll; /* 가로 스크롤 활성화 */
  white-space: nowrap; /* 이미지들이 한 줄에 나란히 배치되도록 설정 */
}
.img_List > label {
  width: 120px;
  margin: 20px;
  height: 80%;
}
.img_insert {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 애니메이션 효과 */
}
.img_insert:hover {
  transform: scale(1.1); /* 이미지 확대 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
}
.img_List img {
  max-width: 120px;
  min-width: 100px;
  width: 100%;
  margin: 10px;
  border-radius: 10px;
  object-fit: contain;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 애니메이션 효과 */
}

.img_List img:hover {
  transform: scale(1.1); /* 이미지 확대 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
}
.post_info {
  display: grid;
  grid-template-rows: 2rem 1fr;
  padding: 1rem;
  gap: 1.5rem;
  overflow: hidden;
}
.post_info > .title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.post_info > .title > h3 {
  font-size: 1.5rem;
  font-weight: 600;
}
.post_info > .title > p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #626262;
}
.post_info > .caption {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  color: #626262;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
}
.btm {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.totalbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.totalbox:hover {
  transform: scale(1.05); /* 이미지 확대 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
}
.totaltitle {
  font-size: 1.2rem;
  font-weight: 600;
}
.totalbox > .totalvalue {
  font-size: 1.5rem;
  font-weight: 600;
}

.btm > .List {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.List_Page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  overflow-y: scroll;
}
.List_Page > .title {
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2.5px solid #e0e0e0;
}
.List_Page > .Like_Item {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}
.List_Page > .Like_Item:hover {
  background-color: #f0f0f0;
}
.List_Page > .Like_Item > img {
  border-radius: 100%;
  width: 25px;
  height: 25px;

  object-fit: cover; /* 비율을 유지하며 부모 요소에 맞게 조정 */
  object-position: center; /* 이미지의 중앙을 기준으로 배치 */
}
.List_Page > .Comment_Item {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}
.List_Page > .Comment_Item:hover {
  background-color: #f0f0f0;
}
.List_Page > .Comment_Item > .Comment_Item_Title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}
.Like_Item > .Comment_Item .Comment_Item_Title img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  object-fit: cover; /* 비율을 유지하며 부모 요소에 맞게 조정 */
  object-position: center; /* 이미지의 중앙을 기준으로 배치 */
}
.ProfileImg {
  border-radius: 100%;
  width: 25px;
  height: 25px;
  object-fit: cover; /* 비율을 유지하며 부모 요소에 맞게 조정 */
  object-position: center; /* 이미지의 중앙을 기준으로 배치 */
}
.displaynone {
  display: none;
}
.chart {
  overflow: hidden;
  transition: all 0.5s ease;
}
/* 차트의 작은 크기 */
.small-chart {
  transition: grid-column 0.5s ease, grid-row 0.5s ease;
}

/* 차트의 큰 크기 */
.large-chart {
  transition: grid-column 0.5s ease, grid-row 0.5s ease;
}
</style>
