import{u as S,c as g,r as C,o,a as c,b as e,d as u,w as $,e as b,F,p as w,f as x,g as P,h as m,i as h,j as D,v as N,k as W,t as B,l as H,m as K,n as U,q as I}from"./index-YTCxHjbL.js";import{_ as A,m as E}from"./message-BoMyaY1J.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as R}from"./ProfileImage-DDAmAK24.js";import"./message.vue_vue_type_style_index_0_scoped_ab10c39a_lang-eRmu6AXu.js";const j="/assets/messageIcon-MKfStX56.png",y=s=>(w("data-v-7f2fab5d"),s=s(),x(),s),q=y(()=>e("li",null,"마이페이지",-1)),z={class:"header"},O=y(()=>e("div",{class:"header_menu"},[e("ul",null,[e("li",{class:"header_menu_list"},"팔로잉"),e("li",{class:"header_menu_list"},"탐색"),e("li",{class:"header_menu_list"},"인기")])],-1)),X={class:"logo"},G={class:"header_menu"},J={class:"header_menu_list"},Q={class:"header_menu_list"},Y=y(()=>e("li",{class:"header_menu_list"},"SHOP",-1)),Z=y(()=>e("li",{class:"header_menu_list"},"EVENT",-1)),ee={__name:"header",setup(s){const a=S(),i=g(()=>a.state.user_ID),n=()=>{a.commit("Switch_isNoti")},_=()=>{a.commit("Switch_isLogin")};return(d,p)=>{const r=C("router-link");return o(),c(F,null,[e("ul",{class:"header_upper_menu"},[e("li",{onClick:n,class:"noti"},"알림"),q,e("li",{onClick:_,class:"Logout"},"로그아웃")]),e("div",z,[O,e("div",X,[e("h1",null,[u(r,{to:{name:"HomeFeed"}},{default:$(()=>[b(" TripTracks ")]),_:1})])]),e("div",G,[e("ul",null,[e("li",J,[u(r,{to:{name:"DirectMessage"}},{default:$(()=>[b("DirectMessage ")]),_:1})]),e("li",Q,[u(r,{to:{name:"PersonalPage",params:{userID:i.value}}},{default:$(()=>[b("프로필 ")]),_:1},8,["to"])]),Y,Z])])])],64)}}},se=k(ee,[["__scopeId","data-v-7f2fab5d"]]),M=s=>(w("data-v-bd750d5a"),s=s(),x(),s),te={class:"signcontainer"},oe=M(()=>e("span",{class:"sign"},"새로운 알림",-1)),ae={class:"notification"},ie={class:"notibox"},ne=M(()=>e("div",{class:"feedinfobox"},[e("span",null,[e("img",{src:A,alt:"",class:"profile"})]),e("div",{class:"commentdetail"},[e("div",null,[e("span",{class:"username"},"오준호님이 회원님을 팔로우하기 시작했습니다.")])])],-1)),le=[ne],ce={__name:"notification",setup(s){return(a,i)=>(o(),c("div",te,[oe,e("div",ae,[(o(!0),c(F,null,P(Array(20),n=>(o(),c("div",ie,le))),256))])]))}},_e=k(ce,[["__scopeId","data-v-bd750d5a"]]),T=s=>(w("data-v-f7e6f50e"),s=s(),x(),s),re={class:"writepot"},de={class:"writecontainer"},ue=T(()=>e("span",{class:"newarticle"},"새 게시물 작성",-1)),pe={class:"articlebox"},me={class:"photobox"},he={key:0,for:"chooseFile",class:"selectphoto"},ve={key:1,class:"photobox"},fe=["src"],ge={class:"commentbox"},$e=T(()=>e("div",{class:"userinfo"},[e("span",null,[e("img",{src:R,alt:"",class:"profile"})]),e("span",{class:"userid"},"coiincidence99")],-1)),we={class:"tagbox"},xe={id:"result",class:"tagresult"},ke={class:"articlecomment"},ye={class:"buttonzone"},be={__name:"write",setup(s){const a=S(),i=m(""),n=m([]),_=m(null),d=m(""),p=m(""),r=()=>{n.value.push(i.value),i.value=""};function v(f){const t=f.target.files[0];if(t&&t.type.startsWith("image")){_.value=t;const l=new FileReader;l.onload=L=>{d.value=L.target.result},l.readAsDataURL(t)}else alert("이미지 파일을 선택해주세요.")}const V=()=>{console.log(_.value),K.post("/api/ddd",{Post_Caption:p.value,tags:n.value,imgs:_.value}).then(f=>{console.log(f)})};return(f,t)=>(o(),c("div",re,[e("div",de,[ue,e("div",pe,[e("div",me,[d.value?h("",!0):(o(),c("label",he," 👉 CLICK 👈 ")),e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:v},null,32),d.value?(o(),c("div",ve,[e("img",{src:d.value,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,fe)])):h("",!0)]),e("div",ge,[$e,e("div",null,[e("span",we,[D(e("input",{class:"inputtag",type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>i.value=l),onKeyup:W(r,["enter"]),placeholder:"이 곳에 Tag를 입력하세요."},null,544),[[N,i.value]])]),e("span",xe," Tag : "+B(n.value.join(", ")),1)]),e("div",ke,[D(e("textarea",{class:"comment",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":t[1]||(t[1]=l=>p.value=l)},null,512),[[N,p.value]]),e("div",ye,[e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:v},null,32),e("button",{class:"complete",onClick:t[2]||(t[2]=l=>V())},"완료")])])])])]),e("div",{class:"blur",onClick:t[3]||(t[3]=l=>H(a).commit("Switch_isWrite"))})]))}},Ie=k(be,[["__scopeId","data-v-f7e6f50e"]]),Ce=s=>(w("data-v-6e2b53f1"),s=s(),x(),s),Se=Ce(()=>e("img",{src:j,alt:"",class:"airplane"},null,-1)),Fe={class:"main-container"},De={class:"section"},Ne={__name:"Home",setup(s){const a=S(),i=g(()=>a.state.isNoti),n=g(()=>a.state.isMsg),_=g(()=>a.state.isWrite);return U(),(d,p)=>{const r=C("router-link"),v=C("router-view");return o(),c(F,null,[_.value?(o(),I(Ie,{key:0})):h("",!0),i.value?(o(),I(_e,{key:1})):h("",!0),n.value?(o(),I(E,{key:2})):h("",!0),u(se),u(r,{to:"/DirectMessage",class:"write"},{default:$(()=>[Se]),_:1}),e("div",Fe,[e("div",De,[e("div",null,[u(v)])])])],64)}}},We=k(Ne,[["__scopeId","data-v-6e2b53f1"]]);export{We as default};
