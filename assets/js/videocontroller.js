(()=>{"use strict";var e={933:(e,t)=>{var n=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n)return n;throw new Error("unable to locate global object")}();e.exports=t=n.fetch,n.fetch&&(t.default=n.fetch.bind(n)),t.Headers=n.Headers,t.Request=n.Request,t.Response=n.Response}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var u=t[r]={exports:{}};return e[r](u,u.exports,n),u.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(933),t=n.n(e);function r(e,t,n,r,o,u,i){try{var a=e[u](i),c=a.value}catch(e){return void n(e)}a.done?t(c):Promise.resolve(c).then(r,o)}var o,u=document.querySelector(".playbtn"),i=document.querySelector(".mutebtn"),a=document.querySelector(".videotime"),c=document.querySelector(".videovolume"),d=document.querySelector(".video"),s=document.querySelector(".videosection"),l=document.querySelector(".currenttime"),v=document.querySelector(".fulltime"),f=document.querySelector(".fullscreenbtn"),m=document.querySelector(".views"),p=function(e){return new Date(Math.floor(1e3*e)).toISOString().substr(14,5)},x=function(){var e,n=(e=regeneratorRuntime.mark((function e(){var n,r,o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u.textContent="Play",n=d.dataset.id,e.next=4,t()("/api/video/".concat(n,"/addview"),{method:"post"});case 4:if(201!==(r=e.sent).status){e.next=12;break}return e.next=8,r.json();case 8:o=e.sent,i=o.views,console.log(i),m.textContent=1===i?"1 view":"".concat(i," views");case 12:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(o,u){var i=e.apply(t,n);function a(e){r(i,o,u,a,c,"next",e)}function c(e){r(i,o,u,a,c,"throw",e)}a(void 0)}))});return function(){return n.apply(this,arguments)}}();d.addEventListener("loadedmetadata",(function(){setTimeout((function(){var e=p(d.duration);v.textContent=e,a.max=Math.floor(d.duration),a.value=0,o=d.volume}),100)})),d.addEventListener("timeupdate",(function(){l.textContent=p(d.currentTime),a.value=d.currentTime})),d.addEventListener("ended",x),u.addEventListener("click",(function(){d.paused?(u.textContent="Pause",d.play()):(u.textContent="Play",d.pause())})),i.addEventListener("click",(function(){d.muted?(d.muted=!1,i.textContent="Mute",c.value=o):(d.muted=!0,i.textContent="Unmute",c.value=0)})),a.addEventListener("input",(function(e){d.currentTime=e.target.value})),c.addEventListener("input",(function(e){o=d.volume=e.target.value,"0"===e.target.value?(d.muted=!0,i.textContent="Unmute"):(d.muted=!1,i.textContent="Mute")})),f.addEventListener("click",(function(){document.fullscreenElement?(document.exitFullscreen(),f.textContent="Fullscreen"):(s.requestFullscreen(),f.textContent="ExitFullscreen")}))})()})();