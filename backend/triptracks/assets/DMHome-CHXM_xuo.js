import{A as R,n as I,h as i,y as f,m as k,r as v,o as t,a,b as e,d as M,w as N,C as l,F as T,g as x,i as m,l as p,u as w,e as y,t as _,p as S,f as L}from"./index-CCTn3Awz.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";const B=r=>(S("data-v-380fa856"),r=r(),L(),r),H={class:"mainContainer"},$={class:"DMMenuContainer"},q={class:"DMMenu"},F={key:0,class:"DMList"},b=["onClick"],z=B(()=>e("div",{class:"Profile"},"img",-1)),A={class:"DMRoom"},E={class:"DMRoomName"},P={key:0},U={class:"DMRoomLastMessage"},j={class:"DMRoomLastMessageTime"},G={class:"DMContentContainer"},J={key:0,class:"DMContent"},K={__name:"DMHome",setup(r){const D=R(),g=I();w().state.user_ID;const n=i("Rooms"),d=i(null),u=i([{roomID:1,roomName:"room1",lastMessage:"ㅁㅁㅁ",lastMessageTime:"마지막: 1분 전"},{roomID:2,roomName:"room2",lastMessage:"ㅋㅋㅋ",lastMessageTime:"마지막: 2분 전"},{roomID:3,roomName:"room3",lastMessage:"ㅁㄴㅇ",lastMessageTime:"마지막: 3분 전"}]);return f(()=>{k.get("/Direct/print_Room").then(c=>{console.log(c.data);const{Rooms_Info:o}=c.data;u.value=o}).catch(c=>{console.log(c)})}),(c,o)=>{const h=v("router-link"),C=v("router-view");return t(),a("div",H,[e("div",$,[M(h,{to:{name:"Home"},class:"logo"},{default:N(()=>[y("TripTracks")]),_:1}),e("div",q,[e("li",{class:l({select:n.value==="Rooms"}),onClick:o[0]||(o[0]=s=>n.value="Rooms")},"채팅방",2),e("li",{class:l({select:n.value==="Requests"}),onClick:o[1]||(o[1]=s=>n.value="Requests")},"요청",2)]),n.value==="Rooms"?(t(),a("div",F,[(t(!0),a(T,null,x(u.value,s=>(t(),a("div",{class:l(["DMRoomContainer",{select:d.value===s.Room_ID}]),onClick:Q=>{d.value=s.Room_ID,p(g).push({name:"Room",params:{Room_ID:s.Room_ID}})}},[z,e("div",A,[e("div",E,_(s.User_Name),1),s.Content?(t(),a("span",P,[e("div",U,_(s.Content)+" |",1),e("div",j,"| "+_(s.Timestamp),1)])):m("",!0)])],10,b))),256))])):m("",!0)]),e("div",G,[p(D).name==="DirectMessage"?(t(),a("div",J,"아마 메시지 창이 들어갈 곳")):m("",!0),M(C)])])}}},Y=V(K,[["__scopeId","data-v-380fa856"]]);export{Y as default};
