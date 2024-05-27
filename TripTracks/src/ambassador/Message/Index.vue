<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import axios from "../../axios";

const store = useStore();
const User_Name = computed(() => store.state.User_Name);
const User_ID = computed(() => store.state.User_ID);

const MessageContiner = ref(null);
const isMessageReloading = ref(false);
const Input_Comment = ref("");

const Messages = ref([]);

const Message_Check = async (Message) => {
  Message.isDetail = !Message.isDetail;
  if (Message.isRead) return;
  axios.post("/Home/Read_Message", { Message_ID: Message.Message_ID }, { withCredentials: true }).then((req) => {
    const { success } = req.data;
    if (!success) return alert("메세지 읽기 실패");
    Message.isRead = true;
    store.commit("SetDangerEvent", { UnreadCount: UnreadCount.value - 1 });
  });
};

const sendBtn = (Message) => {
  console.log("sendBtn");
  axios
    .post(
      "/Home/Send_Comment",
      { Message_ID: Message.Message_ID, Comment: Message.Input_Comment },
      { withCredentials: true }
    )
    .then((req) => {
      const { success, Comment_ID } = req.data;
      if (!success) return alert("댓글 등록 실패");
      Message.Comments = [
        ...Message.Comments,
        {
          User_ID: User_ID.value,
          Comment_ID: Comment_ID,
          User_Name: User_Name.value,
          Comment: Message.Input_Comment,
          Timestamp: new Date(),
        },
      ];
      Message.Input_Comment = "";
    });
};

const DeleteBtn = (Comment, Comments) => {
  axios.post("/Home/Delete_Comment", { Comment_ID: Comment.Comment_ID }, { withCredentials: true }).then((req) => {
    const { success } = req.data;
    if (!success) return alert("댓글 삭제 실패");
    Comments.splice(Comments.indexOf(Comment), 1);
  });
};

onMounted(() => {
  axios
    .get("/Home/Message_Setup", { withCredentials: true })
    .then((req) => {
      const { Message_List } = req.data;
      console.log(req.data);
      Messages.value = Message_List;
    })
    .catch((err) => {
      console.log(err);
    });
  MessageContiner.value.addEventListener("scroll", async () => {
    const scrollTop = MessageContiner.value.scrollTop;
    const scrollHeight = MessageContiner.value.scrollHeight;
    const clientHeight = MessageContiner.value.clientHeight + 10;
    if (scrollHeight - scrollTop < clientHeight) {
      if (isMessageReloading.value) return;
      isMessageReloading.value = true;
      axios
        .post(
          "/Home/Reload_Message",
          { Message_ID: Messages.value[Messages.value.length - 1].Message_ID },
          { withCredentials: true }
        )
        .then((req) => {
          const { success, Message_List } = req.data;
          if (!success) return (isMessageReloading.value = false);
          Messages.value = [...Messages.value, ...Message_List];
          isMessageReloading.value = false;
        })
        .catch((err) => {
          console.log(err);
          isMessageReloading.value = false;
        });
    }
  });
});
</script>

<template>
  <div class="main-zone p30" ref="MessageContiner">
    <div
      class="message-unit container-unit br10 dropshadow p30 fw600"
      v-for="Message in Messages"
      :key="Message"
      :style="{ background: !Message.isRead ? '#fff' : '#dfe2e6' }"
      @click="Message_Check(Message)"
    >
      <div class="top">
        #{{ Message.Message_ID }} - {{ Message.Message_Type }} -
        {{ moment(Message.Start_Timestamp).format("YYYY-MM-DD HH:mm:ss") }}
        <span v-show="Message.End_Timestamp"> ~ {{ moment(Message.End_Timestamp).format("YYYY-MM-DD HH:mm:ss") }}</span>
      </div>
      <div class="middle_Content">
        {{ Message.Message_Content }}
      </div>
      <div class="bottom_Content" v-if="Message.isDetail" @click.stop="">
        <div
          class="comment_zone flex flex-col m10"
          v-show="Message.Comments"
          v-for="Comment in Message.Comments"
          :key="Comment"
        >
          <div class="title flex flex-row">
            <div class="name">{{ Comment.User_Name }}</div>
            <div class="timestamp ml10">{{ moment(Comment.Timestamp).format("YYYY-MM-DD HH:mm:ss") }}</div>
            <div v-show="Comment.User_ID === User_ID" class="delete ml10" @click="DeleteBtn(Comment, Message.Comments)">
              X
            </div>
          </div>
          <div class="content">{{ Comment.Comment }}</div>
        </div>
        <div class="input_comment br20 p10">
          <input type="text" v-model="Message.Input_Comment" @keypress.enter="sendBtn(Message)" />
          <button class="br20" @click="sendBtn(Message)">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-zone {
  flex-grow: 1;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 30px;
}
.message-unit {
  background: white;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
}
.message-unit > * {
  margin: 5px;
}
.top {
  font-size: small;
  color: var(--text-gray);
}
.bottom_Content {
  display: flex;
  flex-direction: column;
}
.bottom_Content > .input_comment {
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--background-dark);
}
.input_comment > input {
  flex: 1;
  margin-right: 10px;
  border: none;
  background: none;
}
//input 선택시 테두리 없애기
.input_comment > input:focus {
  outline: none;
}
.input_comment > button {
  border: none;
  background: var(--background-dark);
  color: white;
  padding: 5px 25px;
  margin: -10px;
}
.comment_zone > .title {
  font-size: medium;
  align-items: end;
}
.comment_zone > .title > .timestamp {
  font-weight: 100;
  font-size: x-small;
}
.comment_zone > .title > .delete {
  font-size: medium;
  color: red;
}
.comment_zone > .content {
  font-size: medium;
  font-weight: 500;
}
</style>
