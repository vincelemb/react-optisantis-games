(this["webpackJsonpmemory2.0"]=this["webpackJsonpmemory2.0"]||[]).push([[0],[,,function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=2},function(e){e.exports=JSON.parse('{"fruits_legumes":[{"id":"banana","url":"http://localhost:3000/assets/img/fruits_legumes/003-banana.png"},{"id":"avocado","url":"http://localhost:3000/assets/img/fruits_legumes/002-avocado.png"},{"id":"Bell-pepper","url":"http://localhost:3000/assets/img/fruits_legumes/004-Bell-pepper.png"},{"id":"broccoli","url":"http://localhost:3000/assets/img/fruits_legumes/005-broccoli.png"},{"id":"cherry","url":"http://localhost:3000/assets/img/fruits_legumes/008-cherry.png"},{"id":"corn","url":"http://localhost:3000/assets/img/fruits_legumes/011-corn.png"},{"id":"eggplant","url":"http://localhost:3000/assets/img/fruits_legumes/013-eggplant.png"},{"id":"grapes","url":"http://localhost:3000/assets/img/fruits_legumes/014-grapes.png"},{"id":"lemon","url":"http://localhost:3000/assets/img/fruits_legumes/016-lemon.png"},{"id":"mushroom","url":"http://localhost:3000/assets/img/fruits_legumes/018-mushroom.png"},{"id":"onion","url":"http://localhost:3000/assets/img/fruits_legumes/019-onion.png"},{"id":"lettuce","url":"http://localhost:3000/assets/img/fruits_legumes/027-lettuce.png"},{"id":"strawberry","url":"http://localhost:3000/assets/img/fruits_legumes/028-strawberry.png"}]}')},,,,function(e,t,n){e.exports=n(14)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(5),s=n.n(l),c=n(6),o=n(1),u=n(3),i=function(e){return r.a.createElement("button",{className:e.activeClass+" _border-primary _text-primary _leading-normal _border-solid _border _bg-transparent _mx-xxs _rounded-small _shadow-none _py-xxs",onClick:e.onClick},r.a.createElement("span",{className:"_block"},e.number&&e.number),r.a.createElement("span",{className:"_block"},e.label&&e.label),e.children)},m=function(e){return r.a.createElement("button",{className:e.flipClass&&e.flipClass+" card",id:e.id,onClick:e.onClick&&e.onClick},e.children)},p=function(){var e,t=Object(a.useState)(0),n=Object(o.a)(t,2),l=n[0],s=n[1],c=Object(a.useState)(!1),u=Object(o.a)(c,2),i=u[0],m=u[1];return Object(a.useEffect)((function(){return i?e=setInterval((function(){s((function(e){return e+1}))}),1e3):i||0===l||clearInterval(e),function(){return clearInterval(e)}}),[i,l]),r.a.createElement("div",null,r.a.createElement("span",null,l),r.a.createElement("button",{className:"button button-primary button-primary-".concat(i?"active":"inactive"),onClick:function(){m(!i)}},i?"Pause":"Start"),r.a.createElement("button",{className:"button",onClick:function(){s(0),m(!1)}},"Reset"))},g=(n(12),n(13),function(){var e=[12,16,20,24,26],t=Object(a.useState)(e[0]),n=Object(o.a)(t,2),l=n[0],s=n[1],g=Object(a.useState)(),f=Object(o.a)(g,2),d=f[0],h=f[1],b=Object(a.useState)([]),_=Object(o.a)(b,2),v=_[0],E=_[1];return Object(a.useEffect)((function(){E(v.length=0);for(var e=0;e<l/2;e++)E(v.push(e));E(v.push.apply(v,Object(c.a)(v))),E(function(e){for(var t=e.length;t>0;){var n=Math.floor(Math.random()*t),a=e[--t];e[t]=e[n],e[n]=a}return e}(v)),E(v.toString().split(","))}),[l]),r.a.createElement("div",{className:"memory-bg"},r.a.createElement("div",null,function(){var t=[];return e&&e.map((function(n,a){t.push(r.a.createElement(i,{key:a,label:"cartes",number:n,activeClass:l===e[a]?"_bg-primary _text-nearwhite":"",onClick:function(){!function(t){s(e[t])}(a)}}))})),r.a.createElement("div",null,t)}()),r.a.createElement("div",null,function(){for(var e=[],t=function(e,t){for(var n=[],a=0;a<t/2;a++)n.push(r.a.createElement("img",{className:"_h-full",src:e[a].url,key:"image-"+e[a].id,alt:"ok"}));return n.slice(0,t/2)}(u.fruits_legumes,l),n=function(n){e.push(r.a.createElement(m,{flipClass:d===n?"-isFlipped":"_bg-primary",key:n,id:v[n],onClick:function(){h(n)}},t[v[n]]))},a=0;a<l;a++)n(a);return r.a.createElement("div",{className:"grid-card"},e)}()),r.a.createElement("div",null,r.a.createElement(p,null)))});s.a.render(r.a.createElement((function(){return r.a.createElement(g,null)}),null),document.getElementById("root"))}],[[7,1,2]]]);
//# sourceMappingURL=main.e285e2e5.chunk.js.map