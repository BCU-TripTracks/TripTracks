import{_ as p}from"./ProfileImage-DDAmAK24.js";import{n as h,m as c,r as F,o as l,c as i,q as f,h as g,a as s,d as r,x as v,t as k,F as n,f as b,b as w,w as C,k as S,p as P,e as x,u as y}from"./index-BzJ7gwoE.js";import{m as A}from"./message-Bm36yIpB.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V="/assets/FeedArticle-D06YVoeu.png",a=o=>(P("data-v-f98b1566"),o=o(),x(),o),B={class:"Profile_Container"},D=a(()=>s("div",{class:"Profile_Photo"},[s("li",null,[s("img",{src:p,alt:"",class:"profile"})])],-1)),E={class:"ID"},M=a(()=>s("li",null,[s("span",null,"게시물 9 "),r("팔로워 123 "),s("span"),s("span",null,"팔로잉 123")],-1)),N=a(()=>s("li",null,"안녕하세요.",-1)),L={class:"Feed_Container"},q=a(()=>s("div",{class:"Feed_discription"},[s("ul",null,[s("li",null,"게시물 9"),s("li",null,"태그장소 17")])],-1)),z={class:"Feed"},R={class:"Article"},T=["src"],Y={__name:"PersonalPage",setup(o){const e=y();h(),c(()=>e.state.isLogin);const t=c(()=>e.state.isFollow),_=c(()=>e.state.isMsg),u=()=>{e.commit("Switch_isMsg")},d=()=>{e.commit("Switch_isFollow")};return(j,G)=>{const m=F("router-link");return l(),i(n,null,[_.value?(l(),f(A,{key:0})):g("",!0),s("div",B,[D,s("ul",null,[s("li",E,[r(" coiincidence99 "),s("button",{onClick:d,style:v({backgroundColor:t.value?"#EFEFEF":"black",borderColor:t.value?"#F2F2F2":"black",color:t.value?"black":"white"})},k(t.value?"팔로잉":"팔로우"),5),s("button",{class:"message",onClick:u},"메시지")]),M,N])]),s("div",L,[q,s("div",z,[s("div",R,[s("ul",null,[(l(!0),i(n,null,b(Array(12),H=>(l(),i("li",null,[w(m,{to:{name:"FeedDetail"}},{default:C(()=>[s("img",{src:S(V),alt:"",class:"FeedArticle"},null,8,T)]),_:1})]))),256))])])])])],64)}}},U=I(Y,[["__scopeId","data-v-f98b1566"]]);export{U as default};
