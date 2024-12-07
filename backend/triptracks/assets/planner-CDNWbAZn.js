import{r as n,c as f,y as B,o as F,a as p,e as o,f as s,F as h,k as y,j as m,g as I,d as i,h as E,t as T,x as A,u as L,C as R,b as U}from"./index-DcFli-HX.js";import{P as $}from"./ProfileImage-B4Awu9kj.js";import V from"./planning-BWeYHeaa.js";import{S as u}from"./sweetalert2.esm.all-D3pEHXw3.js";import{_ as G}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./_commonjsHelpers-CZnAS8i4.js";const j={class:"container"},X={key:0,class:"sub"},q={class:"feedSlider"},z=["src"],H={key:1,class:"map"},J={key:2,class:"sub"},K={class:"plan-header"},O=["onClick"],Q=["onClick"],W={__name:"planner",setup(Y){A();const d=L(),l=n("saved");n(""),n([]),n(null);const D=n($);f(()=>d.state.isMsg),n(""),n(null),n(null);const P=n([]),v=n([]),_=n([]),k=f(()=>d.state.planningID),C=()=>{p.get("/feeds/my_plan",{withCredentials:!0}).then(e=>{Array.isArray(e.data.plan)?(console.log("plans array received:",e.data.plan),_.value=e.data.plan.map(a=>({planning_ID:a.planning_ID,planning_title:a.planning_title,User_ID:a.User_ID}))):console.warn("Plans response is not an array:",e.data.plan)}).catch(e=>{console.error("Failed to load plans:",e)})},w=async e=>{u.fire({title:"정말로 계획을 삭제하시겠습니까?",text:"삭제된 계획은 되돌릴 수 없습니다.",icon:"warning",showCancelButton:!0,confirmButtonText:"삭제",cancelButtonText:"취소"}).then(async a=>{if(a.isConfirmed)try{await p.post("/feeds/Plan_delete",{planning_ID:_.value[e].planning_ID},{withCredentials:!0}),u.fire("계획이 삭제되었습니다!","성공!"),window.location.reload()}catch(r){console.log("Failed to delete plan:",r),u.fire("삭제 실패","계획 삭제에 실패했습니다.","error")}else a.dismiss===u.DismissReason.cancel&&u.fire("계획 삭제가 취소되었습니다.","삭제가 취소되었습니다.","error")})},g=()=>{p.post("/Feeds/Ambass_Save_List",{User_ID:d.state.User_ID},{withCredentials:!0}).then(e=>{console.log("Saved Posts:",e.data),v.value=e.data}).catch(e=>{console.log(e)})},S=async e=>{d.commit("SET_PLANNINGID",e),await R(),l.value="planning"},x=()=>{l.value="saved",g()},N=()=>{d.commit("SET_PLANNINGID",null),l.value="planning"},b=()=>{l.value="myplan",C()};return B(()=>k.value,async e=>{if(e){console.log("planning.vue - Received Planning_ID:",e);try{const a=await p.get(`/feeds/my_plan_detail/${e}`,{withCredentials:!0});console.log("planning.vue - API Response:",a.data);const r=a.data.planning;if(!r){console.error("Planning data is undefined or null");return}title.value=r.planning_title||"",travelDays.value=r.travelDays.map(t=>({day:`Day ${t.day}`,places:t.places.map(c=>({place_name:c.place_name,address:c.address||"주소 정보 없음",y:c.y,x:c.x}))})),currentDay.value=1}catch(a){console.error("Error fetching planning data:",a)}}},{immediate:!0}),F(()=>{l.value="saved",g(),p.get("/profile/profile_load",{withCredentials:!0}).then(e=>{P.value=e.data,D.value=e.data.Profile_Img}).catch(e=>{console.log(e)})}),(e,a)=>{const r=U("router-link");return i(),o("div",j,[s("div",{class:"submenu"},[s("span",{class:"saved",onClick:x},"Saved"),s("span",{class:"planning",onClick:N},"Planning"),s("span",{class:"myplan",onClick:b},"My Plan")]),l.value==="saved"?(i(),o("div",X,[s("div",q,[(i(!0),o(h,null,y(v.value,t=>(i(),o("div",{class:"grid-article",key:t.Post_ID},[I(r,{to:{name:"FeedDetail",params:{Post_ID:t.Post_ID}}},{default:E(()=>[s("img",{src:t.Image_Src,alt:"",class:"Eximage"},null,8,z)]),_:2},1032,["to"])]))),128))])])):m("",!0),l.value==="planning"?(i(),o("div",H,[I(V)])):m("",!0),l.value==="myplan"?(i(),o("div",J,[(i(!0),o(h,null,y(_.value,(t,c)=>(i(),o("div",{key:c,class:"plan-card"},[s("span",K,[s("h3",{class:"plan-title",onClick:M=>S(t.planning_ID)},T(t.planning_title),9,O),s("button",{onClick:M=>w(c),class:"remove-plan-btn"},"X",8,Q)])]))),128))])):m("",!0)])}}},le=G(W,[["__scopeId","data-v-b99755c6"]]);export{le as default};
