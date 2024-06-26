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
          console.log(RoomChat.value);
        })
        .catch((err) => {
          const { message } = err.response.data;
          console.log(err.response.status);
          console.log(message);
        })
        .finally(() => {
          if (RoomChat.value.Messages.length > 0)
            for (const message of RoomChat.value.Messages) {
              message.Time = moment(message.Time).format("YYYY:MM:DD HH:mm:ss");
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
  console.log(RoomChatContainer.value.scrollTop);
  if (RoomChatContainer.value.scrollTop === 0) {
    loadMoreMessages(); // 맨 위에 도달했을 때 실행할 함수
  }
}

// 추가 메시지 로딩 함수
function loadMoreMessages() {
  console.log("Loading more messages...");
  // 여기에 API 요청 로직을 추가
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
      console.log(res.data);
      const { ResultMessages } = res.data;
      console.log(ResultMessages);
      RoomChat.value.Messages.unshift(...ResultMessages);
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  if (RoomChatContainer.value) {
    RoomChatContainer.value.addEventListener("scroll", handleScroll);
    nextTick(() => {
      if (!initialLoadComplete.value) {
        RoomChatContainer.value.scrollTop =
          RoomChatContainer.value.scrollHeight;
        initialLoadComplete.value = true; // 초기 로드 완료 플래그 설정
      }
    });
  }
  socket.on("receive_message", async (data) => {
    const { Room_ID, User_ID, Message, Time } = data;
    if (Room_ID !== RoomChat.value.Room_ID) return;
    await RoomChat.value.Messages.push({
      Type: "Y",
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
  console.log("Sending message...");
  // 여기에 메시지 전송 로직을 추가
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
      console.log(err);
    });
};
</script>

<template>
  <div class="RoomContainer" v-if="isRoom">
    <div class="RoomHeader">
      <div class="RoomProfile"></div>
      <div class="RoomName">
        {{ RoomChat.User_Name ? RoomChat.User_Name : "?" }}
      </div>
    </div>
    <div class="RoomChat" ref="RoomChatContainer">
      <li
        v-if="RoomChat.Messages"
        v-for="message in RoomChat.Messages"
        :class="message.Type === 'M' ? 'm' : 'y'"
      >
        <div class="message">{{ message.Message }}</div>
        <div class="time">{{ message.Time }}</div>
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
  background-color: #0080ff;
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
.RoomChat > li {
  list-style: none;
}
.RoomChat > li > .message {
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}
.RoomChat > .m {
  align-self: flex-end;
  display: flex;
  gap: 0.5rem;
  flex-direction: row-reverse;
  align-items: center;
}
.RoomChat > .m > .message {
  background-color: #0080ff;
  color: white;
}
.RoomChat > .y {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.RoomChat > .y > .message {
  background-color: #efefef;
}
.RoomChat > li > .time {
  font-size: 0.8rem;
  color: #737373;
  opacity: 0;
}
.RoomChat > li:hover > .time {
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
</style>
