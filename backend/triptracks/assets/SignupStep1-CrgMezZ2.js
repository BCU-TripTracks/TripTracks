import{n as k,g as u,z as h,o as i,c as d,i as m,v as c,a as o,h as v,l as f}from"./index-BjthJQfc.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";const g={class:"Infobox"},w={key:0},y={key:1},x={key:2},P={key:3},C={__name:"SignupStep1",setup(V){const D=k(),t=u(""),r=u(""),n=u(""),p=u(""),_=u(""),l=u({EmailFormat:!0,EmailAlread:!0}),E=u({UserIDAlread:!0});h(r,s=>{if(r.value=="")return l.value={EmailAlread:!0,EmailFormat:!0};/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)?(l.value.EmailFormat=!0,f.post("/users/check_email",{user_Email:r.value}).then(a=>{const{success:I}=a.data;I==!0&&(l.value.EmailAlread=!0)}).catch(a=>{a.response.data.err_Code=="EmailAlreadyExists"&&(l.value.EmailAlread=!1)})):l.value.EmailFormat=!1}),h(t,s=>{if(t.value=="")return E.value={UserIDAlread:!0};l.value.EmailFormat=!0,f.post("/users/check_UserID",{user_ID:t.value}).then(e=>{e.data.success==!0&&(l.value.UserIDAlread=!0)}).catch(e=>{e.response.data.err_Code=="UserIDAlreadyExists"&&(l.value.UserIDAlread=!1)})});const U=()=>{if(n.value!==p.value)return console.log("비밀번호 불일치");if(!E.value.UserIDAlread)return console.log("아이디 중복");if(!l.value.EmailAlread||!l.value.EmailFormat)return console.log("이메일 인증 문제");f.post("/users/signup",{user_ID:t.value,user_Email:r.value,user_Passwd:n.value,user_Name:_.value}).then(s=>{const e=s.data;if(console.log(e),e.message==="success")return localStorage.setItem("user_ID",t.value),D.push({name:"Step2"})}).catch(s=>{console.log(s)})};return(s,e)=>(i(),d("div",g,[m(o("input",{class:"Email",type:"text",placeholder:"User ID","onUpdate:modelValue":e[0]||(e[0]=a=>t.value=a)},null,512),[[c,t.value]]),E.value.UserIDAlread?v("",!0):(i(),d("p",w,"이미 존재한 아이디입니다.")),m(o("input",{class:"Email",type:"email",placeholder:"Email","onUpdate:modelValue":e[1]||(e[1]=a=>r.value=a)},null,512),[[c,r.value]]),l.value.EmailFormat?v("",!0):(i(),d("p",y,"이메일 형식이 아닙니다.")),l.value.EmailAlread?v("",!0):(i(),d("p",x,"중복된 이메일 입니다.")),m(o("input",{class:"Passwd mt20",type:"pwd",placeholder:"Password","onUpdate:modelValue":e[2]||(e[2]=a=>n.value=a)},null,512),[[c,n.value]]),m(o("input",{class:"PasswdCh mb20",type:"pwdcheck",placeholder:"Password Check","onUpdate:modelValue":e[3]||(e[3]=a=>p.value=a)},null,512),[[c,p.value]]),n.value!=p.value?(i(),d("p",P,"비밀번호가 일치하지 않습니다.")):v("",!0),m(o("input",{class:"Name mb20",type:"name",placeholder:"Name","onUpdate:modelValue":e[4]||(e[4]=a=>_.value=a)},null,512),[[c,_.value]]),o("button",{onClick:e[5]||(e[5]=a=>U())},"Next Level")]))}},S=A(C,[["__scopeId","data-v-e66d5ba9"]]);export{S as default};
