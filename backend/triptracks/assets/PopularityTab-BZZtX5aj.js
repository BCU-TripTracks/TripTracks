import{c as y,r as d,A as f,e as n,f as s,F as k,l as C,w as B,m as b,n as w,j as F,d as i,i as _,t as m,g as p,h as v,z as S,u as V,a as N,b as U}from"./index-CHL-2fQ3.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";const A={class:"grid-container"},E={class:"bodytop"},K={id:"result",class:"tagresult"},W=["onClick"],$={class:"tagbox"},j={key:0,class:"feedSlider",ref:"feedSliderContainer"},z=["src"],L={class:"profile-container"},M=["src"],R=["src"],q=["src"],G={__name:"PopularityTab",setup(H){S();const I=V(),h=y(()=>I.state.isWrite),g=d([]),r=d([]),u=d(""),c=d([]),D=()=>{const e=u.value.trim();e&&(c.value.push(e),u.value="")},P=e=>{c.value.splice(e,1)},T=()=>{const e=c.value;e.length>0?r.value=g.value.filter(a=>e.some(l=>a.Post_Title.includes(l)||a.Post_Caption.includes(l))):r.value=g.value};return f(h,()=>{N.get("/Feeds/Popular",{withCredentials:!0}).then(e=>{console.log(e),g.value=e.data,r.value=e.data}).catch(e=>{console.log("오류발생"),console.log(e)})},{immediate:!0}),f(c,T,{deep:!0}),(e,a)=>{const l=U("router-link");return i(),n("div",A,[s("div",E,[s("span",K,[(i(!0),n(k,null,C(c.value,(t,o)=>(i(),n("span",{key:o,class:"tag"},[_(m(t)+" ",1),s("button",{class:"deleteTagButton",onClick:J=>P(o)},"x",8,W)]))),128))]),s("span",$,[B(s("input",{class:"SearchTag",type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>u.value=t),onKeyup:w(D,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[b,u.value]]),s("button",{onClick:a[1]||(a[1]=t=>e.write_Button_Click()),class:"writebutton"},"글쓰기")])]),r.value.length>0?(i(),n("div",j,[(i(!0),n(k,null,C(r.value,t=>(i(),n("div",{class:"grid-article",key:t.Post_ID},[p(l,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:v(()=>[s("img",{src:t.Image_Src,alt:"",class:"Eximage"},null,8,z)]),_:2},1032,["to"]),s("ul",null,[s("li",L,[s("img",{src:t.Profile_Img,alt:"",class:"profile"},null,8,M),p(l,{to:{name:"PersonalPage",params:{User_ID:t.User_ID}},class:"userID"},{default:v(()=>[_(m(t.User_ID),1)]),_:2},1032,["to"]),s("img",{src:e.likeImage,alt:"",class:"like",onClick:a[2]||(a[2]=(...o)=>e.like_Button_Click&&e.like_Button_Click(...o))},null,8,R),s("img",{src:e.saveImage,alt:"",class:"save",onClick:a[3]||(a[3]=(...o)=>e.save_Button_Click&&e.save_Button_Click(...o))},null,8,q)]),s("li",null,[p(l,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"title"},{default:v(()=>[_(m(t.Post_Title),1)]),_:2},1032,["to"])]),s("li",null,[p(l,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"description"},{default:v(()=>[_(m(t.Post_Caption),1)]),_:2},1032,["to"])])])]))),128))],512)):F("",!0)])}}},X=x(G,[["__scopeId","data-v-0c784d68"]]);export{X as default};
