import{c as S,r as a,y as P,o as N,B as W,e as n,f as l,F as w,k as y,w as K,m as j,n as q,j as A,a as r,d as c,i as g,t as p,g as k,h as C,q as v,x as R,u as z,C as G,b as J}from"./index-HUFp0Dkx.js";/* empty css                                                               */import{_ as O}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{l as L,s as T}from"./like-Cq13m2ZL.js";import{s as Q,m as X}from"./saveed-DRyjRmH-.js";import{l as Y}from"./likeed-BS52KISc.js";const Z={class:"grid-container"},ee={class:"bodytop"},se={id:"result",class:"tagresult"},te=["onClick"],le={class:"tagbox"},ae=["src"],oe={class:"profile-container"},ie=["src"],ne=["src","onClick"],re=["src","onClick"],ce=["src","onClick"],ue={__name:"HomeFeed",setup(de){R();const f=z();S(()=>f.state.User_ID);const x=S(()=>f.state.isWrite);a(!1),a(!1),a(null);const I=a(!1),o=a(null);a(L),a(T);const u=a([{Post_ID:1}]),F=()=>{const e=h.value.trim();e&&(d.value.push(e),h.value="")},B=e=>{d.value.splice(e,1)},h=a(""),d=a([]);P(x,()=>{r.get("/Feeds/Posts_list",{withCredentials:!0}).then(e=>{u.value=e.data,o.value&&(o.value.addEventListener("scroll",D),G(()=>{I.value||(o.value.scrollTop=o.value.scrollHeight,I.value=!0)}))}).catch(e=>{console.log("오류발생"),console.log(e)})},{immediate:!0});const H=()=>{f.commit("Switch_isWrite")},b=async e=>{console.log(e);const{Post_ID:s}=e;f.commit("Switch_isPostDM",s),console.log("메세지버튼클릭")},U=e=>{e.isLike?r.post("/feeds/Like/remove",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isLike=!e.isLike}).catch(s=>{s.response.status==400}):r.post("/feeds/Like/add",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isLike=!e.isLike}).catch(s=>{s.response.status==400})},V=e=>{e.isSave?r.post("/feeds/Post_Store/delete",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isSave=!e.isSave}).catch(s=>{s.response.status}):r.post("/feeds/Post_Store/add",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isSave=!e.isSave}).catch(s=>{s.response.status})},_=a([]),$=()=>{const e=d.value;e.length>0?_.value=u.value.filter(s=>e.some(i=>s.Post_Title.includes(i)||s.Post_Caption.includes(i))):_.value=u.value},E=async()=>{try{const e=await r.get("/Feeds/Posts_list",{withCredentials:!0});u.value=e.data.map(s=>({...s,isSave:s.isSave??!1})),_.value=u.value}catch(e){console.error("오류 발생",e)}};P(d,$,{deep:!0}),E(),N(()=>{}),W(()=>{o.value&&o.value.removeEventListener("scroll",D)});function D(){const e=o.value.scrollTop,s=o.value.scrollHeight,i=o.value.clientHeight;console.log(e,i,s),e+i>=s&&(console.log("맨 아래 도달"),M())}function M(){console.log("Loading more messages...")}return(e,s)=>{const i=J("router-link");return c(),n("div",Z,[l("div",ee,[l("span",se,[(c(!0),n(w,null,y(d.value,(t,m)=>(c(),n("span",{key:m,class:"tag"},[g(p(t)+" ",1),l("button",{class:"deleteTagButton",onClick:_e=>B(m)},"x",8,te)]))),128))]),l("span",le,[K(l("input",{class:"SearchTag",type:"text","onUpdate:modelValue":s[0]||(s[0]=t=>h.value=t),onKeyup:q(F,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[j,h.value]]),l("button",{onClick:s[1]||(s[1]=t=>H()),class:"writebutton"}," 글쓰기 ")])]),_.value.length>0?(c(),n("div",{key:0,class:"feedSlider",ref_key:"FeedContainer",ref:o},[(c(!0),n(w,null,y(_.value,t=>(c(),n("div",{class:"grid-article",key:t.Post_ID},[k(i,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:C(()=>[l("img",{src:t.Image_Src,alt:"",class:"Eximage"},null,8,ae)]),_:2},1032,["to"]),l("ul",null,[l("li",oe,[l("img",{src:t.Profile_Img,alt:"",class:"profile"},null,8,ie),k(i,{to:{name:"PersonalPage",params:{User_ID:t.User_ID}},class:"userID"},{default:C(()=>[g(p(t.User_ID),1)]),_:2},1032,["to"]),l("img",{src:t.isLike?v(Y):v(L),alt:"",class:"like",onClick:m=>U(t)},null,8,ne),l("img",{src:t.isSave?v(Q):v(T),alt:"",class:"save",onClick:m=>V(t)},null,8,re),l("img",{src:v(X),alt:"",class:"message",onClick:m=>b(t)},null,8,ce)]),l("li",null,[k(i,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"title"},{default:C(()=>[g(p(t.Post_Title),1)]),_:2},1032,["to"])]),l("li",null,[k(i,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"discription"},{default:C(()=>[g(p(t.Post_Caption),1)]),_:2},1032,["to"])])])]))),128))],512)):A("",!0)])}}},ke=O(ue,[["__scopeId","data-v-96c3430d"]]);export{ke as default};
