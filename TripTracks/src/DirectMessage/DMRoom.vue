<script setup>
import { ref, onMounted, onUnmounted, watch, onUpdated, nextTick } from "vue";
import { useRoute } from "vue-router";
import axios from "../axios";
import moment from "moment";
import socket from "../socket";

const route = useRoute();

const RoomChatContainer = ref(null);
const initialLoadComplete = ref(false);
const isRoom = ref(false);
const RoomChat = ref({
  Room_ID: null,
  User_Name: null,
  Messages: [],
});
const Image_Stack = ref({});

watch(
  () => RoomChat.value.Messages,
  async (newData) => {
    for (const Meg of RoomChat.value.Messages) {
      const Feed_ID = Meg.Message;
      if (Meg.type == "1") {
        if (Image_Stack.value[Feed_ID] == undefined) {
          axios
            .post(
              `/feeds/Post_tinyInfo`,
              { Post_ID: Feed_ID },
              { withCredentials: true }
            )
            .then((res) => {
              const FeedInfo = res.data;
              Image_Stack.value[Feed_ID] = {
                Post_ID: Feed_ID,
                User_ID: FeedInfo.User_ID,
                User_Name: FeedInfo.User_Name,
                Profile_Img: FeedInfo.Profile_Img,
                Image_Src: FeedInfo.Image_Src,
                Post_Caption: FeedInfo.Post_Caption,
                Post_Title: FeedInfo.Post_Title,
              };
            })
            .catch((err) => {
              if (err.response && err.response.status === 500) {
                Image_Stack.value[Feed_ID] = {
                  Post_ID: Feed_ID,
                  User_ID: null,
                  User_Name: null,
                  Profile_Img: null,
                  Image_Src: null,
                  Post_Caption: "삭제된 메시지입니다.",
                  Post_Title: null,
                };
              } else {
                console.error(err);
              }
            });
        }
      }
    }
  }
);

watch(
  () => route.params.Room_ID,
  (newRoomID) => {
    if (!newRoomID) {
      isRoom.value = false;
    } else {
      isRoom.value = true;
      axios
        .get(`/Direct/print_DM/${newRoomID}`, { withCredentials: true })
        .then((res) => {
          const { ResultRoomChat } = res.data;
          RoomChat.value = ResultRoomChat;
        })
        .catch((err) => {
          if (err.response && err.response.status === 500) {
            RoomChat.value.Messages.push({
              Type: "Y",
              type: 1,
              Message: null,
              Time: moment().format("YYYY:MM:DD HH:mm:ss"),
              Post_Caption: "삭제된 메시지입니다.",
            });
          } else {
            console.error(err);
          }
        })
        .finally(() => {
          if (RoomChat.value.Messages.length > 0) {
            for (const message of RoomChat.value.Messages) {
              message.Time = moment(message.Time).format("YYYY:MM:DD HH:mm:ss");
            }
          }
          RoomChatContainer.value.scrollTop =
            RoomChatContainer.value.scrollHeight;
        });
    }
  },
  { immediate: true }
);

// 스크롤 이벤트 핸들러
function handleScroll() {
  if (RoomChatContainer.value.scrollTop === 0) {
    loadMoreMessages(); // 맨 위에 도달했을 때 실행할 함수
  }
}

// 추가 메시지 로딩 함수
function loadMoreMessages() {
  axios
    .post(
      `/Direct/print_DM_Next`,
      {
        Room_ID: RoomChat.value.Room_ID,
        Last_Chat: RoomChat.value.Messages[0].Message_ID,
      },
      { withCredentials: true }
    )
    .then((res) => {
      const { ResultMessages } = res.data;
      RoomChat.value.Messages.unshift(...ResultMessages);
    })
    .catch((err) => {
      console.error(err);
    });
}

onMounted(() => {
  if (RoomChatContainer.value) {
    RoomChatContainer.value.addEventListener("scroll", handleScroll);
    nextTick(() => {
      if (!initialLoadComplete.value) {
        RoomChatContainer.value.scrollTop =
          RoomChatContainer.value.scrollHeight;
        initialLoadComplete.value = true;
      }
    });
  }
  socket.on("receive_message", async (data) => {
    const { Room_ID, User_ID, Message, Time, type } = data;
    if (Room_ID !== RoomChat.value.Room_ID) return;
    await RoomChat.value.Messages.push({
      Type: "Y",
      type,
      Message,
      Time,
    });
    RoomChatContainer.value.scrollTop = await RoomChatContainer.value
      .scrollHeight;
  });
});

onUnmounted(() => {
  if (RoomChatContainer.value) {
    RoomChatContainer.value.removeEventListener("scroll", handleScroll);
  }
});

const input_Message = ref("");
const sendMessage = () => {
  axios
    .post(
      `/Direct/send_Message`,
      {
        Room_ID: RoomChat.value.Room_ID,
        Message: input_Message.value,
      },
      { withCredentials: true }
    )
    .then(async (res) => {
      if (res.data.success) {
        await RoomChat.value.Messages.push({
          Type: "M",
          type: 0,
          Message: input_Message.value,
          Time: moment().format("YYYY:MM:DD HH:mm:ss"),
        });
        socket.emit("send_message", {
          Room_ID: RoomChat.value.Room_ID,
          User_ID: RoomChat.value.User_ID,
          Message: input_Message.value,
          Time: moment().format("YYYY:MM:DD HH:mm:ss"),
        });
        input_Message.value = "";
        RoomChatContainer.value.scrollTop = await RoomChatContainer.value
          .scrollHeight;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<template>
  <div class="RoomContainer" v-if="isRoom">
    <div class="RoomHeader">
      <img :src="RoomChat.Profile_Img" class="RoomProfile" />
      <div class="RoomName">
        {{ RoomChat.User_Name ? RoomChat.User_Name : "?" }}
      </div>
    </div>
    <div class="RoomChat" ref="RoomChatContainer">
      <li v-if="RoomChat.Messages" v-for="message in RoomChat.Messages">
        <div v-if="message.type == 0" :class="message.Type === 'M' ? 'm' : 'y'">
          <div class="message">{{ message.Message }}</div>
          <div class="time">{{ message.Time }}</div>
        </div>
        <div
          class="feed"
          v-if="message.type == 1"
          :class="message.Type === 'M' ? 'm' : 'y'"
        >
          <router-link
            v-if="
              Image_Stack[message.Message] &&
              Image_Stack[message.Message].Post_Caption !==
                '삭제된 메시지입니다.'
            "
            class="routernone box"
            :to="{
              name: 'FeedDetail',
              params: { Post_ID: Image_Stack[message.Message].Post_ID },
            }"
          >
            <div class="top">
              <img
                class="profileImg"
                :src="Image_Stack[message.Message].Profile_Img"
                alt=""
              />
              <p>{{ Image_Stack[message.Message].User_ID }}</p>
            </div>
            <img
              class="postimg"
              :src="Image_Stack[message.Message].Image_Src"
            />
            <p>{{ Image_Stack[message.Message].Post_Title }}</p>
          </router-link>
          <div v-else class="box">
            <p>{{ Image_Stack[message.Message]?.Post_Caption }}</p>
          </div>
        </div>
      </li>
    </div>
    <div class="RoomInput">
      <div class="inputBox">
        <input
          type="text"
          v-model="input_Message"
          @keyup.enter="sendMessage()"
        />
        <button @click="sendMessage()">send</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.routernone {
  text-decoration: none;
  color: black;
}
* {
  transition: all 0.3s;
}
.RoomContainer {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.RoomContainer > .RoomHeader {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgb(219, 219, 219);
}
.RoomHeader > .RoomProfile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
}
.RoomContainer > .RoomChat {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-bottom: 1px solid rgb(219, 219, 219);
  gap: 0.5rem;
}
.RoomChat li {
  list-style: none;
}
.RoomChat li .message {
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}
.RoomChat .m {
  align-self: flex-end;
  display: flex;
  gap: 0.5rem;
  flex-direction: row-reverse;
  align-items: center;
}
.RoomChat .m .message {
  background-color: #0080ff;
  color: white;
}
.RoomChat .y {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.RoomChat .y .message {
  background-color: #efefef;
}
.RoomChat > li .time {
  font-size: 0.8rem;
  color: #737373;
  opacity: 0;
}
.RoomChat > li:hover .time {
  opacity: 1;
}
.RoomContainer > .RoomInput {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8rem 1rem;
}
.RoomInput > .inputBox {
  display: flex;
  flex: 1;
  padding: 0.75rem 1rem;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 2rem;
}
.inputBox > input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem;
}
.inputBox > button {
  background-color: #0080ff;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
}

.feed {
  gap: 0.5rem;
  align-items: center; /* 기본 정렬을 중앙으로 설정 */
  margin: 0.5rem auto; /* 양쪽 여백을 균등하게 */
}

.feed .postimg {
  width: 250px; /* 이미지의 고정된 크기 지정 */

  height: auto; /* 이미지 비율 유지 */
  border-radius: 10px; /* 이미지 모서리 둥글게 */
}

.feed.m {
  align-items: flex-end;
}

.feed.y {
  align-items: flex-start;
}

.feed > .box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  border-radius: 1rem;
  max-width: 100%; /* 부모 요소 안에서 너비를 제한 */
  word-wrap: break-word; /* 긴 텍스트를 줄바꿈 처리 */
}

.feed.m > .box {
  background-color: #0080ff;
  color: white;
}

.feed.y > .box {
  background-color: #efefef;
}
.top {
  display: flex;
  margin: 0 0.5rem;
  gap: 0.5rem;
  align-items: flex-start;
}
.box > p {
  padding: 0 0.5rem;
}
.feed .profileImg {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: white;
}
</style>
