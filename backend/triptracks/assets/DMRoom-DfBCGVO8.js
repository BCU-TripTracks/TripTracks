import{r as _,y as I,o as k,C as Y,s as y,B as U,e as m,f as t,t as v,F as w,k as H,j as p,w as x,m as N,n as S,a as d,d as u,z as C,p as B,h as b,A as F,b as L}from"./index-CcO5s3s5.js";import{h as M}from"./moment-C5S46NFB.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V={key:0,class:"RoomContainer"},$={class:"RoomHeader"},z=["src"],K={class:"RoomName"},j={class:"message"},A={class:"time"},q={class:"top"},G=["src"],J=["src"],O={key:1,class:"box"},Q={class:"RoomInput"},W={class:"inputBox"},X={__name:"DMRoom",setup(Z){const R=F(),a=_(null),g=_(!1),f=_(!1),o=_({Room_ID:null,User_Name:null,Messages:[]}),n=_({});I(()=>o.value.Messages,async l=>{for(const s of o.value.Messages){const i=s.Message;s.type=="1"&&n.value[i]==null&&d.post("/feeds/Post_tinyInfo",{Post_ID:i},{withCredentials:!0}).then(e=>{const r=e.data;n.value[i]={Post_ID:i,User_ID:r.User_ID,User_Name:r.User_Name,Profile_Img:r.Profile_Img,Image_Src:r.Image_Src,Post_Caption:r.Post_Caption,Post_Title:r.Post_Title}}).catch(e=>{e.response&&e.response.status===500?n.value[i]={Post_ID:i,User_ID:null,User_Name:null,Profile_Img:null,Image_Src:null,Post_Caption:"삭제된 메시지입니다.",Post_Title:null}:console.error(e)})}}),I(()=>R.params.Room_ID,l=>{l?(f.value=!0,d.get(`/Direct/print_DM/${l}`,{withCredentials:!0}).then(s=>{const{ResultRoomChat:i}=s.data;o.value=i}).catch(s=>{s.response&&s.response.status===500?o.value.Messages.push({Type:"Y",type:1,Message:null,Time:M().format("YYYY:MM:DD HH:mm:ss"),Post_Caption:"삭제된 메시지입니다."}):console.error(s)}).finally(()=>{if(o.value.Messages.length>0)for(const s of o.value.Messages)s.Time=M(s.Time).format("YYYY:MM:DD HH:mm:ss");a.value.scrollTop=a.value.scrollHeight})):f.value=!1},{immediate:!0});function h(){a.value.scrollTop===0&&T()}function T(){d.post("/Direct/print_DM_Next",{Room_ID:o.value.Room_ID,Last_Chat:o.value.Messages[0].Message_ID},{withCredentials:!0}).then(l=>{const{ResultMessages:s}=l.data;o.value.Messages.unshift(...s)}).catch(l=>{console.error(l)})}k(()=>{a.value&&(a.value.addEventListener("scroll",h),Y(()=>{g.value||(a.value.scrollTop=a.value.scrollHeight,g.value=!0)})),y.on("receive_message",async l=>{const{Room_ID:s,User_ID:i,Message:e,Time:r,type:P}=l;s===o.value.Room_ID&&(await o.value.Messages.push({Type:"Y",type:P,Message:e,Time:r}),a.value.scrollTop=await a.value.scrollHeight)})}),U(()=>{a.value&&a.value.removeEventListener("scroll",h)});const c=_(""),D=()=>{d.post("/Direct/send_Message",{Room_ID:o.value.Room_ID,Message:c.value},{withCredentials:!0}).then(async l=>{l.data.success&&(await o.value.Messages.push({Type:"M",type:0,Message:c.value,Time:M().format("YYYY:MM:DD HH:mm:ss")}),y.emit("send_message",{Room_ID:o.value.Room_ID,User_ID:o.value.User_ID,Message:c.value,Time:M().format("YYYY:MM:DD HH:mm:ss")}),c.value="",a.value.scrollTop=await a.value.scrollHeight)}).catch(l=>{console.error(l)})};return(l,s)=>{const i=L("router-link");return f.value?(u(),m("div",V,[t("div",$,[t("img",{src:o.value.Profile_Img,class:"RoomProfile"},null,8,z),t("div",K,v(o.value.User_Name?o.value.User_Name:"?"),1)]),t("div",{class:"RoomChat",ref_key:"RoomChatContainer",ref:a},[o.value.Messages?(u(!0),m(w,{key:0},H(o.value.Messages,e=>{var r;return u(),m("li",null,[e.type==0?(u(),m("div",{key:0,class:C(e.Type==="M"?"m":"y")},[t("div",j,v(e.Message),1),t("div",A,v(e.Time),1)],2)):p("",!0),e.type==1?(u(),m("div",{key:1,class:C(["feed",e.Type==="M"?"m":"y"])},[n.value[e.Message]&&n.value[e.Message].Post_Caption!=="삭제된 메시지입니다."?(u(),B(i,{key:0,class:"routernone box",to:{name:"FeedDetail",params:{Post_ID:n.value[e.Message].Post_ID}}},{default:b(()=>[t("div",q,[t("img",{class:"profileImg",src:n.value[e.Message].Profile_Img,alt:""},null,8,G),t("p",null,v(n.value[e.Message].User_ID),1)]),t("img",{class:"postimg",src:n.value[e.Message].Image_Src},null,8,J),t("p",null,v(n.value[e.Message].Post_Title),1)]),_:2},1032,["to"])):(u(),m("div",O,[t("p",null,v((r=n.value[e.Message])==null?void 0:r.Post_Caption),1)]))],2)):p("",!0)])}),256)):p("",!0)],512),t("div",Q,[t("div",W,[x(t("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=e=>c.value=e),onKeyup:s[1]||(s[1]=S(e=>D(),["enter"]))},null,544),[[N,c.value]]),t("button",{onClick:s[2]||(s[2]=e=>D())},"send")])])])):p("",!0)}}},te=E(X,[["__scopeId","data-v-2b9a1c11"]]);export{te as default};
