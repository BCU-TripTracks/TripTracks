import{_ as h}from"./ProfileImage-DDAmAK24.js";import{z as F,c as f,m as g,r as v,o as c,a as n,b as s,e as r,x as k,t as w,F as i,g as b,d as C,w as I,l as S,p as x,f as P,u as D}from"./index-Du5Bi4Fb.js";import"./message.vue_vue_type_style_index_0_scoped_eda86d33_lang-DQMMxwz5.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y="/assets/FeedArticle-D06YVoeu.png",l=e=>(x("data-v-f2f9a484"),e=e(),P(),e),E={class:"Profile_Container"},V=l(()=>s("div",{class:"Profile_Photo"},[s("li",null,[s("img",{src:h,alt:"",class:"profile"})])],-1)),B={class:"ID"},N=l(()=>s("li",null,[s("span",null,"게시물 9 "),r("팔로워 123 "),s("span"),s("span",null,"팔로잉 123")],-1)),z=l(()=>s("li",null,"안녕하세요.",-1)),M={class:"Feed_Container"},L=l(()=>s("div",{class:"Feed_discription"},[s("ul",null,[s("li",null,"게시물 9"),s("li",null,"태그장소 17")])],-1)),R={class:"Feed"},T={class:"Article"},Y=["src"],$={__name:"PersonalPage",setup(e){const _=F(),a=D(),o=f(()=>a.state.isFollow),u=_.params.userID;g.get(`/profile/search/${u}`).then(t=>{console.log(t.data)}).catch(t=>{console.log(t)});const d=()=>{a.commit("Switch_isMsg")},p=()=>{a.commit("Switch_isFollow")};return(t,j)=>{const m=v("router-link");return c(),n(i,null,[s("div",E,[V,s("ul",null,[s("li",B,[r(" coiincidence99 "),s("button",{onClick:p,style:k({backgroundColor:o.value?"#EFEFEF":"black",borderColor:o.value?"#F2F2F2":"black",color:o.value?"black":"white"})},w(o.value?"팔로잉":"팔로우"),5),s("button",{class:"message",onClick:d},"메시지")]),N,z])]),s("div",M,[L,s("div",R,[s("div",T,[s("ul",null,[(c(!0),n(i,null,b(Array(12),q=>(c(),n("li",null,[C(m,{to:{name:"FeedDetail"}},{default:I(()=>[s("img",{src:S(y),alt:"",class:"FeedArticle"},null,8,Y)]),_:1})]))),256))])])])])],64)}}},O=A($,[["__scopeId","data-v-f2f9a484"]]);export{O as default};
