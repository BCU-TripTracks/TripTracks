import{u as R,c as I,r,o as j,a as P,b as E,d as t,e as l,w as F,v as os,f as s,g as f,h as b,i as $,j as g,F as x,s as q,p as N,k as L,l as S,t as C,m as A,n as J,q as as,x as B,y as H,z as G,A as ls,B as T}from"./index-CHL-2fQ3.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";/* empty css                                                               *//* empty css                                                                */import{_ as O}from"./dropdown-DFkPxgV_.js";import{S as ns,a as cs,P as is,N as ds}from"./pagination-wVKkEKM5.js";import{h as rs}from"./moment-C5S46NFB.js";const us=n=>(N("data-v-c4ab5629"),n=n(),L(),n),_s={class:"subscription_ambassador"},vs=us(()=>s("p",null,"당신도 할 수 있다 앰버서더",-1)),ms={class:"header_upper_menu"},ps={class:"header"},hs={class:"header_menu"},gs={class:"header_menu_list"},fs={class:"header_menu_list"},$s={class:"header_menu_list"},ws={class:"logo"},bs={class:"header_menu"},ks={class:"header_menu_list"},Is={key:0,class:"header_menu_list"},xs={class:"header_menu_list"},ys={__name:"header",setup(n){const o=R(),m=I(()=>o.state.User_ID),w=r(0),p=()=>{console.log("로그아웃실행"),q.emit("logout",m),P.get("/users/logout",{withCredentials:!0}).then(i=>{o.dispatch("checkSession")}).catch(i=>{console.log(i)})};return j(()=>{P.get("/users/check_Rule",{withCredentials:!0}).then(i=>{console.log(i.data),w.value=i.data.Rule}).catch(i=>{console.log(i)})}),(i,u)=>{const c=E("router-link");return t(),l(x,null,[F(s("div",_s,[vs,f(c,{to:{name:"Subscription"}},{default:b(()=>[$(" 바로 신청하기")]),_:1})],512),[[os,w.value===0]]),s("ul",ms,[s("li",null,[f(c,{to:{name:"Ambassador"},class:"mypage"},{default:b(()=>[$(" 앰버서더 ")]),_:1})]),s("li",null,[f(c,{to:{name:"myPage"},class:"mypage"},{default:b(()=>[$(" 마이페이지 ")]),_:1})]),s("li",{onClick:u[0]||(u[0]=D=>p()),class:"Logout"},"로그아웃")]),s("div",ps,[s("div",hs,[s("ul",null,[s("li",gs,[f(c,{to:{name:"followingtab"}},{default:b(()=>[$("팔로잉 ")]),_:1})]),s("li",fs,[f(c,{to:{name:"searcingtab"}},{default:b(()=>[$("탐색 ")]),_:1})]),s("li",$s,[f(c,{to:{name:"popularitytab"}},{default:b(()=>[$("인기 ")]),_:1})])])]),s("div",ws,[s("h1",null,[f(c,{to:{name:"HomeFeed"}},{default:b(()=>[$(" TripTracks ")]),_:1})])]),s("div",bs,[s("ul",null,[s("li",ks,[f(c,{to:{name:"DirectMessage"}},{default:b(()=>[$("DirectMessage ")]),_:1})]),m.value?(t(),l("li",Is,[f(c,{to:{name:"PersonalPage",params:{User_ID:m.value}}},{default:b(()=>[$("프로필 ")]),_:1},8,["to"])])):g("",!0),s("li",xs,[f(c,{to:{name:"planner"}},{default:b(()=>[$("Planner ")]),_:1})])])])])],64)}}},Ds=U(ys,[["__scopeId","data-v-c4ab5629"]]),Q="/assets/ProfileImage2-DAt-H7rB.png",Cs="/assets/ProfileImage3-kxNyjHTU.png",M=n=>(N("data-v-ab10c39a"),n=n(),L(),n),Ss={class:"messagecontainer"},Ps={class:"chatmenu"},Us={class:"chatcontainer"},Ms={key:0},Ts=["src"],Bs={class:"chatroom"},Fs={class:"userID"},Rs={class:"userID"},Ns=M(()=>s("div",{class:"sub"},[s("span",{class:"chatcontent"},"뷰 너무 어렵습니다.")],-1)),Ls={key:1,class:"chatroom"},Vs=as('<div class="roomname" data-v-ab10c39a><span data-v-ab10c39a><img src="'+Q+'" alt="" class="profile" data-v-ab10c39a></span><div class="commentdetail" data-v-ab10c39a><div data-v-ab10c39a><span class="userID" data-v-ab10c39a>Juuho.0</span></div><div class="sub" data-v-ab10c39a><span class="uesrname" data-v-ab10c39a>오준호</span></div></div></div>',1),As={class:"conversation"},Hs=M(()=>s("div",{class:"friend"},[s("span",{class:"friendchat"},"진짜 쉬워")],-1)),Ws=M(()=>s("div",{class:"me"},[s("span",{class:"mychat"},"뷰 너무 어렵습니다.")],-1)),Ks={class:"commentdetail"},Ys={class:"me"},qs={class:"mychat"},zs={class:"textcontainer"},js={key:2},Es={key:3},Js=M(()=>s("div",{class:"searchbox"},[s("input",{type:"text",class:"search",placeholder:" 친구를 찾아보세요."})],-1)),Gs=["onClick"],Os=["src"],Qs={class:"userlistbox"},Xs={class:"userID"},Zs={class:"sub"},se={class:"username"},ee={key:4},te={class:"chatbox"},oe=M(()=>s("span",null,[s("img",{src:Cs,alt:"",class:"profile"})],-1)),ae=M(()=>s("div",{class:"userlistbox"},[s("div",null,[s("span",{class:"userID"},"mxoxxo"),s("span",null," 님이 메시지를 요청하였습니다.")])],-1)),le=[oe,ae],ne={__name:"message",setup(n){R();const o=r("messages");r("message");const m=r(""),w=r([]),p=r([]),i=r([]),u=r([]),c=()=>{w.value.push(m.value),q.emit("sendComment",m.value),m.value=""};j(()=>{P.get("/dms/followList").then(d=>{if(console.log(d.data),!d.data.success)return console.log(`${d.data.msg}`);const{userInfoMap:e}=d.data;p.value=e.follower,i.value=e.following}).catch(d=>{console.log(d)}),P.get("/dms/dmRooms").then(d=>{console.log(d.data);const{Rooms:e}=d.data;u.value=e}).catch(d=>{console.log(d)})});const D=d=>{P.post("/dms/createDM",{targetID:d}).then(e=>{if(console.log(e.data),!e.data.success)return console.log(`${e.data.msg}`);u.value=e.data.Rooms}).catch(e=>{console.log(e)})};return(d,e)=>(t(),l("div",Ss,[s("div",Ps,[s("span",{class:"messagebox",onClick:e[0]||(e[0]=a=>o.value="messages")},"메시지함"),s("span",{class:"follow",onClick:e[1]||(e[1]=a=>o.value="follow")},"팔로우"),s("span",{class:"following",onClick:e[2]||(e[2]=a=>o.value="following")},"팔로잉"),s("span",{class:"request",onClick:e[3]||(e[3]=a=>o.value="request")},"요청")]),s("div",Us,[o.value==="messages"?(t(),l("div",Ms,[(t(!0),l(x,null,S(u.value,a=>(t(),l("div",{class:"chatbox",onClick:e[4]||(e[4]=v=>o.value="message")},[s("span",null,[s("img",{src:a.Target_User.Profile_Img,alt:"",class:"profile"},null,8,Ts)]),s("div",Bs,[s("div",null,[s("span",Fs,C(a.Target_User.User_ID),1),s("span",Rs,C(a.Target_User.User_Name),1)]),Ns])]))),256))])):g("",!0),o.value==="message"?(t(),l("div",Ls,[Vs,s("div",As,[Hs,Ws,(t(!0),l(x,null,S(w.value,(a,v)=>(t(),l("div",{key:v,class:"commentbox"},[s("div",Ks,[s("div",Ys,[s("span",qs,C(a),1)])])]))),128))]),s("div",zs,[F(s("input",{class:"text",type:"text",placeholder:"채팅을 입력하세요","onUpdate:modelValue":e[5]||(e[5]=a=>m.value=a),onKeyup:J(c,["enter"])},null,544),[[A,m.value]]),s("button",{class:"send",onClick:c},"보내기")])])):g("",!0),o.value==="follow"?(t(),l("div",js)):g("",!0),o.value==="following"?(t(),l("div",Es,[Js,(t(!0),l(x,null,S(i.value,a=>(t(),l("div",{class:"chatbox",onClick:v=>D(a.User_ID)},[s("span",null,[s("img",{src:a.Profile_Img,alt:"",class:"profile"},null,8,Os)]),s("div",Qs,[s("div",null,[s("span",Xs,C(a.User_ID),1)]),s("div",Zs,[s("span",se,C(a.User_Name),1)])])],8,Gs))),256))])):g("",!0),o.value==="request"?(t(),l("div",ee,[(t(!0),l(x,null,S(Array(6),a=>(t(),l("div",te,le))),256))])):g("",!0)])]))}},ce=U(ne,[["__scopeId","data-v-ab10c39a"]]),X=n=>(N("data-v-bd750d5a"),n=n(),L(),n),ie={class:"signcontainer"},de=X(()=>s("span",{class:"sign"},"새로운 알림",-1)),re={class:"notification"},ue={class:"notibox"},_e=X(()=>s("div",{class:"feedinfobox"},[s("span",null,[s("img",{src:Q,alt:"",class:"profile"})]),s("div",{class:"commentdetail"},[s("div",null,[s("span",{class:"username"},"오준호님이 회원님을 팔로우하기 시작했습니다.")])])],-1)),ve=[_e],me={__name:"notification",setup(n){return(o,m)=>(t(),l("div",ie,[de,s("div",re,[(t(!0),l(x,null,S(Array(20),w=>(t(),l("div",ue,ve))),256))])]))}},pe=U(me,[["__scopeId","data-v-bd750d5a"]]),W=n=>(N("data-v-558ffaf7"),n=n(),L(),n),he={class:"writepot"},ge={class:"writecontainer"},fe=W(()=>s("span",{class:"newarticle"},"새 게시물 작성",-1)),$e={class:"articlebox"},we={class:"photobox"},be={key:0,for:"chooseFile",class:"selectphoto"},ke={key:1,class:"photobox",pagination:"true",modules:"[Pagination]"},Ie=["src"],xe={class:"commentbox"},ye={class:"userinfo"},De=["src"],Ce={class:"userid"},Se={class:"articlecomment"},Pe=W(()=>s("img",{src:O,alt:"",class:"down-icon"},null,-1)),Ue={key:0,class:"tagbox"},Me={id:"result",class:"tagresult"},Te=["onClick"],Be=W(()=>s("img",{src:O,alt:"",class:"down-icon"},null,-1)),Fe={key:1,class:"locatebox"},Re=W(()=>s("div",{id:"map"},null,-1)),Ne=[Re],Le={class:"buttonzone"},Ve={__name:"write",setup(n){const o=R(),m=I(()=>o.state.User_ID),w=I(()=>o.state.Profile_Img),p=r(""),i=r([]),u=r(""),c=r(""),D=r(null),d=r([]),e=r([]),a=()=>{i.value.push(p.value),p.value=""};function v(k){const _=k.target.files;for(let h=0;h<_.length;h++){const y=_[h];if(d.value.push(y),y&&y.type.startsWith("image")){const V=new FileReader;V.onload=()=>{e.value.push(V.result)},V.readAsDataURL(y)}else alert("이미지 파일을 선택해주세요.")}}const z=()=>{const k=new FormData;k.append("Title",u.value),k.append("comment",c.value),k.append("tag",i.value),d.value.forEach(_=>{k.append("image",_)}),P.post("/Feeds/Post_Save",k,{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}}).then(_=>{_.status==200&&(o.commit("Switch_isWrite"),location.reload()),console.log(_)}).catch(_=>{console.log("오류발생"),console.log(_)})},Z=k=>{i.value.splice(k,1)},K=r(!1),Y=r(!1),ss=()=>{K.value=!K.value},es=()=>{Y.value=!Y.value},ts=[is,ds];return(k,_)=>(t(),l("div",he,[s("div",ge,[fe,s("div",$e,[s("div",we,[e.value.length===0?(t(),l("label",be," 👉 CLICK 👈 ")):g("",!0),s("input",{type:"file",id:"chooseFile",name:"chooseFile",accept:"image/*",class:"inputphoto",style:{display:"none"},ref_key:"Input_Img",ref:D,multiple:"",onChange:v},null,544),e.value.length>0?(t(),l("div",ke,[f(H(cs),{spaceBetween:10,slidesPerView:1,pagination:!0,navigation:!0,modules:ts,class:"mySwiper"},{default:b(()=>[(t(!0),l(x,null,S(e.value,(h,y)=>(t(),B(H(ns),{key:y},{default:b(()=>[s("img",{src:h,alt:"Image preview",style:{width:"500px",height:"580px"}},null,8,Ie)]),_:2},1024))),128))]),_:1})])):g("",!0)]),s("div",xe,[s("div",ye,[s("span",null,[s("img",{src:w.value,alt:"",class:"ProfileImg"},null,8,De)]),s("span",Ce,C(m.value),1)]),s("div",null,[s("span",null,[F(s("input",{class:"Title",type:"text","onUpdate:modelValue":_[0]||(_[0]=h=>u.value=h),placeholder:"제목을 입력하세요."},null,512),[[A,u.value]])])]),s("div",Se,[F(s("textarea",{class:"Content",type:"text",placeholder:"글내용을 입력하세요.","onUpdate:modelValue":_[1]||(_[1]=h=>c.value=h)},null,512),[[A,c.value]]),s("button",{class:"dropdown-button",onClick:ss},[$(" add tag "),Pe]),K.value?(t(),l("div",Ue,[F(s("input",{class:"inputtag",type:"text","onUpdate:modelValue":_[2]||(_[2]=h=>p.value=h),onKeyup:J(a,["enter"]),placeholder:"이 곳에서 Tag를 추가해보세요."},null,544),[[A,p.value]]),s("div",Me,[(t(!0),l(x,null,S(i.value,(h,y)=>(t(),l("span",{key:y,class:"tag"},[$(C(h)+" ",1),s("button",{class:"deleteTagButton",onClick:V=>Z(y)},"x",8,Te)]))),128))])])):g("",!0),s("button",{class:"dropdown-button",onClick:es},[$(" add location "),Be]),Y.value?(t(),l("div",Fe,Ne)):g("",!0),s("div",Le,[s("button",{class:"complete",onClick:_[3]||(_[3]=h=>z())},"완료")])])])])]),s("div",{class:"blur",onClick:_[4]||(_[4]=h=>H(o).commit("Switch_isWrite"))})]))}},Ae=U(Ve,[["__scopeId","data-v-558ffaf7"]]),He=n=>(N("data-v-e3fe4860"),n=n(),L(),n),We={class:"MainScreen"},Ke={class:"PostDMBox"},Ye=He(()=>s("p",null,"피드 보내기",-1)),qe={class:"selectType"},ze={class:"userList"},je=["onClick"],Ee=["src"],Je={__name:"PostDM",setup(n){const o=R();I(()=>o.state.User_ID);const m=I(()=>o.state._PostID);I(()=>o.state.isPostDM);const w=G(),p=r([]),i=r([]),u=r(""),c=r("팔로워"),D=()=>{console.log("Sending message..."),P.post("/feeds/Post_DM_Send",{Target_User:u.value,Message:m.value,type:"1"},{withCredentials:!0}).then(async e=>{console.log(e.data);const{Room_ID:a}=e.data;q.emit("send_message",{Room_ID:a,User_ID:u.value,Message:"피드를 보냈습니다.",Time:rs().format("YYYY:MM:DD HH:mm:ss")}),w.push({name:"Room",params:{Room_ID:a}}),o.commit("Switch_isPostDM","")}).catch(e=>{console.log(e)})},d=e=>{c.value=e,i.value=c.value==="팔로워"?p.value.Follower:p.value.Following};return ls(()=>o.state.isPostDM,()=>{P.get("/profile/print_follow",{withCredentials:!0}).then(e=>{console.log(e.data);const{followersResult:a,followingsResult:v}=e.data;p.value.Follower=a,p.value.Following=v,d("팔로워")}).catch(e=>{console.log(e)})},{immediate:!0}),(e,a)=>(t(),l("div",We,[s("div",{class:"blur",onClick:a[0]||(a[0]=v=>H(o).commit("Switch_isPostDM",""))}),s("div",Ke,[Ye,s("div",qe,[s("p",{class:T({select:c.value=="팔로워"}),onClick:a[1]||(a[1]=v=>(d("팔로워"),u.value=""))},"팔로워",2),s("p",{class:T({select:c.value=="팔로잉"}),onClick:a[2]||(a[2]=v=>(d("팔로잉"),u.value=""))},"팔로잉",2)]),s("div",ze,[(t(!0),l(x,null,S(i.value,v=>(t(),l("div",{class:"User",key:v,onClick:z=>u.value=v.User_ID},[s("img",{class:T({select:u.value==v.User_ID}),src:v.Profile_Img},null,10,Ee),s("p",{class:T({select:u.value==v.User_ID})},C(v.User_ID),3)],8,je))),128))]),s("div",{class:T([{noneSelect:u.value==""},"sendBtn"]),onClick:D},"전송하기",2)])]))}},Ge=U(Je,[["__scopeId","data-v-e3fe4860"]]),Oe={class:"main-container"},Qe={class:"section"},Xe={__name:"Home",setup(n){const o=R(),m=I(()=>o.state.isNoti),w=I(()=>o.state.isMsg),p=I(()=>o.state.isWrite),i=I(()=>o.state.isPostDM);return G(),(u,c)=>{const D=E("router-view");return t(),l(x,null,[p.value?(t(),B(Ae,{key:0})):g("",!0),m.value?(t(),B(pe,{key:1})):g("",!0),w.value?(t(),B(ce,{key:2})):g("",!0),i.value?(t(),B(Ge,{key:3})):g("",!0),f(Ds),s("div",Oe,[s("div",Qe,[s("div",null,[f(D)])])])],64)}}},nt=U(Xe,[["__scopeId","data-v-535c8fbd"]]);export{nt as default};
