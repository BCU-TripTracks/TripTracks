<script setup>
import axios from "../axios";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Instagram from "../assets/img/Instagram.png";
</script>

<template>
  <div class="fotter">
    <div class="fotterbox">
      <div class="fottermenu">
        <div class="menubox">
          <ul class="fotter_Menu">
            <h3 class="fotter_Menu_Title">이용안내</h3>
            <li class="ds_li">공지사항</li>
            <li class="ds_li">커뮤니티 가이드라인</li>
            <li class="ds_li">패널티 정책</li>
            <li class="ds_li">엠버서더 신청</li>
          </ul>
          <ul class="fotter_Menu">
            <h3 class="fotter_Menu_Title">팀소개</h3>
            <li class="ds_li">
              PM 이영재 : dudwo2001@icloud.com
              <a
                href="https://www.instagram.com/leepecome?igsh=MTFuOG9hYWh6a3Z3aQ=="
                target="_blank"
              >
                <img :src="Instagram" alt="Instagram" class="profile" />
              </a>
            </li>
            <li class="ds_li">
              Backend 서현진 :
              <a
                href="https://www.instagram.com/nuyhn_ij?igsh=MTl6aW9xdnB0Z29lYw=="
                target="_blank"
              >
                <img :src="Instagram" alt="Instagram" class="profile" />
              </a>
            </li>
            <li class="ds_li">
              Frontend 오준호 :
              <a
                href="https://www.instagram.com/juunh.0?igsh=MXh4dTB4Ymw4bjdoMg=="
                target="_blank"
              >
                <img :src="Instagram" alt="Instagram" class="profile" />
              </a>
            </li>

            <li class="ds_li">
              Frontend 유연우 : uyu0326@gmail.com
              <a
                href="https://www.instagram.com/coiincidence99?igsh=MTN2d2Vyc2NnNGNwNQ%3D%3D&utm_source=qr"
                target="_blank"
              >
                <img :src="Instagram" alt="Instagram" class="profile" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fotter {
  display: flex;
  justify-content: center;
  border-top: 1px solid #eaeaea;
  padding-top: 1em;
}
.fotter_Menu {
  list-style: none;
  color: #373737b5;
  margin-right: 10em;
  margin-bottom: 1em;
}
.menubox {
  display: flex;
  flex-direction: row;
}
.fotter_Menu_Title {
  color: black;
  margin-bottom: 1em;
}
.discription {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.ds_li {
  margin-right: 1em;
  display: flex;
  color: #373737b5;
}
.profile {
  height: 20px;
  margin-left: 5px;
}
</style>
