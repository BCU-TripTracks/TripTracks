import{z as v,h as a,A as T,y as f,C as h,D as y,o as c,a as m,b as e,t as r,F as R,g as C,i as I,B as x,p as D,f as N}from"./index-CCvsZMyi.js";import{_ as Y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const M=o=>(D("data-v-091128be"),o=o(),N(),o),k={key:0,class:"RoomContainer"},B={class:"RoomHeader"},L=M(()=>e("div",{class:"RoomProfile"},null,-1)),S={class:"RoomName"},b={class:"message"},E={class:"time"},U=M(()=>e("div",{class:"RoomInput"},[e("div",{class:"inputBox"},[e("input",{type:"text"}),e("button",null,"send")])],-1)),w={__name:"DMRoom",setup(o){const _=v(),s=a(null),u=a(!1),t=a(!1),l=a(null),d=a({Room_ID:l,User_Name:"User_Name",Messages:[{Type:"Y",Message:"Message",Time:"11:11:11"},{Type:"M",Message:"Message",Time:"11:11:11"},{Type:"Y",Message:"Message",Time:"11:11:11"},{Type:"M",Message:"Message",Time:"11:11:11"},{Type:"Y",Message:"Message",Time:"11:11:11"},{Type:"M",Message:"Message",Time:"11:11:11"},{Type:"Y",Message:"Message",Time:"11:11:11"},{Type:"M",Message:"Message",Time:"11:11:11"},{Type:"Y",Message:"Message",Time:"11:11:11"},{Type:"M",Message:"Message",Time:"11:11:11"}]});T(()=>_.params.Room_ID,i=>{i?(t.value=!0,l.value=i):t.value=!1},{immediate:!0});function p(){s.value.scrollTop===0&&g()}function g(){console.log("Loading more messages..."),d.value.Messages.unshift({Type:"Y",Message:"New Message",Time:"11:11:11"})}return f(()=>{s.value&&(s.value.addEventListener("scroll",p),h(()=>{u.value||(s.value.scrollTop=s.value.scrollHeight,u.value=!0)}))}),y(()=>{s.value&&s.value.removeEventListener("scroll",p)}),(i,z)=>t.value?(c(),m("div",k,[e("div",B,[L,e("div",S,"Room "+r(l.value),1)]),e("div",{class:"RoomChat",ref_key:"RoomChatContainer",ref:s},[(c(!0),m(R,null,C(d.value.Messages,n=>(c(),m("li",{class:x(n.Type==="M"?"m":"y")},[e("div",b,r(n.Message),1),e("div",E,r(n.Time),1)],2))),256))],512),U])):I("",!0)}},V=Y(w,[["__scopeId","data-v-091128be"]]);export{V as default};
