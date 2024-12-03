(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{5858:(e,t,n)=>{var r="Expected a function",i=0/0,o=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,s=/^0o[0-7]+$/i,u=parseInt,f="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,l="object"==typeof self&&self&&self.Object===Object&&self,m=f||l||Function("return this")(),d=Object.prototype.toString,p=Math.max,g=Math.min,v=function(){return m.Date.now()};function h(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function j(e){if("number"==typeof e)return e;if("symbol"==typeof(t=e)||t&&"object"==typeof t&&"[object Symbol]"==d.call(t))return i;if(h(e)){var t,n="function"==typeof e.valueOf?e.valueOf():e;e=h(n)?n+"":n}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var r=c.test(e);return r||s.test(e)?u(e.slice(2),r?2:8):a.test(e)?i:+e}e.exports=function(e,t,n){var i=!0,o=!0;if("function"!=typeof e)throw TypeError(r);return h(n)&&(i="leading"in n?!!n.leading:i,o="trailing"in n?!!n.trailing:o),function(e,t,n){var i,o,a,c,s,u,f=0,l=!1,m=!1,d=!0;if("function"!=typeof e)throw TypeError(r);function x(t){var n=i,r=o;return i=o=void 0,f=t,c=e.apply(r,n)}function y(e){var n=e-u,r=e-f;return void 0===u||n>=t||n<0||m&&r>=a}function w(){var e,n,r,i=v();if(y(i))return b(i);s=setTimeout(w,(e=i-u,n=i-f,r=t-e,m?g(r,a-n):r))}function b(e){return(s=void 0,d&&i)?x(e):(i=o=void 0,c)}function E(){var e,n=v(),r=y(n);if(i=arguments,o=this,u=n,r){if(void 0===s)return f=e=u,s=setTimeout(w,t),l?x(e):c;if(m)return s=setTimeout(w,t),x(u)}return void 0===s&&(s=setTimeout(w,t)),c}return t=j(t)||0,h(n)&&(l=!!n.leading,a=(m="maxWait"in n)?p(j(n.maxWait)||0,t):a,d="trailing"in n?!!n.trailing:d),E.cancel=function(){void 0!==s&&clearTimeout(s),f=0,i=u=o=s=void 0},E.flush=function(){return void 0===s?c:b(v())},E}(e,t,{leading:i,maxWait:t,trailing:o})}},6170:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(5406)}])},5406:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>l});var r=n(4848);n(885);var i=n(3368),o=n.n(i),a=n(6540),c=n(5858),s=n.n(c);let u=()=>{let[e,t]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let e=window.matchMedia("(prefers-color-scheme: dark)");t(e.matches);let n=e=>{t(e.matches)};return e.addEventListener("change",n),()=>{e.removeEventListener("change",n)}},[]),e},f=()=>{let e=(0,a.useRef)(null),t=(0,a.useRef)(null),[n,i]=(0,a.useState)(!1),o=u();return(0,a.useEffect)(()=>{i(!0)},[]),(0,a.useEffect)(()=>{if("ontouchstart"in window||navigator.maxTouchPoints>0)return;let n=e.current;if(!n)return;let r=s()(e=>{let{clientX:r,clientY:i}=e;t.current&&cancelAnimationFrame(t.current),t.current=requestAnimationFrame(()=>{n.style.left="".concat(r,"px"),n.style.top="".concat(i,"px")})},10);return document.addEventListener("mousemove",r),()=>{document.removeEventListener("mousemove",r),t.current&&cancelAnimationFrame(t.current)}},[]),(0,r.jsx)("div",{className:"flashlight ".concat(n?"":"hidden"," ").concat(o?"dark-mode":"light-mode"),ref:e,"aria-hidden":"true"})},l=function(e){let{Component:t,pageProps:n}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o(),{children:[(0,r.jsx)("title",{children:"Portfolio"}),(0,r.jsx)("meta",{name:"description",content:"Anastasia's Design Engineering Portfolio showcasing projects in wearables, AI, and fashion."}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("meta",{property:"og:title",content:"Anastasia's Portfolio"}),(0,r.jsx)("meta",{property:"og:description",content:"Design Engineering projects in wearables, AI, and fashion."}),(0,r.jsx)("meta",{property:"og:image",content:"/logo.png"}),(0,r.jsx)("meta",{property:"og:url",content:"https://your-portfolio-url.com"}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary_large_image"})]}),(0,r.jsx)(f,{})," ",(0,r.jsx)(t,{...n})]})}},885:()=>{},3368:(e,t,n)=>{e.exports=n(6085)}},e=>{var t=t=>e(e.s=t);e.O(0,[593,792],()=>(t(6170),t(8440))),_N_E=e.O()}]);