import{n as U,h as u,A as h,o as m,a as d,j as c,v as p,b as n,i as _,m as f}from"./index-CG0mUUAc.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={class:"Infobox"},g={key:0},y={key:1},x={key:2},P={key:3},C={__name:"SignupStep1",setup(V){const A=U(),t=u(""),r=u(""),i=u(""),v=u(""),E=u(""),l=u({EmailFormat:!0,EmailAlread:!0}),o=u({UserIDAlread:!0});h(r,s=>{if(r.value=="")return l.value={EmailAlread:!0,EmailFormat:!0};/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)?(l.value.EmailFormat=!0,f.post("/users/check_email",{user_Email:r.value}).then(a=>{const{success:I}=a.data;I==!0&&(l.value.EmailAlread=!0)}).catch(a=>{a.response.data.err_Code=="EmailAlreadyExists"&&(l.value.EmailAlread=!1)})):l.value.EmailFormat=!1}),h(t,s=>{if(t.value=="")return o.value={UserIDAlread:!0};o.value.EmailFormat=!0,f.post("/users/check_UserID",{user_ID:t.value}).then(e=>{e.data.success==!0&&(o.value.UserIDAlread=!0)}).catch(e=>{e.response.data.err_Code=="UserIDAlreadyExists"&&(o.value.UserIDAlread=!1)})});const D=()=>{if(i.value!==v.value)return console.log("비밀번호 불일치");if(!o.value.UserIDAlread)return console.log("아이디 중복");if(!l.value.EmailAlread||!l.value.EmailFormat)return console.log("이메일 인증 문제");f.post("/users/signup",{user_ID:t.value,user_Email:r.value,user_Passwd:i.value,user_Name:E.value}).then(s=>{const e=s.data;if(console.log(e),e.message==="success")return localStorage.setItem("user_ID",t.value),A.push({name:"Step2"})}).catch(s=>{console.log(s)})};return(s,e)=>(m(),d("div",w,[c(n("input",{class:"Email",type:"text",placeholder:"User ID","onUpdate:modelValue":e[0]||(e[0]=a=>t.value=a)},null,512),[[p,t.value]]),o.value.UserIDAlread?_("",!0):(m(),d("p",g,"이미 존재한 아이디입니다.")),c(n("input",{class:"Email",type:"email",placeholder:"Email","onUpdate:modelValue":e[1]||(e[1]=a=>r.value=a)},null,512),[[p,r.value]]),l.value.EmailFormat?_("",!0):(m(),d("p",y,"이메일 형식이 아닙니다.")),l.value.EmailAlread?_("",!0):(m(),d("p",x,"중복된 이메일 입니다.")),c(n("input",{class:"Passwd mt20",type:"pwd",placeholder:"Password","onUpdate:modelValue":e[2]||(e[2]=a=>i.value=a)},null,512),[[p,i.value]]),c(n("input",{class:"PasswdCh mb20",type:"pwdcheck",placeholder:"Password Check","onUpdate:modelValue":e[3]||(e[3]=a=>v.value=a)},null,512),[[p,v.value]]),i.value!=v.value?(m(),d("p",P,"비밀번호가 일치하지 않습니다.")):_("",!0),c(n("input",{class:"Name mb20",type:"name",placeholder:"Name","onUpdate:modelValue":e[4]||(e[4]=a=>E.value=a)},null,512),[[p,E.value]]),n("button",{onClick:e[5]||(e[5]=a=>D())},"Next Level")]))}},S=k(C,[["__scopeId","data-v-298481f7"]]);export{S as default};
