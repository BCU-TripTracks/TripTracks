import{c as b,r as n,o as T,a as p,e as r,f as s,w as E,m as C,n as U,F as S,l as f,j as w,d as c,i as _,t as g,g as A,h as v,p as Q,k as N,z as P,u as V,b as k}from"./index-CP0vrUw_.js";import{_ as Z}from"./_plugin-vue_export-helper-DlAUqK2U.js";const x="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAMaSURBVEhLtZZNSzJRFMevU4ZFIRRI71i2itRWUdCmjYVEuz5AGyEieqNPENWmD+CiVZusIIIWtYkiCEUxrBYFrQrdSBgVaS/Yee453LmOOvak1g+Gc7nn5T8z986ZawAOK8Dn5yc7Pz9nfr+f3d7eslgsxj4+PlhLSwuzWq2sr6+PDQwMsNraWpHxA1BQj83NTWhsbMSb+fYymUywtLQE7+/vIvN78gSfn59hdHRUt3hbWxvY7XYwGAx5vu7ubuBvQVQpTJbg3d0dJapFKioqYHZ2Fvb39+Hh4UFEAby+vsLJyQmsrKxAfX29jK+rq4OjoyMRpY8UTCQS0NXVJZOdTidEIhHhLUw8HoexsTGZV11dDaFQSHjzkYKDg4MyaWpqCviGEZ6fsbGxIfMbGhroRvQgwZ2dHRnscDggnU6Ts1imp6dlHVwKPRgW7+jooKCqqiq4vr4WruJJpVJgs9lkrfv7e+HJwE5PT+Vdra2tienSCQaDchevrq6K2QxseXlZCiaTSTFdHj09PVTP7XaLmQzKzc0N9zFmNpsZ32E0Lpf29nayam0tyuPjIw3UoN+ANwiyam0tCvZLhC8y2d+gpqaG7NvbG1ktCv9maHB1dcW+vr5oXC4XFxdkLRYLWS2KOol/Ab13XgrhcJhsc3MzWS1Kf3+/GDLGW5kYlQ7vx+zp6YnG2toS/BSw//Eh9Pb2Ft3ScpmcnJSfWSAQELMZqLUtLi7KoLm5OXKUwt7enqzDn07MZkOC/BVQw1WDd3d3yVkMh4eHYDQaZY1Cfwz5tzg+Pqb+h8HYmmZmZqg3/gSv1wuVlZVSbGJiQnjykYLIwcGBXE+8sBGfnZ0Jbz78jAMul0vGa6+trS0RlU2WIHJ5eQmtra1ZyU1NTTA0NAQejwcWFhZgZGQEOjs7QVEUGYNnm/n5+aw8PdE8QeTl5YWOD9p1LXThMuDOjEajlIsiWn+uqK6gCq4hbqDx8XE66/AGT68cjyLDw8Owvr5OR5NcckW3t7eF5z+C5VBI9M8EERTRivp8vr8VRLSieKb9c0EEnwzFfD4f/AMVOokLrvop4AAAAABJRU5ErkJggg==",L=i=>(Q("data-v-f93a799b"),i=i(),N(),i),B={class:"grid-container"},F={class:"bodytop"},R={class:"container"},W={class:"search-container"},Y={class:"Searchbox"},G={class:"tagbox"},J=L(()=>s("img",{src:x,alt:"Search",class:"searchImg"},null,-1)),j={id:"result",class:"tagresult"},z=["onClick"],K={key:0,class:"feedSlider"},O=["src"],q={class:"profile-container"},M=["src"],H={__name:"SearcingTab",setup(i){P();const D=V();b(()=>D.state.User_ID),n([]),n([]),n([]);const l=n([]),t=n([]),d=n("");T(async()=>{await p.get("/Feeds/searching_tab/",{withCredentials:!0}).then(e=>{const o=e.data;t.value=o}).catch(e=>{console.error("사용자 태그 가져오기 오류",e)}),h()});const I=()=>{var e=d.value.trim();e!==""&&(t.value.push(e),d.value="",console.log(`태그 추가됨: ${e}
태그 목록:
    ${JSON.stringify(t.value)}`),h())},y=e=>{var o=t.value[e];t.value.splice(e,1),console.log(`태그 삭제됨: ${o}
태그 목록: ${JSON.stringify(t.value)}`),h()},h=async()=>{console.log("태그 검색 중..."),await p.post("/Feeds/searching_tab/searchByTags",{tags:t.value},{withCredentials:!0}).then(e=>{l.value=e.data,console.log(JSON.stringify(l.value))}).catch(e=>{console.error("게시글 검색 중 오류 발생",e)})};return(e,o)=>{const u=k("router-link");return c(),r("div",B,[s("div",F,[s("div",R,[s("div",W,[s("div",Y,[s("span",G,[E(s("input",{class:"SearchTag",type:"text","onUpdate:modelValue":o[0]||(o[0]=a=>d.value=a),onKeyup:U(I,["enter"]),placeholder:"관심있는 태그를 검색해보세요."},null,544),[[C,d.value]])]),J])])])]),s("span",j,[(c(!0),r(S,null,f(t.value,(a,m)=>(c(),r("span",{key:m,class:"tag"},[_(g(a)+" ",1),s("button",{class:"deleteTagButton",onClick:X=>y(m)},"x",8,z)]))),128))]),l.value?(c(),r("div",K,[l.value?(c(!0),r(S,{key:0},f(l.value,a=>(c(),r("div",{class:"grid-article",key:a.Post_ID},[A(u,{to:{name:"FeedDetail",params:{Post_ID:a.Post_ID}}},{default:v(()=>[s("img",{src:a.Image_Src,alt:"",class:"Eximage"},null,8,O)]),_:2},1032,["to"]),s("ul",null,[s("li",q,[s("img",{src:a.Profile_Img,alt:"",class:"profile"},null,8,M),A(u,{to:{name:"PersonalPage",params:{User_ID:a.User_ID}},class:"userID"},{default:v(()=>[_(g(a.User_ID),1)]),_:2},1032,["to"])]),s("li",null,[A(u,{to:{name:"FeedDetail",params:{Post_ID:a.Post_ID}},class:"title"},{default:v(()=>[_(g(a.Post_Title),1)]),_:2},1032,["to"])]),s("li",null,[A(u,{to:{name:"FeedDetail",params:{Post_ID:a.Post_ID}},class:"discription"},{default:v(()=>[_(g(a.Post_Caption),1)]),_:2},1032,["to"])])])]))),128)):w("",!0)])):w("",!0)])}}},se=Z(H,[["__scopeId","data-v-f93a799b"]]);export{se as default};
