import{B as f,y as I,r as _,o as T,s as D,b as p,d as t,e as a,f as e,g,h as N,D as d,F as x,k as w,l as u,x as h,u as y,a as H,i as S,t as M,p as B,j as L}from"./index-6yxcJAFx.js";import{h as V}from"./moment-Cl4UOzQZ.js";import{_ as Y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b=c=>(B("data-v-b8e50779"),c=c(),L(),c),F={class:"mainContainer"},$={class:"DMMenuContainer"},q={class:"DMMenu"},E={key:0,class:"DMList"},U=["onClick"],j=b(()=>e("div",{class:"Profile"},"img",-1)),z={class:"DMRoom"},P={class:"DMRoomName"},A={key:0},G={class:"DMRoomLastMessage"},J={class:"DMRoomLastMessageTime"},K={class:"DMContentContainer"},O={key:0,class:"DMContent"},Q={__name:"DMHome",setup(c){const R=f(),k=I();y().state.user_ID;const n=_("Rooms"),v=_(null),l=_([{roomID:1,roomName:"room1",lastMessage:"ㅁㅁㅁ",lastMessageTime:"마지막: 1분 전"},{roomID:2,roomName:"room2",lastMessage:"ㅋㅋㅋ",lastMessageTime:"마지막: 2분 전"},{roomID:3,roomName:"room3",lastMessage:"ㅁㄴㅇ",lastMessageTime:"마지막: 3분 전"}]),m=()=>{H.get("/Direct/print_Room",{withCredentials:!0}).then(r=>{console.log(r.data);const{Rooms_Info:o}=r.data;l.value=o,l.value.forEach(i=>{i.lastMessageTime=V(i.lastMessageTime).format("YYYY-MM-DD HH:mm:ss")})}).catch(r=>{console.log(r)})};return T(()=>{m(),D.on("receive_message",()=>{m()}),D.on("DM_Rooms_Update",()=>{m()})}),(r,o)=>{const i=p("router-link"),C=p("router-view");return t(),a("div",F,[e("div",$,[g(i,{to:{name:"HomeFeed"},class:"logo"},{default:N(()=>[S("TripTracks")]),_:1}),e("div",q,[e("li",{class:d({select:n.value==="Rooms"}),onClick:o[0]||(o[0]=s=>n.value="Rooms")}," 채팅방 ",2),e("li",{class:d({select:n.value==="Requests"}),onClick:o[1]||(o[1]=s=>n.value="Requests")}," 요청 ",2)]),n.value==="Rooms"?(t(),a("div",E,[(t(!0),a(x,null,w(l.value,s=>(t(),a("div",{class:d(["DMRoomContainer",{select:v.value===s.Room_ID}]),onClick:X=>{v.value=s.Room_ID,h(k).push({name:"Room",params:{Room_ID:s.Room_ID}})}},[j,e("div",z,[e("div",P,M(s.User_Name),1),s.lastMessage?(t(),a("span",A,[e("div",G,M(s.lastMessage)+" |",1),e("div",J," | "+M(s.lastMessageTime),1)])):u("",!0)])],10,U))),256))])):u("",!0)]),e("div",K,[h(R).name==="DirectMessage"?(t(),a("div",O)):u("",!0),g(C)])])}}},oe=Y(Q,[["__scopeId","data-v-b8e50779"]]);export{oe as default};
