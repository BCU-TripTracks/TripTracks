import{h as u,i as E,r as I,o as i,a as r,b as s,F as p,j as g,l as _,v as h,m as U,d as v,w as f,f as B,q as y,B as H,e as S,p as P,g as b,u as N}from"./index-Bw4p5HnC.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";const M="/assets/login_image-BaNME0Xe.png",V=c=>(P("data-v-a8f8a8b9"),c=c(),b(),c),D={class:"container"},F={class:"postBox"},T={class:"postSlider"},L=["src"],j={class:"loginBox"},A=V(()=>s("h1",{class:"appName"},"TripTracks",-1)),K={class:"bottom"},$={__name:"UserLogin",setup(c){const w=N(),o=u(""),a=u(""),d=()=>{if(localStorage.setItem("User_Email",o.value),localStorage.setItem("User_Pwd",a.value),!o||!a)return console.log("아이디 및 비밀번호 입력 필요합니다.");B.post("/users/login",{user_Email:o.value,user_Passwd:a.value},{withCredentials:!0}).then(n=>{console.log(n.data),w.dispatch("checkSession")}).catch(n=>{const{success:e,err_Code:l}=n.response.data;if(!e||l==="DisabledAccount")return console.log("비활성 계정입니다");if(!e||l==="PasswordDoesNotMatch")return console.log("비밀번호가 틀렸습니다");if(!e||l==="EmailDoesNotExist")return console.log("이메일이 존재하지 않습니다")})},x=()=>Math.floor(Math.random()*71+80)+"%",k=u(Array(20).fill("").map(()=>x()));return E(()=>{localStorage.getItem("User_Email")&&(o.value=localStorage.getItem("User_Email")),localStorage.getItem("User_Pwd")&&(a.value=localStorage.getItem("User_Pwd"))}),(n,e)=>{const l=I("router-link");return i(),r("div",D,[s("div",F,[s("div",T,[(i(!0),r(p,null,g(k.value,(t,m)=>(i(),r("div",{class:"feedBox",key:m},[s("img",{src:y(M),alt:"",style:H({height:t})},null,12,L),s("p",null,[(i(!0),r(p,null,g(m,q=>(i(),r("span",null," 이건 게시글의 문구들입니당"))),256))])]))),128))])]),s("div",j,[A,_(s("input",{class:"Email",type:"email",placeholder:"Email","onUpdate:modelValue":e[0]||(e[0]=t=>o.value=t)},null,512),[[h,o.value]]),_(s("input",{onKeyup:e[1]||(e[1]=U(t=>d(),["enter"])),class:"Passwd",type:"password",placeholder:"Password","onUpdate:modelValue":e[2]||(e[2]=t=>a.value=t)},null,544),[[h,a.value]]),s("button",{onClick:e[3]||(e[3]=t=>d()),class:"Signin-button"}," Sign in "),s("div",K,[v(l,{class:"links",to:{name:"HomeFeed"}},{default:f(()=>[S("Forgot password?")]),_:1}),v(l,{class:"links",to:{name:"Step1"}},{default:f(()=>[S("Sign up")]),_:1})])])])}}},X=C($,[["__scopeId","data-v-a8f8a8b9"]]);export{X as default};
