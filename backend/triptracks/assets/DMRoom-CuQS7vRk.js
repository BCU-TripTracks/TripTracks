import{r as i,A as T,o as y,G as Y,s as h,L as w,e as c,f as l,t as m,F as H,l as k,j as f,w as x,m as U,n as L,a as v,d,K as N,p as S,k as B,C as E}from"./index-CP0vrUw_.js";import{h as _}from"./moment-C5S46NFB.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V=u=>(S("data-v-169d250f"),u=u(),B(),u),$={key:0,class:"RoomContainer"},F={class:"RoomHeader"},b=V(()=>l("div",{class:"RoomProfile"},null,-1)),j={class:"RoomName"},z={class:"message"},A={class:"time"},G={class:"RoomInput"},P={class:"inputBox"},q={__name:"DMRoom",setup(u){const D=E(),o=i(null),g=i(!1),r=i(!1),s=i({Room_ID:null,User_Name:null,Messages:[]});T(()=>D.params.Room_ID,a=>{a?(r.value=!0,v.get(`/Direct/print_DM/${a}`,{withCredentials:!0}).then(e=>{const{ResultRoomChat:t}=e.data;s.value=t,console.log(s.value)}).catch(e=>{const{message:t}=e.response.data;console.log(e.response.status),console.log(t)}).finally(()=>{if(s.value.Messages.length>0)for(const e of s.value.Messages)e.Time=_(e.Time).format("YYYY:MM:DD HH:mm:ss");o.value.scrollTop=o.value.scrollHeight})):r.value=!1},{immediate:!0});function p(){console.log(o.value.scrollTop),o.value.scrollTop===0&&R()}function R(){console.log("Loading more messages..."),v.post("/Direct/print_DM_Next",{Room_ID:s.value.Room_ID,Last_Chat:s.value.Messages[0].Message_ID},{withCredentials:!0}).then(a=>{console.log(a.data);const{ResultMessages:e}=a.data;console.log(e),s.value.Messages.unshift(...e)}).catch(a=>{console.log(a)})}y(()=>{o.value&&(o.value.addEventListener("scroll",p),Y(()=>{g.value||(o.value.scrollTop=o.value.scrollHeight,g.value=!0)})),h.on("receive_message",async a=>{const{Room_ID:e,User_ID:t,Message:I,Time:C}=a;e===s.value.Room_ID&&(await s.value.Messages.push({Type:"Y",Message:I,Time:C}),o.value.scrollTop=await o.value.scrollHeight)})}),w(()=>{o.value&&o.value.removeEventListener("scroll",p)});const n=i(""),M=()=>{console.log("Sending message..."),v.post("/Direct/send_Message",{Room_ID:s.value.Room_ID,Message:n.value},{withCredentials:!0}).then(async a=>{a.data.success&&(await s.value.Messages.push({Type:"M",Message:n.value,Time:_().format("YYYY:MM:DD HH:mm:ss")}),h.emit("send_message",{Room_ID:s.value.Room_ID,User_ID:s.value.User_ID,Message:n.value,Time:_().format("YYYY:MM:DD HH:mm:ss")}),n.value="",o.value.scrollTop=await o.value.scrollHeight)}).catch(a=>{console.log(a)})};return(a,e)=>r.value?(d(),c("div",$,[l("div",F,[b,l("div",j,m(s.value.User_Name?s.value.User_Name:"?"),1)]),l("div",{class:"RoomChat",ref_key:"RoomChatContainer",ref:o},[s.value.Messages?(d(!0),c(H,{key:0},k(s.value.Messages,t=>(d(),c("li",{class:N(t.Type==="M"?"m":"y")},[l("div",z,m(t.Message),1),l("div",A,m(t.Time),1)],2))),256)):f("",!0)],512),l("div",G,[l("div",P,[x(l("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>n.value=t),onKeyup:e[1]||(e[1]=L(t=>M(),["enter"]))},null,544),[[U,n.value]]),l("button",{onClick:e[2]||(e[2]=t=>M())},"send")])])])):f("",!0)}},W=K(q,[["__scopeId","data-v-169d250f"]]);export{W as default};
