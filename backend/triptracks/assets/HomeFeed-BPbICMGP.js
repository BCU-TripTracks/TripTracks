import{c as D,r as a,y as w,o as K,A as M,e as n,f as l,F as P,k as S,w as V,m as j,n as q,j as J,a as r,d as c,i as A,t as h,g as p,h as k,q as m,x as Q,u as z,B as N,b as X}from"./index-C5pUCDzQ.js";/* empty css                                                               */import{_ as Y}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{l as L,s as U}from"./like-Cq13m2ZL.js";import{l as W}from"./likeed-BS52KISc.js";const Z="/assets/messageIcon-MKfStX56.png",O="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAErSURBVEhL7ZahqoRQEIbHbaKIYLOJWAwWi8Vk2rTJKGLylcTqQxgERVSsJpsPsM+wqPecw2Evy66rXq7NDwbm/Gfm/+swMyJJEhiGAf4TVVXB8zyAvu9n9D6ksPflfr+j/hiw94X2h3EGrHIGrHIGrHIGrLIrQFEUUnvYHKBpGtR1TQr3W9kUoOs6tG0LsiyTwj3WtrAaYJomNE0DkiRRBUiPNcMwqLLM1wDLsqAsSxBFkSq/YK2qKjLzjcUAx3Egz3PgOI4q7wiCQGZs26bKOx8DrtcrpGkKLMtSZRk8k2UZ2flIURQvl4DruvPj8cDXzC7wzu12e/Ei3l3XPYUgCOZpmujKfsZxnH3ff/rhs4UcXnEcAzKGMAyBYRj093eQHURRBDzPo8PLgx/xnvjiJX+1UgAAAABJRU5ErkJggg==",$={class:"grid-container"},ee={class:"bodytop"},se={id:"result",class:"tagresult"},te=["onClick"],le={class:"tagbox"},oe=["src"],ae={class:"profile-container"},ie=["src"],ne=["src","onClick"],re=["src","onClick"],ce=["src","onClick"],ue={__name:"HomeFeed",setup(de){Q();const g=z();D(()=>g.state.User_ID);const B=D(()=>g.state.isWrite);a(!1),a(!1),a(null);const I=a(!1),o=a(null);a(L),a(U);const u=a([{Post_ID:1}]),x=()=>{const e=f.value.trim();e&&(d.value.push(e),f.value="")},E=e=>{d.value.splice(e,1)},f=a(""),d=a([]);w(B,()=>{r.get("/Feeds/Posts_list",{withCredentials:!0}).then(e=>{console.log(e),u.value=e.data,console.log(o.value),o.value&&(o.value.addEventListener("scroll",C),N(()=>{I.value||(o.value.scrollTop=o.value.scrollHeight,I.value=!0)}))}).catch(e=>{console.log("오류발생"),console.log(e)})},{immediate:!0});const y=()=>{g.commit("Switch_isWrite")},T=async e=>{console.log(e);const{Post_ID:s}=e;g.commit("Switch_isPostDM",s),console.log("메세지버튼클릭")},R=e=>{e.isLike?r.post("/feeds/Like/remove",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isLike=!e.isLike}).catch(s=>{s.response.status==400}):r.post("/feeds/Like/add",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isLike=!e.isLike}).catch(s=>{s.response.status==400})},F=e=>{e.isSave?r.post("/feeds/Post_Store/delete",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isSave=!e.isSave}).catch(s=>{s.response.status}):r.post("/feeds/Post_Store/add",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isSave=!e.isSave}).catch(s=>{s.response.status})},_=a([]),H=()=>{const e=d.value;e.length>0?_.value=u.value.filter(s=>e.some(i=>s.Post_Title.includes(i)||s.Post_Caption.includes(i))):_.value=u.value},b=async()=>{try{const e=await r.get("/Feeds/Posts_list",{withCredentials:!0});u.value=e.data.map(s=>({...s,isSave:s.isSave??!1})),_.value=u.value}catch(e){console.error("오류 발생",e)}};w(d,H,{deep:!0}),b(),K(()=>{}),M(()=>{o.value&&o.value.removeEventListener("scroll",C)});function C(){const e=o.value.scrollTop,s=o.value.scrollHeight,i=o.value.clientHeight;console.log(e,i,s),e+i>=s&&(console.log("맨 아래 도달"),G())}function G(){console.log("Loading more messages...")}return(e,s)=>{const i=X("router-link");return c(),n("div",$,[l("div",ee,[l("span",se,[(c(!0),n(P,null,S(d.value,(t,v)=>(c(),n("span",{key:v,class:"tag"},[A(h(t)+" ",1),l("button",{class:"deleteTagButton",onClick:_e=>E(v)},"x",8,te)]))),128))]),l("span",le,[V(l("input",{class:"SearchTag",type:"text","onUpdate:modelValue":s[0]||(s[0]=t=>f.value=t),onKeyup:q(x,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[j,f.value]]),l("button",{onClick:s[1]||(s[1]=t=>y()),class:"writebutton"}," 글쓰기 ")])]),_.value.length>0?(c(),n("div",{key:0,class:"feedSlider",ref_key:"FeedContainer",ref:o},[(c(!0),n(P,null,S(_.value,t=>(c(),n("div",{class:"grid-article",key:t.Post_ID},[p(i,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:k(()=>[l("img",{src:t.Image_Src,alt:"",class:"Eximage"},null,8,oe)]),_:2},1032,["to"]),l("ul",null,[l("li",ae,[l("img",{src:t.Profile_Img,alt:"",class:"profile"},null,8,ie),p(i,{to:{name:"PersonalPage",params:{User_ID:t.User_ID}},class:"userID"},{default:k(()=>[A(h(t.User_ID),1)]),_:2},1032,["to"]),l("img",{src:t.isLike?m(W):m(L),alt:"",class:"like",onClick:v=>R(t)},null,8,ne),l("img",{src:t.isSave?m(O):m(U),alt:"",class:"save",onClick:v=>F(t)},null,8,re),l("img",{src:m(Z),alt:"",class:"message",onClick:v=>T(t)},null,8,ce)]),l("li",null,[p(i,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"title"},{default:k(()=>[A(h(t.Post_Title),1)]),_:2},1032,["to"])]),l("li",null,[p(i,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"discription"},{default:k(()=>[A(h(t.Post_Caption),1)]),_:2},1032,["to"])])])]))),128))],512)):J("",!0)])}}},he=Y(ue,[["__scopeId","data-v-02176b86"]]);export{he as default};
