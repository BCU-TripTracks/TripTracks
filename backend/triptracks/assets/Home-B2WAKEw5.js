import{u as R,c as S,r as d,o as K,a as C,b as W,d as e,e as o,w as T,v as O,f as s,g as v,h as $,i as m,F as w,p as M,j as N,k as I,t as y,l as g,m as P,n as j,q as Q,s as Y,x as Z,y as ss,z as A}from"./index-By30rEyO.js";import{_ as F}from"./_plugin-vue_export-helper-DlAUqK2U.js";/* empty css                                                                */import{_ as es}from"./ProfileImage-DDAmAK24.js";import{_ as q}from"./dropdown-DFkPxgV_.js";const ts="/assets/messageIcon-MKfStX56.png",os=a=>(M("data-v-57e8827e"),a=a(),N(),a),as={class:"subscription_ambassador"},ls=os(()=>s("p",null,"당신도 할 수 있다 앰버서더",-1)),ns={class:"header_upper_menu"},cs={class:"header"},is={class:"header_menu"},ds={class:"header_menu_list"},_s={class:"header_menu_list"},rs={class:"header_menu_list"},us={class:"logo"},ps={class:"header_menu"},vs={class:"header_menu_list"},ms={class:"header_menu_list"},hs={class:"header_menu_list"},gs={__name:"header",setup(a){const l=R(),h=S(()=>l.state.User_ID),u=d(0),b=()=>{l.commit("Switch_isNoti")},k=()=>{console.log("로그아웃실행"),C.get("/users/logout",{withCredentials:!0}).then(c=>{console.log("asdasdsadsadsadasd"),console.log(c.data),c.data.success&&l.dispatch("checkSession")}).catch(c=>{console.log(c)})};return K(()=>{l.dispatch("checkSession"),C.get("/users/check_Rule",{withCredentials:!0}).then(c=>{console.log(c.data),u.value=c.data.Rule}).catch(c=>{console.log(c)})}),(c,f)=>{const _=W("router-link");return e(),o(w,null,[T(s("div",as,[ls,v(_,{to:{name:"Subscription"}},{default:$(()=>[m(" 바로 신청하기")]),_:1})],512),[[O,u.value===0]]),s("ul",ns,[s("li",null,[v(_,{to:{name:"Ambassador"},class:"mypage"},{default:$(()=>[m(" 앰버서더 ")]),_:1})]),s("li",{onClick:b,class:"noti"},"알림"),s("li",null,[v(_,{to:{name:"myPage"},class:"mypage"},{default:$(()=>[m(" 마이페이지 ")]),_:1})]),s("li",{onClick:f[0]||(f[0]=i=>k()),class:"Logout"},"로그아웃")]),s("div",cs,[s("div",is,[s("ul",null,[s("li",ds,[v(_,{to:{name:"followingtab"}},{default:$(()=>[m("팔로잉 ")]),_:1})]),s("li",_s,[v(_,{to:{name:"searcingtab"}},{default:$(()=>[m("탐색 ")]),_:1})]),s("li",rs,[v(_,{to:{name:"popularitytab"}},{default:$(()=>[m("인기 ")]),_:1})])])]),s("div",us,[s("h1",null,[v(_,{to:{name:"HomeFeed"}},{default:$(()=>[m(" TripTracks ")]),_:1})])]),s("div",ps,[s("ul",null,[s("li",vs,[v(_,{to:{name:"DirectMessage"}},{default:$(()=>[m("DirectMessage ")]),_:1})]),s("li",ms,[v(_,{to:{name:"PersonalPage",params:{User_ID:h.value}}},{default:$(()=>[m("프로필 ")]),_:1},8,["to"])]),s("li",hs,[v(_,{to:{name:"planner"}},{default:$(()=>[m("Planner ")]),_:1})])])])])],64)}}},fs=F(gs,[["__scopeId","data-v-57e8827e"]]),z="/assets/ProfileImage2-DAt-H7rB.png",$s="/assets/ProfileImage3-kxNyjHTU.png",D=a=>(M("data-v-ab10c39a"),a=a(),N(),a),bs={class:"messagecontainer"},ks={class:"chatmenu"},xs={class:"chatcontainer"},ws={key:0},ys=["src"],Is={class:"chatroom"},Cs={class:"userID"},Ds={class:"userID"},Us=D(()=>s("div",{class:"sub"},[s("span",{class:"chatcontent"},"뷰 너무 어렵습니다.")],-1)),Ss={key:1,class:"chatroom"},Ts=Q('<div class="roomname" data-v-ab10c39a><span data-v-ab10c39a><img src="'+z+'" alt="" class="profile" data-v-ab10c39a></span><div class="commentdetail" data-v-ab10c39a><div data-v-ab10c39a><span class="userID" data-v-ab10c39a>Juuho.0</span></div><div class="sub" data-v-ab10c39a><span class="uesrname" data-v-ab10c39a>오준호</span></div></div></div>',1),Ms={class:"conversation"},Ns=D(()=>s("div",{class:"friend"},[s("span",{class:"friendchat"},"진짜 쉬워")],-1)),Fs=D(()=>s("div",{class:"me"},[s("span",{class:"mychat"},"뷰 너무 어렵습니다.")],-1)),Bs={class:"commentdetail"},Ps={class:"me"},Rs={class:"mychat"},Vs={class:"textcontainer"},Ls={key:2},As={key:3},Ws=D(()=>s("div",{class:"searchbox"},[s("input",{type:"text",class:"search",placeholder:" 친구를 찾아보세요."})],-1)),Hs=["onClick"],Ks=["src"],js={class:"userlistbox"},qs={class:"userID"},zs={class:"sub"},Es={class:"username"},Js={key:4},Xs={class:"chatbox"},Gs=D(()=>s("span",null,[s("img",{src:$s,alt:"",class:"profile"})],-1)),Os=D(()=>s("div",{class:"userlistbox"},[s("div",null,[s("span",{class:"userID"},"mxoxxo"),s("span",null," 님이 메시지를 요청하였습니다.")])],-1)),Qs=[Gs,Os],Ys={__name:"message",setup(a){R();const l=d("messages");d("message");const h=d(""),u=d([]),b=d([]),k=d([]),c=d([]),f=()=>{u.value.push(h.value),Y.emit("sendComment",h.value),h.value=""};K(()=>{C.get("/dms/followList").then(i=>{if(console.log(i.data),!i.data.success)return console.log(`${i.data.msg}`);const{userInfoMap:t}=i.data;b.value=t.follower,k.value=t.following}).catch(i=>{console.log(i)}),C.get("/dms/dmRooms").then(i=>{console.log(i.data);const{Rooms:t}=i.data;c.value=t}).catch(i=>{console.log(i)})});const _=i=>{C.post("/dms/createDM",{targetID:i}).then(t=>{if(console.log(t.data),!t.data.success)return console.log(`${t.data.msg}`);c.value=t.data.Rooms}).catch(t=>{console.log(t)})};return(i,t)=>(e(),o("div",bs,[s("div",ks,[s("span",{class:"messagebox",onClick:t[0]||(t[0]=n=>l.value="messages")},"메시지함"),s("span",{class:"follow",onClick:t[1]||(t[1]=n=>l.value="follow")},"팔로우"),s("span",{class:"following",onClick:t[2]||(t[2]=n=>l.value="following")},"팔로잉"),s("span",{class:"request",onClick:t[3]||(t[3]=n=>l.value="request")},"요청")]),s("div",xs,[l.value==="messages"?(e(),o("div",ws,[(e(!0),o(w,null,I(c.value,n=>(e(),o("div",{class:"chatbox",onClick:t[4]||(t[4]=U=>l.value="message")},[s("span",null,[s("img",{src:n.Target_User.Profile_Img,alt:"",class:"profile"},null,8,ys)]),s("div",Is,[s("div",null,[s("span",Cs,y(n.Target_User.User_ID),1),s("span",Ds,y(n.Target_User.User_Name),1)]),Us])]))),256))])):g("",!0),l.value==="message"?(e(),o("div",Ss,[Ts,s("div",Ms,[Ns,Fs,(e(!0),o(w,null,I(u.value,(n,U)=>(e(),o("div",{key:U,class:"commentbox"},[s("div",Bs,[s("div",Ps,[s("span",Rs,y(n),1)])])]))),128))]),s("div",Vs,[T(s("input",{class:"text",type:"text",placeholder:"채팅을 입력하세요","onUpdate:modelValue":t[5]||(t[5]=n=>h.value=n),onKeyup:j(f,["enter"])},null,544),[[P,h.value]]),s("button",{class:"send",onClick:f},"보내기")])])):g("",!0),l.value==="follow"?(e(),o("div",Ls)):g("",!0),l.value==="following"?(e(),o("div",As,[Ws,(e(!0),o(w,null,I(k.value,n=>(e(),o("div",{class:"chatbox",onClick:U=>_(n.User_ID)},[s("span",null,[s("img",{src:n.Profile_Img,alt:"",class:"profile"},null,8,Ks)]),s("div",js,[s("div",null,[s("span",qs,y(n.User_ID),1)]),s("div",zs,[s("span",Es,y(n.User_Name),1)])])],8,Hs))),256))])):g("",!0),l.value==="request"?(e(),o("div",Js,[(e(!0),o(w,null,I(Array(6),n=>(e(),o("div",Xs,Qs))),256))])):g("",!0)])]))}},Zs=F(Ys,[["__scopeId","data-v-ab10c39a"]]),E=a=>(M("data-v-bd750d5a"),a=a(),N(),a),se={class:"signcontainer"},ee=E(()=>s("span",{class:"sign"},"새로운 알림",-1)),te={class:"notification"},oe={class:"notibox"},ae=E(()=>s("div",{class:"feedinfobox"},[s("span",null,[s("img",{src:z,alt:"",class:"profile"})]),s("div",{class:"commentdetail"},[s("div",null,[s("span",{class:"username"},"오준호님이 회원님을 팔로우하기 시작했습니다.")])])],-1)),le=[ae],ne={__name:"notification",setup(a){return(l,h)=>(e(),o("div",se,[ee,s("div",te,[(e(!0),o(w,null,I(Array(20),u=>(e(),o("div",oe,le))),256))])]))}},ce=F(ne,[["__scopeId","data-v-bd750d5a"]]),B=a=>(M("data-v-abb5d50e"),a=a(),N(),a),ie={class:"writepot"},de={class:"writecontainer"},_e=B(()=>s("span",{class:"newarticle"},"새 게시물 작성",-1)),re={class:"articlebox"},ue={class:"photobox"},pe={key:0,for:"chooseFile",class:"selectphoto"},ve={key:1,class:"photobox"},me=["src"],he={class:"commentbox"},ge={class:"userinfo"},fe=B(()=>s("span",null,[s("img",{src:es,alt:"",class:"profile"})],-1)),$e={class:"userid"},be={class:"articlecomment"},ke=B(()=>s("img",{src:q,alt:"",class:"down-icon"},null,-1)),xe={key:0,class:"tagbox"},we={id:"result",class:"tagresult"},ye=["onClick"],Ie=B(()=>s("img",{src:q,alt:"",class:"down-icon"},null,-1)),Ce={key:1,class:"locatebox"},De=B(()=>s("div",{id:"map"},null,-1)),Ue=[De],Se={class:"buttonzone"},Te={__name:"write",setup(a){const l=R(),h=S(()=>l.state.User_ID),u=d(""),b=d([]);d(null);const k=d(""),c=d(""),f=d(""),_=d(null),i=d(null),t=()=>{b.value.push(u.value),u.value=""};function n(x){const r=x.target.files[0];if(i.value=_.value.files[0],r&&r.type.startsWith("image")){const p=new FileReader;p.onload=()=>{k.value=p.result},p.readAsDataURL(r)}else alert("이미지 파일을 선택해주세요.")}const U=()=>{console.log(i.value),C.post("/Feeds/Post_Save",{Title:c.value,comment:f.value,tag:b.value,image:i.value},{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}}).then(x=>{x.status==200&&l.commit("Switch_isWrite"),console.log(x)}).catch(x=>{console.log("오류발생"),console.log(x)})},J=x=>{b.value.splice(x,1)},V=d(!1),L=d(!1),X=()=>{V.value=!V.value},G=()=>{L.value=!L.value};return(x,r)=>(e(),o("div",ie,[s("div",de,[_e,s("div",re,[s("div",ue,[k.value?g("",!0):(e(),o("label",pe," 👉 CLICK 👈 ")),s("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},ref_key:"Input_Img",ref:_,onChange:n},null,544),k.value?(e(),o("div",ve,[s("div",null,[s("img",{src:k.value,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,me)])])):g("",!0)]),s("div",he,[s("div",ge,[fe,s("span",$e,y(h.value),1)]),s("div",null,[s("span",null,[T(s("input",{class:"Title",type:"text","onUpdate:modelValue":r[0]||(r[0]=p=>c.value=p),placeholder:"제목을 입력하세요."},null,512),[[P,c.value]])])]),s("div",be,[T(s("textarea",{class:"Content",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":r[1]||(r[1]=p=>f.value=p)},null,512),[[P,f.value]]),s("button",{class:"dropdown-button",onClick:X},[m(" add tag"),ke]),V.value?(e(),o("div",xe,[T(s("input",{class:"inputtag",type:"text","onUpdate:modelValue":r[2]||(r[2]=p=>u.value=p),onKeyup:j(t,["enter"]),placeholder:"이 곳에서 Tag를 추가해보세요."},null,544),[[P,u.value]]),s("div",we,[(e(!0),o(w,null,I(b.value,(p,H)=>(e(),o("span",{key:H,class:"tag"},[m(y(p)+" ",1),s("button",{class:"deleteTagButton",onClick:Ve=>J(H)}," x ",8,ye)]))),128))])])):g("",!0),s("button",{class:"dropdown-button",onClick:G},[m(" add location"),Ie]),L.value?(e(),o("div",Ce,Ue)):g("",!0),s("div",Se,[s("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},onChange:n},null,32),s("button",{class:"complete",onClick:r[3]||(r[3]=p=>U())},"완료")])])])])]),s("div",{class:"blur",onClick:r[4]||(r[4]=p=>Z(l).commit("Switch_isWrite"))})]))}},Me=F(Te,[["__scopeId","data-v-abb5d50e"]]),Ne=a=>(M("data-v-6e2b53f1"),a=a(),N(),a),Fe=Ne(()=>s("img",{src:ts,alt:"",class:"airplane"},null,-1)),Be={class:"main-container"},Pe={class:"section"},Re={__name:"Home",setup(a){const l=R(),h=S(()=>l.state.isNoti),u=S(()=>l.state.isMsg),b=S(()=>l.state.isWrite);return ss(),(k,c)=>{const f=W("router-link"),_=W("router-view");return e(),o(w,null,[b.value?(e(),A(Me,{key:0})):g("",!0),h.value?(e(),A(ce,{key:1})):g("",!0),u.value?(e(),A(Zs,{key:2})):g("",!0),v(fs),v(f,{to:"/DirectMessage",class:"write"},{default:$(()=>[Fe]),_:1}),s("div",Be,[s("div",Pe,[s("div",null,[v(_)])])])],64)}}},je=F(Re,[["__scopeId","data-v-6e2b53f1"]]);export{je as default};
