import{y as l,r as _,o as p,b as u,d as h,e as m,f as e,w as v,H as f,g as x,h as k,a as b,i as w,p as B,j as C}from"./index-By30rEyO.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";const o=s=>(B("data-v-f08e3131"),s=s(),C(),s),g={class:"main-container"},V=o(()=>e("div",{class:"header"},"TripTracks",-1)),y={class:"content"},H={class:"step1-container"},N={class:"main-content"},S=o(()=>e("h1",{class:"title"},"앰버서더 신청 안내",-1)),T=o(()=>e("textarea",{class:"textZone",readonly:""},`
            앰버서더가 되기 위해서는 다음의 조건을 충족해야 합니다:
            (현재는 테스트를 위해 임시로 설정된 조건입니다. 추후 변경될 수 있습니다.)
            (테스트를 위해 임시적으로 설정되었으며 지금은 누구나 앰버서더가 될 수 있습니다.)
    
            - 한 주에 1회 이상의 여행지 정보를 담은 피드를 작성해야 합니다.
            - 여행지 정보를 담은 피드를 작성할 때마다 10포인트가 적립됩니다.
            - 다른 사용자들이 여행지 정보를 담은 피드를 좋아요 또는 댓글을 달면 1포인트가 적립됩니다.
            - 다른 사용자가 여행지 정보를 담은 피드를 스크랩하면 5포인트가 적립됩니다.
            - 앰버서더 포인트는 매달 초기화됩니다.
            - 앰버서더는 매달 100포인트 이상을 적립해야 유지됩니다. 
          `,-1)),Z={class:"checkZone"},F=o(()=>e("label",{for:"agreement"}," 위 정보를 확인하였습니다.",-1)),M={class:"btnZone"},j={__name:"subscription",setup(s){const i=l(),n=_(!1);p(()=>{});const r=()=>{if(!n.value){alert("약관에 동의해주세요.");return}b.get("/users/sub_ambass",{withCredentials:!0}).then(a=>{a.data.success?(alert("앰버서더 신청이 완료되었습니다."),i.push({name:"HomeFeed"})):alert("앰버서더 신청에 실패했습니다.")})};return(a,t)=>{const d=u("router-link");return h(),m("div",g,[V,e("div",y,[e("div",H,[e("div",N,[S,T,e("div",Z,[v(e("input",{type:"checkbox",id:"agreement","onUpdate:modelValue":t[0]||(t[0]=c=>n.value=c)},null,512),[[f,n.value]]),F])]),e("div",M,[x(d,{to:{name:"HomeFeed"},class:"prevBtn"},{default:k(()=>[w("이전")]),_:1}),e("div",{class:"nextBtn",onClick:t[1]||(t[1]=c=>r())},"신청하기")])])])])}}},R=I(j,[["__scopeId","data-v-f08e3131"]]);export{R as default};
