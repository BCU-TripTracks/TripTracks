import{c as I,r as l,A as D,e as i,f as t,F as w,l as C,w as F,m as K,n as V,j,a as _,d as r,i as A,t as m,g as v,h as f,y as P,z,u as J,b as Q}from"./index-CwVPh1qW.js";/* empty css                                                               */import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{l as U,s as L}from"./like-Cq13m2ZL.js";import{l as H}from"./likeed-BS52KISc.js";const N="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAErSURBVEhL7ZahqoRQEIbHbaKIYLOJWAwWi8Vk2rTJKGLylcTqQxgERVSsJpsPsM+wqPecw2Evy66rXq7NDwbm/Gfm/+swMyJJEhiGAf4TVVXB8zyAvu9n9D6ksPflfr+j/hiw94X2h3EGrHIGrHIGrHIGrLIrQFEUUnvYHKBpGtR1TQr3W9kUoOs6tG0LsiyTwj3WtrAaYJomNE0DkiRRBUiPNcMwqLLM1wDLsqAsSxBFkSq/YK2qKjLzjcUAx3Egz3PgOI4q7wiCQGZs26bKOx8DrtcrpGkKLMtSZRk8k2UZ2flIURQvl4DruvPj8cDXzC7wzu12e/Ei3l3XPYUgCOZpmujKfsZxnH3ff/rhs4UcXnEcAzKGMAyBYRj093eQHURRBDzPo8PLgx/xnvjiJX+1UgAAAABJRU5ErkJggg==",X={class:"grid-container"},Y={class:"bodytop"},M={id:"result",class:"tagresult"},W=["onClick"],Z={class:"tagbox"},O=["src"],$={class:"profile-container"},ee=["src"],se=["src","onClick"],te=["src"],ae={__name:"HomeFeed",setup(le){z();const g=J();I(()=>g.state.User_ID);const B=I(()=>g.state.isWrite);l(!1);const h=l(!1),x=l(null);l(!1),l(U);const p=l(L),u=l([{Post_ID:1}]),y=()=>{const e=d.value.trim();e&&(n.value.push(e),d.value="")},E=e=>{n.value.splice(e,1)},d=l(""),n=l([]);D(B,()=>{_.get("/Feeds/Posts_list",{withCredentials:!0}).then(e=>{console.log(e),u.value=e.data}).catch(e=>{console.log("오류발생"),console.log(e)})},{immediate:!0});const R=()=>{g.commit("Switch_isWrite")},S=e=>{e.isLike?_.post("/feeds/Like/remove",{postId:e.Post_ID},{withCredentials:!0}).then(a=>{e.isLike=!e.isLike}).catch(a=>{a.response.status==400}):_.post("/feeds/Like/add",{postId:e.Post_ID},{withCredentials:!0}).then(a=>{e.isLike=!e.isLike}).catch(a=>{a.response.status==400})},b=()=>{h.value=!h.value,p.value=h.value?N:L},c=l([]),T=()=>{const e=n.value;e.length>0?c.value=u.value.filter(a=>e.some(o=>a.Post_Title.includes(o)||a.Post_Caption.includes(o))):c.value=u.value},G=async()=>{try{const e=await _.get("/Feeds/Posts_list",{withCredentials:!0});u.value=e.data,c.value=e.data}catch(e){console.error("오류 발생",e)}};return D(n,T,{deep:!0}),G(),(e,a)=>{const o=Q("router-link");return r(),i("div",X,[t("div",Y,[t("span",M,[(r(!0),i(w,null,C(n.value,(s,k)=>(r(),i("span",{key:k,class:"tag"},[A(m(s)+" ",1),t("button",{class:"deleteTagButton",onClick:oe=>E(k)},"x",8,W)]))),128))]),t("span",Z,[F(t("input",{class:"SearchTag",type:"text","onUpdate:modelValue":a[0]||(a[0]=s=>d.value=s),onKeyup:V(y,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[K,d.value]]),t("button",{onClick:a[1]||(a[1]=s=>R()),class:"writebutton"}," 글쓰기 ")])]),c.value.length>0?(r(),i("div",{key:0,class:"feedSlider",ref_key:"feedSliderContainer",ref:x},[(r(!0),i(w,null,C(c.value,s=>(r(),i("div",{class:"grid-article",key:s.Post_ID},[v(o,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}}},{default:f(()=>[t("img",{src:s.Image_Src,alt:"",class:"Eximage"},null,8,O)]),_:2},1032,["to"]),t("ul",null,[t("li",$,[t("img",{src:s.Profile_Img,alt:"",class:"profile"},null,8,ee),v(o,{to:{name:"PersonalPage",params:{User_ID:s.User_ID}},class:"userID"},{default:f(()=>[A(m(s.User_ID),1)]),_:2},1032,["to"]),t("img",{src:s.isLike?P(H):P(U),alt:"",class:"like",onClick:k=>S(s)},null,8,se),t("img",{src:p.value,alt:"",class:"save",onClick:b},null,8,te)]),t("li",null,[v(o,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}},class:"title"},{default:f(()=>[A(m(s.Post_Title),1)]),_:2},1032,["to"])]),t("li",null,[v(o,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}},class:"discription"},{default:f(()=>[A(m(s.Post_Caption),1)]),_:2},1032,["to"])])])]))),128))],512)):j("",!0)])}}},de=q(ae,[["__scopeId","data-v-0fb15b26"]]);export{de as default};
