(this.webpackJsonploginmui=this.webpackJsonploginmui||[]).push([[10],{328:function(e,t,n){"use strict";n.r(t),n.d(t,"Dashboard",(function(){return P}));var a=n(50),r=n(51),c=n(53),s=n(52),u=n(0),l=n(92),o=n(29),i=n(10),d=n(49),j=n.n(d),b=(n(224),n(330)),m=n(331),p=n(332),x=n(333),O=n(324),g=n(334),h=n(203),v=n(335),A=n(329),f=n(174),F=n(231),S=n.n(F),y=n(230),N=n.n(y),D=n(1);var w=n(11),E=(n(126),n(8)),k=n(171),I=n(320),z=n(271),C=n(284),J=n.n(C),R=n(285),B=n.n(R),Y=n(286),T=n.n(Y);function U(){var e=JSON.parse(localStorage.getItem("credentials")),t=(j.a.create({baseURL:"http://localhost:3001/u"}),Object(u.useRef)(null)),n=Object(u.useRef)(null),a=Object(u.useRef)(null),r=Object(u.useState)({index:null,update:0,prevAmount:0}),c=Object(i.a)(r,2),s=c[0],l=c[1],d=Object(u.useState)(Object(E.a)({},e[1].budgetData.moneyData)),F=Object(i.a)(d,2),y=F[0],w=F[1],C=Object(u.useState)(e[1].budgetData.budget),R=Object(i.a)(C,2),Y=R[0],U=R[1];return Object(D.jsxs)(k.a,{fluid:!0,children:[Object(D.jsx)("div",{className:"text-center",children:Object(D.jsx)(f.a,{sx:{fontSize:"2rem",display:"flex",justifyContent:"center"},children:"BUDGET APP"})}),Object(D.jsxs)(I.a,{children:[Object(D.jsx)(z.a,{children:Object(D.jsxs)(k.a,{children:[Object(D.jsxs)(I.a,{className:" mb-5 border border-success flex-flow-column",children:[Object(D.jsx)("h4",{className:"text-success",children:"Add Budget"}),Object(D.jsx)("div",{children:"Enter Your Budget Amount"}),Object(D.jsx)(O.a,{type:"number",sx:{margin:"0.8rem 0.3rem",width:"40rem"},id:"standard-basic",inputRef:a,variant:"outlined"}),Object(D.jsx)("button",{style:{margin:"1rem 0.8rem ",width:"40rem"},className:" btn btn-success",onClick:function(){a.current.value&&(w(Object(E.a)(Object(E.a)({},y),{},{budgetAmount:parseFloat(y.budgetAmount)+parseFloat(a.current.value),pendingAmount:parseFloat(y.pendingAmount)+parseFloat(a.current.value)})),e[1].budgetData.moneyData=Object(E.a)(Object(E.a)({},y),{},{budgetAmount:parseFloat(y.budgetAmount)+parseFloat(a.current.value),pendingAmount:parseFloat(y.pendingAmount)+parseFloat(a.current.value)}),localStorage.setItem("credentials",JSON.stringify(e)),a.current.value="")},children:" Add Budget "})]}),Object(D.jsxs)(I.a,{className:" mt-5 border border-danger flex-flow-column",children:[Object(D.jsx)("h4",{className:"text-danger",children:"Add Expense"}),Object(D.jsx)("div",{children:"Enter Your Expense Title"}),Object(D.jsx)(O.a,{sx:{margin:"0.8rem 0.3rem",width:"40rem"},id:"standard-basic",inputRef:t,variant:"outlined"}),Object(D.jsx)("div",{children:"Enter Your Expense Amount"}),Object(D.jsx)(O.a,{type:"number",sx:{margin:"0.8rem 0.3rem",width:"40rem"},id:"standard-basic",inputRef:n,variant:"outlined"}),1===s.update?Object(D.jsx)("button",{style:{margin:"1rem 0.8rem ",width:"40rem"},className:" btn btn-danger",onClick:function(){return function(){if(n.current.value&&t.current.value){var a=t.current.value,r=n.current.value;Y[s.index]={title:a,amount:r},console.log(s.prevAmount),w(Object(E.a)(Object(E.a)({},y),{},{pendingAmount:parseFloat(y.pendingAmount)+parseFloat(s.prevAmount)-parseFloat(n.current.value),expenseAmount:parseFloat(y.expenseAmount)-parseFloat(s.prevAmount)+parseFloat(n.current.value)})),U(Object(o.a)(Y)),e[1].budgetData.moneyData=Object(E.a)(Object(E.a)({},y),{},{pendingAmount:parseFloat(y.pendingAmount)+parseFloat(s.prevAmount)-parseFloat(n.current.value),expenseAmount:parseFloat(y.expenseAmount)-parseFloat(s.prevAmount)+parseFloat(n.current.value)}),e[1].budgetData.budget=Y,localStorage.setItem("credentials",JSON.stringify(e)),l({update:0,index:null,prevAmount:0}),t.current.value="",n.current.value=""}}()},children:"  Update Expense"}):Object(D.jsx)("button",{style:{margin:"1rem 0.8rem ",width:"40rem"},className:" btn btn-danger",onClick:function(){n.current.value&&t.current.value?parseFloat(n.current.value)<=parseFloat(y.pendingAmount)?(U([].concat(Object(o.a)(Y),[{title:t.current.value,amount:n.current.value}])),w(Object(E.a)(Object(E.a)({},y),{},{pendingAmount:parseFloat(y.pendingAmount)-parseFloat(n.current.value),expenseAmount:parseFloat(y.expenseAmount)+parseFloat(n.current.value)})),e[1].budgetData.budget=[].concat(Object(o.a)(Y),[{title:t.current.value,amount:n.current.value}]),e[1].budgetData.moneyData=Object(E.a)(Object(E.a)({},y),{},{pendingAmount:parseFloat(y.pendingAmount)-parseFloat(n.current.value),expenseAmount:parseFloat(y.expenseAmount)+parseFloat(n.current.value)}),localStorage.setItem("credentials",JSON.stringify(e)),t.current.value="",n.current.value=""):(alert("Expense Out of Budget"),t.current.value="",n.current.value=""):alert("Both the Field for expense is necessary")},children:" Add Expense "})]})]})}),Object(D.jsx)(z.a,{children:Object(D.jsxs)("div",{children:[Object(D.jsxs)(I.a,{children:[Object(D.jsxs)(z.a,{xs:4,children:[Object(D.jsx)(J.a,{color:"success",sx:{fontSize:"7rem",textAlign:"center"}}),Object(D.jsx)("div",{className:"text-success ",style:{fontSize:"2.5rem"},children:y.budgetAmount})]}),Object(D.jsxs)(z.a,{children:[Object(D.jsx)(B.a,{color:"error",sx:{fontSize:"7rem",textAlign:"center"}}),Object(D.jsx)("div",{className:"text-danger ",style:{fontSize:"2.5rem"},children:y.expenseAmount})]}),Object(D.jsxs)(z.a,{children:[Object(D.jsx)(T.a,{color:"success",sx:{fontSize:"7rem",textAlign:"center"}}),Object(D.jsx)("div",{className:"text-success ",style:{fontSize:"2.5rem"},children:y.pendingAmount})]})]}),Object(D.jsxs)(I.a,{children:[Object(D.jsx)("h3",{className:"text-center",children:"Expense list"}),Object(D.jsx)(g.a,{component:h.a,children:Object(D.jsxs)(b.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(D.jsx)(v.a,{children:Object(D.jsxs)(p.a,{children:[Object(D.jsx)(x.a,{children:"Sr.No"}),Object(D.jsx)(x.a,{children:"Title"}),Object(D.jsx)(x.a,{children:"Amount"}),Object(D.jsx)(x.a,{children:"Action"})]})}),Object(D.jsx)(m.a,{children:null!=Y?Y.map((function(a,r){return Object(D.jsxs)(p.a,{children:[Object(D.jsx)(x.a,{children:r+1}),Object(D.jsxs)(x.a,{children:[" ",a.title]}),Object(D.jsx)(x.a,{children:a.amount}),Object(D.jsxs)(x.a,{children:[Object(D.jsx)(A.a,{variant:"outlined",color:"success",startIcon:Object(D.jsx)(N.a,{}),onClick:function(){return function(e){l({update:1,index:e,prevAmount:Y[e].amount}),t.current.value=Y[e].title,n.current.value=Y[e].amount}(r)},children:"Update Expense"})," \xa0 ",Object(D.jsx)(A.a,{variant:"outlined",color:"error",startIcon:Object(D.jsx)(S.a,{}),onClick:function(){return function(t){window.confirm("Are You Sure You want to delete the Expense?")&&(w(Object(E.a)(Object(E.a)({},y),{},{pendingAmount:parseFloat(y.pendingAmount)+parseFloat(Y[t].amount),expenseAmount:parseFloat(y.expenseAmount)-parseFloat(Y[t].amount)})),e[1].budgetData.moneyData=Object(E.a)(Object(E.a)({},y),{},{pendingAmount:parseFloat(y.pendingAmount)+parseFloat(Y[t].amount),expenseAmount:parseFloat(y.expenseAmount)-parseFloat(Y[t].amount)}),Y.splice(t,1),U(Object(o.a)(Y)),e[1].budgetData.budget=Y,localStorage.setItem("credentials",JSON.stringify(e)))}(r)},children:"Delete"})," "]})]})})):Object(D.jsxs)(p.a,{children:[" ",Object(D.jsx)(x.a,{colSpan:"4",children:'"No Tasks Available"'})]})})]})})]})]})})]})]})}var P=function(e){Object(c.a)(n,e);var t=Object(s.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(D.jsx)("div",{children:void 0!=localStorage.getItem("credentials")?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(l.a,{}),Object(D.jsx)(U,{})]}):Object(D.jsx)(w.a,{to:"/"})})}}]),n}(u.Component);t.default=P}}]);
//# sourceMappingURL=10.dbd1bac5.chunk.js.map