import{A as E,x as L,c as V,h as a,z as C,r as A,o as n,a as u,b as o,e as w,t as i,k as p,B as z,l as M,v as T,F as k,j as P,f as _,y as $,w as x,d as j,p as q,g as G,u as H}from"./index-Bw4p5HnC.js";/* empty css                                                                */import{_ as J}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v=d=>(q("data-v-ead8ea3e"),d=d(),G(),d),K={class:"Profile_Container"},O={class:"Profile_Photo"},Q=["src"],W={class:"ID"},X={key:0,class:"userID_Info"},Y=v(()=>o("span",null,"게시물 9 ",-1)),Z=v(()=>o("span",null,null,-1)),ee=v(()=>o("li",null,"안녕하세요.",-1)),oe={key:0,class:"userList"},le={class:"Feed_Container"},se=v(()=>o("div",{class:"Feed_discription"},[o("ul",null,[o("li",null,"게시물 9"),o("li",null,"태그장소 17")])],-1)),te={class:"Feed"},ae={class:"Article"},ne=["src"],re={__name:"PersonalPage",setup(d){const f=E(),b=L(),R=H(),h=V(()=>R.state.User_ID),r=a(!0),s=a({}),U=a([]),S=a([]),F=a(0),y=a(0),m=a([]),g=e=>{_.get(`/profile/search/${e}`).then(l=>{console.log(l.data);const c=l.data;s.value=c.userInfoResult,U.value=c.follower,S.value=c.following,F.value=c.follower_Len,y.value=c.following_Len,r.value=U.value.includes(h.value)}).catch(l=>{console.log(l)}),_.post("/profile/posts_list",{User_ID:e}).then(l=>{m.value=l.data,console.log(m.value)})};C(()=>f.params.User_ID,e=>{e&&g(e)},{immediate:!0});const N=async()=>{await _.post("/Direct/search_Room",{toUser_ID:s.value.User_ID},{withCredentials:!0}).then(e=>{console.log(e.data);const{Room_ID:l}=e.data;b.push({name:"Room",params:{Room_ID:l}})}).catch(e=>{console.log(e)})},B=async()=>{r.value?await _.post("/profile/unfollow",{fromUser:s.value.User_ID},{withCredentials:!0}).then(e=>{console.log(e.data),r.value=!1}).catch(e=>{console.log(e)}).finally(()=>{g(f.params.User_ID)}):await _.post("/profile/follow",{fromUser:s.value.User_ID},{withCredentials:!0}).then(e=>{console.log(e.data),r.value=!0}).catch(e=>{console.log(e)}).finally(()=>{g(f.params.User_ID)})},I=a(""),D=a([]);return C(I,e=>{e.length>0&&_.get(`/profile/usersFind/${e}`).then(l=>{console.log(l.data),D.value=l.data.users}).catch(l=>{console.log(l)})}),(e,l)=>{const c=A("router-link");return n(),u(k,null,[o("div",K,[o("div",O,[o("li",null,[o("img",{src:s.value.Profile_Img,alt:"",class:"profile"},null,8,Q)])]),o("ul",null,[o("li",W,[s.value?(n(),u("div",X,[w(" @"+i(s.value.User_ID),1),o("span",null,i(s.value.User_Name),1)])):p("",!0),s.value.User_ID!==h.value?(n(),u("button",{key:1,onClick:B,style:z({backgroundColor:r.value?"#EFEFEF":"black",borderColor:r.value?"#F2F2F2":"black",color:r.value?"black":"white"})},i(r.value?"팔로잉":"팔로우"),5)):p("",!0),s.value.User_ID!==h.value?(n(),u("button",{key:2,class:"message",onClick:N}," 메시지 ")):p("",!0)]),o("li",null,[Y,w("팔로워 "+i(F.value)+" ",1),Z,o("span",null,"팔로잉 "+i(y.value),1)]),ee,M(o("input",{type:"text","onUpdate:modelValue":l[0]||(l[0]=t=>I.value=t)},null,512),[[T,I.value]]),D.value.length>0?(n(),u("ul",oe,[(n(!0),u(k,null,P(D.value,t=>(n(),$(c,{to:{name:"PersonalPage",params:{User_ID:t.User_ID}},key:t},{default:x(()=>[w(i(t.User_ID)+" - "+i(t.User_Name),1)]),_:2},1032,["to"]))),128))])):p("",!0)])]),o("div",le,[se,o("div",te,[o("div",ae,[o("ul",null,[(n(!0),u(k,null,P(m.value,t=>(n(),u("li",null,[j(c,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:x(()=>[o("img",{src:t.Image_Src,alt:"",class:"FeedArticle"},null,8,ne)]),_:2},1032,["to"])]))),256))])])])])],64)}}},_e=J(re,[["__scopeId","data-v-ead8ea3e"]]);export{_e as default};
