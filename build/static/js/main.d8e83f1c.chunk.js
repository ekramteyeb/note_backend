(this.webpackJsonpcourseinfo=this.webpackJsonpcourseinfo||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},20:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),o=n.n(c),u=(n(20),n(4)),i=n(2),l=function(e){var t=e.note,n=e.handleImportance,a=t.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},t.content,r.a.createElement("button",{onClick:n},a))},m=n(3),s=n.n(m),f=function(){return s.a.get("api/notes").then((function(e){return e.data}))},p=function(e){return s.a.post("api/notes",e).then((function(e){return e.data}))},d=function(e,t){return s.a.put("".concat("api/notes","/").concat(e),t).then((function(e){return e.data}))},E=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},b=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"\xa9 Teyeb Hussen. Note app, Department of Computer Science, University of Helsinki 2020"))},g=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),m=Object(i.a)(o,2),s=m[0],g=m[1],v=Object(a.useState)(!1),h=Object(i.a)(v,2),O=h[0],j=h[1],S=Object(a.useState)(""),y=Object(i.a)(S,2),k=y[0],I=y[1],N=Object(a.useState)(null),w=Object(i.a)(N,2),C=w[0],D=w[1];Object(a.useEffect)((function(){f().then((function(e){c(e)}))}),[]);var T=O?n:n.filter((function(e){return e.important}));return r.a.createElement("div",null,r.a.createElement("div",null," ",r.a.createElement("img",{className:"logogurage",src:"gurage.png",alt:"gurage"})," "),r.a.createElement("h1",null,"Notes"),r.a.createElement(E,{message:C}),r.a.createElement("button",{onClick:function(){return j(!O)}},"Show ",O?"Important":"All"),r.a.createElement("ul",null,T.map((function(e){return r.a.createElement(l,{key:e.id,handleImportance:function(){return function(e){var t=n.find((function(t){return t.id===e})),a=Object(u.a)(Object(u.a)({},t),{},{important:!t.important});d(e,a).then((function(t){c(n.map((function(n){return n.id!==e?n:t})))})).catch((function(a){D("The ".concat(t.content," is aleady deleted.")),setTimeout((function(){D(null)}),5e3),c(n.filter((function(t){return t.id!==e})))}))}(e.id)},note:e})}))),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={content:s,date:(new Date).toISOString(),important:Math.random()<.5};s?p(t).then((function(e){c(n.concat(e)),g(""),I("")})):I("Please enter note")}},r.a.createElement("input",{onChange:function(e){g(e.target.value),e.target.value?I(e.target.value):I("Enter somthing")},value:s}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement("div",{style:{color:"red",fontSize:19}},k||""),r.a.createElement(b,null))};o.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d8e83f1c.chunk.js.map