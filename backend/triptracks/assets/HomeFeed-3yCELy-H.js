import{y as V,c as N,r as t,A as U,b as W,d as l,e as o,f as e,F as C,k as D,w as A,m as E,n as H,l as K,i as c,t as u,g as _,h as d,u as L,a as $}from"./index-By30rEyO.js";import{l as x,s as y}from"./save-DYftNgwL.js";import{l as M,s as R}from"./saveed-BZ5R3BeB.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";const q={class:"grid-container"},z={class:"bodytop"},G={id:"result",class:"tagresult"},J=["onClick"],O={class:"tagbox"},Q={class:"grid-article"},X=["src"],Y={class:"profile-container"},Z=["src"],ee=["src"],se=["src"],te={__name:"HomeFeed",setup(ae){V();const f=L(),w=N(()=>f.state.isWrite),m=t(!1),v=t(!1),S=t(null);t(!1);const k=t(x),h=t(y),p=t([{Post_ID:1}]),F=()=>{g.value.push(n.value),n.value=""},b=a=>{g.value.splice(a,1)},n=t(""),g=t([]);U(w,()=>{$.get("/Feeds/Posts_list",{withCredentials:!0}).then(a=>{console.log(a),p.value=a.data}).catch(a=>{console.log("오류발생"),console.log(a)})},{immediate:!0});const B=()=>{f.commit("Switch_isWrite")},P=()=>{m.value=!m.value,k.value=m.value?M:x},T=()=>{v.value=!v.value,h.value=v.value?R:y};return(a,i)=>{const r=W("router-link");return l(),o("div",q,[e("div",z,[e("span",G,[(l(!0),o(C,null,D(g.value,(s,I)=>(l(),o("span",{key:I,class:"tag"},[c(u(s)+" ",1),e("button",{class:"deleteTagButton",onClick:le=>b(I)},"x",8,J)]))),128))]),e("span",O,[A(e("input",{class:"SearchTag",type:"text","onUpdate:modelValue":i[0]||(i[0]=s=>n.value=s),onKeyup:H(F,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[E,n.value]]),e("button",{onClick:i[1]||(i[1]=s=>B()),class:"writebutton"}," 글쓰기 ")])]),p.value?(l(),o("div",{key:0,class:"feedSlider",ref_key:"feedSliderContainer",ref:S},[(l(!0),o(C,null,D(p.value,s=>(l(),o("div",Q,[_(r,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}}},{default:d(()=>[e("img",{src:s.Image_Src,alt:"",class:"Eximage"},null,8,X)]),_:2},1032,["to"]),e("ul",null,[e("li",Y,[e("img",{src:s.Profile_Img,alt:"",class:"profile"},null,8,Z),_(r,{to:{name:"PersonalPage",params:{User_ID:"_youngs_"}},class:"userID"},{default:d(()=>[c(u(s.User_ID),1)]),_:2},1024),e("img",{src:k.value,alt:"",class:"like",onClick:P},null,8,ee),e("img",{src:h.value,alt:"",class:"save",onClick:T},null,8,se)]),e("li",null,[_(r,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}},class:"title"},{default:d(()=>[c(u(s.Post_Title),1)]),_:2},1032,["to"])]),e("li",null,[_(r,{to:{name:"FeedDetail",params:{Post_ID:s.Post_ID}},class:"description"},{default:d(()=>[c(u(s.Post_Caption),1)]),_:2},1032,["to"])])])]))),256))],512)):K("",!0)])}}},ce=j(te,[["__scopeId","data-v-bc7140f3"]]);export{ce as default};
