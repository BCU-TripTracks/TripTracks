import{y as N,c as A,r as l,A as E,b as U,d as o,e as i,f as s,F as C,k as D,w as W,m as $,n as H,l as K,i as c,t as u,g as d,h as _,x as v,u as M,a as g}from"./index-CNOOLXwi.js";import{l as w,s as x}from"./like-Cq13m2ZL.js";import{l as P}from"./likeed-BS52KISc.js";import{s as R}from"./saveed-kX_ML6ov.js";import{i as j}from"./404img-BemuhLvh.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";const z={class:"grid-container"},G={class:"bodytop"},J={id:"result",class:"tagresult"},O=["onClick"],Q={class:"tagbox"},X={class:"grid-article"},Y=["src","data-fallback"],Z={class:"profile-container"},ee=["src"],te=["src","onClick"],se=["src"],ae={__name:"HomeFeed",setup(le){N();const h=M(),b=A(()=>h.state.isWrite);l(!1);const m=l(!1),y=l(null);l(!1),l(w);const I=l(x),p=l([{Post_ID:1}]),L=()=>{f.value.push(n.value),n.value=""},S=e=>{f.value.splice(e,1)},n=l(""),f=l([]);E(b,()=>{g.get("/Feeds/Posts_list",{withCredentials:!0}).then(e=>{console.log(e),p.value=e.data}).catch(e=>{console.log("오류발생"),console.log(e)})},{immediate:!0});const F=()=>{h.commit("Switch_isWrite")},B=e=>{e.isLike?g.post("/feeds/Like/remove",{postId:e.Post_ID},{withCredentials:!0}).then(a=>{e.isLike=!e.isLike}).catch(a=>{a.response.status==400}):g.post("/feeds/Like/add",{postId:e.Post_ID},{withCredentials:!0}).then(a=>{e.isLike=!e.isLike}).catch(a=>{a.response.status==400})},T=()=>{m.value=!m.value,I.value=m.value?R:x},V=e=>{e.target.src=e.target.getAttribute("data-fallback")};return(e,a)=>{const r=U("router-link");return o(),i("div",z,[s("div",G,[s("span",J,[(o(!0),i(C,null,D(f.value,(t,k)=>(o(),i("span",{key:k,class:"tag"},[c(u(t)+" ",1),s("button",{class:"deleteTagButton",onClick:oe=>S(k)},"x",8,O)]))),128))]),s("span",Q,[W(s("input",{class:"SearchTag",type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>n.value=t),onKeyup:H(L,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[$,n.value]]),s("button",{onClick:a[1]||(a[1]=t=>F()),class:"writebutton"},"글쓰기")])]),p.value?(o(),i("div",{key:0,class:"feedSlider",ref_key:"feedSliderContainer",ref:y},[(o(!0),i(C,null,D(p.value,t=>(o(),i("div",X,[d(r,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:_(()=>[s("img",{src:t.Image_Src,onError:V,"data-fallback":v(j),alt:"",class:"Eximage"},null,40,Y)]),_:2},1032,["to"]),s("ul",null,[s("li",Z,[s("img",{src:t.Profile_Img,alt:"",class:"profile"},null,8,ee),d(r,{to:{name:"PersonalPage",params:{User_ID:"_youngs_"}},class:"userID"},{default:_(()=>[c(u(t.User_ID),1)]),_:2},1024),s("img",{src:t.isLike?v(P):v(w),alt:"",class:"like",onClick:k=>B(t)},null,8,te),s("img",{src:I.value,alt:"",class:"save",onClick:T},null,8,se)]),s("li",null,[d(r,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"title"},{default:_(()=>[c(u(t.Post_Title),1)]),_:2},1032,["to"])]),s("li",null,[d(r,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"description"},{default:_(()=>[c(u(t.Post_Caption),1)]),_:2},1032,["to"])])])]))),256))],512)):K("",!0)])}}},_e=q(ae,[["__scopeId","data-v-ec7d2484"]]);export{_e as default};