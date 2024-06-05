<script setup>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import moment from "moment";
import axios from "../axios";
import Swal from "sweetalert2";

import Feed_image from "../assets/img/Feed_image.png";

import messagevue from "../components/message.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const isModify = computed(() => store.state.isModify);
// const Post_ID = computed(() => route.params.Post_ID);
const User_ID = computed(() => store.state.User_ID);
const Post_Data = ref(null);
const tags = ref(null);

const isCurrentUserPostOwner = computed(() => {
  return Post_Data.value && User_ID.value === Post_Data.value.post.User_ID;
});

watch(
  isModify,
  () => {
    axios
      .get("/Feeds/Posts_list", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        Posters_Info.value = result.data;
      })
      .catch((result) => {
        console.log("오류발생");
        console.log(result);
      });
  },
  { immediate: true }
);
const modify_Button_Click = () => {
  router.push({ name: "modify" });
};

const click_Msg = () => {
  store.commit("Switch_isMsg");
};

const Follow = () => {
  if (Post_Data.value.isFollowedByCurrentUser) {
    // 만약 사용자가 이미 해당 사용자를 팔로우하고 있다면
    Swal.fire({
      title: "정말 팔로우를 취소하시겠습니까?",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "팔로우 취소",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post(
            `/user/unfollow`,
            {
              userId: Post_Data.value.post.User_ID,
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            Swal.fire("팔로우 취소", "팔로우가 취소되었습니다.", "success");
            store.commit("Update_Follow_Status", false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
};
const Delete = async () => {
  Swal.fire({
    title: "정말로 게시글을 삭제하시겠습니까?",
    text: "삭제된 게시글은 되돌릴 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios
        .post(
          `/feeds/Post_delete`,
          {
            postId: Post_Data.value.post.Post_ID,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire(
            "게시글이 삭제되었습니다!",
            "홈화면으로 이동합니다.",
            "success"
          );
          router.push({ name: "HomeFeed" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("게시글 삭제가 취소되었습니다.", "ㅋㅋ봐줌", "error");
    }
  });
};
const commentText = ref("");
const comments = ref([]);

// 댓글 작성 함수
const postComment = () => {
  const formattedTimestamp = moment().format("YYYY년 MM월 DD일 HH:mm");
  comments.value.push({
    content: commentText.value,
    timestamp: formattedTimestamp,
  });
  // 댓글 입력 창 초기화
  commentText.value = "";
};
const Post = ref(null);

onMounted(() => {
  console.log("테스트1");
  console.log(route.params.Post_ID);
  axios
    .get("/Feeds/Post_detail/" + route.params.Post_ID, {
      withCredentials: true,
    })
    .then((result) => {
      console.log(result.data);
      Post_Data.value = result.data;
    })
    .catch((result) => {
      console.log("오류발생");
      console.log(result);
    });
});
ref(null);
</script>

<template>
  <div class="discription" v-if="Post_Data">
    <div class="feedinfobox">
      <span>
        <img :src="Post_Data.post.Profile_Img" alt="" class="profile" />
      </span>
      <div class="commentdetail">
        <div>
          <span class="username">
            <router-link
              :to="{
                name: 'PersonalPage',
                params: { User_ID: Post_Data.post.User_ID },
              }"
              class="userID"
              >{{ Post_Data.post.User_ID }}</router-link
            >
          </span>
        </div>
        <div class="sub">
          <span class="uploadtime">{{
            moment(Post_Data.post.Post_Create_Timestamp).format(
              "YYYY년 MM월 DD일 HH:mm"
            )
          }}</span>
        </div>
      </div>
      <div class="userbutton">
        <div class="Ownerbox" v-if="isCurrentUserPostOwner">
          <button @click="modify_Button_Click()" class="modifybutton">
            수정
          </button>
          <button class="feeddelete" @click="Delete">삭제</button>
        </div>
        <div class="Audiencebox" v-if="!isCurrentUserPostOwner"></div>

        <button
          v-if="!isCurrentUserPostOwner"
          class="follow"
          @click="Follow"
          :style="{
            backgroundColor: Post_Data.isFollowedByCurrentUser
              ? '#EFEFEF'
              : 'black',
            borderColor: Post_Data.isFollowedByCurrentUser
              ? '#F2F2F2'
              : 'black',
            color: Post_Data.isFollowedByCurrentUser ? 'black' : 'white',
          }"
        >
          {{ Post_Data.isFollowedByCurrentUser ? "팔로잉" : "팔로우" }}
        </button>
        <button
          v-if="!isCurrentUserPostOwner"
          class="message"
          @click="click_Msg"
        >
          메시지
        </button>
      </div>
    </div>
    <div class="slidewrap">
      <ul class="slidelist">
        <li>
          <a>
            <label for="slide03" class="left"></label>
            <label for="slide02" class="right"></label>
          </a>
        </li>
      </ul>
      <img :src="Post_Data.post.Image_Src" alt="" />
      <div>
        {{ Post_Data.post.Post_Title }}
      </div>
      <div class="caption mt10">
        {{ Post_Data.post.Post_Caption }}
      </div>
    </div>
    <ul class="place">
      <li>{{ Post_Data.tags }}</li>
    </ul>
    <ul class="makerdrop">
      <li class="LCS">
        <span class="LC">좋아요 4,722 댓글 115</span>
        <span><img src="../assets/img/like.png" alt="" class="like" /></span>
        <span><img src="../assets/img/save.png" alt="" class="save" /></span>
      </li>
    </ul>

    <div class="commentbox">
      <span>
        <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
      </span>
      <div class="commentdetail">
        <div>
          <span class="username">유연우</span>
          <span class="content">고우십니다^^.</span>
        </div>
        <div class="sub">
          <span class="uploadtime">2024년 03월 30일 12:12</span>
          <span class="reply">답글쓰기</span>
        </div>
      </div>
    </div>

    <div v-for="(comment, index) in comments" :key="index" class="commentbox">
      <span>
        <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
      </span>
      <div class="commentdetail">
        <div>
          <span class="username">유연우</span>
          <span class="content"> {{ comment.content }}</span>
        </div>
        <div class="sub">
          <span class="uploadtime">{{ comment.timestamp }}</span>
          <span class="reply">답글쓰기</span>
        </div>
      </div>
    </div>
    <div class="commentcontainer">
      <input
        class="comment"
        type="text"
        placeholder="댓글을 입력하세요."
        v-model="commentText"
        @keyup.enter="postComment"
      />
      <button class="commenting" @click="postComment">입력</button>
    </div>
  </div>
</template>

<style scoped>
.feedinfobox {
  display: flex;
  margin-top: 30px;
  margin-bottom: 10px;
}
.userID {
  text-decoration: none;
  color: black;
}
.userbutton {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.modifybutton {
  padding: 0.5rem 1rem;
  margin-left: auto;
  background-color: black;
  color: white;
}
.modifybutton:hover {
  opacity: 0.7;
  cursor: pointer;
}
.feeddelete {
  margin: 5px;
  padding: 0.5rem 0.9rem;
  background-color: #dc4939;
  color: white;
  border-radius: 10px;
  border: none;
}
.feeddelete:hover {
  cursor: pointer;
  opacity: 0.7;
}
button {
  margin: 5px;
  padding: 0.5rem 0.9rem;
  background-color: black;
  color: white;
  border-radius: 10px;
  border: none;
}
.follow:hover {
  opacity: 0.7;
  cursor: pointer;
}
.message:hover {
  opacity: 0.7;
  cursor: pointer;
}
.commenting:hover {
  opacity: 0.7;
  cursor: pointer;
}
.slidelist {
  white-space: nowrap;
  list-style: none;
}
.decription {
  width: 600px;
  height: 800px;
}
.decription > li {
  list-style-type: none;
  margin-top: 10px;
}
.place {
  margin-top: 50px;
  border-bottom: 1px;
}
.place > li {
  list-style-type: none;
}
.place > li > img {
  height: 90px;
  width: 70px;
  margin: 3px;
}
.LCS {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  padding-right: 5px;
}
.like {
  height: 25px;
  margin-right: 10px;
}
.save {
  height: 25px;
}
.LC {
  margin-right: auto;
  padding-bottom: 5px;
  border-bottom: 1px solid #efefef;
}
.username {
  margin-right: 5px;
  font-weight: bold;
}
.comment {
  margin: 5px 0 5px 0;
  width: 600px;
}
.profile {
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border-radius: 50%;
}
.commentbox {
  display: flex;
}
.sub {
  font-size: smaller;
}
.uploadtime {
  margin-right: 5px;
}
.list-item {
  margin-top: 10px;
}
.makerdrop > li {
  list-style-type: none;
}
.commentcontainer {
  display: flex;
}
.section {
  display: none;
}
.section .slidewrap {
  width: 600px;
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.section .slidelist {
  white-space: nowrap;
  font-size: 0;
}
.section .slidelist > li {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  transition: all 0.5s;
}
.section .slidelist > li > a {
  display: block;
  position: relative;
}
.section .slidelist > li > a img {
  width: 100%;
}
.section .slidelist label {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  padding: 50px;
  cursor: pointer;
}
.section [id="slide01"]:checked ~ .slidewrap .slidelist > li {
  transform: translate(0%);
}
.section [id="slide02"]:checked ~ .slidewrap .slidelist > li {
  transform: translate(-100%);
}
.section [id="slide03"]:checked ~ .slidewrap .slidelist > li {
  transform: translate(-200%);
}
</style>
<style>
.swal2-title {
  font-size: 1.7rem;
}
</style>
