import{z as N,n as V,c as B,h as n,A as I,r as E,o as r,a as i,b as e,e as m,t as c,i as k,x as L,j as M,v as R,F as h,g as D,m as f,q as z,w as b,d as T,l as $,p as j,f as q,u as Y}from"./index-D6ZJYEmJ.js";import{_ as G}from"./ProfileImage-DDAmAK24.js";import"./message.vue_vue_type_style_index_0_scoped_e99b3054_lang-CQMzb1x0.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";const J="/assets/FeedArticle-D06YVoeu.png",_=d=>(j("data-v-e38cbd91"),d=d(),q(),d),K={class:"Profile_Container"},O=_(()=>e("div",{class:"Profile_Photo"},[e("li",null,[e("img",{src:G,alt:"",class:"profile"})])],-1)),Q={class:"ID"},W={key:0,class:"userID_Info"},X=_(()=>e("span",null,"게시물 9 ",-1)),Z=_(()=>e("span",null,null,-1)),ee=_(()=>e("li",null,"안녕하세요.",-1)),oe={key:0,class:"userList"},le={class:"Feed_Container"},se=_(()=>e("div",{class:"Feed_discription"},[e("ul",null,[e("li",null,"게시물 9"),e("li",null,"태그장소 17")])],-1)),te={class:"Feed"},ae={class:"Article"},ne=["src"],re={__name:"PersonalPage",setup(d){const U=N();V();const g=Y(),x=B(()=>g.state.user_ID),a=n(!1),u=n({}),C=n([]),P=n([]),w=n(0),F=n(0),y=o=>{f.get(`/profile/search/${o}`).then(l=>{console.log(l.data);const s=l.data;u.value=s.userInfoResult,C.value=s.follower,P.value=s.following,w.value=s.follower_Len,F.value=s.following_Len;for(const t of s.followers)t===x&&(a.value=!0)}).catch(l=>{console.log(l)})};I(()=>U.params.userID,o=>{o&&y(o)},{immediate:!0});const S=()=>{g.commit("Switch_isMsg")},A=()=>{a.value?f.post("/profile/unfollow",{fromUser:u.value.User_ID}).then(o=>{console.log(o.data),a.value=!1}).catch(o=>{console.log(o)}):f.post("/profile/follow",{fromUser:u.value.User_ID}).then(o=>{console.log(o.data),a.value=!0}).catch(o=>{console.log(o)})},p=n(""),v=n([]);return I(p,o=>{o.length>0&&f.get(`/profile/usersFind/${o}`).then(l=>{console.log(l.data),v.value=l.data.users}).catch(l=>{console.log(l)})}),(o,l)=>{const s=E("router-link");return r(),i(h,null,[e("div",K,[O,e("ul",null,[e("li",Q,[u.value?(r(),i("div",W,[m(" @"+c(u.value.User_ID),1),e("span",null,c(u.value.User_Name),1)])):k("",!0),e("button",{onClick:A,style:L({backgroundColor:a.value?"#EFEFEF":"black",borderColor:a.value?"#F2F2F2":"black",color:a.value?"black":"white"})},c(a.value?"팔로잉":"팔로우"),5),e("button",{class:"message",onClick:S},"메시지")]),e("li",null,[X,m("팔로워 "+c(w.value)+" ",1),Z,e("span",null,"팔로잉 "+c(F.value),1)]),ee,M(e("input",{type:"text","onUpdate:modelValue":l[0]||(l[0]=t=>p.value=t)},null,512),[[R,p.value]]),v.value.length>0?(r(),i("ul",oe,[(r(!0),i(h,null,D(v.value,t=>(r(),z(s,{to:{name:"PersonalPage",params:{userID:t.User_ID}},key:t},{default:b(()=>[m(c(t.User_ID)+" - "+c(t.User_Name),1)]),_:2},1032,["to"]))),128))])):k("",!0)])]),e("div",le,[se,e("div",te,[e("div",ae,[e("ul",null,[(r(!0),i(h,null,D(Array(12),t=>(r(),i("li",null,[T(s,{to:{name:"FeedDetail"}},{default:b(()=>[e("img",{src:$(J),alt:"",class:"FeedArticle"},null,8,ne)]),_:1})]))),256))])])])])],64)}}},de=H(re,[["__scopeId","data-v-e38cbd91"]]);export{de as default};