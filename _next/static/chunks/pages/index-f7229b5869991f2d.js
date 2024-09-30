(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(5536)}])},8852:function(e,t,n){"use strict";n.d(t,{Z:function(){return Header}});var a=n(5893),i=n(7294),o=n(1664),s=n.n(o),l=n(5040),r=n(6459),c=n(6445),d=n(4149);function Header(){let[e,t]=(0,i.useState)(!1),[n,o]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=localStorage.getItem("theme");"dark"===e&&(t(!0),document.documentElement.classList.add("dark"))},[]);let toggleDarkMode=()=>{e?(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light")):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")),t(!e)},toggleMobileMenu=()=>{o(!n)};return(0,a.jsxs)("header",{className:"header flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-900 fixed w-full top-0 z-50",children:[(0,a.jsx)("a",{href:"#main-content",className:"sr-only focus:not-sr-only",children:"Skip to main content"}),(0,a.jsx)("div",{className:"logo flex items-center",children:(0,a.jsx)(s(),{href:"/",children:(0,a.jsxs)("a",{className:"flex items-center",children:[(0,a.jsx)("img",{src:"/logo.png",alt:"Logo",className:"w-8 h-8 mr-2"}),(0,a.jsx)("span",{className:"text-white dark:text-gray-800 font-semibold text-2xl hover:text-lilac transition-colors",children:"Anastasia's Portfolio"})]})})}),(0,a.jsxs)("nav",{className:"hidden md:flex items-center space-x-6",children:[(0,a.jsx)(s(),{href:"/#introduction",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",children:"Home"})}),(0,a.jsx)(s(),{href:"/#about",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",children:"About"})}),(0,a.jsx)(s(),{href:"/#projects",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",children:"Projects"})}),(0,a.jsx)(s(),{href:"/#contact",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",children:"Contact"})}),(0,a.jsxs)("div",{className:"relative group",children:[(0,a.jsx)(s(),{href:"/resume",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors flex items-center px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac",children:"Resume"})}),(0,a.jsx)("div",{className:"absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1 -translate-y-1 pointer-events-none bg-gray-700 dark:bg-gray-200"})]}),(0,a.jsx)("button",{onClick:toggleDarkMode,className:"ml-4 focus:outline-none focus:ring-2 focus:ring-lilac rounded-full p-1","aria-label":"Toggle Dark Mode",children:e?(0,a.jsx)(l.Z,{className:"w-6 h-6 text-yellow-400"}):(0,a.jsx)(r.Z,{className:"w-6 h-6 text-gray-200"})})]}),(0,a.jsxs)("div",{className:"flex items-center md:hidden",children:[(0,a.jsx)("button",{onClick:toggleDarkMode,className:"mr-2 focus:outline-none focus:ring-2 focus:ring-lilac rounded-full p-1","aria-label":"Toggle Dark Mode",children:e?(0,a.jsx)(l.Z,{className:"w-6 h-6 text-yellow-400"}):(0,a.jsx)(r.Z,{className:"w-6 h-6 text-gray-200"})}),(0,a.jsx)("button",{onClick:toggleMobileMenu,className:"focus:outline-none","aria-label":"Toggle Mobile Menu",children:n?(0,a.jsx)(c.Z,{className:"w-6 h-6 text-gray-200"}):(0,a.jsx)(d.Z,{className:"w-6 h-6 text-gray-200"})})]}),n&&(0,a.jsx)("nav",{className:"absolute top-16 right-4 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg md:hidden",children:(0,a.jsxs)("ul",{className:"flex flex-col p-4 space-y-2",children:[(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"/#introduction",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",onClick:toggleMobileMenu,children:"Home"})})}),(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"/#about",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",onClick:toggleMobileMenu,children:"About"})})}),(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"/#projects",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",onClick:toggleMobileMenu,children:"Projects"})})}),(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"/#contact",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac",onClick:toggleMobileMenu,children:"Contact"})})}),(0,a.jsxs)("li",{className:"relative group",children:[(0,a.jsx)(s(),{href:"/resume",children:(0,a.jsx)("a",{className:"text-gray-200 hover:text-lilac transition-colors flex items-center px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac",onClick:toggleMobileMenu,children:"Resume"})}),(0,a.jsx)("div",{className:"absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1 -translate-y-1 pointer-events-none bg-gray-700 dark:bg-gray-200"})]})]})})]})}},5536:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Home}});var a=n(5893),i=n(7294),o=n(9477),s=n(5152),l=n.n(s);let r=l()(()=>n.e(365).then(n.bind(n,9365)).then(e=>e.OrbitControls),{loadableGenerated:{webpack:()=>[9365]},ssr:!1});function Hero(){let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,n;let a=e.current;if(!a)return;let i=new o.xsS,s=new o.cPb(75,a.clientWidth/a.clientHeight,.1,1e3);s.position.z=5;let l=new o.CP7({canvas:a,alpha:!0,antialias:!0});l.setSize(a.clientWidth,a.clientHeight),l.setPixelRatio(window.devicePixelRatio),(t=new r(s,l.domElement)).enableDamping=!0,t.dampingFactor=.05,t.enableRotate=!0,t.enableZoom=!1,t.enablePan=!1;let c=new o.Mig(16777215,.8);i.add(c);let d=new o.Ox3(16777215,.5);d.position.set(0,1,1),i.add(d);let u=new o.bnF;u.moveTo(0,0),u.bezierCurveTo(.5,0,.5,2,0,3),u.bezierCurveTo(-.5,2,-.5,0,0,0);let h=new o.O7d(u,{depth:.05,bevelEnabled:!0,bevelSegments:2,steps:2,bevelSize:.02,bevelThickness:.02});h.translate(0,-1.5,0),function(e,t){let n=e.attributes.position;for(let e=0;e<n.count;e++){let t=n.getY(e),a=n.getZ(e),i=.3*t,o=Math.sin(i),s=Math.cos(i);n.setZ(e,a*s-t*o),n.setY(e,a*o+t*s)}e.computeVertexNormals()}(h,0);let g=new o.xoR({color:11953874,side:o.ehD,shininess:100,opacity:.5,transparent:!0}),m=-Math.PI/4,x=[],f=2*Math.PI/8,j=new o.ZAu;i.add(j);for(let e=0;e<8;e++){let t=new o.Kj0(h,g.clone()),n=new o.ZAu;n.add(t);let a=e*f;n.position.x=1*Math.sin(a),n.position.z=1*Math.cos(a),n.rotation.y=a,t.rotation.x=0,n.userData.targetRotationX=0,n.userData.rotationSpeed=.01+.005*Math.random(),x.push(n),j.add(n)}let p=new o.xo$(.2,32,32),b=new o.xoR({color:16777164}),v=new o.Kj0(p,b);j.add(v);let N=new o.iMs,w=new o.FM8,y=!1;function onMouseMove(e){let t=a.getBoundingClientRect();w.x=(e.clientX-t.left)/a.clientWidth*2-1,w.y=-(2*((e.clientY-t.top)/a.clientHeight))+1}window.addEventListener("mousemove",onMouseMove,!1);let M=new o.SUY;function onWindowResize(){if(!e.current)return;let t=e.current;s.aspect=t.clientWidth/t.clientHeight,s.updateProjectionMatrix(),l.setSize(t.clientWidth,t.clientHeight)}return function animate(){n=requestAnimationFrame(animate);let e=M.getElapsedTime();N.setFromCamera(w,s);let a=N.intersectObject(j,!0);y=a.length>0,x.forEach((t,n)=>{let a=t.children[0];y?t.userData.targetRotationX=m:t.userData.targetRotationX=0,a.rotation.x+=(t.userData.targetRotationX-a.rotation.x)*t.userData.rotationSpeed,a.rotation.z=.01*Math.sin(2*e+2*t.position.x),t.position.y=.02*Math.sin(1.5*e+2*t.position.x),t.rotation.z=.02*Math.sin(e+t.position.x)}),j.position.y=.05*Math.sin(.5*e),y?t.enabled=!0:(t.enabled=!1,j.rotation.y+=(0-j.rotation.y)*.02),t.update(),l.render(i,s)}(),window.addEventListener("resize",onWindowResize,!1),()=>{window.removeEventListener("mousemove",onMouseMove),window.removeEventListener("resize",onWindowResize),n&&cancelAnimationFrame(n),t&&t.dispose()}},[]),(0,a.jsxs)("section",{id:"hero",className:"relative h-screen flex items-center justify-center text-center text-white",children:[(0,a.jsx)("canvas",{ref:e,id:"bg",className:"absolute top-0 left-0 w-full h-full"}),(0,a.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-center z-10",children:[(0,a.jsx)("h1",{className:"text-5xl font-bold",children:"Hello!"}),(0,a.jsx)("p",{className:"text-xl mt-4",children:"I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion."}),(0,a.jsx)("div",{className:"mt-8",children:(0,a.jsx)("a",{href:"#projects",className:"px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-200",children:"View My Work"})})]})]})}var c=n(8852),d=n(1664),u=n.n(d),h=n(5675),g=n.n(h),m=n(6825);function Projects(){return(0,a.jsx)("div",{className:"py-10 px-6",children:(0,a.jsx)("div",{className:"max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12",children:[{title:"EXO GLOVE",href:"/exoglove",imageSrc:"/exoglove.jpeg"},{title:"BIOMORPHUS",href:"/biomorphus",imageSrc:"/biomorphus.jpeg"},{title:"INNOVICE",href:"/innovice",imageSrc:"/innovice.jpeg"},{title:"PROJECT 4",href:"/project4",imageSrc:"/project4.jpeg"},{title:"PROJECT 5",href:"/project5",imageSrc:"/project5.jpeg"},{title:"PROJECT 6",href:"/project6",imageSrc:"/project6.jpeg"}].map(e=>(0,a.jsx)(u(),{href:e.href,children:(0,a.jsx)("a",{className:"relative group block",children:(0,a.jsx)(m.Z,{glareEnable:!1,tiltMaxAngleX:10,tiltMaxAngleY:10,transitionSpeed:700,className:"rounded-lg shadow-lg overflow-hidden",children:(0,a.jsxs)("div",{className:"relative w-full h-64",children:[(0,a.jsx)(g(),{src:e.imageSrc,alt:"".concat(e.title," Image"),layout:"fill",objectFit:"cover",className:"transition-transform duration-700 transform group-hover:scale-105"}),(0,a.jsx)("div",{className:"absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"}),(0,a.jsx)("div",{className:"absolute top-0 left-0 right-0 bg-gradient-to-b from-black via-transparent to-transparent p-4",children:(0,a.jsx)("h3",{className:"text-center text-sm text-white dark:text-gray-800 group-hover:text-lilac transition-colors",children:e.title})})]})})})},e.title))})})}function Home(){return(0,a.jsxs)("div",{children:[(0,a.jsx)(c.Z,{})," ",(0,a.jsx)(Hero,{}),(0,a.jsxs)("main",{id:"main-content",children:[(0,a.jsxs)("section",{id:"about",className:"section",children:[(0,a.jsx)("h2",{className:"text-4xl font-normal mb-6 hover:text-lilac transition-colors",children:"About Me"}),(0,a.jsx)("p",{className:"text-lg",children:"I am a third-year MEng Design Engineering student at Imperial College London. My passion lies in the fusion of electronics, AI, and fashion. I am driven by a commitment to integrating elegant design with robust engineering to develop solutions that are both functional and aesthetically pleasing. Beyond my core focus, I have a deep interest in the arts, literature, and architecture, which continually inspire my work."})]}),(0,a.jsx)("section",{id:"projects",className:"section",children:(0,a.jsx)(Projects,{})}),(0,a.jsxs)("section",{id:"contact",className:"section",children:[(0,a.jsx)("h2",{className:"text-4xl font-normal mb-6 hover:text-lilac transition-colors",children:"Contact Me"}),(0,a.jsx)("p",{className:"text-lg mb-4",children:"Feel free to reach out to me at:"}),(0,a.jsx)("p",{className:"text-lg",children:(0,a.jsx)("a",{href:"mailto:anastasia.cattaneo@gmail.com",className:"underline hover:text-lilac focus:outline-none focus:ring-2 focus:ring-lilac",children:"anastasia.cattaneo@gmail.com"})})]})]}),(0,a.jsxs)("div",{className:"email-vertical",children:[(0,a.jsx)("a",{href:"mailto:anastasia.cattaneo@gmail.com",className:"email-link",children:"anastasia.cattaneo@gmail.com"}),(0,a.jsx)("div",{className:"vertical-line"})]})]})}}},function(e){e.O(0,[737,224,207,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);