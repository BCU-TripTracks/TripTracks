import{c as P,r as a,A as L,o as V,C as j,e as i,f as l,F as U,l as B,w as z,m as J,n as Q,j as q,a as g,d as r,i as A,t as f,g as h,h as k,y as I,z as N,u as X,D as Y,b as W}from"./index-CHL-2fQ3.js";/* empty css                                                               */import{_ as Z}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{l as E,s as x}from"./like-Cq13m2ZL.js";import{l as O}from"./likeed-BS52KISc.js";const $="/assets/messageIcon-MKfStX56.png",ee="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAErSURBVEhL7ZahqoRQEIbHbaKIYLOJWAwWi8Vk2rTJKGLylcTqQxgERVSsJpsPsM+wqPecw2Evy66rXq7NDwbm/Gfm/+swMyJJEhiGAf4TVVXB8zyAvu9n9D6ksPflfr+j/hiw94X2h3EGrHIGrHIGrHIGrLIrQFEUUnvYHKBpGtR1TQr3W9kUoOs6tG0LsiyTwj3WtrAaYJomNE0DkiRRBUiPNcMwqLLM1wDLsqAsSxBFkSq/YK2qKjLzjcUAx3Egz3PgOI4q7wiCQGZs26bKOx8DrtcrpGkKLMtSZRk8k2UZ2flIURQvl4DruvPj8cDXzC7wzu12e/Ei3l3XPYUgCOZpmujKfsZxnH3ff/rhs4UcXnEcAzKGMAyBYRj093eQHURRBDzPo8PLgx/xnvjiJX+1UgAAAABJRU5ErkJggg==",se={class:"grid-container"},te={class:"bodytop"},le={id:"result",class:"tagresult"},oe=["onClick"],ae={class:"tagbox"},ne=["src"],ie={class:"profile-container"},re=["src"],ce=["src","onClick"],ue=["src"],de=["src","onClick"],_e={__name:"HomeFeed",setup(me){N();const d=X();P(()=>d.state.User_ID);const y=P(()=>d.state.isWrite);a(!1);const p=a(!1);a(null);const C=a(!1),o=a(null);a(E);const D=a(x),_=a([{Post_ID:1}]),T=()=>{const e=m.value.trim();e&&(c.value.push(e),m.value="")},R=e=>{c.value.splice(e,1)},m=a(""),c=a([]);L(y,()=>{g.get("/Feeds/Posts_list",{withCredentials:!0}).then(e=>{console.log(e),_.value=e.data,console.log(o.value),o.value&&(o.value.addEventListener("scroll",w),Y(()=>{C.value||(o.value.scrollTop=o.value.scrollHeight,C.value=!0)}))}).catch(e=>{console.log("오류발생"),console.log(e)})},{immediate:!0});const S=()=>{d.commit("Switch_isWrite")},F=async e=>{console.log(e);const{Post_ID:s}=e;d.commit("Switch_isPostDM",s),console.log("메세지버튼클릭")},H=e=>{e.isLike?g.post("/feeds/Like/remove",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isLike=!e.isLike}).catch(s=>{s.response.status==400}):g.post("/feeds/Like/add",{postId:e.Post_ID},{withCredentials:!0}).then(s=>{e.isLike=!e.isLike}).catch(s=>{s.response.status==400})},G=()=>{p.value=!p.value,D.value=p.value?ee:x},u=a([]),K=()=>{const e=c.value;e.length>0?u.value=_.value.filter(s=>e.some(n=>s.Post_Title.includes(n)||s.Post_Caption.includes(n))):u.value=_.value},b=async()=>{try{const e=await g.get("/Feeds/Posts_list",{withCredentials:!0});_.value=e.data,u.value=e.data}catch(e){console.error("오류 발생",e)}};L(c,K,{deep:!0}),b(),V(()=>{}),j(()=>{o.value&&o.value.removeEventListener("scroll",w)});function w(){const e=o.value.scrollTop,s=o.value.scrollHeight,n=o.value.clientHeight;console.log(e,n,s),e+n>=s&&(console.log("맨 아래 도달"),M())}function M(){console.log("Loading more messages...")}return(e,s)=>{const n=W("router-link");return r(),i("div",se,[l("div",te,[l("span",le,[(r(!0),i(U,null,B(c.value,(t,v)=>(r(),i("span",{key:v,class:"tag"},[A(f(t)+" ",1),l("button",{class:"deleteTagButton",onClick:ve=>R(v)},"x",8,oe)]))),128))]),l("span",ae,[z(l("input",{class:"SearchTag",type:"text","onUpdate:modelValue":s[0]||(s[0]=t=>m.value=t),onKeyup:Q(T,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[J,m.value]]),l("button",{onClick:s[1]||(s[1]=t=>S()),class:"writebutton"},"글쓰기")])]),u.value.length>0?(r(),i("div",{key:0,class:"feedSlider",ref_key:"FeedContainer",ref:o},[(r(!0),i(U,null,B(u.value,t=>(r(),i("div",{class:"grid-article",key:t.Post_ID},[h(n,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:k(()=>[l("img",{src:t.Image_Src,alt:"",class:"Eximage"},null,8,ne)]),_:2},1032,["to"]),l("ul",null,[l("li",ie,[l("img",{src:t.Profile_Img,alt:"",class:"profile"},null,8,re),h(n,{to:{name:"PersonalPage",params:{User_ID:t.User_ID}},class:"userID"},{default:k(()=>[A(f(t.User_ID),1)]),_:2},1032,["to"]),l("img",{src:t.isLike?I(O):I(E),alt:"",class:"like",onClick:v=>H(t)},null,8,ce),l("img",{src:D.value,alt:"",class:"save",onClick:G},null,8,ue),l("img",{src:I($),alt:"",class:"message",onClick:v=>F(t)},null,8,de)]),l("li",null,[h(n,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"title"},{default:k(()=>[A(f(t.Post_Title),1)]),_:2},1032,["to"])]),l("li",null,[h(n,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"discription"},{default:k(()=>[A(f(t.Post_Caption),1)]),_:2},1032,["to"])])])]))),128))],512)):q("",!0)])}}},pe=Z(_e,[["__scopeId","data-v-d37e5334"]]);export{pe as default};
