import{_ as D}from"./ProfileImage-DDAmAK24.js";import{z as C,c as S,h as s,m as x,r as P,o as _,a as d,b as e,e as m,t as a,x as A,F as h,g as y,d as E,w as N,l as V,p as B,f as L,u as z}from"./index-CG0mUUAc.js";import"./message.vue_vue_type_style_index_0_scoped_eda86d33_lang-DQMMxwz5.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";const R="/assets/FeedArticle-D06YVoeu.png",n=c=>(B("data-v-f084c5b5"),c=c(),L(),c),U={class:"Profile_Container"},T=n(()=>e("div",{class:"Profile_Photo"},[e("li",null,[e("img",{src:D,alt:"",class:"profile"})])],-1)),Y={class:"ID"},$={class:"userID_Info"},j=n(()=>e("span",null,"게시물 9 ",-1)),q=n(()=>e("span",null,null,-1)),G=n(()=>e("li",null,"안녕하세요.",-1)),H={class:"Feed_Container"},J=n(()=>e("div",{class:"Feed_discription"},[e("ul",null,[e("li",null,"게시물 9"),e("li",null,"태그장소 17")])],-1)),K={class:"Feed"},O={class:"Article"},Q=["src"],W={__name:"PersonalPage",setup(c){const v=C(),r=z(),g=S(()=>r.state.user_ID),l=s(!1),i=s({}),w=s([]),F=s([]),f=s(0),p=s(0),I=v.params.userID;x.get(`/profile/search/${I}`).then(t=>{console.log(t.data);const o=t.data;i.value=o.userInfoResult,w.value=o.follower,F.value=o.following,f.value=o.follower_Len,p.value=o.following_Len;for(const u of o.followers)u===g&&(l.value=!0)}).catch(t=>{console.log(t)});const k=()=>{r.commit("Switch_isMsg")},b=()=>{r.commit("Switch_isFollow")};return(t,o)=>{const u=P("router-link");return _(),d(h,null,[e("div",U,[T,e("ul",null,[e("li",Y,[e("div",$,[m(" @"+a(i.value.User_ID),1),e("span",null,a(i.value.User_Name),1)]),e("button",{onClick:b,style:A({backgroundColor:l.value?"#EFEFEF":"black",borderColor:l.value?"#F2F2F2":"black",color:l.value?"black":"white"})},a(l.value?"팔로잉":"팔로우"),5),e("button",{class:"message",onClick:k},"메시지")]),e("li",null,[j,m("팔로워 "+a(f.value)+" ",1),q,e("span",null,"팔로잉 "+a(p.value),1)]),G])]),e("div",H,[J,e("div",K,[e("div",O,[e("ul",null,[(_(!0),d(h,null,y(Array(12),X=>(_(),d("li",null,[E(u,{to:{name:"FeedDetail"}},{default:N(()=>[e("img",{src:V(R),alt:"",class:"FeedArticle"},null,8,Q)]),_:1})]))),256))])])])])],64)}}},le=M(W,[["__scopeId","data-v-f084c5b5"]]);export{le as default};
