import{f as d,r as B,o as n,c as l,a as e,F as p,g as m,i as _,v as g,b as h,w as v,s as E,l as H,x as N,d as f,p as y,e as C,u as b}from"./index-QoG4QVSx.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";const P="/assets/login_image-BaNME0Xe.png",V=i=>(y("data-v-f863c859"),i=i(),C(),i),D={class:"container"},I={class:"postBox"},T={class:"postSlider"},U=["src"],F={class:"loginBox"},L=V(()=>e("h1",{class:"appName"},"TripTracks",-1)),A={class:"bottom"},j={__name:"UserLogin",setup(i){const x=b(),r=d(""),c=d(""),k=()=>{if(!r||!c)return console.log("뒤지기 싫으면 입력 똑디하라");E.post("http://triptracks.co.kr/api/users/login",{user_Email:r.value,user_Passwd:c.value},{withCredentials:!0}).then(a=>{console.log(a.data),x.dispatch("checkSession")}).catch(a=>{const{success:s,err_Code:t}=a.response.data;if(!s||t==="DisabledAccount")return console.log("비활성 계정입니다");if(!s||t==="PasswordDoesNotMatch")return console.log("비밀번호가 틀렸습니다");if(!s||t==="EmailDoesNotExist")return console.log("이메일이 존재하지 않습니다")})},w=()=>Math.floor(Math.random()*71+80)+"%",S=d(Array(20).fill("").map(()=>w()));return(a,s)=>{const t=B("router-link");return n(),l("div",D,[e("div",I,[e("div",T,[(n(!0),l(p,null,m(S.value,(o,u)=>(n(),l("div",{class:"feedBox",key:u},[e("img",{src:H(P),alt:"",style:N({height:o})},null,12,U),e("p",null,[(n(!0),l(p,null,m(u,z=>(n(),l("span",null," 이건 게시글의 문구들입니당"))),256))])]))),128))])]),e("div",F,[L,_(e("input",{class:"Email",type:"email",placeholder:"Email","onUpdate:modelValue":s[0]||(s[0]=o=>r.value=o)},null,512),[[g,r.value]]),_(e("input",{class:"Passwd",type:"password",placeholder:"Password","onUpdate:modelValue":s[1]||(s[1]=o=>c.value=o)},null,512),[[g,c.value]]),e("button",{onClick:s[2]||(s[2]=o=>k()),class:"Signin-button"},"Sign in"),e("div",A,[h(t,{class:"links",to:{name:"Home"}},{default:v(()=>[f("Forgot password?")]),_:1}),h(t,{class:"links",to:{name:"Step1"}},{default:v(()=>[f("Sign up")]),_:1})])])])}}},$=M(j,[["__scopeId","data-v-f863c859"]]);export{$ as default};
