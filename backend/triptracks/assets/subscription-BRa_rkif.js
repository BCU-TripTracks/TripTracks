import{r as l,o as d,e as c,f as s,w as u,K as p,g as m,h as v,a as _,b as f,d as x,i as k,x as b}from"./index-C5pUCDzQ.js";import{_ as h}from"./_plugin-vue_export-helper-DlAUqK2U.js";const B={class:"main-container"},C={class:"content"},g={class:"step1-container"},w={class:"main-content"},V={class:"checkZone"},N={class:"btnZone"},T={__name:"subscription",setup(Z){const a=b(),t=l(!1);d(()=>{});const r=()=>{if(!t.value){alert("약관에 동의해주세요.");return}_.get("/users/sub_ambass",{withCredentials:!0}).then(n=>{n.data.success?(alert("앰버서더 신청이 완료되었습니다."),a.push({name:"HomeFeed"})):alert("앰버서더 신청에 실패했습니다.")})};return(n,e)=>{const i=f("router-link");return x(),c("div",B,[e[6]||(e[6]=s("div",{class:"header"},"TripTracks",-1)),s("div",C,[s("div",g,[s("div",w,[e[3]||(e[3]=s("h1",{class:"title"},"앰버서더 신청 안내",-1)),e[4]||(e[4]=s("textarea",{class:"textZone",readonly:""},`            앰버서더가 되기 위해서는 다음의 조건을 충족해야 합니다:
            (현재는 테스트를 위해 임시로 설정된 조건입니다. 추후 변경될 수 있습니다.)
            (테스트를 위해 임시적으로 설정되었으며 지금은 누구나 앰버서더가 될 수 있습니다.)
    
            - 한 주에 1회 이상의 여행지 정보를 담은 피드를 작성해야 합니다.
            - 여행지 정보를 담은 피드를 작성할 때마다 10포인트가 적립됩니다.
            - 다른 사용자들이 여행지 정보를 담은 피드를 좋아요 또는 댓글을 달면 1포인트가 적립됩니다.
            - 다른 사용자가 여행지 정보를 담은 피드를 스크랩하면 5포인트가 적립됩니다.
            - 앰버서더 포인트는 매달 초기화됩니다.
            - 앰버서더는 매달 100포인트 이상을 적립해야 유지됩니다. 
          `,-1)),s("div",V,[u(s("input",{type:"checkbox",id:"agreement","onUpdate:modelValue":e[0]||(e[0]=o=>t.value=o)},null,512),[[p,t.value]]),e[2]||(e[2]=s("label",{for:"agreement"}," 위 정보를 확인하였습니다.",-1))])]),s("div",N,[m(i,{to:{name:"HomeFeed"},class:"prevBtn"},{default:v(()=>e[5]||(e[5]=[k("이전")])),_:1}),s("div",{class:"nextBtn",onClick:e[1]||(e[1]=o=>r())},"신청하기")])])])])}}},H=h(T,[["__scopeId","data-v-f08e3131"]]);export{H as default};
