(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(3275)}])},3271:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return f}});let i=r(8754),n=r(1757),s=n._(r(7294)),a=i._(r(3935)),o=i._(r(9201)),l=r(3914),c=r(5494),d=r(869);r(1905);let u=r(1823),m=i._(r(4545)),g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function handleLoading(e,t,r,i,n,s){let a=null==e?void 0:e.src;if(!e||e["data-loaded-src"]===a)return;e["data-loaded-src"]=a;let o="decode"in e?e.decode():Promise.resolve();o.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&n(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,n=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}(null==i?void 0:i.current)&&i.current(e)}})}function getDynamicProps(e){let[t,r]=s.version.split("."),i=parseInt(t,10),n=parseInt(r,10);return i>18||18===i&&n>=3?{fetchPriority:e}:{fetchpriority:e}}let h=(0,s.forwardRef)((e,t)=>{let{src:r,srcSet:i,sizes:n,height:a,width:o,decoding:l,className:c,style:d,fetchPriority:u,placeholder:m,loading:g,unoptimized:h,fill:f,onLoadRef:p,onLoadingCompleteRef:x,setBlurComplete:j,setShowAltText:v,onLoad:b,onError:y,...w}=e;return s.default.createElement("img",{...w,...getDynamicProps(u),loading:g,width:o,height:a,decoding:l,"data-nimg":f?"fill":"1",className:c,style:d,sizes:n,srcSet:i,src:r,ref:(0,s.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(y&&(e.src=e.src),e.complete&&handleLoading(e,m,p,x,j,h))},[r,m,p,x,j,y,h,t]),onLoad:e=>{let t=e.currentTarget;handleLoading(t,m,p,x,j,h)},onError:e=>{v(!0),"empty"!==m&&j(!0),y&&y(e)}})});function ImagePreload(e){let{isAppRouter:t,imgAttributes:r}=e,i={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...getDynamicProps(r.fetchPriority)};return t&&a.default.preload?(a.default.preload(r.src,i),null):s.default.createElement(o.default,null,s.default.createElement("link",{key:"__nimg-"+r.src+r.srcSet+r.sizes,rel:"preload",href:r.srcSet?void 0:r.src,...i}))}let f=(0,s.forwardRef)((e,t)=>{let r=(0,s.useContext)(u.RouterContext),i=(0,s.useContext)(d.ImageConfigContext),n=(0,s.useMemo)(()=>{let e=g||i||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[i]),{onLoad:a,onLoadingComplete:o}=e,f=(0,s.useRef)(a);(0,s.useEffect)(()=>{f.current=a},[a]);let p=(0,s.useRef)(o);(0,s.useEffect)(()=>{p.current=o},[o]);let[x,j]=(0,s.useState)(!1),[v,b]=(0,s.useState)(!1),{props:y,meta:w}=(0,l.getImgProps)(e,{defaultLoader:m.default,imgConf:n,blurComplete:x,showAltText:v});return s.default.createElement(s.default.Fragment,null,s.default.createElement(h,{...y,unoptimized:w.unoptimized,placeholder:w.placeholder,fill:w.fill,onLoadRef:f,onLoadingCompleteRef:p,setBlurComplete:j,setShowAltText:b,ref:t}),w.priority?s.default.createElement(ImagePreload,{isAppRouter:!r,imgAttributes:y}):null)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3914:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return getImgProps}}),r(1905);let i=r(2393),n=r(5494);function isStaticRequire(e){return void 0!==e.default}function getInt(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function getImgProps(e,t){var r;let s,a,o,{src:l,sizes:c,unoptimized:d=!1,priority:u=!1,loading:m,className:g,quality:h,width:f,height:p,fill:x=!1,style:j,onLoad:v,onLoadingComplete:b,placeholder:y="empty",blurDataURL:w,fetchPriority:N,layout:S,objectFit:k,objectPosition:P,lazyBoundary:_,lazyRoot:C,...E}=e,{imgConf:I,showAltText:M,blurComplete:O,defaultLoader:z}=t,R=I||n.imageConfigDefault;if("allSizes"in R)s=R;else{let e=[...R.deviceSizes,...R.imageSizes].sort((e,t)=>e-t),t=R.deviceSizes.sort((e,t)=>e-t);s={...R,allSizes:e,deviceSizes:t}}let L=E.loader||z;delete E.loader,delete E.srcSet;let A="__next_img_default"in L;if(A){if("custom"===s.loader)throw Error('Image with src "'+l+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=L;L=t=>{let{config:r,...i}=t;return e(i)}}if(S){"fill"===S&&(x=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[S];e&&(j={...j,...e});let t={responsive:"100vw",fill:"100vw"}[S];t&&!c&&(c=t)}let D="",B=getInt(f),H=getInt(p);if("object"==typeof(r=l)&&(isStaticRequire(r)||void 0!==r.src)){let e=isStaticRequire(l)?l.default:l;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(a=e.blurWidth,o=e.blurHeight,w=w||e.blurDataURL,D=e.src,!x){if(B||H){if(B&&!H){let t=B/e.width;H=Math.round(e.height*t)}else if(!B&&H){let t=H/e.height;B=Math.round(e.width*t)}}else B=e.width,H=e.height}}let G=!u&&("lazy"===m||void 0===m);(!(l="string"==typeof l?l:D)||l.startsWith("data:")||l.startsWith("blob:"))&&(d=!0,G=!1),s.unoptimized&&(d=!0),A&&l.endsWith(".svg")&&!s.dangerouslyAllowSVG&&(d=!0),u&&(N="high");let T=getInt(h),W=Object.assign(x?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:P}:{},M?{}:{color:"transparent"},j),F=O||"empty"===y?null:"blur"===y?'url("data:image/svg+xml;charset=utf-8,'+(0,i.getImageBlurSvg)({widthInt:B,heightInt:H,blurWidth:a,blurHeight:o,blurDataURL:w||"",objectFit:W.objectFit})+'")':'url("'+y+'")',Z=F?{backgroundSize:W.objectFit||"cover",backgroundPosition:W.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:F}:{},q=function(e){let{config:t,src:r,unoptimized:i,width:n,quality:s,sizes:a,loader:o}=e;if(i)return{src:r,srcSet:void 0,sizes:void 0};let{widths:l,kind:c}=function(e,t,r){let{deviceSizes:i,allSizes:n}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let i;i=e.exec(r);i)t.push(parseInt(i[2]));if(t.length){let e=.01*Math.min(...t);return{widths:n.filter(t=>t>=i[0]*e),kind:"w"}}return{widths:n,kind:"w"}}if("number"!=typeof t)return{widths:i,kind:"w"};let s=[...new Set([t,2*t].map(e=>n.find(t=>t>=e)||n[n.length-1]))];return{widths:s,kind:"x"}}(t,n,a),d=l.length-1;return{sizes:a||"w"!==c?a:"100vw",srcSet:l.map((e,i)=>o({config:t,src:r,quality:s,width:e})+" "+("w"===c?e:i+1)+c).join(", "),src:o({config:t,src:r,quality:s,width:l[d]})}}({config:s,src:l,unoptimized:d,width:B,quality:T,sizes:c,loader:L}),J={...E,loading:G?"lazy":m,fetchPriority:N,width:B,height:H,decoding:"async",className:g,style:{...W,...Z},sizes:q.sizes,srcSet:q.srcSet,src:q.src},U={unoptimized:d,priority:u,placeholder:y,fill:x};return{props:J,meta:U}}},2393:function(e,t){"use strict";function getImageBlurSvg(e){let{widthInt:t,heightInt:r,blurWidth:i,blurHeight:n,blurDataURL:s,objectFit:a}=e,o=i?40*i:t,l=n?40*n:r,c=o&&l?"viewBox='0 0 "+o+" "+l+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+c+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(c?"none":"contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+s+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return getImageBlurSvg}})},645:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{unstable_getImgProps:function(){return unstable_getImgProps},default:function(){return l}});let i=r(8754),n=r(3914),s=r(1905),a=r(3271),o=i._(r(4545)),unstable_getImgProps=e=>{(0,s.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,n.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}},l=a.Image},4545:function(e,t){"use strict";function defaultLoader(e){let{config:t,src:r,width:i,quality:n}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+i+"&q="+(n||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}}),defaultLoader.__next_img_default=!0;let r=defaultLoader},8852:function(e,t,r){"use strict";r.d(t,{Z:function(){return Header}});var i=r(5893),n=r(7294),s=r(1664),a=r.n(s),o=r(5040),l=r(6459),c=r(6445),d=r(4149);function Header(){let[e,t]=(0,n.useState)(!1),[r,s]=(0,n.useState)(!1);(0,n.useEffect)(()=>{let e=localStorage.getItem("theme");"dark"===e&&(t(!0),document.documentElement.classList.add("dark"))},[]);let toggleMobileMenu=()=>{s(!r)};return(0,i.jsxs)("header",{className:"header flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-900 fixed w-full top-0 z-50",children:[(0,i.jsx)("div",{className:"logo flex items-center",children:(0,i.jsx)(a(),{href:"/",children:(0,i.jsxs)("a",{className:"flex items-center",children:[(0,i.jsx)("img",{src:"/logo.png",alt:"Logo",className:"w-8 h-8 mr-2"}),(0,i.jsx)("span",{className:"text-white dark:text-gray-200 font-semibold text-lg",children:"Anastasia's Portfolio"})]})})}),(0,i.jsx)("nav",{className:"hidden md:block",children:(0,i.jsxs)("ul",{className:"flex space-x-4",children:[(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#introduction",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",children:"Home"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#about",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",children:"About"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#projects",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",children:"Projects"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#contact",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",children:"Contact"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/resume",children:(0,i.jsxs)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors flex items-center group",children:["Resume",(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,i.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 8l4 4m0 0l-4 4m4-4H3"})})]})})})]})}),(0,i.jsxs)("div",{className:"md:hidden flex items-center",children:[(0,i.jsx)("button",{onClick:()=>{e?(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light")):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")),t(!e)},className:"mr-2 focus:outline-none",children:e?(0,i.jsx)(o.Z,{className:"w-6 h-6 text-yellow-400"}):(0,i.jsx)(l.Z,{className:"w-6 h-6 text-gray-200"})}),(0,i.jsx)("button",{onClick:toggleMobileMenu,className:"focus:outline-none",children:r?(0,i.jsx)(c.Z,{className:"w-6 h-6 text-gray-200"}):(0,i.jsx)(d.Z,{className:"w-6 h-6 text-gray-200"})})]}),r&&(0,i.jsx)("nav",{className:"absolute top-16 right-4 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg md:hidden",children:(0,i.jsxs)("ul",{className:"flex flex-col p-4 space-y-2",children:[(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#introduction",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",onClick:toggleMobileMenu,children:"Home"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#about",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",onClick:toggleMobileMenu,children:"About"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#projects",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",onClick:toggleMobileMenu,children:"Projects"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/#contact",children:(0,i.jsx)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors",onClick:toggleMobileMenu,children:"Contact"})})}),(0,i.jsx)("li",{children:(0,i.jsx)(a(),{href:"/resume",children:(0,i.jsxs)("a",{className:"text-gray-200 hover:text-pink-400 transition-colors flex items-center group",children:["Resume",(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,i.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 8l4 4m0 0l-4 4m4-4H3"})})]})})})]})})]})}},3275:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Home}});var i=r(5893),n=r(8852);r(7294);var s=r(1664),a=r.n(s),o=r(5675),l=r.n(o);function Projects(){return(0,i.jsx)("div",{className:"py-10 px-6",children:(0,i.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:[{title:"EXO GLOVE",href:"/exoglove",imageSrc:"/exoglove.jpeg"},{title:"BIOMORPHUS",href:"/biomorphus",imageSrc:"/biomorphus.jpeg"},{title:"INNOVICE",href:"/innovice",imageSrc:"/innovice.jpeg"},{title:"PROJECT 4",href:"/project4",imageSrc:"/project4.jpeg"},{title:"PROJECT 5",href:"/project5",imageSrc:"/project5.jpeg"},{title:"PROJECT 6",href:"/project6",imageSrc:"/project6.jpeg"}].map(e=>(0,i.jsx)(a(),{href:e.href,children:(0,i.jsx)("a",{className:"relative group",children:(0,i.jsxs)("div",{className:"overflow-hidden rounded-lg shadow-lg transition-transform duration-700 transform hover:scale-105 hover:rotate-3 hover:translate-y-1",children:[(0,i.jsx)(l(),{src:e.imageSrc,alt:"".concat(e.title," Image"),width:400,height:300,className:"object-cover"}),(0,i.jsx)("div",{className:"absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"})]})})},e.title))})})}function Home(){return(0,i.jsxs)("div",{children:[(0,i.jsx)(n.Z,{}),(0,i.jsxs)("section",{id:"introduction",className:"section",children:[(0,i.jsx)("h1",{className:"text-5xl font-bold mb-4",children:"Hello!"}),(0,i.jsx)("p",{className:"text-xl mb-6",children:"I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion."})]}),(0,i.jsxs)("section",{id:"about",className:"section",children:[(0,i.jsx)("h2",{className:"text-4xl font-bold mb-6",children:"About Me"}),(0,i.jsx)("p",{className:"text-lg",children:"I am a third-year MEng Design Engineering student at Imperial College London. My passion lies in the fusion of electronics, AI, and fashion. I am driven by a commitment to integrating elegant design with robust engineering to develop solutions that are both functional and aesthetically pleasing. Beyond my core focus, I have a deep interest in the arts, literature, and architecture, which continually inspire my work."})]}),(0,i.jsx)("section",{id:"projects",className:"section",children:(0,i.jsx)(Projects,{})}),(0,i.jsxs)("section",{id:"contact",className:"section",children:[(0,i.jsx)("h2",{className:"text-4xl font-bold mb-6",children:"Contact Me"}),(0,i.jsx)("p",{className:"text-lg mb-4",children:"Feel free to reach out to me at:"}),(0,i.jsx)("p",{className:"text-lg",children:(0,i.jsx)("a",{href:"mailto:anastasia.cattaneo@gmail.com",className:"underline hover:text-pink-400",children:"anastasia.cattaneo@gmail.com"})})]}),(0,i.jsxs)("div",{className:"email-vertical",children:[(0,i.jsx)("a",{href:"mailto:anastasia.cattaneo@gmail.com",className:"email-link",children:"anastasia.cattaneo@gmail.com"}),(0,i.jsx)("div",{className:"vertical-line"})]})]})}},5675:function(e,t,r){e.exports=r(645)}},function(e){e.O(0,[224,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);