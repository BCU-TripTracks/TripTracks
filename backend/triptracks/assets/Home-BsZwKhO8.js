import{u as y,c as g,r as T,o as a,a as c,b as e,d as f,w as S,e as k,F as I,p as b,f as C,g as P,h as p,i as m,j as F,v as N,k as W,t as B,l as H,m as K,n as U,q as x}from"./index-huWHUzRm.js";import{_ as A,m as E}from"./message-C4YouIIa.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as R}from"./ProfileImage-DDAmAK24.js";import"./message.vue_vue_type_style_index_0_scoped_eda86d33_lang-DQMMxwz5.js";const j="/assets/messageIcon-MKfStX56.png",w=s=>(b("data-v-e2cdfe59"),s=s(),C(),s),q=w(()=>e("li",null,"마이페이지",-1)),z={class:"header"},O=w(()=>e("div",{class:"header_menu"},[e("ul",null,[e("li",{class:"header_menu_list"},"팔로잉"),e("li",{class:"header_menu_list"},"탐색"),e("li",{class:"header_menu_list"},"인기")])],-1)),X={class:"logo"},G={class:"header_menu"},J={class:"header_menu_list"},Q=w(()=>e("li",{class:"header_menu_list"},"SHOP",-1)),Y=w(()=>e("li",{class:"header_menu_list"},"EVENT",-1)),Z={__name:"header",setup(s){const o=y(),i=g(()=>o.state.user_ID),n=()=>{o.commit("Switch_isNoti")},_=()=>{o.commit("Switch_isLogin")};return(r,d)=>{const u=T("router-link");return a(),c(I,null,[e("ul",{class:"header_upper_menu"},[e("li",{onClick:n,class:"noti"},"알림"),q,e("li",{onClick:_,class:"Logout"},"로그아웃")]),e("div",z,[O,e("div",X,[e("h1",null,[f(u,{to:{name:"HomeFeed"}},{default:S(()=>[k(" TripTracks ")]),_:1})])]),e("div",G,[e("ul",null,[e("li",J,[f(u,{to:{name:"PersonalPage",params:{userID:i.value}}},{default:S(()=>[k("프로필 ")]),_:1},8,["to"])]),Q,Y])])])],64)}}},ee=$(Z,[["__scopeId","data-v-e2cdfe59"]]),V=s=>(b("data-v-bd750d5a"),s=s(),C(),s),se={class:"signcontainer"},te=V(()=>e("span",{class:"sign"},"새로운 알림",-1)),oe={class:"notification"},ae={class:"notibox"},ie=V(()=>e("div",{class:"feedinfobox"},[e("span",null,[e("img",{src:A,alt:"",class:"profile"})]),e("div",{class:"commentdetail"},[e("div",null,[e("span",{class:"username"},"오준호님이 회원님을 팔로우하기 시작했습니다.")])])],-1)),ne=[ie],le={__name:"notification",setup(s){return(o,i)=>(a(),c("div",se,[te,e("div",oe,[(a(!0),c(I,null,P(Array(20),n=>(a(),c("div",ae,ne))),256))])]))}},ce=$(le,[["__scopeId","data-v-bd750d5a"]]),D=s=>(b("data-v-f7e6f50e"),s=s(),C(),s),_e={class:"writepot"},re={class:"writecontainer"},de=D(()=>e("span",{class:"newarticle"},"새 게시물 작성",-1)),ue={class:"articlebox"},pe={class:"photobox"},me={key:0,for:"chooseFile",class:"selectphoto"},he={key:1,class:"photobox"},ve=["src"],ge={class:"commentbox"},fe=D(()=>e("div",{class:"userinfo"},[e("span",null,[e("img",{src:R,alt:"",class:"profile"})]),e("span",{class:"userid"},"coiincidence99")],-1)),$e={class:"tagbox"},we={id:"result",class:"tagresult"},xe={class:"articlecomment"},ke={class:"buttonzone"},ye={__name:"write",setup(s){const o=y(),i=p(""),n=p([]),_=p(null),r=p(""),d=p(""),u=()=>{n.value.push(i.value),i.value=""};function h(v){const t=v.target.files[0];if(t&&t.type.startsWith("image")){_.value=t;const l=new FileReader;l.onload=M=>{r.value=M.target.result},l.readAsDataURL(t)}else alert("이미지 파일을 선택해주세요.")}const L=()=>{console.log(_.value),K.post("/api/ddd",{Post_Caption:d.value,tags:n.value,imgs:_.value}).then(v=>{console.log(v)})};return(v,t)=>(a(),c("div",_e,[e("div",re,[de,e("div",ue,[e("div",pe,[r.value?m("",!0):(a(),c("label",me," 👉 CLICK 👈 ")),e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:h},null,32),r.value?(a(),c("div",he,[e("img",{src:r.value,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,ve)])):m("",!0)]),e("div",ge,[fe,e("div",null,[e("span",$e,[F(e("input",{class:"inputtag",type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>i.value=l),onKeyup:W(u,["enter"]),placeholder:"이 곳에 Tag를 입력하세요."},null,544),[[N,i.value]])]),e("span",we," Tag : "+B(n.value.join(", ")),1)]),e("div",xe,[F(e("textarea",{class:"comment",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":t[1]||(t[1]=l=>d.value=l)},null,512),[[N,d.value]]),e("div",ke,[e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:h},null,32),e("button",{class:"complete",onClick:t[2]||(t[2]=l=>L())},"완료")])])])])]),e("div",{class:"blur",onClick:t[3]||(t[3]=l=>H(o).commit("Switch_isWrite"))})]))}},Ie=$(ye,[["__scopeId","data-v-f7e6f50e"]]),be={class:"main-container"},Ce={class:"section"},Se={__name:"Home",setup(s){const o=y(),i=g(()=>o.state.isNoti),n=g(()=>o.state.isMsg),_=g(()=>o.state.isWrite),r=()=>{o.commit("Switch_isMsg")};return U(),(d,u)=>{const h=T("router-view");return a(),c(I,null,[_.value?(a(),x(Ie,{key:0})):m("",!0),i.value?(a(),x(ce,{key:1})):m("",!0),k(),n.value?(a(),x(E,{key:2})):m("",!0),f(ee),e("img",{onClick:r,src:j,alt:"",class:"airplane"}),e("div",be,[e("div",Ce,[e("div",null,[f(h)])])])],64)}}},Le=$(Se,[["__scopeId","data-v-84e5c81d"]]);export{Le as default};
