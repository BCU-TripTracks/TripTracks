import{r as _,o as f,s as D,e as t,f as e,g as p,h as I,K as d,F as T,l as N,j as u,y as g,u as x,a as w,b as h,d as a,i as y,t as M,C as H,z as S,p as L,k as V}from"./index-D1XIqiWT.js";import{h as Y}from"./moment-C5S46NFB.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";const B=c=>(L("data-v-b8e50779"),c=c(),V(),c),F={class:"mainContainer"},$={class:"DMMenuContainer"},q={class:"DMMenu"},z={key:0,class:"DMList"},E=["onClick"],U=B(()=>e("div",{class:"Profile"},"img",-1)),j={class:"DMRoom"},K={class:"DMRoomName"},P={key:0},A={class:"DMRoomLastMessage"},G={class:"DMRoomLastMessageTime"},J={class:"DMContentContainer"},O={key:0,class:"DMContent"},Q={__name:"DMHome",setup(c){const R=H(),C=S();x().state.user_ID;const n=_("Rooms"),v=_(null),l=_([{roomID:1,roomName:"room1",lastMessage:"ㅁㅁㅁ",lastMessageTime:"마지막: 1분 전"},{roomID:2,roomName:"room2",lastMessage:"ㅋㅋㅋ",lastMessageTime:"마지막: 2분 전"},{roomID:3,roomName:"room3",lastMessage:"ㅁㄴㅇ",lastMessageTime:"마지막: 3분 전"}]),m=()=>{w.get("/Direct/print_Room",{withCredentials:!0}).then(r=>{console.log(r.data);const{Rooms_Info:o}=r.data;l.value=o,l.value.forEach(i=>{i.lastMessageTime=Y(i.lastMessageTime).format("YYYY-MM-DD HH:mm:ss")})}).catch(r=>{console.log(r)})};return f(()=>{m(),D.on("receive_message",()=>{m()}),D.on("DM_Rooms_Update",()=>{m()})}),(r,o)=>{const i=h("router-link"),k=h("router-view");return a(),t("div",F,[e("div",$,[p(i,{to:{name:"HomeFeed"},class:"logo"},{default:I(()=>[y("TripTracks")]),_:1}),e("div",q,[e("li",{class:d({select:n.value==="Rooms"}),onClick:o[0]||(o[0]=s=>n.value="Rooms")}," 채팅방 ",2),e("li",{class:d({select:n.value==="Requests"}),onClick:o[1]||(o[1]=s=>n.value="Requests")}," 요청 ",2)]),n.value==="Rooms"?(a(),t("div",z,[(a(!0),t(T,null,N(l.value,s=>(a(),t("div",{class:d(["DMRoomContainer",{select:v.value===s.Room_ID}]),onClick:X=>{v.value=s.Room_ID,g(C).push({name:"Room",params:{Room_ID:s.Room_ID}})}},[U,e("div",j,[e("div",K,M(s.User_Name),1),s.lastMessage?(a(),t("span",P,[e("div",A,M(s.lastMessage)+" |",1),e("div",G," | "+M(s.lastMessageTime),1)])):u("",!0)])],10,E))),256))])):u("",!0)]),e("div",J,[g(R).name==="DirectMessage"?(a(),t("div",O)):u("",!0),p(k)])])}}},oe=b(Q,[["__scopeId","data-v-b8e50779"]]);export{oe as default};
