import{u as C,r as V,o as e,c as t,a as s,b as $,w as T,d as I,F as d,p as x,e as k,f as p,g as u,h as r,t as D,i as M,v as A,j as h,k as q,l as B,m as y,n as H,q as w}from"./index-aLAoP905.js";import{_ as S}from"./ProfileImage-pE5HqWUd.js";/* empty css                                                               */import{_ as f}from"./_plugin-vue_export-helper-x3n3nnut.js";const J="/assets/messageIcon-DCn0rV-e.png",b=a=>(x("data-v-6fa08242"),a=a(),k(),a),E=b(()=>s("li",null,"마이페이지",-1)),F={class:"header"},W=b(()=>s("div",{class:"header_menu"},[s("ul",null,[s("li",{class:"header_menu_list"},"팔로잉"),s("li",{class:"header_menu_list"},"탐색"),s("li",{class:"header_menu_list"},"인기")])],-1)),j={class:"logo"},K={class:"header_menu"},U={class:"header_menu_list"},L=b(()=>s("img",{src:S,alt:"",class:"profile"},null,-1)),O=b(()=>s("li",{class:"header_menu_list"},"SHOP",-1)),R=b(()=>s("li",{class:"header_menu_list"},"EVENT",-1)),Y={__name:"header",setup(a){const o=C(),n=()=>{o.commit("Switch_isNoti")};return(l,_)=>{const v=V("router-link");return e(),t(d,null,[s("ul",{class:"header_upper_menu"},[s("li",{onClick:n,class:"noti"},"알림"),E]),s("div",F,[W,s("div",j,[s("h1",null,[$(v,{to:{name:"HomeFeed"}},{default:T(()=>[I(" TripTracks ")]),_:1})])]),s("div",K,[s("ul",null,[s("li",U,[L,$(v,{to:{name:"PersonalPage"}},{default:T(()=>[I("프로필 ")]),_:1})]),O,R])])])],64)}}},z=f(Y,[["__scopeId","data-v-6fa08242"]]),N="/assets/ProfileImage2-h-xhIYTh.png",G="/assets/ProfileImage3-JMTcox01.png",m=a=>(x("data-v-bfe64e17"),a=a(),k(),a),Q={class:"messagecontainer"},X={class:"chatmenu"},Z={class:"chatcontainer"},ss={key:0},es=h('<span data-v-bfe64e17><img src="'+N+'" alt="" class="profile" data-v-bfe64e17></span><div class="chatroom" data-v-bfe64e17><div data-v-bfe64e17><span class="userID" data-v-bfe64e17>Juuho.0</span></div><div class="sub" data-v-bfe64e17><span class="chatcontent" data-v-bfe64e17>뷰 너무 어렵습니다.</span></div></div>',2),ts=[es],as={key:1,class:"chatroom"},os=h('<div class="roomname" data-v-bfe64e17><span data-v-bfe64e17><img src="'+N+'" alt="" class="profile" data-v-bfe64e17></span><div class="commentdetail" data-v-bfe64e17><div data-v-bfe64e17><span class="userID" data-v-bfe64e17>Juuho.0</span></div><div class="sub" data-v-bfe64e17><span class="uesrname" data-v-bfe64e17>오준호</span></div></div></div>',1),cs={class:"conversation"},is=m(()=>s("div",{class:"friend"},[s("span",{class:"friendchat"},"진짜 쉬워")],-1)),ns=m(()=>s("div",{class:"me"},[s("span",{class:"mychat"},"뷰 너무 어렵습니다.")],-1)),ls={class:"commentdetail"},ds={class:"me"},rs={class:"mychat"},_s={class:"textcontainer"},vs={key:2},us=m(()=>s("div",{class:"searchbox"},[s("input",{type:"text",class:"search",placeholder:" 친구를 찾아보세요."})],-1)),ps={class:"chatbox"},ms=h('<span data-v-bfe64e17><img src="'+S+'" alt="" class="profile" data-v-bfe64e17></span><div class="chatroom" data-v-bfe64e17><div data-v-bfe64e17><span class="userID" data-v-bfe64e17>coiincidence99</span></div><div class="sub" data-v-bfe64e17><span class="username" data-v-bfe64e17>유연우</span></div></div>',2),hs=[ms],fs={key:3},bs=m(()=>s("div",{class:"searchbox"},[s("input",{type:"text",class:"search",placeholder:" 친구를 찾아보세요."})],-1)),gs={class:"chatbox"},$s=h('<span data-v-bfe64e17><img src="'+N+'" alt="" class="profile" data-v-bfe64e17></span><div class="userlistbox" data-v-bfe64e17><div data-v-bfe64e17><span class="userID" data-v-bfe64e17>Juuho.0</span></div><div class="sub" data-v-bfe64e17><span class="username" data-v-bfe64e17>오준호</span></div></div>',2),xs=[$s],ks={key:4},ys={class:"chatbox"},ws=m(()=>s("span",null,[s("img",{src:G,alt:"",class:"profile"})],-1)),Is=m(()=>s("div",{class:"userlistbox"},[s("div",null,[s("span",{class:"userID"},"mxoxxo"),s("span",null," 님이 메시지를 요청하였습니다.")])],-1)),Cs=[ws,Is],Ss={__name:"message",setup(a){const o=p("messages");p("message");const n=p(""),l=p([]),_=()=>{l.value.push(n.value),n.value=""};return(v,c)=>(e(),t("div",Q,[s("div",X,[s("span",{class:"messagebox",onClick:c[0]||(c[0]=i=>o.value="messages")},"메시지함"),s("span",{class:"follow",onClick:c[1]||(c[1]=i=>o.value="follow")},"팔로우"),s("span",{class:"following",onClick:c[2]||(c[2]=i=>o.value="following")},"팔로잉"),s("span",{class:"request",onClick:c[3]||(c[3]=i=>o.value="request")},"요청")]),s("div",Z,[o.value==="messages"?(e(),t("div",ss,[(e(!0),t(d,null,u(Array(7),i=>(e(),t("div",{class:"chatbox",onClick:c[4]||(c[4]=g=>o.value="message")},ts))),256))])):r("",!0),o.value==="message"?(e(),t("div",as,[os,s("div",cs,[is,ns,(e(!0),t(d,null,u(l.value,(i,g)=>(e(),t("div",{key:g,class:"commentbox"},[s("div",ls,[s("div",ds,[s("span",rs,D(i),1)])])]))),128))]),s("div",_s,[M(s("input",{class:"text",type:"text",placeholder:"채팅을 입력하세요","onUpdate:modelValue":c[5]||(c[5]=i=>n.value=i)},null,512),[[A,n.value]]),s("button",{class:"send",onClick:_},"보내기")])])):r("",!0),o.value==="follow"?(e(),t("div",vs,[us,(e(!0),t(d,null,u(Array(6),i=>(e(),t("div",ps,hs))),256))])):r("",!0),o.value==="following"?(e(),t("div",fs,[bs,(e(!0),t(d,null,u(Array(6),i=>(e(),t("div",gs,xs))),256))])):r("",!0),o.value==="request"?(e(),t("div",ks,[(e(!0),t(d,null,u(Array(6),i=>(e(),t("div",ys,Cs))),256))])):r("",!0)])]))}},Ns=f(Ss,[["__scopeId","data-v-bfe64e17"]]),P=a=>(x("data-v-aa3a5f9d"),a=a(),k(),a),Ts={class:"signcontainer"},Vs=P(()=>s("span",{class:"sign"},"새로운 알림",-1)),Ds={class:"notification"},Ms={class:"notibox"},As=P(()=>s("div",{class:"feedinfobox"},[s("span",null,[s("img",{src:S,alt:"",class:"profile"})]),s("div",{class:"commentdetail"},[s("div",null,[s("span",{class:"username"},"오준호님이 회원님을 팔로우하기 시작했습니다.")])])],-1)),Ps=[As],qs={__name:"notification",setup(a){return(o,n)=>(e(),t("div",Ts,[Vs,s("div",Ds,[(e(!0),t(d,null,u(Array(20),l=>(e(),t("div",Ms,Ps))),256))])]))}},Bs=f(qs,[["__scopeId","data-v-aa3a5f9d"]]),Hs=a=>(x("data-v-5cf9c628"),a=a(),k(),a),Js={class:"writepot"},Es={class:"writecontainer"},Fs=h('<div class="articlecontainer" data-v-5cf9c628><div class="articlebox" data-v-5cf9c628><div class="closeup" data-v-5cf9c628>여기를 눌러 사진을 추가하세요.</div></div></div><div class="gallery" data-v-5cf9c628><div class="pic" data-v-5cf9c628>추가된 이미지</div><div class="pic" data-v-5cf9c628>추가된 이미지</div><div class="pic" data-v-5cf9c628>. . .</div></div>',2),Ws={class:"articlecomment"},js={class:"tagbox"},Ks={id:"result",class:"tagresult"},Us=Hs(()=>s("div",null,[s("input",{class:"comment",type:"text",placeholder:"comment를 입력하세요."}),s("button",{class:"complete"},"완료")],-1)),Ls={__name:"write",setup(a){const o=C(),n=p(""),l=p([]),_=()=>{l.value.push(n.value),n.value=""};return(v,c)=>(e(),t("div",Js,[s("div",Es,[Fs,s("div",Ws,[s("div",js,[M(s("input",{class:"inputtag",type:"text","onUpdate:modelValue":c[0]||(c[0]=i=>n.value=i),onKeyup:q(_,["enter"]),placeholder:"Tag를 추가하세요."},null,544),[[A,n.value]]),s("span",Ks,D(l.value.join(", ")),1)])]),Us]),s("div",{class:"blur",onClick:c[1]||(c[1]=i=>B(o).commit("Switch_isWrite"))})]))}},Os=f(Ls,[["__scopeId","data-v-5cf9c628"]]),Rs={class:"main-container"},Ys={class:"section"},zs={__name:"Home",setup(a){const o=C(),n=y(()=>o.state.isNoti),l=y(()=>o.state.isMsg),_=y(()=>o.state.isWrite),v=()=>{o.commit("Switch_isMsg")};return H(),(c,i)=>{const g=V("router-view");return e(),t(d,null,[_.value?(e(),w(Os,{key:0})):r("",!0),n.value?(e(),w(Bs,{key:1})):r("",!0),I(),l.value?(e(),w(Ns,{key:2})):r("",!0),$(z),s("img",{onClick:v,src:J,alt:"",class:"airplane"}),s("div",Rs,[s("div",Ys,[s("div",null,[$(g)])])])],64)}}},se=f(zs,[["__scopeId","data-v-84e5c81d"]]);export{se as default};
