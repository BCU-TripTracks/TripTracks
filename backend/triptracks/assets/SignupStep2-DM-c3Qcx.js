import{r as g,a as c,e as o,f as l,F as _,l as p,y as d,d as n,E as m,t as f,z as v}from"./index-rxMOsmd7.js";import{_ as h}from"./_plugin-vue_export-helper-DlAUqK2U.js";const k={class:"Infobox"},S={class:"tagsZone"},T=["onClick"],I={__name:"SignupStep2",setup(x){var a=g([]);const r=v(),i=localStorage.getItem("user_ID");c.get("/users/top_tags").then(s=>{const t=s.data.TopTags;a.value=t.map(e=>({tag:e,isAct:!1})),s.data.TopTags,console.log(a.value)}).catch(s=>{console.log(s)});const u=()=>{const s=a.value.filter(t=>t.isAct).map(t=>t.tag);c.post("/users/TagSetup",{user_ID:i,Tags:s}).then(t=>{console.log(t),t.data.Result?r.push({name:"Login"}):alert("회원가입 성공")}).catch(t=>{console.log(t)})};return(s,t)=>(n(),o("div",k,[l("div",S,[(n(!0),o(_,null,p(d(a),e=>(n(),o("div",{class:"tag",style:m({backgroundColor:e.isAct?"green":"gray"}),onClick:y=>e.isAct=!e.isAct},f(e.tag),13,T))),256))]),l("button",{onClick:t[0]||(t[0]=e=>u())},"Next Level")]))}},B=h(I,[["__scopeId","data-v-9d6a2ede"]]);export{B as default};