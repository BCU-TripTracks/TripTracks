import{c as T,r as d,y as f,e as n,f as s,F as k,k as C,w as B,m as b,n as w,j as F,d as i,i as _,t as m,g as p,h as v,x as S,u as V,a as x,b as N}from"./index-Dd8u3veE.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";const E={class:"grid-container"},K={class:"bodytop"},W={id:"result",class:"tagresult"},$=["onClick"],j={class:"tagbox"},A={key:0,class:"feedSlider",ref:"feedSliderContainer"},L=["src"],M={class:"profile-container"},R=["src"],q=["src"],z=["src"],G={__name:"PopularityTab",setup(H){S();const I=V(),h=T(()=>I.state.isWrite),g=d([]),r=d([]),u=d(""),c=d([]),D=()=>{const e=u.value.trim();e&&(c.value.push(e),u.value="")},y=e=>{c.value.splice(e,1)},P=()=>{const e=c.value;e.length>0?r.value=g.value.filter(a=>e.some(l=>a.Post_Title.includes(l)||a.Post_Caption.includes(l))):r.value=g.value};return f(h,()=>{x.get("/Feeds/Popular",{withCredentials:!0}).then(e=>{console.log(e),g.value=e.data,r.value=e.data}).catch(e=>{console.log("오류발생"),console.log(e)})},{immediate:!0}),f(c,P,{deep:!0}),(e,a)=>{const l=N("router-link");return i(),n("div",E,[s("div",K,[s("span",W,[(i(!0),n(k,null,C(c.value,(t,o)=>(i(),n("span",{key:o,class:"tag"},[_(m(t)+" ",1),s("button",{class:"deleteTagButton",onClick:J=>y(o)},"x",8,$)]))),128))]),s("span",j,[B(s("input",{class:"SearchTag",type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>u.value=t),onKeyup:w(D,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[b,u.value]]),s("button",{onClick:a[1]||(a[1]=t=>e.write_Button_Click()),class:"writebutton"},"글쓰기")])]),r.value.length>0?(i(),n("div",A,[(i(!0),n(k,null,C(r.value,t=>(i(),n("div",{class:"grid-article",key:t.Post_ID},[p(l,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:v(()=>[s("img",{src:t.Image_Src,alt:"",class:"Eximage"},null,8,L)]),_:2},1032,["to"]),s("ul",null,[s("li",M,[s("img",{src:t.Profile_Img,alt:"",class:"profile"},null,8,R),p(l,{to:{name:"PersonalPage",params:{User_ID:t.User_ID}},class:"userID"},{default:v(()=>[_(m(t.User_ID),1)]),_:2},1032,["to"]),s("img",{src:e.likeImage,alt:"",class:"like",onClick:a[2]||(a[2]=(...o)=>e.like_Button_Click&&e.like_Button_Click(...o))},null,8,q),s("img",{src:e.saveImage,alt:"",class:"save",onClick:a[3]||(a[3]=(...o)=>e.save_Button_Click&&e.save_Button_Click(...o))},null,8,z)]),s("li",null,[p(l,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"title"},{default:v(()=>[_(m(t.Post_Title),1)]),_:2},1032,["to"])]),s("li",null,[p(l,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}},class:"description"},{default:v(()=>[_(m(t.Post_Caption),1)]),_:2},1032,["to"])])])]))),128))],512)):F("",!0)])}}},X=U(G,[["__scopeId","data-v-0c784d68"]]);export{X as default};
