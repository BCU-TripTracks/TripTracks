import{z as U,n as V,c as B,h as a,A as w,r as E,o as n,a as r,b as e,e as v,t as c,i as I,x as L,j as M,v as R,F as h,g as k,q as z,w as D,d as T,l as $,p as j,f as q,u as Y,m as x}from"./index-LliDPHlE.js";import{_ as G}from"./ProfileImage-DDAmAK24.js";import"./message.vue_vue_type_style_index_0_scoped_eda86d33_lang-DQMMxwz5.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";const J="/assets/FeedArticle-D06YVoeu.png",u=_=>(j("data-v-fdc45013"),_=_(),q(),_),K={class:"Profile_Container"},O=u(()=>e("div",{class:"Profile_Photo"},[e("li",null,[e("img",{src:G,alt:"",class:"profile"})])],-1)),Q={class:"ID"},W={key:0,class:"userID_Info"},X=u(()=>e("span",null,"게시물 9 ",-1)),Z=u(()=>e("span",null,null,-1)),ee=u(()=>e("li",null,"안녕하세요.",-1)),se={key:0,class:"userList"},oe={class:"Feed_Container"},le=u(()=>e("div",{class:"Feed_discription"},[e("ul",null,[e("li",null,"게시물 9"),e("li",null,"태그장소 17")])],-1)),te={class:"Feed"},ae={class:"Article"},ne=["src"],ce={__name:"PersonalPage",setup(_){const C=U();V();const p=Y(),P=B(()=>p.state.user_ID),i=a(!1),d=a({}),b=a([]),y=a([]),g=a(0),F=a(0),S=t=>{x.get(`/profile/search/${t}`).then(s=>{console.log(s.data);const o=s.data;d.value=o.userInfoResult,b.value=o.follower,y.value=o.following,g.value=o.follower_Len,F.value=o.following_Len;for(const l of o.followers)l===P&&(i.value=!0)}).catch(s=>{console.log(s)})};w(()=>C.params.userID,t=>{t&&S(t)},{immediate:!0});const A=()=>{p.commit("Switch_isMsg")},N=()=>{p.commit("Switch_isFollow")},f=a(""),m=a([]);return w(f,t=>{t.length>0&&x.get(`/profile/usersFind/${t}`).then(s=>{console.log(s.data),m.value=s.data.users}).catch(s=>{console.log(s)})}),(t,s)=>{const o=E("router-link");return n(),r(h,null,[e("div",K,[O,e("ul",null,[e("li",Q,[d.value?(n(),r("div",W,[v(" @"+c(d.value.User_ID),1),e("span",null,c(d.value.User_Name),1)])):I("",!0),e("button",{onClick:N,style:L({backgroundColor:i.value?"#EFEFEF":"black",borderColor:i.value?"#F2F2F2":"black",color:i.value?"black":"white"})},c(i.value?"팔로잉":"팔로우"),5),e("button",{class:"message",onClick:A},"메시지")]),e("li",null,[X,v("팔로워 "+c(g.value)+" ",1),Z,e("span",null,"팔로잉 "+c(F.value),1)]),ee,M(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=l=>f.value=l)},null,512),[[R,f.value]]),m.value.length>0?(n(),r("ul",se,[(n(!0),r(h,null,k(m.value,l=>(n(),z(o,{to:{name:"PersonalPage",params:{userID:l.User_ID}},key:l},{default:D(()=>[v(c(l.User_ID)+" - "+c(l.User_Name),1)]),_:2},1032,["to"]))),128))])):I("",!0)])]),e("div",oe,[le,e("div",te,[e("div",ae,[e("ul",null,[(n(!0),r(h,null,k(Array(12),l=>(n(),r("li",null,[T(o,{to:{name:"FeedDetail"}},{default:D(()=>[e("img",{src:$(J),alt:"",class:"FeedArticle"},null,8,ne)]),_:1})]))),256))])])])])],64)}}},de=H(ce,[["__scopeId","data-v-fdc45013"]]);export{de as default};