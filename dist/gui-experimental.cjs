"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("solid-js/web"),N=require("@opencode/plugin/gui"),j=require("effect"),w=require("solid-js"),oe=["rolling","weekly","monthly"];function T(e,n,a){return Math.min(a,Math.max(n,e))}function $e(e){return e.limited||e.percent>=100?"danger":e.percent>=75?"warn":"ok"}function fe(e){return e.limit<=0?"ok":e.spent>=e.limit?"danger":e.spent/e.limit>=.75?"warn":"ok"}function me(e){if(!e)return"ok";let n="ok";if(e.go)for(const a of oe){const i=e.go[a];if(i.limited||i.percent>=100)return"danger";i.percent>=75&&(n="warn")}for(const a of e.budgets){const i=fe(a);if(i==="danger")return"danger";i==="warn"&&(n="warn")}return n}function Ce(e){if(e.go)return Math.round(Math.max(...oe.map(n=>e.go[n].percent)))}function Z(e){return e.locale.locale()||"en"}function ne(e,n,a){const i=new Intl.RelativeTimeFormat(Z(e),{numeric:"auto",style:"short"}),f=Math.round((n-a)/6e4);if(Math.abs(f)<90)return i.format(f,"minute");const v=Math.round(f/60);return Math.abs(v)<36?i.format(v,"hour"):i.format(Math.round(v/24),"day")}function ge(e,n){return new Intl.DateTimeFormat(Z(e),{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(n)}function Se(e,n){return new Intl.DateTimeFormat(Z(e),{timeStyle:"short"}).format(n)}function de(e,n,a){return new Intl.DateTimeFormat(Z(e),{month:"short",day:"numeric"}).format(n)}function ue(e,n){return new Intl.NumberFormat(Z(e),{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:2}).format(n)}function ve(e,n){let a;if(n.coverage==="all")a=e.t("card.budget.all");else if(n.models.length>0){const i=n.models.map(f=>f.name);a=i.length>2?`${i.slice(0,2).join(", ")} +${i.length-2}`:i.join(", ")}else n.vendors.length>0?a=n.vendors.join(", "):a=e.t("card.budget.other");return n.per==="model"?`${a} (${e.t("card.budget.perModel")})`:a}const Ae={rolling:300*60*1e3,weekly:10080*60*1e3,monthly:720*60*60*1e3};function Me(e,n,a){const i=Ae[n],f=e.resetsAt-i,v=Math.max(0,e.resetsAt-a),k=Math.min(i,Math.max(0,a-f)),h=i>0?k/i:0,A=e.resetsAt<=a,s=Math.max(0,e.percent);if(s<=0||h<=.005||A)return{start:f,elapsed:A?1:h,projected:s,remaining:v,stale:A};const l=Math.min(999,s/h),r=l>100?a+(100-s)/(s/k):void 0;return{start:f,elapsed:h,projected:l,runsOutAt:r!==void 0&&r<e.resetsAt?r:void 0,remaining:v,stale:A}}function _e(e,n){return n.limited||e.runsOutAt!==void 0||e.projected>=100?"danger":e.projected>=75?"warn":"ok"}var Le=t.template("<div class=oq-floating><header class=oq-head><span class=oq-dot></span><span class=oq-name></span><span class=oq-spacer></span></header><div class=oq-body>"),Oe=t.template("<span class=oq-launcher-value>%"),Ee=t.template("<button type=button class=oq-launcher><span class=oq-dot></span><span>"),ze=t.template("<span class=oq-ws>"),Pe=t.template('<div class="oq-state oq-inline"><span>'),Te=t.template("<div class=oq-state><span class=oq-state-title></span><span>"),Fe=t.template("<div class=oq-error-row><span class=oq-error>"),je=t.template("<footer class=oq-foot><span class=oq-updated>"),De=t.template("<div class=oq-meters>"),Re=t.template("<div class=oq-section><div class=oq-section-title>"),Be=t.template("<div class=oq-state>"),Ie=t.template("<button type=button class=oq-fc-toggle><span class=oq-fc-toggle-label></span><span class=oq-fc-toggle-summary>"),Ne=t.template("<div class=oq-fc-wrap><div class=oq-fc-inner><div class=oq-fc-panel><div class=oq-fc-hero><span class=oq-fc-percent>%</span><span class=oq-fc-pace></span></div><div class=oq-fc-caption><span class=oq-fc-sep>·</span></div><div class=oq-fc-axis>"),Ge=t.template("<span>"),Ye=t.template("<svg><circle r=2.6 fill=#f5c451></svg>",!1,!0,!1),We=t.template('<svg class=oq-fc-chart viewBox="0 0 296 116"role=img><defs><linearGradient x1=0 y1=0 x2=0 y2=1><stop offset=0% stop-color=#22c55e stop-opacity=0.26></stop><stop offset=100% stop-color=#22c55e stop-opacity=0></stop></linearGradient><pattern width=7 height=7 patternUnits=userSpaceOnUse patternTransform=rotate(45)><line x1=0 y1=0 x2=0 y2=7 stroke=#f5c451 stroke-width=1.3 stroke-opacity=0.32></line></pattern></defs><line class=oq-fc-nowline y1=6 y2=112></line><circle class=oq-fc-dot r=3 fill=#22c55e>'),Xe=t.template("<svg><line></svg>",!1,!0,!1),He=t.template("<svg><text class=oq-fc-axis-label x=26 text-anchor=end>%</svg>",!1,!0,!1),Qe=t.template("<svg><circle r=2.8 fill=#f5c451></svg>",!1,!0,!1),Ue=t.template("<svg><path></svg>",!1,!0,!1),he=t.template("<div class=oq-meter><div class=oq-meter-head><span class=oq-meter-name></span><span class=oq-meter-value></span></div><div class=oq-track><div class=oq-fill></div></div><div class=oq-reset>");const Ve="#22c55e",Ze="#f5c451";function ee(){const n=document.querySelector('header[data-slot="titlebar-v2"]')?.getBoundingClientRect().bottom;return Math.max(4,(n??44)+6)}function Je(e){const n=e.ctx,[a,i]=w.createSignal(),[f,v]=w.createSignal(),[k,h]=w.createSignal(0),[A,s]=w.createSignal(),[l,r]=w.createSignal(),[C,x]=w.createSignal(Date.now());let m,M=!1,E=!1;const H=setInterval(()=>x(Date.now()),3e4);w.onCleanup(()=>clearInterval(H));let c;const S=()=>e.dock.value.open,O=()=>e.quota.data(),G=()=>{const o=O();return o?me(o):e.quota.error()&&o===void 0?"danger":"ok"},Q=()=>O()?.go?.monthly.percent,D=()=>f()!==void 0||e.dock.value.placed,J=()=>{const o=f();if(o)return{left:`${o.x}px`,top:`${o.y}px`};if(e.dock.value.placed)return{left:`${e.dock.value.x}px`,top:`${e.dock.value.y+k()}px`}},q=()=>{e.dock.update(o=>{o.forecast=!o.forecast})},y=()=>{const o=a()?.getBoundingClientRect(),d=e.dock.value.placed;e.dock.update(g=>{g.open=!1,d&&o&&(g.x=o.left,g.y=o.top)}),h(0),v(void 0)},$=()=>l()!==void 0||e.dock.value.pillPlaced,z=()=>{const o=l();if(o)return{left:`${o.x}px`,top:`${o.y}px`};if(e.dock.value.pillPlaced)return{left:`${e.dock.value.pillX}px`,top:`${e.dock.value.pillY}px`}},F=()=>{if(!e.dock.value.pillPlaced)return;const o=A()?.getBoundingClientRect();if(!o)return;const d=ee(),g=T(e.dock.value.pillX,4,Math.max(4,window.innerWidth-o.width-4)),u=T(e.dock.value.pillY,d,Math.max(d,window.innerHeight-o.height-4));g===e.dock.value.pillX&&u===e.dock.value.pillY||e.dock.update(_=>{_.pillX=g,_.pillY=u})},W=o=>{if(!m)return;const d=o.clientX-m.px,g=o.clientY-m.py;if(!M&&Math.abs(d)+Math.abs(g)<3)return;M=!0;const u=A()?.getBoundingClientRect(),_=u?.width??110,P=u?.height??30,p=ee(),b=T(m.x+d,4,Math.max(4,window.innerWidth-_-4)),L=T(m.y+g,p,Math.max(p,window.innerHeight-P-4));r({x:b,y:L})},R=()=>{if(!m)return;m=void 0,window.removeEventListener("pointermove",W),window.removeEventListener("pointerup",R),window.removeEventListener("pointercancel",R);const o=l(),d=M;M=!1,r(void 0),!(!d||!o)&&(e.dock.update(g=>{g.pillX=o.x,g.pillY=o.y,g.pillPlaced=!0}),E=!0,window.setTimeout(()=>{E=!1},0))},pe=o=>{if(o.button!==0)return;const d=A()?.getBoundingClientRect();d&&(m={px:o.clientX,py:o.clientY,x:d.left,y:d.top},M=!1,r({x:d.left,y:d.top}),window.addEventListener("pointermove",W),window.addEventListener("pointerup",R),window.addEventListener("pointercancel",R))},be=()=>{if(E){E=!1;return}e.dock.update(o=>{o.open=!0})},we=o=>{s(o),o&&requestAnimationFrame(F)};w.onCleanup(()=>{window.removeEventListener("pointermove",W),window.removeEventListener("pointerup",R),window.removeEventListener("pointercancel",R)});const xe=o=>{const d=o.replace(/\/overview\/?$/,"");try{const g=new URL(d),u=g.hostname.toLowerCase();if(g.protocol!=="https:"||u!=="opencode.ai"&&!u.endsWith(".opencode.ai"))return;n.system.openExternal(g.toString())}catch{}},[ie,le]=w.createSignal(!1),re=o=>{if(!ie()||!c)return;const d=a()?.getBoundingClientRect(),g=d?.width??320,u=d?.height??220,_=ee(),P=T(c.x+o.clientX-c.px,4,Math.max(4,window.innerWidth-g-4)),p=T(c.y+o.clientY-c.py,_,Math.max(_,window.innerHeight-u-4));v({x:P,y:p})},B=()=>{if(!ie())return;le(!1),c=void 0,window.removeEventListener("pointermove",re),window.removeEventListener("pointerup",B),window.removeEventListener("pointercancel",B),window.removeEventListener("blur",B);const o=f();o&&(e.dock.update(d=>{d.x=o.x,d.y=o.y,d.placed=!0}),v(void 0))},qe=o=>{if(o.button!==0)return;const d=o.target;if(d instanceof Element&&d.closest("button, a, input, textarea, select"))return;const g=a()?.getBoundingClientRect();if(g){if(k()!==0){const u=e.dock.value.y+k();e.dock.update(_=>{_.y=u}),h(0)}c={px:o.clientX,py:o.clientY,x:g.left,y:g.top},v({x:g.left,y:g.top}),le(!0),window.addEventListener("pointermove",re),window.addEventListener("pointerup",B),window.addEventListener("pointercancel",B),window.addEventListener("blur",B),o.preventDefault()}};w.onCleanup(()=>{window.removeEventListener("pointermove",re),window.removeEventListener("pointerup",B),window.removeEventListener("pointercancel",B),window.removeEventListener("blur",B)});let X=0,U=!0,Y;const ae=()=>{const o=a()?.getBoundingClientRect();if(!o)return;const d=o.height,g=4,u=ee(),_=Math.max(u,window.innerHeight-g-d),P=o.top;if(!e.dock.value.placed)h(0),U||(X=d);else if(U||X===0){const b=T(P,u,_);h(b-e.dock.value.y),U||(X=d)}else{const L=e.dock.value.y>window.innerHeight*.35?P+(X-d):P,I=T(L,u,_);h(I-e.dock.value.y),X=d}const p=T(e.dock.value.x,g,Math.max(g,window.innerWidth-o.width-g));p!==e.dock.value.x&&e.dock.update(b=>{b.x=p})};let V;const ye=o=>{i(o),V?.disconnect(),V=void 0,Y!==void 0&&cancelAnimationFrame(Y),Y=void 0,o&&(X=0,U=!0,h(0),V=new ResizeObserver(()=>ae()),V.observe(o),Y=requestAnimationFrame(()=>{Y=void 0,U=!1,ae()}))},se=()=>{ae(),F()};w.onMount(()=>{window.addEventListener("resize",se),w.onCleanup(()=>{window.removeEventListener("resize",se),V?.disconnect(),Y!==void 0&&cancelAnimationFrame(Y)})});const ke=()=>{const o=e.quota.updatedAt();return o?n.t("card.updated",{time:Se(n,o)}):""};return[t.createComponent(w.Show,{get when(){return S()},get children(){var o=Le(),d=o.firstChild,g=d.firstChild,u=g.nextSibling,_=u.nextSibling,P=d.nextSibling;return t.use(ye,o),d.$$pointerdown=qe,t.insert(u,()=>n.t("card.title")),t.insert(d,t.createComponent(w.Show,{get when(){return O()?.workspace.name},children:p=>(()=>{var b=ze();return t.insert(b,p),t.effect(()=>t.setAttribute(b,"title",p())),b})()}),_),t.insert(d,t.createComponent(n.ui.IconButton,{icon:"refresh",get label(){return n.t("card.refresh")},size:"small",variant:"ghost",get busy(){return e.quota.loading()},onClick:()=>{e.quota.refresh("manual")}}),null),t.insert(d,t.createComponent(n.ui.IconButton,{icon:"minus",get label(){return n.t("card.minimize")},size:"small",variant:"ghost",onClick:y}),null),t.insert(P,(()=>{var p=t.memo(()=>O()===void 0);return()=>p()?(()=>{var b=Pe(),L=b.firstChild;return t.insert(b,t.createComponent(n.ui.Loader,{size:"small"}),L),t.insert(L,()=>n.t("card.loading")),b})():t.memo(()=>O()===null)()?(()=>{var b=Te(),L=b.firstChild,I=L.nextSibling;return t.insert(L,()=>n.t("card.signedOut.title")),t.insert(I,()=>n.t("card.signedOut.body")),b})():t.createComponent(Ke,{ctx:n,get info(){return O()},now:C,get forecastOpen(){return e.dock.value.forecast},toggleForecast:q})})(),null),t.insert(P,t.createComponent(w.Show,{get when(){return e.quota.error()},children:p=>(()=>{var b=Fe(),L=b.firstChild;return t.insert(L,()=>n.t("card.error",{message:p()})),t.insert(b,t.createComponent(n.ui.Button,{variant:"ghost",size:"small",onClick:()=>{e.quota.refresh("manual")},get children(){return n.t("card.retry")}}),null),b})()}),null),t.insert(o,t.createComponent(w.Show,{get when(){return O()},children:p=>(()=>{var b=je(),L=b.firstChild;return t.insert(L,ke),t.insert(b,t.createComponent(n.ui.Button,{variant:"ghost",size:"small",onClick:()=>xe(p().workspace.usageURL),get children(){return n.t("card.openDashboard")}}),null),b})()}),null),t.effect(p=>{var b=!D(),L=n.appearance.mode(),I=n.locale.direction(),K=J(),ce=G();return b!==p.e&&o.classList.toggle("oq-dock",p.e=b),L!==p.t&&t.setAttribute(o,"data-mode",p.t=L),I!==p.a&&t.setAttribute(o,"dir",p.a=I),p.o=t.style(o,K,p.o),ce!==p.i&&t.setAttribute(g,"data-tone",p.i=ce),p},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),o}}),t.createComponent(w.Show,{get when(){return!S()},get children(){var o=Ee(),d=o.firstChild,g=d.nextSibling;return o.$$click=be,o.$$pointerdown=pe,t.use(we,o),t.insert(g,()=>n.t("card.launcher")),t.insert(o,t.createComponent(w.Show,{get when(){return Q()!==void 0},get children(){var u=Oe(),_=u.firstChild;return t.insert(u,()=>Math.round(Q()),_),u}}),null),t.effect(u=>{var _=!$(),P=n.appearance.mode(),p=n.locale.direction(),b=z(),L=n.t("card.launcher.open"),I=n.t("card.launcher.open"),K=G();return _!==u.e&&o.classList.toggle("oq-launcher-dock",u.e=_),P!==u.t&&t.setAttribute(o,"data-mode",u.t=P),p!==u.a&&t.setAttribute(o,"dir",u.a=p),u.o=t.style(o,b,u.o),L!==u.i&&t.setAttribute(o,"aria-label",u.i=L),I!==u.n&&t.setAttribute(o,"title",u.n=I),K!==u.s&&t.setAttribute(d,"data-tone",u.s=K),u},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),o}})]}function Ke(e){const n=e.info.go,a=e.info.budgets;return[n?[(()=>{var i=De();return t.insert(i,t.createComponent(w.For,{each:oe,children:f=>t.createComponent(nt,{get ctx(){return e.ctx},get name(){return e.ctx.t(`card.go.${f}`)},get meter(){return n[f]},get now(){return e.now}})})),i})(),t.createComponent(et,{get ctx(){return e.ctx},go:n,get now(){return e.now},get open(){return e.forecastOpen},get toggle(){return e.toggleForecast}})]:null,t.memo(()=>t.memo(()=>a.length>0)()?(()=>{var i=Re(),f=i.firstChild;return t.insert(f,()=>e.ctx.t("card.budgets")),t.insert(i,t.createComponent(w.For,{each:a,children:v=>t.createComponent(ot,{get ctx(){return e.ctx},budget:v,get now(){return e.now}})}),null),i})():null),t.memo(()=>t.memo(()=>!n&&a.length===0)()?(()=>{var i=Be();return t.insert(i,()=>e.ctx.t("card.noGo")),i})():null)]}function et(e){const n=e.ctx,a=()=>e.go.monthly,i=()=>Me(a(),"monthly",e.now()),f=()=>_e(i(),a()),v=()=>de(n,a().resetsAt),k=()=>{const s=i();return a().limited||a().percent>=100?n.t("card.limited"):s.stale||a().percent<=0?n.t("card.forecast.empty"):s.runsOutAt!==void 0?n.t("card.forecast.runsOut",{time:ne(n,s.runsOutAt,e.now())}):n.t("card.forecast.onPace",{percent:Math.round(s.projected)})},h=()=>{const s=i();return a().limited||a().percent>=100?n.t("card.limited"):s.stale||a().percent<=0?n.t("card.forecast.empty"):s.runsOutAt!==void 0?n.t("card.forecast.summaryRunOut",{time:ne(n,s.runsOutAt,e.now())}):n.t("card.forecast.summary",{percent:Math.round(s.projected)})},A=()=>{const s=i().start,l=a().resetsAt;return[0,1,2,3].map(r=>s+(l-s)*r/3)};return[(()=>{var s=Ie(),l=s.firstChild,r=l.nextSibling;return t.addEventListener(s,"click",e.toggle,!0),t.insert(l,()=>n.t("card.forecast")),t.insert(r,h),t.insert(s,t.createComponent(n.ui.Icon,{name:"chevron-down",size:"small",class:"oq-fc-chevron",get"data-open"(){return e.open?"true":"false"}}),null),t.effect(C=>{var x=e.open,m=n.t(e.open?"card.forecast.hide":"card.forecast.show");return x!==C.e&&t.setAttribute(s,"aria-expanded",C.e=x),m!==C.t&&t.setAttribute(s,"aria-label",C.t=m),C},{e:void 0,t:void 0}),s})(),(()=>{var s=Ne(),l=s.firstChild,r=l.firstChild,C=r.firstChild,x=C.firstChild,m=x.firstChild,M=x.nextSibling,E=C.nextSibling,H=E.firstChild,c=E.nextSibling;return t.insert(x,()=>Math.round(a().percent),m),t.insert(M,k),t.insert(E,()=>n.t("card.forecast.usage"),H),t.insert(E,()=>n.t("card.forecast.renews",{date:v()}),null),t.insert(r,t.createComponent(tt,{get meter(){return a()},get forecast(){return i()}}),c),t.insert(c,t.createComponent(w.For,{get each(){return A()},children:S=>(()=>{var O=Ge();return t.insert(O,()=>de(n,S)),O})()})),t.effect(S=>{var O=e.open?"true":"false",G=f();return O!==S.e&&t.setAttribute(s,"data-open",S.e=O),G!==S.t&&t.setAttribute(M,"data-tone",S.t=G),S},{e:void 0,t:void 0}),s})()]}function tt(e){const n=`oq-fc-fill-${Math.random().toString(36).slice(2,9)}`,a=`oq-fc-hatch-${Math.random().toString(36).slice(2,9)}`,i=296,f=116,v=32,k=4,h=6,A=4,s=()=>{const c=Math.max(e.meter.percent,e.forecast.projected);return Math.max(150,Math.ceil(c/50)*50)},l=c=>v+c*(i-v-k),r=c=>{const S=s();return h+(1-Math.min(Math.max(c,0),S)/S)*(f-h-A)},C=()=>{const c=[];for(let S=0;S<=s();S+=50)c.push(S);return c},x=()=>`M${l(0)},${r(0)}L${l(e.forecast.elapsed)},${r(e.meter.percent)}`,m=()=>`${x()}L${l(e.forecast.elapsed)},${r(0)}Z`,M=()=>{const c=e.forecast;if(!(c.elapsed<=0||c.elapsed>=1))return`M${l(c.elapsed)},${r(e.meter.percent)}L${l(1)},${r(c.projected)}`},E=()=>{const c=e.forecast;if(!(c.elapsed<=0||c.elapsed>=1))return`M${l(c.elapsed)},${r(e.meter.percent)}L${l(1)},${r(c.projected)}L${l(1)},${r(0)}L${l(c.elapsed)},${r(0)}Z`},H=()=>{const c=e.forecast;if(c.projected<=100||e.meter.percent>=100)return;const S=c.elapsed+(100-e.meter.percent)*(1-c.elapsed)/(c.projected-e.meter.percent);return S>c.elapsed&&S<=1?S:void 0};return(()=>{var c=We(),S=c.firstChild,O=S.firstChild,G=O.firstChild;G.nextSibling;var Q=O.nextSibling;Q.firstChild;var D=S.nextSibling,J=D.nextSibling;return t.setAttribute(O,"id",n),t.setAttribute(Q,"id",a),t.insert(c,t.createComponent(w.For,{get each(){return C()},children:q=>[(()=>{var y=Xe();return t.setAttribute(y,"class",q===100?"oq-fc-grid oq-fc-limit":"oq-fc-grid"),t.effect($=>{var z=l(0),F=l(1),W=r(q),R=r(q);return z!==$.e&&t.setAttribute(y,"x1",$.e=z),F!==$.t&&t.setAttribute(y,"x2",$.t=F),W!==$.a&&t.setAttribute(y,"y1",$.a=W),R!==$.o&&t.setAttribute(y,"y2",$.o=R),$},{e:void 0,t:void 0,a:void 0,o:void 0}),y})(),(()=>{var y=He(),$=y.firstChild;return t.insert(y,q,$),t.effect(()=>t.setAttribute(y,"y",r(q)+2.5)),y})()]}),D),t.insert(c,t.createComponent(te,{get d(){return m()},fill:`url(#${n})`}),D),t.insert(c,t.createComponent(w.Show,{get when(){return E()},children:q=>t.createComponent(te,{get d(){return q()},fill:`url(#${a})`})}),D),t.insert(c,t.createComponent(te,{get d(){return x()},stroke:Ve,width:1.7}),D),t.insert(c,t.createComponent(w.Show,{get when(){return M()},children:q=>t.createComponent(te,{get d(){return q()},stroke:Ze,width:1.7})}),D),t.insert(c,t.createComponent(w.Show,{get when(){return t.memo(()=>e.forecast.elapsed>0)()&&e.forecast.elapsed<1},get children(){var q=Ye();return t.effect(y=>{var $=l(1),z=r(e.forecast.projected);return $!==y.e&&t.setAttribute(q,"cx",y.e=$),z!==y.t&&t.setAttribute(q,"cy",y.t=z),y},{e:void 0,t:void 0}),q}}),null),t.insert(c,t.createComponent(w.Show,{get when(){return H()},children:q=>(()=>{var y=Qe();return t.effect($=>{var z=l(q()),F=r(100);return z!==$.e&&t.setAttribute(y,"cx",$.e=z),F!==$.t&&t.setAttribute(y,"cy",$.t=F),$},{e:void 0,t:void 0}),y})()}),null),t.effect(q=>{var y=l(e.forecast.elapsed),$=l(e.forecast.elapsed),z=l(e.forecast.elapsed),F=r(e.meter.percent);return y!==q.e&&t.setAttribute(D,"x1",q.e=y),$!==q.t&&t.setAttribute(D,"x2",q.t=$),z!==q.a&&t.setAttribute(J,"cx",q.a=z),F!==q.o&&t.setAttribute(J,"cy",q.o=F),q},{e:void 0,t:void 0,a:void 0,o:void 0}),c})()}function te(e){return(()=>{var n=Ue();return t.effect(a=>{var i=e.stroke?"oq-fc-line":"oq-fc-area",f=e.d,v=e.stroke,k=e.width,h=e.fill??"none";return i!==a.e&&t.setAttribute(n,"class",a.e=i),f!==a.t&&t.setAttribute(n,"d",a.t=f),v!==a.a&&t.setAttribute(n,"stroke",a.a=v),k!==a.o&&t.setAttribute(n,"stroke-width",a.o=k),h!==a.i&&t.setAttribute(n,"fill",a.i=h),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),n})()}function nt(e){const n=()=>T(Math.round(e.meter.percent),0,100),a=()=>$e(e.meter);return(()=>{var i=he(),f=i.firstChild,v=f.firstChild,k=v.nextSibling,h=f.nextSibling,A=h.firstChild,s=h.nextSibling;return t.insert(v,()=>e.name),t.insert(k,(()=>{var l=t.memo(()=>!!e.meter.limited);return()=>l()?e.ctx.t("card.limited"):e.ctx.t("card.used",{percent:n()})})()),t.insert(s,()=>e.ctx.t("card.resets",{time:ne(e.ctx,e.meter.resetsAt,e.now())})),t.effect(l=>{var r=e.name,C=a(),x=a(),m=`${n()}%`,M=ge(e.ctx,e.meter.resetsAt);return r!==l.e&&t.setAttribute(v,"title",l.e=r),C!==l.t&&t.setAttribute(k,"data-tone",l.t=C),x!==l.a&&t.setAttribute(A,"data-tone",l.a=x),m!==l.o&&t.setStyleProperty(A,"width",l.o=m),M!==l.i&&t.setAttribute(s,"title",l.i=M),l},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),i})()}function ot(e){const n=()=>e.budget.limit>0?T(e.budget.spent/e.budget.limit*100,0,100):100,a=()=>fe(e.budget),i=()=>ve(e.ctx,e.budget);return(()=>{var f=he(),v=f.firstChild,k=v.firstChild,h=k.nextSibling,A=v.nextSibling,s=A.firstChild,l=A.nextSibling;return t.insert(k,i),t.insert(h,()=>e.ctx.t("card.budget.spent",{spent:ue(e.ctx,e.budget.spent),limit:ue(e.ctx,e.budget.limit)})),t.insert(l,()=>e.ctx.t("card.resets",{time:ne(e.ctx,e.budget.resetsAt,e.now())})),t.effect(r=>{var C=i(),x=a(),m=a(),M=`${n()}%`,E=ge(e.ctx,e.budget.resetsAt);return C!==r.e&&t.setAttribute(k,"title",r.e=C),x!==r.t&&t.setAttribute(h,"data-tone",r.t=x),m!==r.a&&t.setAttribute(s,"data-tone",r.a=m),M!==r.o&&t.setStyleProperty(s,"width",r.o=M),E!==r.i&&t.setAttribute(l,"title",r.i=E),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),f})()}t.delegateEvents(["pointerdown","click"]);const rt={"card.title":"OpenCode Go","card.loading":"Loading quota…","card.error":"Could not read the quota: {{message}}","card.retry":"Try again","card.signedOut.title":"Not signed in","card.signedOut.body":"Sign in to an OpenCode Console workspace to see its quota.","card.noGo":"This workspace has no OpenCode Go plan.","card.go.rolling":"5 hours","card.go.weekly":"Week","card.go.monthly":"Month","card.used":"{{percent}}% used","card.limited":"Limit reached","card.resets":"Resets {{time}}","card.budgets":"Console budgets","card.budget.all":"All spend","card.budget.other":"Budget","card.budget.perModel":"per model","card.budget.spent":"{{spent}} of {{limit}}","card.updated":"Updated {{time}}","card.openDashboard":"Open dashboard","card.launcher":"Quota","card.launcher.open":"Open the quota window (drag to move)","card.forecast":"Forecast","card.forecast.show":"Show forecast","card.forecast.hide":"Hide forecast","card.forecast.hint":"At the current pace","card.forecast.usage":"Go usage","card.forecast.renews":"Renews {{date}}","card.forecast.onPace":"On pace for {{percent}}%","card.forecast.summary":"On pace for {{percent}}%","card.forecast.summaryRunOut":"Runs out {{time}}","card.forecast.projected":"{{percent}}% at reset","card.forecast.runsOut":"Runs out {{time}}","card.forecast.now":"Now","card.forecast.empty":"Not enough usage yet to project.","card.refresh":"Refresh quota","card.minimize":"Minimize quota window","command.toggle":"Quota: Show or hide the floating window","command.toggle.description":"OpenCode Go and Console quota in a draggable window","command.refresh":"Quota: Refresh now","command.reset":"Quota: Reset window position","titlebar.label":"Go {{percent}}%","titlebar.fallback":"Quota","titlebar.title":"Quota: {{text}}","toast.refreshed":"Quota refreshed","toast.error":"Could not refresh the quota"};function at(e){const n=e,a=n.experimental?.usage;if(typeof a?.limits=="function")return a.limits.bind(a);const i=n.usage;if(typeof i?.limits=="function")return i.limits.bind(i)}function it(e){if(e instanceof Error)return e.message;if(typeof e=="object"&&e!==null&&"message"in e){const n=e.message;if(typeof n=="string")return n}return String(e)}function lt(e){const[n,a]=w.createSignal(void 0),[i,f]=w.createSignal(),[v,k]=w.createSignal(!1),[h,A]=w.createSignal();let s,l=0;const r=()=>{const x=e.sessions.current(),m=x?.server.builtin?x.directory:void 0;return m?{location:{directory:m}}:{}};async function C(){const x=++l;k(!0);try{const m=at(e.client);if(!m)throw new Error("This OpenCode build has no usage limits API");const M=await m(r(),{signal:e.signal});if(x!==l||e.signal.aborted)return;a(M.data),f(void 0),A(Date.now())}catch(m){if(x!==l||e.signal.aborted)return;f(it(m))}finally{x===l&&k(!1)}}return{data:n,error:i,loading:v,updatedAt:h,refresh(x="auto"){return e.signal.aborted?Promise.resolve():s||(s=C().finally(()=>{s=void 0}),s)}}}const st=`
.oq-floating {
  --oq-bg: var(--v2-background-bg-base, #ffffff);  --oq-raised: var(--v2-background-bg-layer-01, #f6f6f6);
  --oq-fg: var(--v2-text-text-base, #111111);
  --oq-muted: var(--v2-text-text-muted, #6b7280);
  --oq-line: var(--v2-border-border-base, rgba(0, 0, 0, 0.12));
  --oq-track: var(--v2-background-bg-layer-03, rgba(0, 0, 0, 0.10));
  --oq-ok: #22c55e;
  --oq-warn: #f59e0b;
  --oq-danger: #ef4444;
  position: fixed;
  z-index: 120;
  display: flex;
  flex-direction: column;
  width: 320px;
  max-width: calc(100vw - 24px);
  box-sizing: border-box;
  color: var(--oq-fg);
  background: var(--oq-bg);
  border: 0.5px solid var(--oq-line);
  border-radius: 12px;
  box-shadow: var(--v2-elevation-floating, 0 18px 50px rgba(0, 0, 0, 0.28));
  font-size: 13px;
  line-height: 1.35;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  pointer-events: auto;
  -webkit-app-region: no-drag;
  app-region: no-drag;
}

.oq-floating * {
  -webkit-app-region: no-drag;
  app-region: no-drag;
}

.oq-launcher {
  --oq-bg: var(--v2-background-bg-base, #ffffff);
  --oq-raised: var(--v2-background-bg-layer-01, #f6f6f6);
  --oq-fg: var(--v2-text-text-base, #111111);
  --oq-muted: var(--v2-text-text-muted, #6b7280);
  --oq-line: var(--v2-border-border-base, rgba(0, 0, 0, 0.12));
  --oq-ok: #22c55e;
  --oq-warn: #f59e0b;
  --oq-danger: #ef4444;
  position: fixed;
  z-index: 120;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  border: 0.5px solid var(--oq-line);
  border-radius: 999px;
  background: var(--oq-bg);
  color: var(--oq-fg);
  box-shadow: var(--v2-elevation-floating, 0 10px 30px rgba(0, 0, 0, 0.28));
  font: inherit;
  font-size: 11px;
  cursor: grab;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  -webkit-app-region: no-drag;
  app-region: no-drag;
}

.oq-launcher:active {
  cursor: grabbing;
}

.oq-launcher[data-mode="dark"] {
  --oq-bg: var(--v2-background-bg-base, #161616);
  --oq-raised: var(--v2-background-bg-layer-01, #1f1f1f);
  --oq-fg: var(--v2-text-text-base, #f2f2f2);
  --oq-muted: var(--v2-text-text-muted, #a1a1aa);
  --oq-line: var(--v2-border-border-base, rgba(255, 255, 255, 0.14));
}

.oq-launcher:hover {
  background: var(--oq-raised);
}

.oq-launcher.oq-launcher-dock {
  inset-inline-end: 20px;
  bottom: 20px;
}

.oq-launcher-value {
  color: var(--oq-muted);
  font-variant-numeric: tabular-nums;
}

.oq-floating[data-mode="dark"] {
  --oq-bg: var(--v2-background-bg-base, #161616);
  --oq-raised: var(--v2-background-bg-layer-01, #1f1f1f);
  --oq-fg: var(--v2-text-text-base, #f2f2f2);
  --oq-muted: var(--v2-text-text-muted, #a1a1aa);
  --oq-line: var(--v2-border-border-base, rgba(255, 255, 255, 0.14));
  --oq-track: var(--v2-background-bg-layer-03, rgba(255, 255, 255, 0.14));
}

.oq-floating.oq-dock {
  inset-inline-end: 20px;
  bottom: 20px;
}

@media (max-width: 520px) {
  .oq-floating.oq-dock {
    inset-inline-end: 12px;
    bottom: 12px;
  }
}

.oq-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 7px 9px 12px;
  cursor: grab;
  touch-action: none;
}

.oq-head:active {
  cursor: grabbing;
}

.oq-head button {
  cursor: pointer;
}

.oq-dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--oq-ok);
}

.oq-dot[data-tone="warn"] {
  background: var(--oq-warn);
}

.oq-dot[data-tone="danger"] {
  background: var(--oq-danger);
}

.oq-name {
  flex: none;
  font-weight: 600;
  white-space: nowrap;
}

.oq-ws {
  min-width: 0;
  max-width: 104px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--oq-muted);
  font-size: 11px;
  border: 0.5px solid var(--oq-line);
  border-radius: 6px;
  padding: 1px 6px;
}

.oq-spacer {
  flex: 1;
}

.oq-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 12px 11px;
}

.oq-meters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.oq-meter {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.oq-meter-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.oq-meter-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 530;
}

.oq-meter-value {
  flex: none;
  color: var(--oq-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.oq-meter-value[data-tone="warn"] {
  color: var(--oq-warn);
}

.oq-meter-value[data-tone="danger"] {
  color: var(--oq-danger);
}

.oq-track {
  height: 6px;
  margin-top: 2px;
  border-radius: 3px;
  background: var(--oq-track);
  overflow: hidden;
}

.oq-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--oq-ok);
  transition: width 0.25s ease;
}

.oq-fill[data-tone="warn"] {
  background: var(--oq-warn);
}

.oq-fill[data-tone="danger"] {
  background: var(--oq-danger);
}

.oq-reset {
  color: var(--oq-muted);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oq-section {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-top: 9px;
  border-top: 0.5px solid var(--oq-line);
}

.oq-section-title {
  color: var(--oq-muted);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.oq-state {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: var(--oq-muted);
  padding: 4px 0 6px;
}

.oq-state-title {
  color: var(--oq-fg);
  font-weight: 600;
}

.oq-inline {
  flex-direction: row;
  align-items: center;
  gap: 7px;
}

.oq-error {
  color: var(--oq-danger);
  font-size: 11px;
  overflow-wrap: anywhere;
}

.oq-error-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.oq-error-row .oq-error {
  flex: 1;
  min-width: 0;
}

.oq-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px 6px 12px;
  border-top: 0.5px solid var(--oq-line);
  background: var(--oq-raised);
}

.oq-updated {
  color: var(--oq-muted);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oq-fc-toggle {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 7px 8px;
  border: 0;
  border-radius: 8px;
  background: var(--oq-raised);
  color: var(--oq-fg);
  font: inherit;
  font-size: 12px;
  text-align: start;
  cursor: pointer;
}

.oq-fc-toggle:hover {
  background: var(--oq-track);
}

.oq-fc-toggle-label {
  flex: none;
  font-weight: 600;
}

.oq-fc-toggle-summary {
  min-width: 0;
  margin-inline-start: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--oq-muted);
  font-size: 11px;
}

.oq-fc-chevron {
  flex: none;
  color: var(--oq-muted);
  transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.oq-fc-chevron[data-open="true"] {
  transform: rotate(180deg);
}

.oq-fc-wrap {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 280ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 180ms ease;
}

.oq-fc-wrap[data-open="true"] {
  grid-template-rows: 1fr;
  opacity: 1;
}

.oq-fc-inner {
  min-height: 0;
  overflow: hidden;
}

.oq-fc-panel {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-top: 8px;
}

.oq-fc-hero {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.oq-fc-percent {
  color: var(--oq-fg);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.oq-fc-pace {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--oq-muted);
  font-size: 11px;
  font-weight: 600;
  text-align: end;
}

.oq-fc-pace[data-tone="warn"] {
  color: var(--oq-warn);
}

.oq-fc-pace[data-tone="danger"] {
  color: var(--oq-danger);
}

.oq-fc-caption {
  margin-top: -4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--oq-muted);
  font-size: 10.5px;
}

.oq-fc-sep {
  padding: 0 4px;
}

.oq-fc-chart {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 2px;
}

.oq-fc-line {
  fill: none;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.oq-fc-area {
  stroke: none;
}

.oq-fc-grid {
  stroke: var(--oq-line);
  stroke-width: 0.6;
  stroke-dasharray: 2 3;
  opacity: 0.55;
}

.oq-fc-limit {
  stroke: var(--oq-muted);
  opacity: 0.8;
}

.oq-fc-axis-label {
  fill: var(--oq-muted);
  font-size: 8px;
}

.oq-fc-nowline {
  stroke: var(--oq-line);
  stroke-width: 0.7;
  stroke-dasharray: 2 2;
}

.oq-fc-dot {
  stroke: var(--oq-bg);
  stroke-width: 1.2;
}

.oq-fc-axis {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--oq-raised);
  color: var(--oq-muted);
  font-size: 9px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
`,ct=j.Schema.Struct({x:j.Schema.Number,y:j.Schema.Number,placed:j.Schema.Boolean,open:j.Schema.Boolean,collapsed:j.Schema.Boolean,forecast:j.Schema.Boolean,pillX:j.Schema.Number,pillY:j.Schema.Number,pillPlaced:j.Schema.Boolean,layout:j.Schema.Number});function dt(e){const n=Number(e);return Number.isFinite(n)?T(Math.round(n),15,3600):60}const ut=N.Plugin.define({i18n:{en:rt},stores:{dock:N.Store.global(ct,{x:0,y:0,placed:!1,open:!0,collapsed:!1,forecast:!1,pillX:0,pillY:0,pillPlaced:!1,layout:0})},setup(e){const n=lt(e),a=e.stores.dock;a.value.layout<2&&a.update(r=>{r.layout=2,r.placed=!1,r.x=0,r.y=0});const i=dt(e.options.refreshSeconds);let f=!1;const v=r=>{f||n.refresh(r)},k=()=>{document.visibilityState!=="hidden"&&v("auto")},h=()=>{document.visibilityState==="visible"&&v("auto")},A=setInterval(k,i*1e3);document.addEventListener("visibilitychange",h),window.addEventListener("focus",h),v("initial");const s=()=>{e.stores.dock.update(r=>{r.open=!r.open})},l=async()=>{await n.refresh("manual");const r=n.error();r?e.toast.show({variant:"error",title:e.t("toast.error"),description:r}):e.toast.show({variant:"success",title:e.t("toast.refreshed")})};return e.add(N.Style,st),e.add(N.Command,()=>({id:"toggle",title:e.t("command.toggle"),description:e.t("command.toggle.description"),keywords:"quota usage limits go budget",bind:"mod+shift+q",featured:!0,run:s})),e.add(N.Command,()=>({id:"refresh",title:e.t("command.refresh"),run:()=>{l()}})),e.add(N.Command,()=>({id:"reset",title:e.t("command.reset"),run:()=>{e.stores.dock.update(r=>{r.placed=!1,r.x=0,r.y=0,r.open=!0,r.collapsed=!1})}})),e.add(N.TitlebarItem,()=>{const r=n.data();if(!r)return;const C=[];if(r.go)for(const m of oe)C.push(`${e.t(`card.go.${m}`)} ${Math.round(r.go[m].percent)}%`);for(const m of r.budgets){const M=m.limit>0?Math.round(m.spent/m.limit*100):100;C.push(`${ve(e,m)} ${M}%`)}const x=Ce(r);return{id:"quota",label:x===void 0?e.t("titlebar.fallback"):e.t("titlebar.label",{percent:x}),title:e.t("titlebar.title",{text:C.join(" · ")}),icon:me(r)==="danger"?"warning":"window-analytics",run:s}}),e.add(N.Slot,{at:"window.bottom",order:100,render:()=>t.createComponent(Je,{ctx:e,quota:n,get dock(){return e.stores.dock}})}),()=>{f=!0,clearInterval(A),document.removeEventListener("visibilitychange",h),window.removeEventListener("focus",h)}}});exports.default=ut;
