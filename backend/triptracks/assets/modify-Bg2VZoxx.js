import{c as D,r as o,e as l,f as e,j as r,t as C,w as m,m as h,i as g,n as L,F as K,l as N,x as $,d as a,p as A,k as M,u as R}from"./index-Vsuo-NJs.js";import{_ as W}from"./ProfileImage-DDAmAK24.js";import{_ as I}from"./dropdown-DFkPxgV_.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";const i=c=>(A("data-v-c9e4c84a"),c=c(),M(),c),z={class:"writepot"},E={class:"writecontainer"},P=i(()=>e("span",{class:"newarticle"},"게시글 수정",-1)),q={class:"articlebox"},G={class:"photobox"},H={key:0,for:"chooseFile",class:"selectphoto"},J={key:1,class:"photobox"},O=["src"],Q={class:"commentbox"},X={class:"userinfo"},Y=i(()=>e("span",null,[e("img",{src:W,alt:"",class:"profile"})],-1)),Z={class:"userid"},ee={class:"articlecomment"},te=i(()=>e("img",{src:I,alt:"",class:"down-icon"},null,-1)),se={key:0,class:"tagbox"},oe={id:"result",class:"tagresult"},le=["onClick"],ae=i(()=>e("img",{src:I,alt:"",class:"down-icon"},null,-1)),ne={key:1,class:"locatebox"},ie=i(()=>e("div",{id:"map"},null,-1)),ce=[ie],de={class:"buttonzone"},ue={__name:"modify",setup(c){const f=R(),F=D(()=>f.state.User_ID),d=o(""),p=o([]);o(null);const u=o(""),y=o(""),x=o(""),w=o(null),T=o(null),B=()=>{p.value.push(d.value),d.value=""};function b(n){const t=n.target.files[0];if(T.value=w.value.files[0],t&&t.type.startsWith("image")){const s=new FileReader;s.onload=()=>{u.value=s.result},s.readAsDataURL(t)}else alert("이미지 파일을 선택해주세요.")}const U=n=>{p.value.splice(n,1)},_=o(!1),v=o(!1),S=()=>{_.value=!_.value},V=()=>{v.value=!v.value};return(n,t)=>(a(),l("div",z,[e("div",E,[P,e("div",q,[e("div",G,[u.value?r("",!0):(a(),l("label",H," 👉 CLICK 👈 ")),e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},ref_key:"Input_Img",ref:w,onChange:b},null,544),u.value?(a(),l("div",J,[e("div",null,[e("img",{src:u.value,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,O)])])):r("",!0)]),e("div",Q,[e("div",X,[Y,e("span",Z,C(F.value),1)]),e("div",null,[e("span",null,[m(e("input",{class:"Title",type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>y.value=s),placeholder:"제목을 입력하세요."},null,512),[[h,y.value]])])]),e("div",ee,[m(e("textarea",{class:"Content",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":t[1]||(t[1]=s=>x.value=s)},null,512),[[h,x.value]]),e("button",{class:"dropdown-button",onClick:S},[g(" add tag"),te]),_.value?(a(),l("div",se,[m(e("input",{class:"inputtag",type:"text","onUpdate:modelValue":t[2]||(t[2]=s=>d.value=s),onKeyup:L(B,["enter"]),placeholder:"이 곳에서 Tag를 추가해보세요."},null,544),[[h,d.value]]),e("div",oe,[(a(!0),l(K,null,N(p.value,(s,k)=>(a(),l("span",{key:k,class:"tag"},[g(C(s)+" ",1),e("button",{class:"deleteTagButton",onClick:re=>U(k)}," x ",8,le)]))),128))])])):r("",!0),e("button",{class:"dropdown-button",onClick:V},[g(" add location"),ae]),v.value?(a(),l("div",ne,ce)):r("",!0),e("div",de,[e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:b},null,32),e("button",{class:"complete",onClick:t[3]||(t[3]=s=>n.sendWrite())},"완료")])])])])]),e("div",{class:"blur",onClick:t[4]||(t[4]=s=>$(f).commit("Switch_isModify"))})]))}},he=j(ue,[["__scopeId","data-v-c9e4c84a"]]);export{he as default};
