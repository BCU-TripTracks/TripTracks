import{c as A,r as n,e as i,f as e,j as c,g as E,h as I,y,t as S,w as x,m as k,i as b,n as R,F as T,l as B,a as j,d as a,x as z,p as M,k as q,u as G}from"./index-CHL-2fQ3.js";import{_ as D}from"./dropdown-DFkPxgV_.js";import{P as H,N as J,S as O,a as Q}from"./pagination-wVKkEKM5.js";import{_ as X}from"./_plugin-vue_export-helper-DlAUqK2U.js";const m=d=>(M("data-v-ab553cad"),d=d(),q(),d),Y={class:"writepot"},Z={class:"writecontainer"},ee=m(()=>e("span",{class:"newarticle"},"게시물 수정",-1)),te={class:"articlebox"},se={class:"photobox"},oe={key:0,for:"chooseFile",class:"selectphoto"},ae={key:1,class:"photobox",pagination:"true",modules:"[Pagination]"},le=["src"],ne={key:0,class:"commentbox"},ie={class:"userinfo"},ce=["src"],de={class:"userid"},re={class:"articlecomment"},ue=m(()=>e("img",{src:D,alt:"",class:"down-icon"},null,-1)),pe={key:0,class:"tagbox"},_e={id:"result",class:"tagresult"},me=["onClick"],ve=m(()=>e("img",{src:D,alt:"",class:"down-icon"},null,-1)),he={key:1,class:"locatebox"},ge=m(()=>e("div",{id:"map"},null,-1)),fe=[ge],we={class:"buttonzone"},ye={__name:"modify",setup(d){const v=G(),F=A(()=>v.state.User_ID),r=n(""),u=n([]),h=n(""),g=n(""),P=n(null),C=n([]),p=n([]),V=()=>{u.value.push(r.value),r.value=""};function U(o){const t=o.target.files;for(let s=0;s<t.length;s++){const l=t[s];if(C.value.push(l),l&&l.type.startsWith("image")){const _=new FileReader;_.onload=()=>{p.value.push(_.result)},_.readAsDataURL(l)}else alert("이미지 파일을 선택해주세요.")}}const N=()=>{const o=new FormData;o.append("Title",h.value),o.append("comment",g.value),o.append("tag",u.value),C.value.forEach(t=>{o.append("image",t)}),j.post("/Feeds/Post_Save",o,{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}}).then(t=>{t.status==200&&(v.commit("Switch_isWrite"),location.reload()),console.log(t)}).catch(t=>{console.log("오류발생"),console.log(t)})},L=o=>{u.value.splice(o,1)},f=n(!1),w=n(!1),W=()=>{f.value=!f.value},K=()=>{w.value=!w.value},$=[H,J];return(o,t)=>(a(),i("div",Y,[e("div",Z,[ee,e("div",te,[e("div",se,[p.value.length===0?(a(),i("label",oe," 👉 CLICK 👈 ")):c("",!0),e("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},ref_key:"Input_Img",ref:P,multiple:"",onChange:U},null,544),p.value.length>0?(a(),i("div",ae,[E(y(Q),{spaceBetween:10,slidesPerView:1,pagination:!0,navigation:!0,modules:$,class:"mySwiper"},{default:I(()=>[(a(!0),i(T,null,B(p.value,(s,l)=>(a(),z(y(O),{key:l},{default:I(()=>[e("img",{src:s,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,le)]),_:2},1024))),128))]),_:1})])):c("",!0)]),o.Post_Data?(a(),i("div",ne,[e("div",ie,[e("span",null,[e("img",{src:o.Post_Data.post.Profile_Img,alt:"",class:"profile"},null,8,ce)]),e("span",de,S(F.value),1)]),e("div",null,[e("span",null,[x(e("input",{class:"Title",type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>h.value=s),placeholder:"제목을 입력하세요."},null,512),[[k,h.value]])])]),e("div",re,[x(e("textarea",{class:"Content",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":t[1]||(t[1]=s=>g.value=s)},null,512),[[k,g.value]]),e("button",{class:"dropdown-button",onClick:W},[b(" add tag "),ue]),f.value?(a(),i("div",pe,[x(e("input",{class:"inputtag",type:"text","onUpdate:modelValue":t[2]||(t[2]=s=>r.value=s),onKeyup:R(V,["enter"]),placeholder:"이 곳에서 Tag를 추가해보세요."},null,544),[[k,r.value]]),e("div",_e,[(a(!0),i(T,null,B(u.value,(s,l)=>(a(),i("span",{key:l,class:"tag"},[b(S(s)+" ",1),e("button",{class:"deleteTagButton",onClick:_=>L(l)},"x",8,me)]))),128))])])):c("",!0),e("button",{class:"dropdown-button",onClick:K},[b(" add location "),ve]),w.value?(a(),i("div",he,fe)):c("",!0),e("div",we,[e("button",{class:"complete",onClick:t[3]||(t[3]=s=>N())},"완료")])])])):c("",!0)])]),e("div",{class:"blur",onClick:t[4]||(t[4]=s=>y(v).commit("Switch_isWrite"))})]))}},Ie=X(ye,[["__scopeId","data-v-ab553cad"]]);export{Ie as default};
