import{u as h,c as d,b as f,d as o,e as a,g as l,h as g,f as s,y as k,F as E,l as B,t as p,j as m,a as I,p as S,k as w,E as M,r as y}from"./index-4ydSH2Vs.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{h as b}from"./moment-C5S46NFB.js";const $="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO3Uvy8DYRgH8FYQScNi6GyxSycjE6tNbHYx2Y1Ws1EsFysWZon4BxjMBgMhERE+cmmlb/rjetf2StL7Ju9w7/N8f9y97z2lUoEBgOl4/ZV5Bee4wtyozedxrYlbVEdlvoA77XjAYt7mNTwGpjeN9Yu4VsvLfBUvgdklZht34SzYf8P6sM238BGYHGMqqE/iKKh/YntY5rv4CsQPMdGhr4z9oO87fh7EuIyDFsG9FLydNIHTDJiTQCT+/JsZ+Bt4D/inmElLruAiIL9iLdMb1HVW8Bzo9B5YqDaGSoilrOaB3lKLVveBpT5g7lsI+jUPdHsPLO0DJs8AMZ6wnESKcggQZSFF3QI0al3XKAIkYqwCRP32FwF6QnEEmpeqw7+eeAnT9Gc6ggRE/fb//wAFxgo/h4yOhiXueGoAAAAASUVORK5CYII=",Y=e=>(S("data-v-51d144f0"),e=e(),w(),e),C={class:"sidebar p30 m0 r10 dropshadow"},N=Y(()=>s("h1",{class:"m10"},"TripTracks",-1)),T={class:"menu"},x={class:"as-menuli"},F=["src"],L=Y(()=>s("div",{class:"submenu"},"Home",-1)),U=["onClick"],V={key:0,class:"submenu"},G={__name:"AppMenu",setup(e){const n=h();d(()=>n.state.User_ID);const t=d(()=>n.state.SideMenu),c=r=>{n.commit("toggleSubMenu",r)},_=()=>{I.get("/users/logout",{withCredentials:!0}).then(r=>{n.dispatch("checkSession")})};return(r,u)=>{const v=f("router-link");return o(),a("div",C,[l(v,{to:{name:"HomeFeed"},class:"logo"},{default:g(()=>[N]),_:1}),s("ul",T,[l(v,{to:{name:"AmbassadorHome"},class:"router-link"},{default:g(()=>[s("li",x,[s("img",{src:k($),alt:"",class:"colored-svg"},null,8,F),L])]),_:1}),(o(!0),a(E,null,B(t.value,i=>(o(),a("li",{key:i.name},[s("div",{class:"menu-item",onClick:ss=>c(i.name)},[s("div",null,p(i.name),1)],8,U),i.subMenu&&i.isSubMenu?(o(),a("ul",V)):m("",!0)]))),128))]),s("li",{class:"logout",onClick:u[0]||(u[0]=i=>_())},"로그아웃")])}}},D=A(G,[["__scopeId","data-v-51d144f0"]]),H=e=>(S("data-v-242c8ee1"),e=e(),w(),e),O={class:"nav-panner container-unit p30 dropshadow-none-hover"},R=["src"],j={class:""},K=H(()=>s("p",{class:"tcdark"},"TripTracks 공식 앰버서더님 환영합니다",-1)),Q={key:0,class:"tcdark"},z={class:"rightTop"},P={__name:"TopNav",setup(e){const n=M();h();const t=y(null);return d(()=>n.path),I.get("/ambassador/Setup_TopNav",{withCredentials:!0}).then(c=>{const{success:_,User_Info:r,msg:u}=c.data;if(!_)return alert(u);console.log(r),t.value=r}),(c,_)=>(o(),a("div",O,[t.value?(o(),a("img",{key:0,alt:"",src:t.value.Profile_Img},null,8,R)):m("",!0),s("div",j,[K,t.value?(o(),a("h1",Q,p(`@${t.value.User_ID} ${t.value.User_Name}`),1)):m("",!0)]),s("div",z,p(k(b)().format("YYYY년 MM월"))+" 기준 인사이트",1)]))}},Z=A(P,[["__scopeId","data-v-242c8ee1"]]),q={class:"contain"},X={class:"main-container"},J={class:"router-container"},W={__name:"AppLayout",setup(e){return h(),(n,t)=>{const c=f("router-view");return o(),a("div",q,[l(D),s("div",X,[l(Z),s("div",J,[l(c)])])])}}},as=A(W,[["__scopeId","data-v-3d0f23f2"]]);export{as as default};