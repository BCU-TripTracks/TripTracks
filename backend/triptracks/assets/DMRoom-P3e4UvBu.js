import{r as u,A as y,o as P,D as U,s as R,C as Y,e as m,f as l,t as v,F as x,l as H,j as d,w as S,m as N,n as B,a as g,d as _,B as C,x as L,h as F,p as b,k as E,G as V,b as $}from"./index-LiFnMm82.js";import{h as M}from"./moment-C5S46NFB.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j=p=>(b("data-v-fa5fd6ae"),p=p(),E(),p),z={key:0,class:"RoomContainer"},A={class:"RoomHeader"},G=j(()=>l("div",{class:"RoomProfile"},null,-1)),q={class:"RoomName"},J={class:"message"},O={class:"time"},Q={class:"top"},W=["src"],X=["src"],Z={class:"RoomInput"},ee={class:"inputBox"},se={__name:"DMRoom",setup(p){const T=V(),a=u(null),h=u(!1),f=u(!1),o=u({Room_ID:null,User_Name:null,Messages:[]}),i=u({});y(()=>o.value.Messages,async t=>{for(const s of o.value.Messages){const n=s.Message;s.type=="1"&&i.value[n]==null&&g.post("/feeds/Post_tinyInfo",{Post_ID:n},{withCredentials:!0}).then(e=>{console.log(n),console.log(e.data);const r=e.data;i.value[n]={Post_ID:n,User_ID:r.User_ID,User_Name:r.User_Name,Profile_Img:r.Profile_Img,Image_Src:r.Image_Src,Post_Caption:r.Post_Caption,Post_Title:r.Post_Title}}).catch(e=>{console.log(e)})}console.log(i.value)}),y(()=>T.params.Room_ID,t=>{t?(f.value=!0,g.get(`/Direct/print_DM/${t}`,{withCredentials:!0}).then(s=>{const{ResultRoomChat:n}=s.data;o.value=n,console.log(o.value)}).catch(s=>{const{message:n}=s.response.data;console.log(s.response.status),console.log(n)}).finally(()=>{if(o.value.Messages.length>0)for(const s of o.value.Messages)s.Time=M(s.Time).format("YYYY:MM:DD HH:mm:ss");a.value.scrollTop=a.value.scrollHeight})):f.value=!1},{immediate:!0});function D(){console.log(a.value.scrollTop),a.value.scrollTop===0&&k()}function k(){console.log("Loading more messages..."),g.post("/Direct/print_DM_Next",{Room_ID:o.value.Room_ID,Last_Chat:o.value.Messages[0].Message_ID},{withCredentials:!0}).then(t=>{console.log(t.data);const{ResultMessages:s}=t.data;console.log(s),o.value.Messages.unshift(...s)}).catch(t=>{console.log(t)})}P(()=>{a.value&&(a.value.addEventListener("scroll",D),U(()=>{h.value||(a.value.scrollTop=a.value.scrollHeight,h.value=!0)})),R.on("receive_message",async t=>{const{Room_ID:s,User_ID:n,Message:e,Time:r,type:w}=t;s===o.value.Room_ID&&(await o.value.Messages.push({Type:"Y",type:w,Message:e,Time:r}),a.value.scrollTop=await a.value.scrollHeight)})}),Y(()=>{a.value&&a.value.removeEventListener("scroll",D)});const c=u(""),I=()=>{console.log("Sending message..."),g.post("/Direct/send_Message",{Room_ID:o.value.Room_ID,Message:c.value},{withCredentials:!0}).then(async t=>{t.data.success&&(await o.value.Messages.push({Type:"M",type:0,Message:c.value,Time:M().format("YYYY:MM:DD HH:mm:ss")}),R.emit("send_message",{Room_ID:o.value.Room_ID,User_ID:o.value.User_ID,Message:c.value,Time:M().format("YYYY:MM:DD HH:mm:ss")}),c.value="",a.value.scrollTop=await a.value.scrollHeight)}).catch(t=>{console.log(t)})};return(t,s)=>{const n=$("router-link");return f.value?(_(),m("div",z,[l("div",A,[G,l("div",q,v(o.value.User_Name?o.value.User_Name:"?"),1)]),l("div",{class:"RoomChat",ref_key:"RoomChatContainer",ref:a},[o.value.Messages?(_(!0),m(x,{key:0},H(o.value.Messages,e=>(_(),m("li",null,[e.type==0?(_(),m("div",{key:0,class:C(e.Type==="M"?"m":"y")},[l("div",J,v(e.Message),1),l("div",O,v(e.Time),1)],2)):d("",!0),e.type==1?(_(),m("div",{key:1,class:C(["feed",e.Type==="M"?"m":"y"])},[e?(_(),L(n,{key:0,class:"routernone box",to:{name:"FeedDetail",params:{Post_ID:i.value[e.Message].Post_ID}}},{default:F(()=>[l("div",Q,[l("img",{class:"profileImg",src:i.value[e.Message].Profile_Img,alt:""},null,8,W),l("p",null,v(i.value[e.Message].User_ID),1)]),l("img",{class:"postimg",src:i.value[e.Message].Image_Src},null,8,X),l("p",null,v(i.value[e.Message].Post_Title),1)]),_:2},1032,["to"])):d("",!0)],2)):d("",!0)]))),256)):d("",!0)],512),l("div",Z,[l("div",ee,[S(l("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=e=>c.value=e),onKeyup:s[1]||(s[1]=B(e=>I(),["enter"]))},null,544),[[N,c.value]]),l("button",{onClick:s[2]||(s[2]=e=>I())},"send")])])])):d("",!0)}}},le=K(se,[["__scopeId","data-v-fa5fd6ae"]]);export{le as default};