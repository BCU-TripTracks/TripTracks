import{A as f,x as I,h as _,i as T,s as D,r as p,o as t,a,b as e,d as g,w as N,C as d,F as x,j as w,k as u,q as h,u as H,f as S,e as y,t as M,p as L,g as V}from"./index-Bw4p5HnC.js";import{h as Y}from"./moment-Cl4UOzQZ.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";const B=r=>(L("data-v-1ec5c559"),r=r(),V(),r),F={class:"mainContainer"},$={class:"DMMenuContainer"},E={class:"DMMenu"},U={key:0,class:"DMList"},b=["onClick"],j=B(()=>e("div",{class:"Profile"},"img",-1)),z={class:"DMRoom"},A={class:"DMRoomName"},P={key:0},G={class:"DMRoomLastMessage"},J={class:"DMRoomLastMessageTime"},K={class:"DMContentContainer"},O={key:0,class:"DMContent"},Q={__name:"DMHome",setup(r){const R=f(),C=I();H().state.user_ID;const n=_("Rooms"),v=_(null),l=_([{roomID:1,roomName:"room1",lastMessage:"ㅁㅁㅁ",lastMessageTime:"마지막: 1분 전"},{roomID:2,roomName:"room2",lastMessage:"ㅋㅋㅋ",lastMessageTime:"마지막: 2분 전"},{roomID:3,roomName:"room3",lastMessage:"ㅁㄴㅇ",lastMessageTime:"마지막: 3분 전"}]),m=()=>{S.get("/Direct/print_Room",{withCredentials:!0}).then(c=>{console.log(c.data);const{Rooms_Info:o}=c.data;l.value=o,l.value.forEach(i=>{i.lastMessageTime=Y(i.lastMessageTime).format("YYYY-MM-DD HH:mm:ss")})}).catch(c=>{console.log(c)})};return T(()=>{m(),D.on("receive_message",()=>{m()}),D.on("DM_Rooms_Update",()=>{m()})}),(c,o)=>{const i=p("router-link"),k=p("router-view");return t(),a("div",F,[e("div",$,[g(i,{to:{name:"HomeFeed"},class:"logo"},{default:N(()=>[y("TripTracks")]),_:1}),e("div",E,[e("li",{class:d({select:n.value==="Rooms"}),onClick:o[0]||(o[0]=s=>n.value="Rooms")}," 채팅방 ",2),e("li",{class:d({select:n.value==="Requests"}),onClick:o[1]||(o[1]=s=>n.value="Requests")}," 요청 ",2)]),n.value==="Rooms"?(t(),a("div",U,[(t(!0),a(x,null,w(l.value,s=>(t(),a("div",{class:d(["DMRoomContainer",{select:v.value===s.Room_ID}]),onClick:X=>{v.value=s.Room_ID,h(C).push({name:"Room",params:{Room_ID:s.Room_ID}})}},[j,e("div",z,[e("div",A,M(s.User_Name),1),s.lastMessage?(t(),a("span",P,[e("div",G,M(s.lastMessage)+" |",1),e("div",J," | "+M(s.lastMessageTime),1)])):u("",!0)])],10,b))),256))])):u("",!0)]),e("div",K,[h(R).name==="DirectMessage"?(t(),a("div",O," 아마 메시지 창이 들어갈 곳 ")):u("",!0),g(k)])])}}},oe=q(Q,[["__scopeId","data-v-1ec5c559"]]);export{oe as default};
