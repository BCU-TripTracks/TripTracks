import{z as A,n as N,c as V,h as l,m as F,A as B,r as E,o as a,a as c,b as e,e as v,t as n,i as I,x as L,j as M,v as R,F as h,g as k,q as z,w as D,d as T,l as $,p as j,f as q,u as Y}from"./index-CO_wMevt.js";import{_ as G}from"./ProfileImage-DDAmAK24.js";import"./message.vue_vue_type_style_index_0_scoped_eda86d33_lang-DQMMxwz5.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";const J="/assets/FeedArticle-D06YVoeu.png",i=u=>(j("data-v-3bfc65de"),u=u(),q(),u),K={class:"Profile_Container"},O=i(()=>e("div",{class:"Profile_Photo"},[e("li",null,[e("img",{src:G,alt:"",class:"profile"})])],-1)),Q={class:"ID"},W={key:0,class:"userID_Info"},X=i(()=>e("span",null,"게시물 9 ",-1)),Z=i(()=>e("span",null,null,-1)),ee=i(()=>e("li",null,"안녕하세요.",-1)),se={key:0,class:"userList"},oe={class:"Feed_Container"},le=i(()=>e("div",{class:"Feed_discription"},[e("ul",null,[e("li",null,"게시물 9"),e("li",null,"태그장소 17")])],-1)),te={class:"Feed"},ae={class:"Article"},ne=["src"],ce={__name:"PersonalPage",setup(u){const b=A();N();const p=Y(),x=V(()=>p.state.user_ID),r=l(!1),_=l({}),C=l([]),P=l([]),g=l(0),w=l(0),y=b.params.userID;F.get(`/profile/search/${y}`).then(o=>{console.log(o.data);const s=o.data;_.value=s.userInfoResult,C.value=s.follower,P.value=s.following,g.value=s.follower_Len,w.value=s.following_Len;for(const d of s.followers)d===x&&(r.value=!0)}).catch(o=>{console.log(o)});const S=()=>{p.commit("Switch_isMsg")},U=()=>{p.commit("Switch_isFollow")},f=l(""),m=l([]);return B(f,o=>{o.length>0&&F.get(`/profile/usersFind/${o}`).then(s=>{console.log(s.data),m.value=s.data.users}).catch(s=>{console.log(s)})}),(o,s)=>{const d=E("router-link");return a(),c(h,null,[e("div",K,[O,e("ul",null,[e("li",Q,[_.value?(a(),c("div",W,[v(" @"+n(_.value.User_ID),1),e("span",null,n(_.value.User_Name),1)])):I("",!0),e("button",{onClick:U,style:L({backgroundColor:r.value?"#EFEFEF":"black",borderColor:r.value?"#F2F2F2":"black",color:r.value?"black":"white"})},n(r.value?"팔로잉":"팔로우"),5),e("button",{class:"message",onClick:S},"메시지")]),e("li",null,[X,v("팔로워 "+n(g.value)+" ",1),Z,e("span",null,"팔로잉 "+n(w.value),1)]),ee,M(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=t=>f.value=t)},null,512),[[R,f.value]]),m.value.length>0?(a(),c("ul",se,[(a(!0),c(h,null,k(m.value,t=>(a(),z(d,{to:{name:"PersonalPage",params:{userID:t.User_ID}},key:t},{default:D(()=>[v(n(t.User_ID)+" - "+n(t.User_Name),1)]),_:2},1032,["to"]))),128))])):I("",!0)])]),e("div",oe,[le,e("div",te,[e("div",ae,[e("ul",null,[(a(!0),c(h,null,k(Array(12),t=>(a(),c("li",null,[T(d,{to:{name:"FeedDetail"}},{default:D(()=>[e("img",{src:$(J),alt:"",class:"FeedArticle"},null,8,ne)]),_:1})]))),256))])])])])],64)}}},de=H(ce,[["__scopeId","data-v-3bfc65de"]]);export{de as default};