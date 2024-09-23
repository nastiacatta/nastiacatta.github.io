(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(6138)}])},7498:function(e,t){"use strict";var n,r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PrefetchKind:function(){return n},ACTION_REFRESH:function(){return l},ACTION_NAVIGATE:function(){return o},ACTION_RESTORE:function(){return a},ACTION_SERVER_PATCH:function(){return i},ACTION_PREFETCH:function(){return s},ACTION_FAST_REFRESH:function(){return c},ACTION_SERVER_ACTION:function(){return u}});let l="refresh",o="navigate",a="restore",i="server-patch",s="prefetch",c="fast-refresh",u="server-action";(r=n||(n={})).AUTO="auto",r.FULL="full",r.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},30:function(e,t,n){"use strict";function getDomainLocale(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return getDomainLocale}}),n(2866),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5170:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return j}});let r=n(8754),l=r._(n(7294)),o=n(4450),a=n(2227),i=n(4364),s=n(109),c=n(3607),u=n(1823),f=n(9031),d=n(920),h=n(30),p=n(7192),m=n(7498),g=new Set;function prefetch(e,t,n,r,l,o){if(!o&&!(0,a.isLocalURL)(t))return;if(!r.bypassPrefetchedCheck){let l=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,o=t+"%"+n+"%"+l;if(g.has(o))return;g.add(o)}let i=o?e.prefetch(t,l):e.prefetch(t,n,r);Promise.resolve(i).catch(e=>{})}function formatStringOrUrl(e){return"string"==typeof e?e:(0,i.formatUrl)(e)}let x=l.default.forwardRef(function(e,t){let n,r;let{href:i,as:g,children:x,prefetch:j=null,passHref:v,replace:b,shallow:y,scroll:N,locale:_,onClick:O,onMouseEnter:E,onTouchStart:C,legacyBehavior:M=!1,...P}=e;n=x,M&&("string"==typeof n||"number"==typeof n)&&(n=l.default.createElement("a",null,n));let I=l.default.useContext(u.RouterContext),k=l.default.useContext(f.AppRouterContext),T=null!=I?I:k,A=!I,R=!1!==j,L=null===j?m.PrefetchKind.AUTO:m.PrefetchKind.FULL,{href:w,as:S}=l.default.useMemo(()=>{if(!I){let e=formatStringOrUrl(i);return{href:e,as:g?formatStringOrUrl(g):e}}let[e,t]=(0,o.resolveHref)(I,i,!0);return{href:e,as:g?(0,o.resolveHref)(I,g):t||e}},[I,i,g]),H=l.default.useRef(w),U=l.default.useRef(S);M&&(r=l.default.Children.only(n));let D=M?r&&"object"==typeof r&&r.ref:t,[F,K,V]=(0,d.useIntersection)({rootMargin:"200px"}),X=l.default.useCallback(e=>{(U.current!==S||H.current!==w)&&(V(),U.current=S,H.current=w),F(e),D&&("function"==typeof D?D(e):"object"==typeof D&&(D.current=e))},[S,D,w,V,F]);l.default.useEffect(()=>{T&&K&&R&&prefetch(T,w,S,{locale:_},{kind:L},A)},[S,w,K,_,R,null==I?void 0:I.locale,T,A,L]);let B={ref:X,onClick(e){M||"function"!=typeof O||O(e),M&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),T&&!e.defaultPrevented&&function(e,t,n,r,o,i,s,c,u,f){let{nodeName:d}=e.currentTarget,h="A"===d.toUpperCase();if(h&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!u&&!(0,a.isLocalURL)(n)))return;e.preventDefault();let navigate=()=>{let e=null==s||s;"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:i,locale:c,scroll:e}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!f,scroll:e})};u?l.default.startTransition(navigate):navigate()}(e,T,w,S,b,y,N,_,A,R)},onMouseEnter(e){M||"function"!=typeof E||E(e),M&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),T&&(R||!A)&&prefetch(T,w,S,{locale:_,priority:!0,bypassPrefetchedCheck:!0},{kind:L},A)},onTouchStart(e){M||"function"!=typeof C||C(e),M&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),T&&(R||!A)&&prefetch(T,w,S,{locale:_,priority:!0,bypassPrefetchedCheck:!0},{kind:L},A)}};if((0,s.isAbsoluteUrl)(S))B.href=S;else if(!M||v||"a"===r.type&&!("href"in r.props)){let e=void 0!==_?_:null==I?void 0:I.locale,t=(null==I?void 0:I.isLocaleDomain)&&(0,h.getDomainLocale)(S,e,null==I?void 0:I.locales,null==I?void 0:I.domainLocales);B.href=t||(0,p.addBasePath)((0,c.addLocale)(S,e,null==I?void 0:I.defaultLocale))}return M?l.default.cloneElement(r,B):l.default.createElement("a",{...P,...B},n)}),j=x;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},920:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return useIntersection}});let r=n(7294),l=n(3436),o="function"==typeof IntersectionObserver,a=new Map,i=[];function useIntersection(e){let{rootRef:t,rootMargin:n,disabled:s}=e,c=s||!o,[u,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),h=(0,r.useCallback)(e=>{d.current=e},[]);(0,r.useEffect)(()=>{if(o){if(c||u)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:l,elements:o}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=i.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=a.get(r)))return t;let l=new Map,o=new IntersectionObserver(e=>{e.forEach(e=>{let t=l.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:o,elements:l},i.push(n),a.set(n,t),t}(n);return o.set(e,t),l.observe(e),function(){if(o.delete(e),l.unobserve(e),0===o.size){l.disconnect(),a.delete(r);let e=i.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&i.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!u){let e=(0,l.requestIdleCallback)(()=>f(!0));return()=>(0,l.cancelIdleCallback)(e)}},[c,n,t,u,d.current]);let p=(0,r.useCallback)(()=>{f(!1)},[]);return[h,u,p]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6138:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Home}});var r=n(5893),l=n(7294);function Header(){return(0,r.jsx)("header",{className:"fixed top-0 left-0 h-full bg-dark-grey bg-opacity-90 text-light-pink p-4 z-50 w-48",children:(0,r.jsxs)("div",{className:"flex flex-col h-full justify-between",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-2xl font-bold mb-8",children:"Anastasia's Portfolio"}),(0,r.jsx)("nav",{children:(0,r.jsxs)("ul",{className:"flex flex-col space-y-6",children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#introduction",className:"hover:text-lilac",children:"01. Home"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#about",className:"hover:text-lilac",children:"02. About Me"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#projects",className:"hover:text-lilac",children:"03. Projects"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#contact",className:"hover:text-lilac",children:"04. Contact"})})]})})]}),(0,r.jsx)("div",{className:"mb-4",children:(0,r.jsx)("a",{href:"/resume.pdf",target:"_blank",rel:"noopener noreferrer",children:(0,r.jsx)("img",{src:"/icons/resume-icon.svg",alt:"Resume",className:"w-8 h-8 hover:text-lilac"})})})]})})}var o=n(1664),a=n.n(o);function Home(){return(0,l.useEffect)(()=>{let e=document.querySelectorAll(".project-card");function handleMouseMove(e){let t=e.currentTarget,n=t.getBoundingClientRect(),r=e.clientX-n.left-n.width/2,l=e.clientY-n.top-n.height/2;t.style.transform="rotateY(".concat(r/20,"deg) rotateX(").concat(-l/20,"deg)")}function handleMouseLeave(e){e.currentTarget.style.transform="rotateY(0deg) rotateX(0deg)"}e.forEach(e=>{e.addEventListener("mousemove",handleMouseMove),e.addEventListener("mouseleave",handleMouseLeave)})},[]),(0,r.jsxs)("div",{children:[(0,r.jsx)(Header,{}),(0,r.jsxs)("section",{id:"introduction",className:"section bg-dark-grey text-light-pink",children:[(0,r.jsx)("h1",{className:"text-5xl font-bold mb-4",children:"Hello!"}),(0,r.jsx)("p",{className:"text-xl mb-6",children:"I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion."})]}),(0,r.jsxs)("section",{id:"about",className:"section bg-dark-grey text-light-pink",children:[(0,r.jsx)("h2",{className:"text-4xl font-bold mb-6",children:"About Me"}),(0,r.jsx)("p",{className:"text-lg",children:"I am a third-year MEng Design Engineering student at Imperial College London. My passion lies in the fusion of electronics, AI, and fashion. I am driven by a commitment to integrating elegant design with robust engineering to develop solutions that are both functional and aesthetically pleasing."})]}),(0,r.jsxs)("section",{id:"projects",className:"section bg-dark-grey text-light-pink",children:[(0,r.jsx)("h2",{className:"text-4xl font-bold mb-6",children:"Projects"}),(0,r.jsxs)("div",{className:"project-container",children:[(0,r.jsx)("div",{className:"project-card",children:(0,r.jsx)(a(),{href:"/exoglove",children:(0,r.jsxs)("a",{children:[(0,r.jsx)("img",{src:"/images/exoglove.jpg",alt:"EXO GLOVE"}),(0,r.jsx)("div",{className:"project-info",children:(0,r.jsx)("h3",{children:"EXO GLOVE"})})]})})}),(0,r.jsx)("div",{className:"project-card",children:(0,r.jsx)(a(),{href:"/biomorphus",children:(0,r.jsxs)("a",{children:[(0,r.jsx)("img",{src:"/images/biomorphus.jpg",alt:"BIOMORPHUS"}),(0,r.jsx)("div",{className:"project-info",children:(0,r.jsx)("h3",{children:"BIOMORPHUS"})})]})})}),(0,r.jsx)("div",{className:"project-card",children:(0,r.jsx)(a(),{href:"/innovice",children:(0,r.jsxs)("a",{children:[(0,r.jsx)("img",{src:"/images/innovice.jpg",alt:"INNOVICE"}),(0,r.jsx)("div",{className:"project-info",children:(0,r.jsx)("h3",{children:"INNOVICE"})})]})})})]})]}),(0,r.jsxs)("section",{id:"contact",className:"section bg-dark-grey text-light-pink",children:[(0,r.jsx)("h2",{className:"text-4xl font-bold mb-6",children:"Contact Me"}),(0,r.jsx)("p",{className:"text-lg mb-4",children:"Feel free to reach out to me at:"}),(0,r.jsx)("p",{className:"text-lg",children:(0,r.jsx)("a",{href:"mailto:anastasia.cattaneo@gmail.com",className:"underline hover:text-lilac",children:"anastasia.cattaneo@gmail.com"})})]})]})}},1664:function(e,t,n){e.exports=n(5170)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);