import{r,o as x,a as _,e as c,f as s,F as I,l as P,w as m,m as g,n as E,g as h,h as v,b as U,d,t as T,i as f,p as y,k as B,u as C}from"./index-Bt0CwWUj.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S=i=>(y("data-v-efef6180"),i=i(),B(),i),N={class:"container"},b={class:"postBox"},D={class:"postSlider"},M=["src"],V=S(()=>s("h3",{style:{color:"white"}},"당신도 TripTracks에서 함께하세요",-1)),F={class:"loginBox"},L=S(()=>s("h1",{class:"appName"},"TripTracks",-1)),A={class:"bottom"},K={__name:"UserLogin",setup(i){const w=C(),a=r(""),l=r(""),u=()=>{if(localStorage.setItem("User_Email",a.value),localStorage.setItem("User_Pwd",l.value),!a||!l)return console.log("아이디 및 비밀번호 입력 필요합니다.");_.post("/users/login",{user_Email:a.value,user_Passwd:l.value},{withCredentials:!0}).then(o=>{console.log(o.data),w.dispatch("checkSession")}).catch(o=>{const{success:e,err_Code:n}=o.response.data;if(!e||n==="DisabledAccount")return console.log("비활성 계정입니다");if(!e||n==="PasswordDoesNotMatch")return console.log("비밀번호가 틀렸습니다");if(!e||n==="EmailDoesNotExist")return console.log("이메일이 존재하지 않습니다")})},k=()=>Math.floor(Math.random()*71+80)+"%";r(Array(20).fill("").map(()=>k()));const p=r([]);return x(()=>{localStorage.getItem("User_Email")&&(a.value=localStorage.getItem("User_Email")),localStorage.getItem("User_Pwd")&&(l.value=localStorage.getItem("User_Pwd")),_.get("/users/Top_Post").then(o=>{const{TopPosts:e}=o.data;p.value=e})}),(o,e)=>{const n=U("router-link");return d(),c("div",N,[s("div",b,[s("div",D,[(d(!0),c(I,null,P(p.value,t=>(d(),c("div",{class:"feedBox",key:t},[s("img",{src:t.Image_Src,alt:""},null,8,M),s("p",null,[s("span",null,T(t.Post_Caption),1)])]))),128)),V])]),s("div",F,[L,m(s("input",{class:"Email",type:"email",placeholder:"Email","onUpdate:modelValue":e[0]||(e[0]=t=>a.value=t)},null,512),[[g,a.value]]),m(s("input",{onKeyup:e[1]||(e[1]=E(t=>u(),["enter"])),class:"Passwd",type:"password",placeholder:"Password","onUpdate:modelValue":e[2]||(e[2]=t=>l.value=t)},null,544),[[g,l.value]]),s("button",{onClick:e[3]||(e[3]=t=>u()),class:"Signin-button"},"Sign in"),s("div",A,[h(n,{class:"links",to:{name:"HomeFeed"}},{default:v(()=>[f("Forgot password?")]),_:1}),h(n,{class:"links",to:{name:"Step1"}},{default:v(()=>[f("Sign up")]),_:1})])])])}}},j=H(K,[["__scopeId","data-v-efef6180"]]);export{j as default};
