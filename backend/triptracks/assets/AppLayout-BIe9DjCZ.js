import{u as A,c as d,b as k,d as t,e as o,g as u,h as f,f as s,q as Y,F as w,k as B,t as m,j as p,s as E,a as I,A as M,r as b}from"./index-DPOt7a1X.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{h as S}from"./moment-C5S46NFB.js";const y="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO3Uvy8DYRgH8FYQScNi6GyxSycjE6tNbHYx2Y1Ws1EsFysWZon4BxjMBgMhERE+cmmlb/rjetf2StL7Ju9w7/N8f9y97z2lUoEBgOl4/ZV5Bee4wtyozedxrYlbVEdlvoA77XjAYt7mNTwGpjeN9Yu4VsvLfBUvgdklZht34SzYf8P6sM238BGYHGMqqE/iKKh/YntY5rv4CsQPMdGhr4z9oO87fh7EuIyDFsG9FLydNIHTDJiTQCT+/JsZ+Bt4D/inmElLruAiIL9iLdMb1HVW8Bzo9B5YqDaGSoilrOaB3lKLVveBpT5g7lsI+jUPdHsPLO0DJs8AMZ6wnESKcggQZSFF3QI0al3XKAIkYqwCRP32FwF6QnEEmpeqw7+eeAnT9Gc6ggRE/fb//wAFxgo/h4yOhiXueGoAAAAASUVORK5CYII=",C={class:"sidebar p30 m0 r10 dropshadow"},N={class:"menu"},T={class:"as-menuli"},U=["src"],$=["onClick"],x={key:0,class:"submenu"},F={__name:"AppMenu",setup(g){const n=A(),e=d(()=>n.state.User_ID),a=d(()=>n.state.SideMenu),r=i=>{n.commit("toggleSubMenu",i)},_=()=>{e.value?(E.emit("logout",e.value),console.log("로그아웃 성공")):console.error("User_ID is not defined."),I.get("/users/logout",{withCredentials:!0}).then(i=>{n.dispatch("checkSession")})};return(i,c)=>{const h=k("router-link");return t(),o("div",C,[u(h,{to:{name:"HomeFeed"},class:"logo"},{default:f(()=>c[1]||(c[1]=[s("h1",{class:"m10"},"TripTracks",-1)])),_:1}),s("ul",N,[u(h,{to:{name:"AmbassadorHome"},class:"router-link"},{default:f(()=>[s("li",T,[s("img",{src:Y(y),alt:"",class:"colored-svg"},null,8,U),c[2]||(c[2]=s("div",{class:"submenu"},"Home",-1))])]),_:1}),(t(!0),o(w,null,B(a.value,l=>(t(),o("li",{key:l.name},[s("div",{class:"menu-item",onClick:P=>r(l.name)},[s("div",null,m(l.name),1)],8,$),l.subMenu&&l.isSubMenu?(t(),o("ul",x)):p("",!0)]))),128))]),s("li",{class:"logout",onClick:c[0]||(c[0]=l=>_())},"로그아웃")])}}},L=v(F,[["__scopeId","data-v-228a2eb6"]]),D={class:"nav-panner container-unit p30 dropshadow-none-hover"},V=["src"],G={class:""},H={key:0,class:"tcdark"},O={class:"rightTop"},R={__name:"TopNav",setup(g){const n=M();A();const e=b(null);return d(()=>n.path),I.get("/ambassador/Setup_TopNav",{withCredentials:!0}).then(a=>{const{success:r,User_Info:_,msg:i}=a.data;if(!r)return alert(i);console.log(_),e.value=_}),(a,r)=>(t(),o("div",D,[e.value?(t(),o("img",{key:0,alt:"",src:e.value.Profile_Img},null,8,V)):p("",!0),s("div",G,[r[0]||(r[0]=s("p",{class:"tcdark"},"TripTracks 공식 앰버서더님 환영합니다",-1)),e.value?(t(),o("h1",H,m(`@${e.value.User_ID} ${e.value.User_Name}`),1)):p("",!0)]),s("div",O,m(Y(S)().format("YYYY년 MM월"))+" 기준 인사이트",1)]))}},j=v(R,[["__scopeId","data-v-242c8ee1"]]),K={class:"contain"},Q={class:"main-container"},q={class:"router-container"},z={__name:"AppLayout",setup(g){return A(),(n,e)=>{const a=k("router-view");return t(),o("div",K,[u(L),s("div",Q,[u(j),s("div",q,[u(a)])])])}}},W=v(z,[["__scopeId","data-v-3d0f23f2"]]);export{W as default};
