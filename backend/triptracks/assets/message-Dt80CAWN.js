import{u as y,h as l,y as D,m as g,o,a as n,b as s,F as v,g as m,t as r,i as u,j as w,v as C,k as U,s as $,z as M,p as N,f as S}from"./index-Dh2RX8qd.js";/* empty css                                                                */import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";const B="/assets/ProfileImage2-DAt-H7rB.png",P="/assets/ProfileImage3-kxNyjHTU.png",i=_=>(N("data-v-ab10c39a"),_=_(),S(),_),R={class:"messagecontainer"},V={class:"chatmenu"},q={class:"chatcontainer"},j={key:0},A=["src"],F={class:"chatroom"},H={class:"userID"},K={class:"userID"},L=i(()=>s("div",{class:"sub"},[s("span",{class:"chatcontent"},"뷰 너무 어렵습니다.")],-1)),z={key:1,class:"chatroom"},E=$('<div class="roomname" data-v-ab10c39a><span data-v-ab10c39a><img src="'+B+'" alt="" class="profile" data-v-ab10c39a></span><div class="commentdetail" data-v-ab10c39a><div data-v-ab10c39a><span class="userID" data-v-ab10c39a>Juuho.0</span></div><div class="sub" data-v-ab10c39a><span class="uesrname" data-v-ab10c39a>오준호</span></div></div></div>',1),J={class:"conversation"},G=i(()=>s("div",{class:"friend"},[s("span",{class:"friendchat"},"진짜 쉬워")],-1)),O=i(()=>s("div",{class:"me"},[s("span",{class:"mychat"},"뷰 너무 어렵습니다.")],-1)),Q={class:"commentdetail"},W={class:"me"},X={class:"mychat"},Y={class:"textcontainer"},Z={key:2},ss={key:3},es=i(()=>s("div",{class:"searchbox"},[s("input",{type:"text",class:"search",placeholder:" 친구를 찾아보세요."})],-1)),as=["onClick"],ts=["src"],os={class:"userlistbox"},ns={class:"userID"},cs={class:"sub"},ls={class:"username"},is={key:4},ds={class:"chatbox"},rs=i(()=>s("span",null,[s("img",{src:P,alt:"",class:"profile"})],-1)),us=i(()=>s("div",{class:"userlistbox"},[s("div",null,[s("span",{class:"userID"},"mxoxxo"),s("span",null," 님이 메시지를 요청하였습니다.")])],-1)),_s=[rs,us],vs={__name:"message",setup(_){y();const c=l("messages");l("message");const d=l(""),f=l([]),k=l([]),b=l([]),p=l([]),x=()=>{f.value.push(d.value),M.emit("sendComment",d.value),d.value=""};D(()=>{g.get("/dms/followList").then(t=>{if(console.log(t.data),!t.data.success)return console.log(`${t.data.msg}`);const{userInfoMap:e}=t.data;k.value=e.follower,b.value=e.following}).catch(t=>{console.log(t)}),g.get("/dms/dmRooms").then(t=>{console.log(t.data);const{Rooms:e}=t.data;p.value=e}).catch(t=>{console.log(t)})});const I=t=>{g.post("/dms/createDM",{targetID:t}).then(e=>{if(console.log(e.data),!e.data.success)return console.log(`${e.data.msg}`);p.value=e.data.Rooms}).catch(e=>{console.log(e)})};return(t,e)=>(o(),n("div",R,[s("div",V,[s("span",{class:"messagebox",onClick:e[0]||(e[0]=a=>c.value="messages")},"메시지함"),s("span",{class:"follow",onClick:e[1]||(e[1]=a=>c.value="follow")},"팔로우"),s("span",{class:"following",onClick:e[2]||(e[2]=a=>c.value="following")},"팔로잉"),s("span",{class:"request",onClick:e[3]||(e[3]=a=>c.value="request")},"요청")]),s("div",q,[c.value==="messages"?(o(),n("div",j,[(o(!0),n(v,null,m(p.value,a=>(o(),n("div",{class:"chatbox",onClick:e[4]||(e[4]=h=>c.value="message")},[s("span",null,[s("img",{src:a.Target_User.Profile_Img,alt:"",class:"profile"},null,8,A)]),s("div",F,[s("div",null,[s("span",H,r(a.Target_User.User_ID),1),s("span",K,r(a.Target_User.User_Name),1)]),L])]))),256))])):u("",!0),c.value==="message"?(o(),n("div",z,[E,s("div",J,[G,O,(o(!0),n(v,null,m(f.value,(a,h)=>(o(),n("div",{key:h,class:"commentbox"},[s("div",Q,[s("div",W,[s("span",X,r(a),1)])])]))),128))]),s("div",Y,[w(s("input",{class:"text",type:"text",placeholder:"채팅을 입력하세요","onUpdate:modelValue":e[5]||(e[5]=a=>d.value=a),onKeyup:U(x,["enter"])},null,544),[[C,d.value]]),s("button",{class:"send",onClick:x},"보내기")])])):u("",!0),c.value==="follow"?(o(),n("div",Z)):u("",!0),c.value==="following"?(o(),n("div",ss,[es,(o(!0),n(v,null,m(b.value,a=>(o(),n("div",{class:"chatbox",onClick:h=>I(a.User_ID)},[s("span",null,[s("img",{src:a.Profile_Img,alt:"",class:"profile"},null,8,ts)]),s("div",os,[s("div",null,[s("span",ns,r(a.User_ID),1)]),s("div",cs,[s("span",ls,r(a.User_Name),1)])])],8,as))),256))])):u("",!0),c.value==="request"?(o(),n("div",is,[(o(!0),n(v,null,m(Array(6),a=>(o(),n("div",ds,_s))),256))])):u("",!0)])]))}},gs=T(vs,[["__scopeId","data-v-ab10c39a"]]);export{B as _,gs as m};
