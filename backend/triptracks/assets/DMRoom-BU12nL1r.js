import{A as y,i,B as C,y as Y,D as H,z as f,E as k,o as r,a as m,b as l,t as v,F as x,h as U,j as h,k as w,v as N,l as L,f as d,C as S,p as B,g as E}from"./index-X2t60WR-.js";import{h as _}from"./moment-Cl4UOzQZ.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";const $=u=>(B("data-v-fa7e1754"),u=u(),E(),u),b={key:0,class:"RoomContainer"},z={class:"RoomHeader"},F=$(()=>l("div",{class:"RoomProfile"},null,-1)),K={class:"RoomName"},j={class:"message"},A={class:"time"},P={class:"RoomInput"},q={class:"inputBox"},G={__name:"DMRoom",setup(u){const D=y(),o=i(null),g=i(!1),c=i(!1),s=i({Room_ID:null,User_Name:null,Messages:[]});C(()=>D.params.Room_ID,a=>{a?(c.value=!0,d.get(`/Direct/print_DM/${a}`).then(e=>{const{ResultRoomChat:t}=e.data;s.value=t,console.log(s.value)}).catch(e=>{const{message:t}=e.response.data;console.log(e.response.status),console.log(t)}).finally(()=>{if(s.value.Messages.length>0)for(const e of s.value.Messages)e.Time=_(e.Time).format("YYYY:MM:DD HH:mm:ss");o.value.scrollTop=o.value.scrollHeight})):c.value=!1},{immediate:!0});function p(){o.value.scrollTop===0&&R()}function R(){console.log("Loading more messages..."),d.post("/Direct/print_DM_Next",{Room_ID:s.value.Room_ID,Last_Chat:s.value.Messages[0].Message_ID}).then(a=>{console.log(a.data);const{ResultMessages:e}=a.data;console.log(e),s.value.Messages.unshift(...e)}).catch(a=>{console.log(a)})}Y(()=>{o.value&&(o.value.addEventListener("scroll",p),H(()=>{g.value||(o.value.scrollTop=o.value.scrollHeight,g.value=!0)})),f.on("receive_message",async a=>{const{Room_ID:e,User_ID:t,Message:I,Time:T}=a;e===s.value.Room_ID&&(await s.value.Messages.push({Type:"Y",Message:I,Time:T}),o.value.scrollTop=await o.value.scrollHeight)})}),k(()=>{o.value&&o.value.removeEventListener("scroll",p)});const n=i(""),M=()=>{console.log("Sending message..."),d.post("/Direct/send_Message",{Room_ID:s.value.Room_ID,Message:n.value}).then(async a=>{a.data.success&&(await s.value.Messages.push({Type:"M",Message:n.value,Time:_().format("YYYY:MM:DD HH:mm:ss")}),f.emit("send_message",{Room_ID:s.value.Room_ID,User_ID:s.value.User_ID,Message:n.value,Time:_().format("YYYY:MM:DD HH:mm:ss")}),n.value="",o.value.scrollTop=await o.value.scrollHeight)}).catch(a=>{console.log(a)})};return(a,e)=>c.value?(r(),m("div",b,[l("div",z,[F,l("div",K,v(s.value.User_Name?s.value.User_Name:"?"),1)]),l("div",{class:"RoomChat",ref_key:"RoomChatContainer",ref:o},[s.value.Messages?(r(!0),m(x,{key:0},U(s.value.Messages,t=>(r(),m("li",{class:S(t.Type==="M"?"m":"y")},[l("div",j,v(t.Message),1),l("div",A,v(t.Time),1)],2))),256)):h("",!0)],512),l("div",P,[l("div",q,[w(l("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>n.value=t),onKeyup:e[1]||(e[1]=L(t=>M(),["enter"]))},null,544),[[N,n.value]]),l("button",{onClick:e[2]||(e[2]=t=>M())},"send")])])])):h("",!0)}},W=V(G,[["__scopeId","data-v-fa7e1754"]]);export{W as default};
