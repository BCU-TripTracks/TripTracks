import{h as d,r as B,o as n,a as l,b as e,F as p,g as m,j as _,v as g,d as h,w as v,m as E,l as H,x as b,e as f,p as N,f as y,u as C}from"./index-BFdhvUpm.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";const M="/assets/login_image-BaNME0Xe.png",P=i=>(N("data-v-24eb18df"),i=i(),y(),i),V={class:"container"},D={class:"postBox"},T={class:"postSlider"},U=["src"],F={class:"loginBox"},L=P(()=>e("h1",{class:"appName"},"TripTracks",-1)),j={class:"bottom"},A={__name:"UserLogin",setup(i){const x=C(),r=d(""),c=d(""),w=()=>{if(!r||!c)return console.log("아이디 및 비밀번호 입력 필요합니다.");E.post("/users/login",{user_Email:r.value,user_Passwd:c.value},{withCredentials:!0}).then(a=>{console.log(a.data),x.dispatch("checkSession")}).catch(a=>{const{success:s,err_Code:t}=a.response.data;if(!s||t==="DisabledAccount")return console.log("비활성 계정입니다");if(!s||t==="PasswordDoesNotMatch")return console.log("비밀번호가 틀렸습니다");if(!s||t==="EmailDoesNotExist")return console.log("이메일이 존재하지 않습니다")})},S=()=>Math.floor(Math.random()*71+80)+"%",k=d(Array(20).fill("").map(()=>S()));return(a,s)=>{const t=B("router-link");return n(),l("div",V,[e("div",D,[e("div",T,[(n(!0),l(p,null,m(k.value,(o,u)=>(n(),l("div",{class:"feedBox",key:u},[e("img",{src:H(M),alt:"",style:b({height:o})},null,12,U),e("p",null,[(n(!0),l(p,null,m(u,z=>(n(),l("span",null," 이건 게시글의 문구들입니당"))),256))])]))),128))])]),e("div",F,[L,_(e("input",{class:"Email",type:"email",placeholder:"Email","onUpdate:modelValue":s[0]||(s[0]=o=>r.value=o)},null,512),[[g,r.value]]),_(e("input",{class:"Passwd",type:"password",placeholder:"Password","onUpdate:modelValue":s[1]||(s[1]=o=>c.value=o)},null,512),[[g,c.value]]),e("button",{onClick:s[2]||(s[2]=o=>w()),class:"Signin-button"},"Sign in"),e("div",j,[h(t,{class:"links",to:{name:"Home"}},{default:v(()=>[f("Forgot password?")]),_:1}),h(t,{class:"links",to:{name:"Step1"}},{default:v(()=>[f("Sign up")]),_:1})])])])}}},$=I(A,[["__scopeId","data-v-24eb18df"]]);export{$ as default};
