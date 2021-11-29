(()=>{"use strict";var e,t={980:(e,t,n)=>{var r=n(757),a=n.n(r),c=n(137),o=n(294),i=n(935),l=n(654),u=n(329),s=n(403),f=n(879),m=n(222),d={mapPanelsInfo:{direction:"horizontal",num:3},isControlPanelVisible:!1},p=(0,s.oM)({name:"UI",initialState:d,reducers:{mapPanelsInfoChanged:function(e,t){e.mapPanelsInfo=t.payload},isControlPanelVisibleToggled:function(e){e.isControlPanelVisible=!e.isControlPanelVisible}}}),v=p.reducer,h=p.actions,b=h.mapPanelsInfoChanged,g=h.isControlPanelVisibleToggled,x=(0,m.P1)((function(e){return e.UI.mapPanelsInfo}),(function(e){return e})),w=(0,m.P1)((function(e){return e.UI.isControlPanelVisible}),(function(e){return e}));const E=v;var y="d507d08f4959438687caf2914854d8d4",M=n(125),k={indexOfActiveMapPanel:-1,center:{lat:34.037321,lon:-117.067},zoom:10,zoomLevels:[10,12,14],relativeZoomLevels:[-2,0,2],scales:[0,0,0],extents:[],webmapId:y,isLoadingWebmap:!1,isInvalidWebmapId:!1},C=(0,s.oM)({name:"Map",initialState:k,reducers:{webmapIdChanged:function(e,t){e.webmapId=t.payload,e.isInvalidWebmapId=!1},invalidWebmapIdChanged:function(e,t){e.isInvalidWebmapId=t.payload},mapCenterChanged:function(e,t){e.center=t.payload},extentsChanged:function(e,t){e.extents=t.payload},zoomLevelsChanged:function(e,t){e.zoomLevels=t.payload},scalesChanged:function(e,t){e.scales=t.payload},relativeZoomLevelsChanged:function(e,t){e.relativeZoomLevels=t.payload},indexOfActiveMapPanelChanged:function(e,t){e.indexOfActiveMapPanel=t.payload}}}),O=C.reducer,I=C.actions,P=I.webmapIdChanged,Z=I.mapCenterChanged,N=I.zoomLevelsChanged,z=I.relativeZoomLevelsChanged,L=I.indexOfActiveMapPanelChanged,A=I.extentsChanged,S=I.invalidWebmapIdChanged,j=I.scalesChanged,W=function(){return function(){var e=(0,c.Z)(a().mark((function e(t,n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(S(!0)),setTimeout((function(){t(S(!1))}),5e3);case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},T=(0,m.P1)((function(e){return e.Map.webmapId}),(function(e){return e})),B=(0,m.P1)((function(e){return e.Map.center}),(function(e){return e})),V=(0,m.P1)((function(e){return e.Map.extents}),(function(e){return e})),R=(0,m.P1)((function(e){return e.Map.zoomLevels}),(function(e){return e})),H=(0,m.P1)((function(e){return e.Map.scales}),(function(e){return e})),U=(0,m.P1)((function(e){return e.Map.relativeZoomLevels}),(function(e){return e})),_=(0,m.P1)((function(e){return e.Map.indexOfActiveMapPanel}),(function(e){return e})),D=(0,m.P1)((function(e){return e.Map.isInvalidWebmapId}),(function(e){return e}));const F=O,J=(0,f.UY)({UI:E,Map:F});var G=n(156);function $(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$(Object(n),!0).forEach((function(t){(0,G.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const q=function(){return{UI:Y({},d),Map:Y({},k)}};const K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(0,s.xC)({reducer:J,middleware:(0,u.Z)((0,s.Bx)()),preloadedState:e});return t};var Q=n(699),X=(0,o.createContext)(null);const ee=function(e){var t=e.children,n=(0,o.useState)({darkMode:!1}),r=(0,Q.Z)(n,2),i=r[0],l=(r[1],function(){var e=(0,c.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return o.useEffect((function(){l()}),[]),o.createElement(X.Provider,{value:i},i?t:null)};const te=function(){return o.createElement(o.Fragment,null,o.createElement(Oe,null),o.createElement(he,null),o.createElement(ne,null))};const ne=function(){var e=(0,l.I0)();return o.createElement(o.Fragment,null,o.createElement("div",{className:"absolute top-0 left-0 p-1 z-10 bg-black text-white cursor-pointer",onClick:function(){e(g())}},o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"fill-current",viewBox:"0 0 32 32",height:"32",width:"32"},o.createElement("path",{d:"M28 7H4V6h24zm0 9H4v1h24zm0 10H4v1h24z"}),o.createElement("path",{fill:"none",d:"M0 0h32v32H0z"}))))};var re=n(184),ae=n.n(re),ce=function(e){var t=e.direction,n=e.num,r=(0,l.I0)(),a=(0,l.v9)(x),c=a.direction===t&&a.num===n,i=ae()("cursor-pointer mx-1 mb-2 p-1 flex border",{"flex-col":"vertical"===t,"border-gray-50":!c,"opacity-50":!c,"border-white":c});return o.createElement("div",{className:i,style:{height:62,width:100},onClick:function(){r(b({direction:t,num:n}))}},function(){for(var e=[],r=0;r<n;r++)e.push(o.createElement("div",{className:ae()("flex-grow",{"bg-gray-50":!c,"bg-white":c}),style:{margin:1},key:"".concat(t,"-").concat(n,"-").concat(r)}));return e}())},oe=[{direction:"horizontal",num:2},{direction:"horizontal",num:3},{direction:"vertical",num:2},{direction:"vertical",num:3}];const ie=function(){return o.createElement("div",null,o.createElement("h5",{className:"mb-2"},"Panel configuration"),o.createElement("div",{className:"cursor-pointer flex flex-wrap w-64"},oe.map((function(e){var t=e.direction,n=e.num;return o.createElement(ce,{key:"".concat(t,"-").concat(n),direction:t,num:n})}))))},le=n.p+"e95afdaa53cdaaa1660def75b2a6d42f.jpg";var ue=[{title:"Imagery With Label",id:y,thumbnail:n.p+"03fd43f82b7c26bbcd5bfbe8b6df62d4.jpg"},{title:"Imagery",id:"5226eb89ecb94252aee274671241c8d1",thumbnail:le},{title:"Human Geo Light",id:"3582b744bba84668b52a16b0b6942544",thumbnail:n.p+"b5dca04e5cc67a469ba7cb9ea62cc066.jpg"},{title:"Human Geo Dark",id:"4f2e99ba65e34bb8af49733d9778fb8e",thumbnail:n.p+"926c9f9b73e2d71d120577d50283afea.jpg"},{title:"Terrain",id:"5f3b7605b3364e7bb2416c93fae00995",thumbnail:n.p+"23dc91edbb045ee443069f5fad21570b.jpg"},{title:"Vibrant",id:"d27a3805595e4bb598678f2dc3b1fca3",thumbnail:n.p+"f4e467b4f7054ffcfe4c5b11cf8290b7.png"}],se=function(e){var t=e.data,n=e.isActive,r=e.onClick,a=t.title,c=t.id,i=t.thumbnail;return o.createElement("div",{key:c,className:"flex items-center mb-2"},o.createElement("div",{className:ae()("cursor-pointer border",{"border-white":n,"border-gray-50":!n,"opacity-60":!n}),onClick:r.bind(null,c),style:{height:62,width:62,background:"url(".concat(i,") center center"),backgroundRepeat:"no-repeat",backgroundSize:"cover"}}),o.createElement("div",{className:"ml-3"},o.createElement("span",{className:"text-sm"},a)))},fe=function(){var e=(0,l.I0)(),t=(0,o.useState)(""),n=(0,Q.Z)(t,2),r=n[0],i=n[1],u=(0,l.v9)(D);return o.createElement("div",{className:"pb-2"},o.createElement("h5",{className:"text-sm text-gray-200 mb-1"},u?"Invalid Item Id":"Any ArcGIS Online 2D Web Map"),o.createElement("div",{className:"flex items-stretch"},o.createElement("input",{type:"text",placeholder:"Web Map Item ID",className:"bg-transparent border border-r-0 border-gray-500 p-2 placeholder-opacity-50 text-sm",value:r,onChange:function(e){i(e.target.value)}}),o.createElement("div",{className:ae()("flex justify-center items-center w-10 border border-gray-500",{"text-gray-700":""===r,"text-gray-200":""!==r,"cursor-pointer":""!==r,"pointer-events-none":""===r}),onClick:function(){var t;e((t=r,function(){var e=(0,c.Z)(a().mark((function e(n,r){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,M.rV)(t);case 3:"Web Map"!==e.sent.type?n(W()):n(P(t)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(W());case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}()))}},o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"fill-current",viewBox:"0 0 24 24",height:"24",width:"24"},o.createElement("path",{d:"M6 1.773l15 10.23L6 22.226z"}),o.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})))))};const me=function(){var e=(0,l.I0)(),t=function(t){e(P(t))},n=(0,l.v9)(T),r=[];return o.createElement("div",{className:""},o.createElement("h5",{className:"mb-2"},"Map"),(ue.forEach((function(e,a){var c=Math.floor(a/2);r[c]=r[c]||[],r[c].push(o.createElement(se,{key:e.id,data:e,isActive:e.id===n,onClick:t}))})),o.createElement("div",{className:"flex"},r.map((function(e,t){return o.createElement("div",{key:t,className:"mr-4"},e)})),o.createElement("div",{className:"flex items-end ml-2"},o.createElement(fe,null)))))};var de=function(){return o.createElement("div",{className:"text-xl"},o.createElement("h5",null,"Living Atlas"," ",o.createElement("span",{className:"font-medium text-white"},"Optica")))},pe=function(){var e=(0,l.I0)();return o.createElement("div",{className:"absolute top-1 right-1 text-white cursor-pointer",onClick:function(){e(g())}},o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",height:"32",width:"32",className:"fill-current"},o.createElement("path",{d:"M23.985 8.722L16.707 16l7.278 7.278-.707.707L16 16.707l-7.278 7.278-.707-.707L15.293 16 8.015 8.722l.707-.707L16 15.293l7.278-7.278z"}),o.createElement("path",{fill:"none",d:"M0 0h32v32H0z"})))};const ve=function(){return o.createElement("div",{className:"absolute top-0 left-0 right-0 py-2 pb-4 px-14 bg-black text-gray-200 z-10"},o.createElement(de,null),o.createElement(pe,null),o.createElement("div",{className:"md:flex mt-2"},o.createElement(ie,null),o.createElement(me,null)))};const he=function(){return(0,l.v9)(w)?o.createElement(ve,null):null};var be=n(735);(0,be.loadCss)();const ge=function(e){var t=e.webmapId,n=e.center,r=e.zoom,i=e.isActiveMapPanel,l=e.centerOnChange,u=e.zoomOnChange,s=e.extentOnChange,f=e.scaleOnChange,m=e.children,d=o.useRef(),p=(0,o.useRef)(i),v=(0,o.useRef)(!0),h=(0,o.useRef)(),b=o.useState(null),g=(0,Q.Z)(b,2),x=g[0],w=g[1],E=function(){var e=(0,c.Z)(a().mark((function e(){var c,o,i,l,u,s,f;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,be.loadModules)(["esri/views/MapView","esri/WebMap"]);case 3:c=e.sent,o=(0,Q.Z)(c,2),i=o[0],l=o[1],u=n.lon,s=n.lat,(f=new i({container:d.current,map:new l({portalItem:{id:t}}),zoom:r,center:[u,s],navigation:{mouseWheelZoomEnabled:!1,browserTouchPanEnabled:!1}})).when((function(){w(f)})),f.on("mouse-wheel",(function(e){})),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=(0,c.Z)(a().mark((function e(){var n,r,c;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,be.loadModules)(["esri/WebMap"]);case 3:n=e.sent,r=(0,Q.Z)(n,1),c=r[0],x.map=new c({portalItem:{id:t}}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),M=function(){var e=(0,c.Z)(a().mark((function e(){var t,n,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,be.loadModules)(["esri/core/watchUtils"]);case 3:t=e.sent,n=(0,Q.Z)(t,1),(r=n[0]).watch(x,"center",(function(e){var t=e.longitude,n=e.latitude;p.current&&l({lon:t,lat:n})})),r.whenTrue(x,"stationary",(function(){if(-1!==x.zoom){p.current&&(s(x.extent),u(x.zoom));var e="".concat(x.width,"#").concat(x.height);(v.current||h.current!==e)&&(v.current=!1,h.current=e,s(x.extent)),f(x.scale)}})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){E()}),[]),(0,o.useEffect)((function(){x&&M()}),[x]),(0,o.useEffect)((function(){if(x&&!i){var e=n.lon,t=n.lat;x.goTo({center:[e,t]},{duration:100})}}),[n,x]),(0,o.useEffect)((function(){x&&x.zoom!==r&&(v.current=!0,x.goTo({zoom:r}))}),[r]),(0,o.useEffect)((function(){p.current=i}),[i]),(0,o.useEffect)((function(){x&&y()}),[t]),o.createElement(o.Fragment,null,o.createElement("div",{style:{position:"absolute",top:0,left:0,bottom:0,right:0},ref:d}),x?o.Children.map(m,(function(e){return o.cloneElement(e,{mapView:x})})):null)};const xe=function(e){var t=e.indexOfTargetMap,n=(e.indexOfContainerMap,e.mapView),r=(0,o.useRef)(),i=(0,l.v9)(V),u=(0,o.useRef)(),s=(0,o.useRef)(),f=(0,o.useState)(),m=(0,Q.Z)(f,2),d=m[0],p=m[1],v=function(){var e=(0,c.Z)(a().mark((function e(t){var r,c,o,i,l,u,s,f,m,d,v,h,b;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t?JSON.parse(t):null){e.next=4;break}return p(null),e.abrupt("return");case 4:return c=r.xmin,o=r.ymin,i=r.xmax,l=r.ymax,u=r.spatialReference,e.prev=5,e.next=8,(0,be.loadModules)(["esri/geometry/Point"]);case 8:s=e.sent,f=(0,Q.Z)(s,1),m=f[0],d=new m({x:c,y:o,spatialReference:u}),v=new m({x:i,y:l,spatialReference:u}),h=n.toScreen(d),b=n.toScreen(v),p({left:h.x,top:b.y,width:Math.abs(b.x-h.x),height:Math.abs(b.y-h.y)}),e.next=20;break;case 18:e.prev=18,e.t0=e.catch(5);case 20:case"end":return e.stop()}}),e,null,[[5,18]])})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=(0,c.Z)(a().mark((function e(t){var n,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,be.loadModules)(["esri/core/watchUtils"]);case 3:n=e.sent,r=(0,Q.Z)(n,1),r[0].whenTrue(t,"stationary",(function(){s.current!==t.zoom&&v(u.current),s.current=t.zoom})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){n&&h(n)}),[n]),(0,o.useEffect)((function(){if(u.current!==i[t]){if(u.current){var e=JSON.parse(u.current),n=JSON.parse(i[t]),r=Math.floor(Math.abs(e.xmin-e.xmax)),a=Math.floor(Math.abs(e.ymin-e.ymax)),c=Math.floor(Math.abs(n.xmin-n.xmax)),o=Math.floor(Math.abs(n.ymin-n.ymax));if(r===c&&a===o)return}u.current=i[t],v(u.current)}}),[i]);var b,g,x,w;return n&&d?o.createElement("div",{ref:r,className:"absolute border-2 border-red-500 pointer-events-none",style:(b=d.top,g=d.left,x=d.height,w=d.width,b<0||g<0?{display:"none"}:{top:b,left:g,height:x,width:w,display:"block"})}):null};const we=function(e){var t=e.isActivePanel,n=e.zoom,r=e.index,a=(0,l.I0)(),c=(0,l.v9)(T),i=(0,l.v9)(B),s=(0,l.v9)(x);return o.createElement(ge,{webmapId:c,center:i,zoom:n,isActiveMapPanel:t,centerOnChange:function(e){a(Z(e))},zoomOnChange:function(e){a(function(e,t){return function(n,r){var a=r().Map,c=a.zoomLevels,o=a.relativeZoomLevels;if(c[t]!==e){var i=o[t],l=o.map((function(e){return null===e||null===i?null:e-i})),u=c.map((function(n,r){return t===r?e:null===l[r]?n:e+l[r]}));n(N(u))}}}(e,r))},extentOnChange:function(e){a(function(e,t){return function(n,r){var a=r().Map.extents,c=(0,u.Z)(a);c[t]=JSON.stringify(e.toJSON()),n(A(c))}}(e,r))},scaleOnChange:function(e){a(function(e,t){return function(n,r){var a=r().Map.scales,c=(0,u.Z)(a);c[t]=e,n(j(c))}}(e,r))}},function(){for(var e=[],t=r-1;t<=r+1;t++)t===r||t===s.num||t<0||e.push(o.createElement(xe,{key:t,indexOfContainerMap:r,indexOfTargetMap:t}));return e}())};var Ee=o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"27.83",height:"28.13",viewBox:"0 0 27.83 28.13",className:"fill-current"},o.createElement("path",{d:"M16.91,0A10.92,10.92,0,1,0,27.83,10.92,10.92,10.92,0,0,0,16.91,0Zm-.09,19.39a8.47,8.47,0,1,1,8.47-8.47A8.47,8.47,0,0,1,16.82,19.39Z"}),o.createElement("rect",{id:"Handle",x:"2.63",y:"17.73",width:"4.07",height:"11.46",rx:"1.99",transform:"translate(17.96 3.57) rotate(45)"}),o.createElement("path",{id:"Lock_Base","data-name":"Lock Base",d:"M20.16,9.8h-6.5a1.1,1.1,0,0,0-1.1,1.1v4a1.1,1.1,0,0,0,1.1,1.1h6.5a1.11,1.11,0,0,0,1.11-1.1v-4A1.11,1.11,0,0,0,20.16,9.8ZM17,14.5a1.22,1.22,0,1,1,1.23-1.22A1.22,1.22,0,0,1,17,14.5Z"}),o.createElement("path",{d:"M16.82,5.86a3.52,3.52,0,0,0-3.51,3.52c0,1.94,1.7,2.68,3.64,2.68s3.39-.74,3.39-2.68A3.53,3.53,0,0,0,16.82,5.86Zm0,5.67A2.15,2.15,0,1,1,19,9.38,2.16,2.16,0,0,1,16.82,11.53Z"})),ye=o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"27.83",height:"28.13",viewBox:"0 0 27.83 28.13",className:"fill-current"},o.createElement("path",{d:"M16.91,0A10.92,10.92,0,1,0,27.83,10.92,10.92,10.92,0,0,0,16.91,0Zm-.09,19.39a8.47,8.47,0,1,1,8.47-8.47A8.47,8.47,0,0,1,16.82,19.39Z"}),o.createElement("rect",{id:"Handle",x:"2.63",y:"17.73",width:"4.07",height:"11.46",rx:"1.99",transform:"translate(17.96 3.57) rotate(45)"}),o.createElement("path",{id:"Lock_Base","data-name":"Lock Base",d:"M20.16,9.8h-6.5a1.1,1.1,0,0,0-1.1,1.1v4a1.1,1.1,0,0,0,1.1,1.1h6.5a1.11,1.11,0,0,0,1.11-1.1v-4A1.11,1.11,0,0,0,20.16,9.8ZM17,14.5a1.22,1.22,0,1,1,1.23-1.22A1.22,1.22,0,0,1,17,14.5Z"}),o.createElement("path",{d:"M16.82,3.86a3.52,3.52,0,0,0-3.51,3.52h1.36a2.15,2.15,0,1,1,4.3,0v4.33c1.36,0,1.36.56,1.36-4.33A3.53,3.53,0,0,0,16.82,3.86Z"}));const Me=function(e){var t=e.placeOnLeftSide,n=e.isUnlocked,r=e.onClick;return o.createElement("div",{className:"absolute bg-black text-white z-10 p-2",style:{bottom:0,left:t?0:"calc(100% - 22px)"},onClick:r},n?ye:Ee)};var ke=n(951);const Ce=function(e){var t=e.scale;return 0===t?null:o.createElement("div",{className:"absolute bottom-0 left-0 right-0 py-1 text-white text-center text-sm",style:{background:"\n                    linear-gradient(\n                        to top,\n                        rgba(0, 0, 0, 1) 0%,\n                        rgba(0, 0, 0, .25) 80%,\n                        rgba(0, 0, 0, 0) 100%)\n                    "}},"1:",ke.CE.numberWithCommas(+t.toFixed()))};const Oe=function(){var e=(0,l.I0)(),t=(0,l.v9)(x),n=t.num,r=t.direction,a="horizontal"===r,c=(0,l.v9)(_),i=(0,l.v9)(R),s=(0,l.v9)(H),f=(0,l.v9)(U);return o.createElement("div",{className:ae()("flex h-screen",{"flex-col":!a})},function(){for(var t=[],l=function(l){var m=i[l],d=l<n-1,p=ae()("relative",{"h-1/2":!a&&2===n,"h-1/3":!a&&3===n,"w-1/2":a&&2===n,"w-1/3":a&&3===n});t.push(o.createElement("div",{className:p,key:l,onMouseEnter:function(){e(L(l))}},o.createElement(we,{index:l,isActivePanel:c===l,zoom:m}),o.createElement(Ce,{scale:s[l]}),d&&o.createElement(Me,{placeOnLeftSide:"vertical"===r,isUnlocked:null===f[l]||null===f[l+1],onClick:function(){var t;e((t=l,function(e,n){var r=n().Map,a=r.zoomLevels,c=r.relativeZoomLevels,o=null!==c[t]&&null!==c[t+1],i=(0,u.Z)(c);0===t?i[0]=o?null:a[0]-a[1]:1===t&&(i[2]=o?null:a[2]-a[1]),e(z(i))}))}})))},m=0;m<n;m++)l(m);return t}())};(0,c.Z)(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=q(),i.render(o.createElement(o.StrictMode,null,o.createElement(l.zt,{store:K(t)},o.createElement(ee,null,o.createElement(te,null)))),document.getElementById("root"));case 2:case"end":return e.stop()}}),e)})))()}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var c=n[e]={exports:{}};return t[e].call(c.exports,c,c.exports,r),c.exports}r.m=t,e=[],r.O=(t,n,a,c)=>{if(!n){var o=1/0;for(u=0;u<e.length;u++){for(var[n,a,c]=e[u],i=!0,l=0;l<n.length;l++)(!1&c||o>=c)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(i=!1,c<o&&(o=c));i&&(e.splice(u--,1),t=a())}return t}c=c||0;for(var u=e.length;u>0&&e[u-1][2]>c;u--)e[u]=e[u-1];e[u]=[n,a,c]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,c,[o,i,l]=n,u=0;for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(l)var s=l(r);for(t&&t(n);u<o.length;u++)c=o[u],r.o(e,c)&&e[c]&&e[c][0](),e[o[u]]=0;return r.O(s)},n=self.webpackChunkreact_redux_boilerplate=self.webpackChunkreact_redux_boilerplate||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=r.O(void 0,[736],(()=>r(980)));a=r.O(a)})();
//# sourceMappingURL=main.e79b429b4b2fb144540a.js.map