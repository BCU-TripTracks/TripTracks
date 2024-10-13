<script setup>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import moment from "moment";
import axios from "../axios";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";

import like from "../assets/img/like.png";
import likeed from "../assets/img/likeed.png";
import image404 from "../assets/img/404img.avif";

const route = useRoute();
const router = useRouter();
const store = useStore();

const isModify = computed(() => store.state.isModify);
const Post_ID = computed(() => route.params.Post_ID);
const User_ID = computed(() => store.state.User_ID);
const Post_Data = ref(null);
const tags = ref(null);

const isCurrentUserPostOwner = computed(() => {
  return Post_Data.value && User_ID.value === Post_Data.value.post.User_ID;
});

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
          // 게시글 삭제 후 상태 업데이트
          Post_Data.value = null; // 게시글 데이터를 null로 설정하여 화면에서 제거
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

const loadComments = () => {
  axios
    .post(
      "/feeds/Comment/list",
      {
        Post_ID: Post_Data.value.post.Post_ID,
      },
      {
        withCredentials: true,
      }
    )
    .then((result) => {
      comments.value = result.data;
      console.log(result.data);
    })
    .catch((result) => {
      console.log("오류발생");
      console.log(result);
    });
};

// 댓글 작성 함수
const postComment = () => {
  const formattedTimestamp = moment().format("YYYY년 MM월 DD일 HH:mm");
  axios
    .post(
      "/feeds/Comment/add",
      {
        Post_ID: Post_Data.value.post.Post_ID,
        Comment: commentText.value,
      },
      { withCredentials: true }
    )
    .then((result) => {
      console.log(result.data);
      loadComments();
    })
    .catch((result) => {
      console.log("오류발생");
      console.log(result);
    });
  // 댓글 입력 창 초기화
  commentText.value = "";
};
const comment_Del = (comment) => {
  if (comment.User_ID !== User_ID.value) return;
  Swal.fire({
    title: "정말 코멘트를 지우겠습니까?",
    text: " ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "코멘트 삭제",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      axios
        .post(
          "/feeds/Comment/delete",
          {
            Comment_ID: comment.Comment_ID,
          },
          { withCredentials: true }
        )
        .then((result) => {
          console.log(result.data);
          loadComments();
        })
        .catch((result) => {
          console.log("오류발생");
          console.log(result);
        });
    }
  });
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
      loadComments();
    })
    .catch((result) => {
      console.log("오류발생");
      console.log(result);
    });
});

const like_Button_Click = (Post) => {
  if (Post.isLike) {
    axios
      .post(
        "/feeds/Like/remove",
        { postId: Post.Post_ID },
        { withCredentials: true }
      )
      .then((result) => {
        Post.isLike = !Post.isLike;
      })
      .catch((result) => {
        if (result.response.status == 400) {
          // alert("실패");
        }
      });
  } else {
    axios
      .post(
        "/feeds/Like/add",
        { postId: Post.Post_ID },
        { withCredentials: true }
      )
      .then((result) => {
        Post.isLike = !Post.isLike;
      })
      .catch((result) => {
        if (result.response.status == 400) {
          // alert("실패");
        }
      });
  }
};
const replaceImage = (event) => {
  event.target.src = event.target.getAttribute("data-fallback");
};
const modules = [Pagination, Navigation];
</script>

<template>
  <div class="discription" v-if="Post_Data">
    <div class="feedinfobox">
      <!-- <img :src="Post.Profile_Img" alt="" class="profile" /> -->
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
      <div class="slidewrap">
        <Swiper
          :spaceBetween="1"
          :slidesPerView="1"
          :pagination="true"
          :navigation="true"
          :modules="modules"
          class="mySwiper"
        >
          <SwiperSlide
            v-for="(img, index) in Post_Data.post.Image_Srcs"
            :key="index"
          >
            <img
              :src="img"
              @error="replaceImage"
              :data-fallback="image404"
              alt="Image preview"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        <div class="interact">
          <div>
            {{ Post_Data.post.Post_Title }}
          </div>
          <div class="caption">
            {{ Post_Data.post.Post_Caption }}
          </div>
        </div>
      </div>
    </div>
    <ul class="place">
      <li>{{ Post_Data.tags }}</li>
    </ul>
    <ul class="makerdrop">
      <li class="LCS">
        <span class="LC"
          >좋아요 {{ Post_Data.post.likeCount }} 댓글
          {{ comments.length }}</span
        >
        <span
          ><img
            :src="Post_Data.post.isLike ? likeed : like"
            alt=""
            class="like"
            @click="like_Button_Click(Post_Data.post)"
        /></span>
        <span><img src="../assets/img/save.png" alt="" class="save" /></span>
      </li>
    </ul>

    <div v-for="(comment, index) in comments" :key="index" class="commentbox">
      <span>
        <img :src="comment.Profile_Img" alt="" class="profile" />
      </span>
      <div class="commentdetail">
        <div>
          <span class="username">
            @{{ comment.User_ID }}-{{ comment.User_Name }}
          </span>
          <span class="content"> {{ comment.Comment_Text }}</span>
        </div>
        <div class="sub">
          <span class="uploadtime">{{
            moment(comment.Comment_Timestamp).format("YYYY년MM월DD일 HH:mm:ss")
          }}</span>
          <!-- <span class="reply">답글쓰기</span> -->
          <span
            class="reply"
            v-show="comment.User_ID === User_ID"
            @click="comment_Del(comment)"
            >삭제</span
          >
        </div>
      </div>
    </div>
    <div class="commentcontainer">
      <input
        class="comment"
        type="text"
        placeholder="댓글을 입력하세요."
        v-model="commentText"
        @keypress.enter="postComment"
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
.discription {
  display: flex;
  flex-direction: column;
}
.discription > li {
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
.sub > span {
  margin-right: 5px;
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
.interact {
  display: flex;
}
</style>
<style>
.swal2-title {
  font-size: 1.7rem;
}
.section .slidewrap {
  width: 600px !important;
  height: auto !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  overflow: hidden !important;
  display: inline-block !important;
}
</style>
