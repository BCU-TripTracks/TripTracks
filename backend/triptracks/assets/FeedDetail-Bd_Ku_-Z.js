import{c as w,r as u,o as j,a as c,A as z,e as i,f as s,g as S,h as x,t as l,y as d,j as p,D as A,F as b,l as U,w as T,m as O,n as K,E as $,b as q,d as n,i as G,x as J,v as Q,p as W,k as X,z as Z,u as ee}from"./index-4ydSH2Vs.js";import{l as se,s as te}from"./like-Cq13m2ZL.js";import{h as B}from"./moment-C5S46NFB.js";import{S as _}from"./sweetalert2.esm.all-Br4OTrmy.js";import{P as oe,N as ae,S as le,a as ne}from"./pagination-D1L8o-GA.js";import{l as ie}from"./likeed-BS52KISc.js";import{_ as ce}from"./_plugin-vue_export-helper-DlAUqK2U.js";const re="/assets/404img-CbatP5_C.avif",ue=h=>(W("data-v-bd8de29f"),h=h(),X(),h),de={key:0,class:"discription"},_e={class:"feedinfobox"},me=["src"],pe={class:"commentdetail"},he={class:"username"},ve={class:"sub"},fe={class:"uploadtime"},ge={class:"userbutton"},we={key:0,class:"Ownerbox"},Ce={key:1,class:"Audiencebox"},ke={class:"slidewrapContainer"},De={class:"slidewrap"},Ie=["src","data-fallback"],ye={class:"interact"},xe={class:"caption"},be={class:"place"},Ue={class:"makerdrop"},Be={class:"LCS"},Fe={class:"LC"},Pe=["src"],Se=ue(()=>s("span",null,[s("img",{src:te,alt:"",class:"save"})],-1)),Te=["src"],Ye={class:"commentdetail"},Le={class:"username"},Me={class:"content"},Re={class:"sub"},He={class:"uploadtime"},Ne=["onClick"],Ee={class:"commentcontainer"},Ve={__name:"FeedDetail",setup(h){const C=$(),F=Z(),k=ee();w(()=>k.state.isModify),w(()=>C.params.Post_ID);const D=w(()=>k.state.User_ID),Y=u({}),t=u(null);u(null);const v=w(()=>t.value&&D.value===t.value.post.User_ID),L=async()=>{await c.post("/Direct/search_Room",{toUser_ID:Y.value.User_ID},{withCredentials:!0}).then(e=>{console.log(e.data);const{Room_ID:o}=e.data;F.push({name:"Room",params:{Room_ID:o}})}).catch(e=>{console.log(e)})},M=()=>{t.value.isFollowedByCurrentUser&&_.fire({title:"정말 팔로우를 취소하시겠습니까?",text:" ",icon:"warning",showCancelButton:!0,confirmButtonText:"팔로우 취소",cancelButtonText:"취소"}).then(async e=>{e.isConfirmed&&await c.post("/user/unfollow",{userId:t.value.post.User_ID},{withCredentials:!0}).then(o=>{console.log(o.data),_.fire("팔로우 취소","팔로우가 취소되었습니다.","success"),k.commit("Update_Follow_Status",!1)}).catch(o=>{console.log(o)})})},R=async()=>{_.fire({title:"정말로 게시글을 삭제하시겠습니까?",text:"삭제된 게시글은 되돌릴 수 없습니다.",icon:"warning",showCancelButton:!0,confirmButtonText:"삭제",cancelButtonText:"취소"}).then(async e=>{e.isConfirmed?await c.post("/feeds/Post_delete",{postId:t.value.post.Post_ID},{withCredentials:!0}).then(o=>{console.log(o.data),_.fire("게시글이 삭제되었습니다!","홈화면으로 이동합니다.","success"),t.value=null,F.push({name:"HomeFeed"})}).catch(o=>{console.log(o)}):e.dismiss===_.DismissReason.cancel&&_.fire("게시글 삭제가 취소되었습니다.","ㅋㅋ봐줌","error")})},f=u(""),I=u([]),y=()=>{c.post("/feeds/Comment/list",{Post_ID:t.value.post.Post_ID},{withCredentials:!0}).then(e=>{I.value=e.data,console.log(e.data)}).catch(e=>{console.log("오류발생"),console.log(e)})},P=()=>{B().format("YYYY년 MM월 DD일 HH:mm"),c.post("/feeds/Comment/add",{Post_ID:t.value.post.Post_ID,Comment:f.value},{withCredentials:!0}).then(e=>{console.log(e.data),y()}).catch(e=>{console.log("오류발생"),console.log(e)}),f.value=""},H=e=>{e.User_ID===D.value&&_.fire({title:"정말 코멘트를 지우겠습니까?",text:" ",icon:"warning",showCancelButton:!0,confirmButtonText:"코멘트 삭제",cancelButtonText:"취소"}).then(async o=>{o.isConfirmed&&c.post("/feeds/Comment/delete",{Comment_ID:e.Comment_ID},{withCredentials:!0}).then(r=>{console.log(r.data),y()}).catch(r=>{console.log("오류발생"),console.log(r)})})};u(null),j(()=>{console.log("테스트1"),console.log(C.params.Post_ID),c.get("/Feeds/Post_detail/"+C.params.Post_ID,{withCredentials:!0}).then(async e=>{t.value=e.data,console.log(t.value),console.log(t.value.post),y()}).catch(e=>{console.log("오류발생"),console.log(e)})});const N=e=>{e.isLike?c.post("/feeds/Like/remove",{postId:e.Post_ID},{withCredentials:!0}).then(o=>{e.isLike=!e.isLike}).catch(o=>{o.response.status==400}):c.post("/feeds/Like/add",{postId:e.Post_ID},{withCredentials:!0}).then(o=>{e.isLike=!e.isLike}).catch(o=>{o.response.status==400})},E=e=>{e.target.src=e.target.getAttribute("data-fallback")},V=[oe,ae],g=u();return z(g,(e,o)=>{if(e!=o){const r={injectStyles:[`
        .mySwiper{
          width: 600px !important;
          height: auto !important;
          max-width: 1200px !important;
          margin: 0 auto !important;
          overflow: hidden !important;
          display: inline-block !important;
        }
      `]};Object.assign(g.value,r),g.value.initialize()}}),(e,o)=>{const r=q("router-link");return t.value?(n(),i("div",de,[s("div",_e,[s("img",{src:t.value.post.Profile_Img,alt:"",class:"profile"},null,8,me),s("div",pe,[s("div",null,[s("span",he,[S(r,{to:{name:"PersonalPage",params:{User_ID:t.value.post.User_ID}},class:"userID"},{default:x(()=>[G(l(t.value.post.User_ID),1)]),_:1},8,["to"])])]),s("div",ve,[s("span",fe,l(d(B)(t.value.post.Post_Create_Timestamp).format("YYYY년 MM월 DD일 HH:mm")),1)])]),s("div",ge,[v.value?(n(),i("div",we,[s("button",{class:"feeddelete",onClick:R},"삭제")])):p("",!0),v.value?p("",!0):(n(),i("div",Ce)),v.value?p("",!0):(n(),i("button",{key:2,class:"follow",onClick:M,style:A({backgroundColor:t.value.isFollowedByCurrentUser?"#EFEFEF":"black",borderColor:t.value.isFollowedByCurrentUser?"#F2F2F2":"black",color:t.value.isFollowedByCurrentUser?"black":"white"})},l(t.value.isFollowedByCurrentUser?"팔로잉":"팔로우"),5)),v.value?p("",!0):(n(),i("button",{key:3,class:"message",onClick:L},"메시지"))])]),s("div",ke,[s("div",De,[S(d(ne),{ref_key:"swiperRef",ref:g,init:"false",spaceBetween:1,slidesPerView:1,pagination:!0,navigation:!0,modules:V,class:"mySwiper"},{default:x(()=>[(n(!0),i(b,null,U(t.value.post.Image_Srcs,(a,m)=>(n(),J(d(le),{key:m},{default:x(()=>[s("img",{src:a,onError:E,"data-fallback":d(re),alt:"Image preview"},null,40,Ie)]),_:2},1024))),128))]),_:1},512)]),s("div",null,[s("div",ye,[s("div",null,l(t.value.post.Post_Title),1),s("div",xe,l(t.value.post.Post_Caption),1)])])]),s("ul",be,[(n(!0),i(b,null,U(t.value.tags,(a,m)=>(n(),i("li",{class:"tag",key:m},"#"+l(a),1))),128))]),s("ul",Ue,[s("li",Be,[s("span",Fe,"좋아요 "+l(t.value.post.likeCount)+" 댓글 "+l(I.value.length),1),s("span",null,[s("img",{src:t.value.post.isLike?d(ie):d(se),alt:"",class:"like",onClick:o[0]||(o[0]=a=>N(t.value.post))},null,8,Pe)]),Se])]),(n(!0),i(b,null,U(I.value,(a,m)=>(n(),i("div",{key:m,class:"commentbox"},[s("span",null,[s("img",{src:a.Profile_Img,alt:"",class:"profile"},null,8,Te)]),s("div",Ye,[s("div",null,[s("span",Le," @"+l(a.User_ID)+"-"+l(a.User_Name),1),s("span",Me,l(a.Comment_Text),1)]),s("div",Re,[s("span",He,l(d(B)(a.Comment_Timestamp).format("YYYY년MM월DD일 HH:mm:ss")),1),T(s("span",{class:"reply",onClick:je=>H(a)},"삭제",8,Ne),[[Q,a.User_ID===D.value]])])])]))),128)),s("div",Ee,[T(s("input",{class:"comment",type:"text",placeholder:"댓글을 입력하세요.","onUpdate:modelValue":o[1]||(o[1]=a=>f.value=a),onKeypress:K(P,["enter"])},null,544),[[O,f.value]]),s("button",{class:"commenting",onClick:P},"입력")])])):p("",!0)}}},Je=ce(Ve,[["__scopeId","data-v-bd8de29f"]]);export{Je as default};
