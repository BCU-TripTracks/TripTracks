import{u as S,c as $,r as C,o as t,a as n,b as e,d as m,w as v,e as g,F as k,f as D,p as y,g as w,h as M,i as p,j as f,k as P,v as T,l as L,t as W,m as A,n as j,q as I}from"./index-X2t60WR-.js";import{_ as z,m as E}from"./message-Cc0xzt_u.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{P as O}from"./ProfileImage-B4Awu9kj.js";/* empty css                                                                */const R="/assets/messageIcon-MKfStX56.png",V=s=>(y("data-v-b08bcf37"),s=s(),w(),s),X={class:"header_upper_menu"},q={class:"header"},G=V(()=>e("div",{class:"header_menu"},[e("ul",null,[e("li",{class:"header_menu_list"},"팔로잉"),e("li",{class:"header_menu_list"},"탐색"),e("li",{class:"header_menu_list"},"인기")])],-1)),J={class:"logo"},Q={class:"header_menu"},Y={class:"header_menu_list"},Z={class:"header_menu_list"},ee=V(()=>e("li",{class:"header_menu_list"},"SHOP",-1)),se={__name:"header",setup(s){const a=S();$(()=>a.state.User_ID);const l=()=>{a.commit("Switch_isNoti")},i=()=>{console.log("로그아웃실행"),D.get("/users/logout",{withCredentials:!0}).then(o=>{console.log("asdasdsadsadsadasd"),console.log(o.data),o.data.success&&a.dispatch("checkSession")}).catch(o=>{console.log(o)})};return(o,_)=>{const c=C("router-link");return t(),n(k,null,[e("ul",X,[e("li",{onClick:l,class:"noti"},"알림"),e("li",null,[m(c,{to:{name:"myPage"},class:"mypage"},{default:v(()=>[g(" 마이페이지 ")]),_:1})]),e("li",{onClick:_[0]||(_[0]=h=>i()),class:"Logout"},"로그아웃")]),e("div",q,[G,e("div",J,[e("h1",null,[m(c,{to:{name:"HomeFeed"}},{default:v(()=>[g(" TripTracks ")]),_:1})])]),e("div",Q,[e("ul",null,[e("li",Y,[m(c,{to:{name:"DirectMessage"}},{default:v(()=>[g("DirectMessage ")]),_:1})]),e("li",Z,[m(c,{to:{name:"PersonalPage",params:{User_ID:"_youngs_"}}},{default:v(()=>[g("프로필 ")]),_:1})]),ee])])])],64)}}},te=x(se,[["__scopeId","data-v-b08bcf37"]]),B=s=>(y("data-v-bd750d5a"),s=s(),w(),s),oe={class:"signcontainer"},ae=B(()=>e("span",{class:"sign"},"새로운 알림",-1)),ne={class:"notification"},le={class:"notibox"},ie=B(()=>e("div",{class:"feedinfobox"},[e("span",null,[e("img",{src:z,alt:"",class:"profile"})]),e("div",{class:"commentdetail"},[e("div",null,[e("span",{class:"username"},"오준호님이 회원님을 팔로우하기 시작했습니다.")])])],-1)),ce=[ie],re={__name:"notification",setup(s){return(a,l)=>(t(),n("div",oe,[ae,e("div",ne,[(t(!0),n(k,null,M(Array(20),i=>(t(),n("div",le,ce))),256))])]))}},_e=x(re,[["__scopeId","data-v-bd750d5a"]]),U=s=>(y("data-v-ae34a486"),s=s(),w(),s),de={class:"writepot"},ue={class:"writecontainer"},pe=U(()=>e("span",{class:"newarticle"},"새 게시물 작성",-1)),me={class:"articlebox"},he={class:"photobox"},ve={key:0,for:"chooseFile",class:"selectphoto"},ge={key:1,class:"photobox"},fe=["src"],$e={class:"commentbox"},ke=U(()=>e("div",{class:"userinfo"},[e("span",null,[e("img",{src:O,alt:"",class:"profile"})]),e("span",{class:"userid"},"coiincidence99")],-1)),ye={class:"tagbox"},we={id:"result",class:"tagresult"},xe=["onClick"],be={class:"articlecomment"},Ie={class:"buttonzone"},Ce={__name:"write",setup(s){const a=S(),l=p(""),i=p([]);p(null);const o=p(""),_=p(""),c=p(null),h=p(null),b=()=>{i.value.push(l.value),l.value=""};function F(d){h.value=c.value.files[0]}const H=()=>{console.log(h.value),D.post("/Feeds/Post_Save",{comment:_.value,tag:i.value,image:h.value},{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}}).then(d=>{console.log(d)}).catch(d=>{console.log("오류발생"),console.log(d)})},K=d=>{i.value.splice(d,1)};return(d,r)=>(t(),n("div",de,[e("div",ue,[pe,e("div",me,[e("div",he,[o.value?f("",!0):(t(),n("label",ve," 👉 CLICK 👈 ")),e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},ref_key:"Input_Img",ref:c,onChange:F},null,544),o.value?(t(),n("div",ge,[e("img",{src:o.value,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,fe)])):f("",!0)]),e("div",$e,[ke,e("div",null,[e("span",ye,[P(e("input",{class:"inputtag",type:"text","onUpdate:modelValue":r[0]||(r[0]=u=>l.value=u),onKeyup:L(b,["enter"]),placeholder:"이 곳에 Tag를 추가하세요."},null,544),[[T,l.value]])]),e("div",we,[(t(!0),n(k,null,M(i.value,(u,N)=>(t(),n("span",{key:N,class:"tag"},[g(W(u)+" ",1),e("button",{class:"deleteTagButton",onClick:Me=>K(N)}," x ",8,xe)]))),128))])]),e("div",be,[P(e("textarea",{class:"comment",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":r[1]||(r[1]=u=>_.value=u)},null,512),[[T,_.value]]),e("div",Ie,[e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:F},null,32),e("button",{class:"complete",onClick:r[2]||(r[2]=u=>H())},"완료")])])])])]),e("div",{class:"blur",onClick:r[3]||(r[3]=u=>A(a).commit("Switch_isWrite"))})]))}},Se=x(Ce,[["__scopeId","data-v-ae34a486"]]),Fe=s=>(y("data-v-6e2b53f1"),s=s(),w(),s),Ne=Fe(()=>e("img",{src:R,alt:"",class:"airplane"},null,-1)),Pe={class:"main-container"},Te={class:"section"},De={__name:"Home",setup(s){const a=S(),l=$(()=>a.state.isNoti),i=$(()=>a.state.isMsg),o=$(()=>a.state.isWrite);return j(),(_,c)=>{const h=C("router-link"),b=C("router-view");return t(),n(k,null,[o.value?(t(),I(Se,{key:0})):f("",!0),l.value?(t(),I(_e,{key:1})):f("",!0),i.value?(t(),I(E,{key:2})):f("",!0),m(te),m(h,{to:"/DirectMessage",class:"write"},{default:v(()=>[Ne]),_:1}),e("div",Pe,[e("div",Te,[e("div",null,[m(b)])])])],64)}}},Le=x(De,[["__scopeId","data-v-6e2b53f1"]]);export{Le as default};
