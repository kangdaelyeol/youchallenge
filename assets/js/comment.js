(()=>{"use strict";var e={933:(e,t)=>{var n=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n)return n;throw new Error("unable to locate global object")}();e.exports=t=n.fetch,n.fetch&&(t.default=n.fetch.bind(n)),t.Headers=n.Headers,t.Request=n.Request,t.Response=n.Response}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(933),t=n.n(e);function r(e,t,n,r,o,a,c){try{var u=e[a](c),i=u.value}catch(e){return void n(e)}u.done?t(i):Promise.resolve(i).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var c=e.apply(t,n);function u(e){r(c,o,a,u,i,"next",e)}function i(e){r(c,o,a,u,i,"throw",e)}u(void 0)}))}}var a=document.querySelector(".video"),c=document.querySelector(".commentform"),u=document.querySelector(".comment"),i=document.querySelector(".commentsection"),s=function(e,t){var n=document.createElement("li");n.dataset.id=t;var r=document.createElement("span"),o=document.createElement("span");r.className="commentremove",r.textContent="💥",o.textContent=e,n.appendChild(o),n.appendChild(r),i.prepend(n)},d=function(){var e=o(regeneratorRuntime.mark((function e(n){var r,o,c,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),""!==u.value){e.next=3;break}return e.abrupt("return");case 3:return r=a.dataset.id,o=u.value,e.next=7,t()("/api/video/".concat(r,"/comment"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:o})}).catch((function(e){return console.log(e)}));case 7:if(c=e.sent,console.log(c),201!==c.status){e.next=15;break}return e.next=12,c.json();case 12:i=e.sent,u.value="",s(o,i.commentID);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=o(regeneratorRuntime.mark((function e(n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("commentremove"===n.target.className){e.next=2;break}return e.abrupt("return");case 2:return r=n.target.dataset.commentid,e.next=5,t()("/api/video/".concat(r,"/delete"),{method:"post"});case 5:201===e.sent.status&&i.querySelector('[data-id="'.concat(r,'"]')).remove();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();c&&c.addEventListener("submit",d),i.addEventListener("click",m)})()})();