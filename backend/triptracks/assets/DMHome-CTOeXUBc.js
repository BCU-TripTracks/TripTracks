import{A as k,n as T,h as u,y as N,m as x,z as Y,r as g,o as n,a as c,b as e,d as h,w as H,C as M,F as w,g as y,i as v,l as I,u as S,e as L,t as D,p as V,f as B}from"./index-DkkLVimw.js";import{h as f}from"./moment-Cl4UOzQZ.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";const q=i=>(V("data-v-75c3d247"),i=i(),B(),i),z={class:"mainContainer"},E={class:"DMMenuContainer"},F={class:"DMMenu"},U={key:0,class:"DMList"},b=["onClick"],A=q(()=>e("div",{class:"Profile"},"img",-1)),P={class:"DMRoom"},j={class:"DMRoomName"},G={key:0},J={class:"DMRoomLastMessage"},K={class:"DMRoomLastMessageTime"},O={class:"DMContentContainer"},Q={key:0,class:"DMContent"},W={__name:"DMHome",setup(i){const R=k(),C=T();S().state.user_ID;const r=u("Rooms"),p=u(null),a=u([{roomID:1,roomName:"room1",lastMessage:"ㅁㅁㅁ",lastMessageTime:"마지막: 1분 전"},{roomID:2,roomName:"room2",lastMessage:"ㅋㅋㅋ",lastMessageTime:"마지막: 2분 전"},{roomID:3,roomName:"room3",lastMessage:"ㅁㄴㅇ",lastMessageTime:"마지막: 3분 전"}]);return N(()=>{x.get("/Direct/print_Room").then(t=>{console.log(t.data);const{Rooms_Info:o}=t.data;a.value=o,a.value.forEach(l=>{l.lastMessageTime=f(l.lastMessageTime).format("YYYY-MM-DD HH:mm:ss")})}).catch(t=>{console.log(t)}),Y.on("receive_message",t=>{const{Room_ID:o,User_ID:l,Message:_,Time:s}=t,m=a.value.findIndex(d=>d.roomID===o);if(m!==-1){const d={...a.value[m],lastMessage:_,lastMessageTime:f(s).format("YYYY-MM-DD HH:mm:ss")};a.value.splice(m,1,d)}})}),(t,o)=>{const l=g("router-link"),_=g("router-view");return n(),c("div",z,[e("div",E,[h(l,{to:{name:"Home"},class:"logo"},{default:H(()=>[L("TripTracks")]),_:1}),e("div",F,[e("li",{class:M({select:r.value==="Rooms"}),onClick:o[0]||(o[0]=s=>r.value="Rooms")},"채팅방",2),e("li",{class:M({select:r.value==="Requests"}),onClick:o[1]||(o[1]=s=>r.value="Requests")},"요청",2)]),r.value==="Rooms"?(n(),c("div",U,[(n(!0),c(w,null,y(a.value,s=>(n(),c("div",{class:M(["DMRoomContainer",{select:p.value===s.Room_ID}]),onClick:m=>{p.value=s.Room_ID,I(C).push({name:"Room",params:{Room_ID:s.Room_ID}})}},[A,e("div",P,[e("div",j,D(s.User_Name),1),s.lastMessage?(n(),c("span",G,[e("div",J,D(s.lastMessage)+" |",1),e("div",K,"| "+D(s.lastMessageTime),1)])):v("",!0)])],10,b))),256))])):v("",!0)]),e("div",O,[I(R).name==="DirectMessage"?(n(),c("div",Q,"아마 메시지 창이 들어갈 곳")):v("",!0),h(_)])])}}},os=$(W,[["__scopeId","data-v-75c3d247"]]);export{os as default};