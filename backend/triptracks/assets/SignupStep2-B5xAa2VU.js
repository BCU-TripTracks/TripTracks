import{h as g,n as _,m as c,o as a,a as n,b as l,F as p,g as d,l as m,x as f,t as v}from"./index-CCTn3Awz.js";import{_ as h}from"./_plugin-vue_export-helper-DlAUqK2U.js";const k={class:"Infobox"},S={class:"tagsZone"},T=["onClick"],x={__name:"SignupStep2",setup(I){var o=g([]);const r=_(),i=localStorage.getItem("user_ID");c.get("/users/top_tags").then(e=>{const t=e.data.TopTags;o.value=t.map(s=>({tag:s,isAct:!1})),e.data.TopTags,console.log(o.value)}).catch(e=>{console.log(e)});const u=()=>{const e=o.value.filter(t=>t.isAct).map(t=>t.tag);c.post("/users/TagSetup",{user_ID:i,Tags:e}).then(t=>{console.log(t),t.data.Result?r.push({name:"Login"}):alert("회원가입 성공")}).catch(t=>{console.log(t)})};return(e,t)=>(a(),n("div",k,[l("div",S,[(a(!0),n(p,null,d(m(o),s=>(a(),n("div",{class:"tag",style:f({backgroundColor:s.isAct?"green":"gray"}),onClick:A=>s.isAct=!s.isAct},v(s.tag),13,T))),256))]),l("button",{onClick:t[0]||(t[0]=s=>u())},"Next Level")]))}},y=h(x,[["__scopeId","data-v-9d6a2ede"]]);export{y as default};