import{c as U,r as l,y as I,e as n,f as a,F as h,k as D,w as x,m as S,n as V,j as N,d as r,i as _,t as m,g as v,h as f,q as P,x as $,u as E,b as K,a as L}from"./index-Dd8u3veE.js";import{l as C,s as W}from"./like-Cq13m2ZL.js";import{l as j}from"./likeed-BS52KISc.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";const A={class:"grid-container"},M={class:"bodytop"},R={id:"result",class:"tagresult"},z=["onClick"],G={class:"tagbox"},H={key:0,class:"feedSlider"},J=["src"],O={class:"profile-container"},Q=["src"],X=["src","onClick"],Y=["src"],Z={__name:"FollowingTab",setup(ee){$();const w=E(),y=U(()=>w.state.isWrite);l(!1),l(!1),l(C);const F=l(W),g=l([]),p=l([]),u=l([]),d=l(""),i=l([]),T=()=>{const e=d.value.trim();e&&(i.value.push(e),d.value="")},b=e=>{i.value.splice(e,1)},B=async()=>{try{const e=await L.get("/Feeds/Following_tab",{withCredentials:!0});g.value=e.data,p.value=e.data.map(t=>t.User_ID),k()}catch(e){console.error("오류 발생",e)}},k=()=>{const e=i.value;e.length>0?u.value=g.value.filter(t=>p.value.includes(t.User_ID)&&e.some(o=>t.Post_Title.includes(o)||t.Post_Caption.includes(o))):u.value=g.value.filter(t=>p.value.includes(t.User_ID))};return I(i,k,{deep:!0}),I(y,()=>{B()},{immediate:!0}),(e,t)=>{const o=K("router-link");return r(),n("div",A,[a("div",M,[a("span",R,[(r(!0),n(h,null,D(i.value,(s,c)=>(r(),n("span",{key:c,class:"tag"},[_(m(s)+" ",1),a("button",{class:"deleteTagButton",onClick:se=>b(c)},"x",8,z)]))),128))]),a("span",G,[x(a("input",{class:"SearchTag",type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>d.value=s),onKeyup:V(T,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[S,d.value]]),a("button",{onClick:t[1]||(t[1]=s=>e.write_Button_Click()),class:"writebutton"}," 글쓰기 ")])]),u.value.length>0?(r(),n("div",H,[(r(!0),n(h,null,D(u.value,s=>(r(),n("div",{class:"grid-article",key:s.Post_ID},[v(o,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}}},{default:f(()=>[a("img",{src:s.Image_Src,alt:"",class:"Eximage"},null,8,J)]),_:2},1032,["to"]),a("ul",null,[a("li",O,[a("img",{src:s.Profile_Img,alt:"",class:"profile"},null,8,Q),v(o,{to:{name:"PersonalPage",params:{User_ID:s.User_ID}},class:"userID"},{default:f(()=>[_(m(s.User_ID),1)]),_:2},1032,["to"]),a("img",{src:s.isLike?P(j):P(C),alt:"",class:"like",onClick:c=>e.like_Button_Click(s)},null,8,X),a("img",{src:F.value,alt:"",class:"save",onClick:t[2]||(t[2]=(...c)=>e.save_Button_Click&&e.save_Button_Click(...c))},null,8,Y)]),a("li",null,[v(o,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}},class:"title"},{default:f(()=>[_(m(s.Post_Title),1)]),_:2},1032,["to"])]),a("li",null,[v(o,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}},class:"discription"},{default:f(()=>[_(m(s.Post_Caption),1)]),_:2},1032,["to"])])])]))),128))])):N("",!0)])}}},ne=q(Z,[["__scopeId","data-v-7bdf97fa"]]);export{ne as default};
