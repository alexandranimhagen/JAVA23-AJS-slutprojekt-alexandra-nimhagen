(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(22)},14:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);a(13),a(14);var n=a(0),s=a.n(n),c=a(10),o=a(3);const r=Object(c.a)({apiKey:"AIzaSyB7SZ20O6djh2NzZcDqBsi7MIWjpWrg-x4",authDomain:"slutprojekt-scrum-board.firebaseapp.com",projectId:"slutprojekt-scrum-board",storageBucket:"slutprojekt-scrum-board.appspot.com",messagingSenderId:"902046492840",appId:"1:902046492840:web:84b3baa8bf8caf62e03a9d",measurementId:"G-WQ42ZRXHKG"}),d=Object(o.f)(r),l={ux:"card-ux","dev frontend":"card-dev-frontend","dev backend":"card-dev-backend",design:"card-design",testing:"card-testing"},m={ux:"btn-ux","dev frontend":"btn-dev-frontend","dev backend":"btn-dev-backend",design:"btn-design",testing:"btn-testing"};var i=e=>{let{tasks:t,setTasks:a,loading:c}=e;const[r,i]=Object(n.useState)(""),[u,g]=Object(n.useState)(null),b=async e=>{try{if(window.confirm("Are you sure you want to remove this task?")){const t=Object(o.d)(d,"assignments",e);await Object(o.c)(t),a(t=>t.filter(t=>t.id!==e)),g(null)}}catch(u){g("Error removing task: "+u.message)}},p=e=>t.filter(t=>t.status===e).map(t=>s.a.createElement("div",{key:t.id,className:"card mb-3 ".concat(l[t.category])},s.a.createElement("div",{className:"card-body"},s.a.createElement("button",{className:"close btn-remove-task",onClick:()=>b(t.id)},"\xd7"),s.a.createElement("h5",{className:"card-title"},t.assignment),s.a.createElement("p",{className:"card-text"},"Assigned to: ",t.assigned),"to do"===e&&s.a.createElement("div",null,s.a.createElement("input",{type:"text",className:"form-control mb-2",placeholder:"Assign to",value:r,onChange:e=>i(e.target.value)}),s.a.createElement("button",{className:"btn w-100 ".concat(m[t.category]),onClick:()=>(async e=>{try{const t=Object(o.d)(d,"assignments",e);await Object(o.g)(t,{assigned:r,status:"in progress"}),a(t=>t.map(t=>t.id===e?{...t,assigned:r,status:"in progress"}:t)),i(""),g(null)}catch(u){g("Error assigning task: "+u.message)}})(t.id)},"Assign")),"in progress"===e&&s.a.createElement("button",{className:"btn w-100 btn-done",onClick:()=>(async e=>{try{const t=Object(o.d)(d,"assignments",e);await Object(o.g)(t,{status:"done"}),a(t=>t.map(t=>t.id===e?{...t,status:"done"}:t)),g(null)}catch(u){g("Error marking task as done: "+u.message)}})(t.id)},"Done"),"done"===e&&s.a.createElement("button",{className:"btn w-100 btn-remove",onClick:()=>b(t.id)},"Remove"))));return c?s.a.createElement("p",null,"Loading tasks..."):s.a.createElement("div",{className:"container"},u&&s.a.createElement("p",{className:"text-danger mt-3"},u),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-4"},s.a.createElement("h2",null,"To Do"),p("to do")),s.a.createElement("div",{className:"col-md-4"},s.a.createElement("h2",null,"In Progress"),p("in progress")),s.a.createElement("div",{className:"col-md-4"},s.a.createElement("h2",null,"Done"),p("done"))))};const u={ux:"option-ux","dev frontend":"option-dev-frontend","dev backend":"option-dev-backend",design:"option-design",testing:"option-testing"};var g=e=>{let{onTaskAdded:t}=e;const[a,c]=Object(n.useState)(""),[r,l]=Object(n.useState)(""),[m,i]=Object(n.useState)(null);return s.a.createElement("form",{onSubmit:async e=>{e.preventDefault();try{const e=await Object(o.a)(Object(o.b)(d,"assignments"),{assignment:a,category:r,status:"to do",assigned:"none"});t({id:e.id,assignment:a,category:r,status:"to do",assigned:"none"}),c(""),l(""),i(null)}catch(m){i("Error adding document: "+m.message)}},className:"mb-4"},s.a.createElement("div",{className:"mb-3"},s.a.createElement("input",{type:"text",className:"form-control",placeholder:"Assignment",value:a,onChange:e=>c(e.target.value),required:!0})),s.a.createElement("div",{className:"mb-3"},s.a.createElement("select",{className:"form-select",value:r,onChange:e=>l(e.target.value),required:!0},s.a.createElement("option",{value:"",className:"option-default"},"Select Category"),Object.keys(u).map(e=>s.a.createElement("option",{key:e,value:e,className:u[e]},e.charAt(0).toUpperCase()+e.slice(1))))),s.a.createElement("button",{type:"submit",className:"btn btn-add-task w-100"},"Add Task"),m&&s.a.createElement("p",{className:"text-danger mt-3"},m))};var b=function(){const[e,t]=Object(n.useState)([]),[a,c]=Object(n.useState)(!0);return Object(n.useEffect)(()=>{(async()=>{const e=await Object(o.e)(Object(o.b)(d,"assignments"));t(e.docs.map(e=>({id:e.id,...e.data()}))),c(!1)})()},[]),s.a.createElement("div",{className:"container"},s.a.createElement("h1",{className:"my-4"},"Scrum Board"),s.a.createElement(g,{onTaskAdded:e=>{t(t=>[...t,e])}}),s.a.createElement(i,{tasks:e,setTasks:t,loading:a}))};var p=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,23)).then(t=>{let{getCLS:a,getFID:n,getFCP:s,getLCP:c,getTTFB:o}=t;a(e),n(e),s(e),c(e),o(e)})},v=a(11);const E=document.getElementById("root");Object(v.createRoot)(E).render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(b,null))),p()}},[[12,1,2]]]);
//# sourceMappingURL=main.be725fce.chunk.js.map