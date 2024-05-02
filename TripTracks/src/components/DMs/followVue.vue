<script setup></script>
<template>
  <div class="searchbox">
    <input type="text" class="search" placeholder=" 친구를 찾아보세요." />
  </div>
  <div class="chatbox" v-for="follower in followers" @click="createDM(follower.User_ID)">
    <span>
      <img :src="follower.Profile_Img" alt="" class="profile" />
    </span>
    <div class="chatroom">
      <div>
        <span class="userID">{{ follower.User_ID }}</span>
      </div>
      <div class="sub">
        <span class="username">{{ follower.User_Name }}</span>
      </div>
    </div>
  </div>
</template>

<style></style>
