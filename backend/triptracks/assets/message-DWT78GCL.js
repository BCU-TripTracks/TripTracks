import{u as I,g as l,y as b,l as w,o as a,c as t,a as s,F as r,f as v,h as u,t as _,i as C,v as D,j as N,s as y,p as S,e as U}from"./index-a66V7uLy.js";import{s as $}from"./message.vue_vue_type_style_index_0_scoped_eda86d33_lang-DQMMxwz5.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";const k="/assets/ProfileImage2-DAt-H7rB.png",B="/assets/ProfileImage3-kxNyjHTU.png",d=m=>(S("data-v-eda86d33"),m=m(),U(),m),P={class:"messagecontainer"},V={class:"chatmenu"},q={class:"chatcontainer"},A={key:0},E=y('<span data-v-eda86d33><img src="'+k+'" alt="" class="profile" data-v-eda86d33></span><div class="chatroom" data-v-eda86d33><div data-v-eda86d33><span class="userID" data-v-eda86d33>Juuho.0</span></div><div class="sub" data-v-eda86d33><span class="chatcontent" data-v-eda86d33>뷰 너무 어렵습니다.</span></div></div>',2),T=[E],j={key:1,class:"chatroom"},F=y('<div class="roomname" data-v-eda86d33><span data-v-eda86d33><img src="'+k+'" alt="" class="profile" data-v-eda86d33></span><div class="commentdetail" data-v-eda86d33><div data-v-eda86d33><span class="userID" data-v-eda86d33>Juuho.0</span></div><div class="sub" data-v-eda86d33><span class="uesrname" data-v-eda86d33>오준호</span></div></div></div>',1),H={class:"conversation"},J=d(()=>s("div",{class:"friend"},[s("span",{class:"friendchat"},"진짜 쉬워")],-1)),K=d(()=>s("div",{class:"me"},[s("span",{class:"mychat"},"뷰 너무 어렵습니다.")],-1)),L={class:"commentdetail"},z={class:"me"},G={class:"mychat"},O={class:"textcontainer"},Q={key:2},R=d(()=>s("div",{class:"searchbox"},[s("input",{type:"text",class:"search",placeholder:" 친구를 찾아보세요."})],-1)),W={class:"chatbox"},X=["src"],Y={class:"chatroom"},Z={class:"userID"},ss={class:"sub"},es={class:"username"},as={key:3},ts=d(()=>s("div",{class:"searchbox"},[s("input",{type:"text",class:"search",placeholder:" 친구를 찾아보세요."})],-1)),os={class:"chatbox"},ns=["src"],ls={class:"userlistbox"},ds={class:"userID"},cs={class:"sub"},is={class:"username"},rs={key:4},vs={class:"chatbox"},us=d(()=>s("span",null,[s("img",{src:B,alt:"",class:"profile"})],-1)),_s=d(()=>s("div",{class:"userlistbox"},[s("div",null,[s("span",{class:"userID"},"mxoxxo"),s("span",null," 님이 메시지를 요청하였습니다.")])],-1)),ms=[us,_s],ps={__name:"message",setup(m){I();const n=l("messages");l("message");const c=l(""),p=l([]),h=l([]),g=l([]),f=()=>{p.value.push(c.value),$.emit("sendComment",c.value),c.value=""};return b(()=>{w.get("/dms/followList").then(i=>{if(console.log(i.data),!i.data.success)return console.log(`${i.data.msg}`);const o=i.data.userInfoMap;h.value=o.follower,g.value=o.following})}),(i,o)=>(a(),t("div",P,[s("div",V,[s("span",{class:"messagebox",onClick:o[0]||(o[0]=e=>n.value="messages")},"메시지함"),s("span",{class:"follow",onClick:o[1]||(o[1]=e=>n.value="follow")},"팔로우"),s("span",{class:"following",onClick:o[2]||(o[2]=e=>n.value="following")},"팔로잉"),s("span",{class:"request",onClick:o[3]||(o[3]=e=>n.value="request")},"요청")]),s("div",q,[n.value==="messages"?(a(),t("div",A,[(a(!0),t(r,null,v(Array(7),e=>(a(),t("div",{class:"chatbox",onClick:o[4]||(o[4]=x=>n.value="message")},T))),256))])):u("",!0),n.value==="message"?(a(),t("div",j,[F,s("div",H,[J,K,(a(!0),t(r,null,v(p.value,(e,x)=>(a(),t("div",{key:x,class:"commentbox"},[s("div",L,[s("div",z,[s("span",G,_(e),1)])])]))),128))]),s("div",O,[C(s("input",{class:"text",type:"text",placeholder:"채팅을 입력하세요","onUpdate:modelValue":o[5]||(o[5]=e=>c.value=e),onKeyup:N(f,["enter"])},null,544),[[D,c.value]]),s("button",{class:"send",onClick:f},"보내기")])])):u("",!0),n.value==="follow"?(a(),t("div",Q,[R,(a(!0),t(r,null,v(h.value,e=>(a(),t("div",W,[s("span",null,[s("img",{src:e.Profile_Img,alt:"",class:"profile"},null,8,X)]),s("div",Y,[s("div",null,[s("span",Z,_(e.User_Email),1)]),s("div",ss,[s("span",es,_(e.User_Name),1)])])]))),256))])):u("",!0),n.value==="following"?(a(),t("div",as,[ts,(a(!0),t(r,null,v(g.value,e=>(a(),t("div",os,[s("span",null,[s("img",{src:e.Profile_Img,alt:"",class:"profile"},null,8,ns)]),s("div",ls,[s("div",null,[s("span",ds,_(e.User_Email),1)]),s("div",cs,[s("span",is,_(e.User_Name),1)])])]))),256))])):u("",!0),n.value==="request"?(a(),t("div",rs,[(a(!0),t(r,null,v(Array(6),e=>(a(),t("div",vs,ms))),256))])):u("",!0)])]))}},xs=M(ps,[["__scopeId","data-v-eda86d33"]]);export{k as _,xs as m};
