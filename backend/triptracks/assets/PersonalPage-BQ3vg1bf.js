import{c as M,r as a,o as $,A as F,e as r,f as s,w as B,m as L,E as P,F as C,l as b,j as _,i as I,t as c,G as V,a as d,d as n,x as A,h as x,g as T,p as j,k as G,z as H,u as W,b as q}from"./index-2mASZDPG.js";/* empty css                                                                */import{_ as J}from"./_plugin-vue_export-helper-DlAUqK2U.js";const K=v=>(j("data-v-62eceba8"),v=v(),G(),v),O={class:"Profile_Page"},Q={class:"Profile_Find"},X=K(()=>s("h3",null,"프로필 찾아보기",-1)),Y={class:"input-container"},Z=["src"],ee={class:"Profile_Container"},se={class:"Profile_Photo"},oe=["src"],le={class:"ID"},te={key:0,class:"userID_Info"},ae={class:"profileWrap"},ne={class:"userInfo"},re={class:"userInfo"},ce={class:"userInfo"},ue={class:"Feed_discription"},ie={key:0,class:"Feed"},_e={class:"Article"},de=["src"],pe={__name:"PersonalPage",setup(v){const f=V(),z=H(),R=W(),h=M(()=>R.state.User_ID),u=a(!0),l=a({}),w=a([]),S=a([]),U=a(0),y=a(0),m=a([]);a([]);const D=a("feedzone"),g=e=>{d.get(`/profile/search/${e}`).then(o=>{console.log(o.data);const i=o.data;l.value=i.userInfoResult,w.value=i.follower,S.value=i.following,U.value=i.follower_Len,y.value=i.following_Len,u.value=w.value.includes(h.value)}).catch(o=>{console.log(o)}),d.post("/profile/posts_list",{User_ID:e}).then(o=>{m.value=o.data,console.log(m.value)})};$(()=>{g(f.params.User_ID)}),F(()=>f.params.User_ID,e=>{e&&(g(e),p.value="")});const N=async()=>{await d.post("/Direct/search_Room",{toUser_ID:l.value.User_ID},{withCredentials:!0}).then(e=>{console.log(e.data);const{Room_ID:o}=e.data;z.push({name:"Room",params:{Room_ID:o}})}).catch(e=>{console.log(e)})},E=async()=>{u.value?await d.post("/profile/unfollow",{fromUser:l.value.User_ID},{withCredentials:!0}).then(e=>{console.log(e.data),u.value=!1}).catch(e=>{console.log(e)}).finally(()=>{g(f.params.User_ID)}):await d.post("/profile/follow",{fromUser:l.value.User_ID},{withCredentials:!0}).then(e=>{console.log(e.data),u.value=!0}).catch(e=>{console.log(e)}).finally(()=>{g(f.params.User_ID)})},p=a(""),k=a([]);return F(p,e=>{e.length>0&&d.get(`/profile/usersFind/${e}`).then(o=>{console.log(o.data),k.value=o.data.users}).catch(o=>{console.log(o)})}),(e,o)=>{const i=q("router-link");return n(),r("div",O,[s("div",Q,[X,s("div",Y,[B(s("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=t=>p.value=t),placeholder:"검색하고 싶은 프로필의 아이디를 적어주세요",ref:"userInput"},null,512),[[L,p.value]]),k.value.length>0&&p.value!==""?(n(),r("ul",{key:0,class:"userList",style:P({top:`${e.inputHeight}px`})},[(n(!0),r(C,null,b(k.value,t=>(n(),A(i,{to:{name:"PersonalPage",params:{User_ID:t.User_ID}},key:t.User_ID,class:"router-link-none userItem"},{default:x(()=>[s("img",{src:t.Profile_Img,width:"25px"},null,8,Z),s("p",null,c(t.User_ID)+" - "+c(t.User_Name),1)]),_:2},1032,["to"]))),128))],4)):_("",!0)])]),s("div",ee,[s("div",se,[s("li",null,[s("img",{src:l.value.Profile_Img,alt:"",class:"profile"},null,8,oe)])]),s("ul",null,[s("li",le,[l.value?(n(),r("div",te,[I(" @"+c(l.value.User_ID),1),s("span",null,c(l.value.User_Name),1)])):_("",!0),l.value.User_ID!==h.value?(n(),r("button",{key:1,onClick:E,style:P({backgroundColor:u.value?"#EFEFEF":"black",borderColor:u.value?"#F2F2F2":"black",color:u.value?"black":"white"})},c(u.value?"팔로잉":"팔로우"),5)):_("",!0),l.value.User_ID!==h.value?(n(),r("button",{key:2,class:"message",onClick:N}," 메시지 ")):_("",!0)]),s("li",ae,[I(" 게시물 "),s("span",ne,c(m.value.length),1),I(" 팔로워 "),s("span",re,c(U.value),1),I(" 팔로잉 "),s("span",ce,c(y.value),1)]),s("li",null,c(l.value.User_Msg),1)])]),s("div",ue,[s("span",{class:"feedzone",onClick:o[1]||(o[1]=t=>D.value="feedzone")},"게시물"),l.value.User_ID==h.value?(n(),r("span",{key:0,class:"savezone",onClick:o[2]||(o[2]=t=>D.value="savezone")},"저장된 게시물")):_("",!0)]),D.value==="feedzone"?(n(),r("div",ie,[s("div",_e,[s("ul",null,[(n(!0),r(C,null,b(m.value,t=>(n(),r("li",null,[T(i,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:x(()=>[s("img",{src:t.Image_Src,alt:"",class:"FeedArticle"},null,8,de)]),_:2},1032,["to"])]))),256))])])])):_("",!0)])}}},me=J(pe,[["__scopeId","data-v-62eceba8"]]);export{me as default};
