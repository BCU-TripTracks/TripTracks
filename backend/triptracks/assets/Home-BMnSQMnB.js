import{u as D,c as f,r as T,o as a,a as i,b as e,d as p,w as v,e as g,F as b,f as M,p as k,g as w,h as V,i as u,j as $,t as P,k as C,v as S,l as R,m as j,n as z,q as F}from"./index-aZut90aN.js";import{_ as E,m as O}from"./message-XxJrihPZ.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{P as X}from"./ProfileImage-B4Awu9kj.js";/* empty css                                                                */const q="/assets/messageIcon-MKfStX56.png",W=s=>(k("data-v-b08bcf37"),s=s(),w(),s),G={class:"header_upper_menu"},J={class:"header"},Q=W(()=>e("div",{class:"header_menu"},[e("ul",null,[e("li",{class:"header_menu_list"},"팔로잉"),e("li",{class:"header_menu_list"},"탐색"),e("li",{class:"header_menu_list"},"인기")])],-1)),Y={class:"logo"},Z={class:"header_menu"},ee={class:"header_menu_list"},se={class:"header_menu_list"},te=W(()=>e("li",{class:"header_menu_list"},"SHOP",-1)),oe={__name:"header",setup(s){const l=D();f(()=>l.state.User_ID);const m=()=>{l.commit("Switch_isNoti")},c=()=>{console.log("로그아웃실행"),M.get("/users/logout",{withCredentials:!0}).then(n=>{console.log("asdasdsadsadsadasd"),console.log(n.data),n.data.success&&l.dispatch("checkSession")}).catch(n=>{console.log(n)})};return(n,d)=>{const r=T("router-link");return a(),i(b,null,[e("ul",G,[e("li",{onClick:m,class:"noti"},"알림"),e("li",null,[p(r,{to:{name:"myPage"},class:"mypage"},{default:v(()=>[g(" 마이페이지 ")]),_:1})]),e("li",{onClick:d[0]||(d[0]=h=>c()),class:"Logout"},"로그아웃")]),e("div",J,[Q,e("div",Y,[e("h1",null,[p(r,{to:{name:"HomeFeed"}},{default:v(()=>[g(" TripTracks ")]),_:1})])]),e("div",Z,[e("ul",null,[e("li",ee,[p(r,{to:{name:"DirectMessage"}},{default:v(()=>[g("DirectMessage ")]),_:1})]),e("li",se,[p(r,{to:{name:"PersonalPage",params:{User_ID:"_youngs_"}}},{default:v(()=>[g("프로필 ")]),_:1})]),te])])])],64)}}},ae=x(oe,[["__scopeId","data-v-b08bcf37"]]),B=s=>(k("data-v-bd750d5a"),s=s(),w(),s),le={class:"signcontainer"},ne=B(()=>e("span",{class:"sign"},"새로운 알림",-1)),ie={class:"notification"},ce={class:"notibox"},re=B(()=>e("div",{class:"feedinfobox"},[e("span",null,[e("img",{src:E,alt:"",class:"profile"})]),e("div",{class:"commentdetail"},[e("div",null,[e("span",{class:"username"},"오준호님이 회원님을 팔로우하기 시작했습니다.")])])],-1)),_e=[re],de={__name:"notification",setup(s){return(l,m)=>(a(),i("div",le,[ne,e("div",ie,[(a(!0),i(b,null,V(Array(20),c=>(a(),i("div",ce,_e))),256))])]))}},ue=x(de,[["__scopeId","data-v-bd750d5a"]]),L=s=>(k("data-v-bdfb834e"),s=s(),w(),s),pe={class:"writepot"},me={class:"writecontainer"},he=L(()=>e("span",{class:"newarticle"},"새 게시물 작성",-1)),ve={class:"articlebox"},ge={class:"photobox"},fe={key:0,for:"chooseFile",class:"selectphoto"},$e={key:1,class:"photobox"},ye=["src"],be={class:"commentbox"},ke={class:"userinfo"},we=L(()=>e("span",null,[e("img",{src:X,alt:"",class:"profile"})],-1)),xe={class:"userid"},Ie={class:"articlecomment"},Ce={class:"tagbox"},Se={id:"result",class:"tagresult"},Fe=["onClick"],Te={class:"buttonzone"},De={__name:"write",setup(s){const l=D(),m=f(()=>l.state.User_ID),c=u(""),n=u([]);u(null);const d=u(""),r=u(""),h=u(""),y=u(null),I=u(null),H=()=>{n.value.push(c.value),c.value=""};function U(_){const t=_.target.files[0];if(I.value=y.value.files[0],t&&t.type.startsWith("image")){const o=new FileReader;o.onload=()=>{d.value=o.result},o.readAsDataURL(t)}else alert("이미지 파일을 선택해주세요.")}const K=()=>{console.log(I.value),M.post("/Feeds/Post_Save",{Title:r.value,comment:h.value,tag:n.value,image:I.value},{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}}).then(_=>{_.status==200&&l.commit("Switch_isWrite"),console.log(_)}).catch(_=>{console.log("오류발생"),console.log(_)})},A=_=>{n.value.splice(_,1)};return(_,t)=>(a(),i("div",pe,[e("div",me,[he,e("div",ve,[e("div",ge,[d.value?$("",!0):(a(),i("label",fe," 👉 CLICK 👈 ")),e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},ref_key:"Input_Img",ref:y,onChange:U},null,544),d.value?(a(),i("div",$e,[e("img",{src:d.value,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,ye)])):$("",!0)]),e("div",be,[e("div",ke,[we,e("span",xe,P(m.value),1)]),e("div",null,[e("span",null,[C(e("input",{class:"Title",type:"text","onUpdate:modelValue":t[0]||(t[0]=o=>r.value=o),placeholder:"이 곳에 제목을 입력하세요."},null,512),[[S,r.value]])])]),e("div",Ie,[C(e("textarea",{class:"Content",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":t[1]||(t[1]=o=>h.value=o)},null,512),[[S,h.value]]),e("span",Ce,[C(e("input",{class:"inputtag",type:"text","onUpdate:modelValue":t[2]||(t[2]=o=>c.value=o),onKeyup:R(H,["enter"]),placeholder:"이 곳에 Tag를 추가하세요."},null,544),[[S,c.value]])]),e("div",Se,[(a(!0),i(b,null,V(n.value,(o,N)=>(a(),i("span",{key:N,class:"tag"},[g(P(o)+" ",1),e("button",{class:"deleteTagButton",onClick:Be=>A(N)}," x ",8,Fe)]))),128))]),e("div",Te,[e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:U},null,32),e("button",{class:"complete",onClick:t[3]||(t[3]=o=>K())},"완료")])])])])]),e("div",{class:"blur",onClick:t[4]||(t[4]=o=>j(l).commit("Switch_isWrite"))})]))}},Ue=x(De,[["__scopeId","data-v-bdfb834e"]]),Ne=s=>(k("data-v-6e2b53f1"),s=s(),w(),s),Pe=Ne(()=>e("img",{src:q,alt:"",class:"airplane"},null,-1)),Me={class:"main-container"},Ve={class:"section"},We={__name:"Home",setup(s){const l=D(),m=f(()=>l.state.isNoti),c=f(()=>l.state.isMsg),n=f(()=>l.state.isWrite);return z(),(d,r)=>{const h=T("router-link"),y=T("router-view");return a(),i(b,null,[n.value?(a(),F(Ue,{key:0})):$("",!0),m.value?(a(),F(ue,{key:1})):$("",!0),c.value?(a(),F(O,{key:2})):$("",!0),p(ae),p(h,{to:"/DirectMessage",class:"write"},{default:v(()=>[Pe]),_:1}),e("div",Me,[e("div",Ve,[e("div",null,[p(y)])])])],64)}}},je=x(We,[["__scopeId","data-v-6e2b53f1"]]);export{je as default};