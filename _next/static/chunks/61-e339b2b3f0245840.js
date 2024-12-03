(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[61],{627:(e,t)=>{"use strict";var r,n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ACTION_HMR_REFRESH:function(){return i},ACTION_NAVIGATE:function(){return u},ACTION_PREFETCH:function(){return f},ACTION_REFRESH:function(){return l},ACTION_RESTORE:function(){return o},ACTION_SERVER_ACTION:function(){return c},ACTION_SERVER_PATCH:function(){return a},PrefetchCacheEntryStatus:function(){return n},PrefetchKind:function(){return r}});let l="refresh",u="navigate",o="restore",a="server-patch",f="prefetch",i="hmr-refresh",c="server-action";!function(e){e.AUTO="auto",e.FULL="full",e.TEMPORARY="temporary"}(r||(r={})),function(e){e.fresh="fresh",e.reusable="reusable",e.expired="expired",e.stale="stale"}(n||(n={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5157:(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),r(2063),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6397:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return m}});let n=r(7677),l=r(4848),u=n._(r(6540)),o=r(6847),a=r(7785),f=r(2772),i=r(1278),c=r(6185),s=r(7644),d=r(9258),p=r(6334),v=r(5157),h=r(296),b=r(627),y=r(1903),g=new Set;function _(e,t,r,n,l,u){if(u||(0,a.isLocalURL)(t)){if(!n.bypassPrefetchedCheck&&!u){let l=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(g.has(l))return;g.add(l)}(async()=>u?e.prefetch(t,l):e.prefetch(t,r,n))().catch(e=>{})}}function M(e){return"string"==typeof e?e:(0,f.formatUrl)(e)}let m=u.default.forwardRef(function(e,t){let r,n;let{href:f,as:g,children:m,prefetch:E=null,passHref:O,replace:R,shallow:C,scroll:j,locale:w,onClick:A,onMouseEnter:P,onTouchStart:x,legacyBehavior:T=!1,...k}=e;r=m,T&&("string"==typeof r||"number"==typeof r)&&(r=(0,l.jsx)("a",{children:r}));let L=u.default.useContext(s.RouterContext),I=u.default.useContext(d.AppRouterContext),Z=null!=L?L:I,S=!L,H=!1!==E,N=null===E?b.PrefetchKind.AUTO:b.PrefetchKind.FULL,{href:U,as:K}=u.default.useMemo(()=>{if(!L){let e=M(f);return{href:e,as:g?M(g):e}}let[e,t]=(0,o.resolveHref)(L,f,!0);return{href:e,as:g?(0,o.resolveHref)(L,g):t||e}},[L,f,g]),B=u.default.useRef(U),F=u.default.useRef(K);T&&(n=u.default.Children.only(r));let V=T?n&&"object"==typeof n&&n.ref:t,[D,q,z]=(0,p.useIntersection)({rootMargin:"200px"}),G=u.default.useCallback(e=>{(F.current!==K||B.current!==U)&&(z(),F.current=K,B.current=U),D(e)},[K,U,z,D]),Y=(0,y.useMergedRef)(G,V);u.default.useEffect(()=>{Z&&q&&H&&_(Z,U,K,{locale:w},{kind:N},S)},[K,U,q,w,H,null==L?void 0:L.locale,Z,S,N]);let J={ref:Y,onClick(e){T||"function"!=typeof A||A(e),T&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),Z&&!e.defaultPrevented&&function(e,t,r,n,l,o,f,i,c){let{nodeName:s}=e.currentTarget;if("A"===s.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!(0,a.isLocalURL)(r)))return;e.preventDefault();let d=()=>{let e=null==f||f;"beforePopState"in t?t[l?"replace":"push"](r,n,{shallow:o,locale:i,scroll:e}):t[l?"replace":"push"](n||r,{scroll:e})};c?u.default.startTransition(d):d()}(e,Z,U,K,R,C,j,w,S)},onMouseEnter(e){T||"function"!=typeof P||P(e),T&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),Z&&(H||!S)&&_(Z,U,K,{locale:w,priority:!0,bypassPrefetchedCheck:!0},{kind:N},S)},onTouchStart:function(e){T||"function"!=typeof x||x(e),T&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),Z&&(H||!S)&&_(Z,U,K,{locale:w,priority:!0,bypassPrefetchedCheck:!0},{kind:N},S)}};if((0,i.isAbsoluteUrl)(K))J.href=K;else if(!T||O||"a"===n.type&&!("href"in n.props)){let e=void 0!==w?w:null==L?void 0:L.locale,t=(null==L?void 0:L.isLocaleDomain)&&(0,v.getDomainLocale)(K,e,null==L?void 0:L.locales,null==L?void 0:L.domainLocales);J.href=t||(0,h.addBasePath)((0,c.addLocale)(K,e,null==L?void 0:L.defaultLocale))}return T?u.default.cloneElement(n,J):(0,l.jsx)("a",{...k,...J,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6334:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return f}});let n=r(6540),l=r(4959),u="function"==typeof IntersectionObserver,o=new Map,a=[];function f(e){let{rootRef:t,rootMargin:r,disabled:f}=e,i=f||!u,[c,s]=(0,n.useState)(!1),d=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{d.current=e},[]);return(0,n.useEffect)(()=>{if(u){if(i||c)return;let e=d.current;if(e&&e.tagName)return function(e,t,r){let{id:n,observer:l,elements:u}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=a.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=o.get(n)))return t;let l=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=l.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:l},a.push(r),o.set(r,t),t}(r);return u.set(e,t),l.observe(e),function(){if(u.delete(e),l.unobserve(e),0===u.size){l.disconnect(),o.delete(n);let e=a.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!c){let e=(0,l.requestIdleCallback)(()=>s(!0));return()=>(0,l.cancelIdleCallback)(e)}},[i,r,t,c,d.current]),[p,c,(0,n.useCallback)(()=>{s(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1903:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return l}});let n=r(6540);function l(e,t){let r=(0,n.useRef)(()=>{}),l=(0,n.useRef)(()=>{});return(0,n.useMemo)(()=>e&&t?n=>{null===n?(r.current(),l.current()):(r.current=u(e,n),l.current=u(t,n))}:e||t,[e,t])}function u(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1106:(e,t,r)=>{e.exports=r(6397)},6969:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var n=r(6540);let l=n.forwardRef(function(e,t){let{title:r,titleId:l,...u}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":l},u),r?n.createElement("title",{id:l},r):null,n.createElement("path",{fillRule:"evenodd",d:"M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z",clipRule:"evenodd"}))})},7911:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var n=r(6540);let l=n.forwardRef(function(e,t){let{title:r,titleId:l,...u}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":l},u),r?n.createElement("title",{id:l},r):null,n.createElement("path",{fillRule:"evenodd",d:"M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z",clipRule:"evenodd"}))})},420:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var n=r(6540);let l=n.forwardRef(function(e,t){let{title:r,titleId:l,...u}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":l},u),r?n.createElement("title",{id:l},r):null,n.createElement("path",{d:"M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"}))})},1148:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var n=r(6540);let l=n.forwardRef(function(e,t){let{title:r,titleId:l,...u}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":l},u),r?n.createElement("title",{id:l},r):null,n.createElement("path",{fillRule:"evenodd",d:"M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))})}}]);