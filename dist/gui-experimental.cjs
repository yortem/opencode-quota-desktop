"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("solid-js/web"),G=require("@opencode/plugin/gui"),j=require("effect"),b=require("solid-js"),re=["rolling","weekly","monthly"];function T(e,n,r){return Math.min(r,Math.max(n,e))}function Ae(e){return e.limited||e.percent>=100?"danger":e.percent>=75?"warn":"ok"}function ve(e){return e.limit<=0?"ok":e.spent>=e.limit?"danger":e.spent/e.limit>=.75?"warn":"ok"}function he(e){if(!e)return"ok";let n="ok";if(e.go)for(const r of re){const i=e.go[r];if(i.limited||i.percent>=100)return"danger";i.percent>=75&&(n="warn")}for(const r of e.budgets){const i=ve(r);if(i==="danger")return"danger";i==="warn"&&(n="warn")}return n}function Me(e){if(e.go)return Math.round(Math.max(...re.map(n=>e.go[n].percent)))}function J(e){return e.locale.locale()||"en"}function oe(e,n,r){const i=new Intl.RelativeTimeFormat(J(e),{numeric:"auto",style:"short"}),f=Math.round((n-r)/6e4);if(Math.abs(f)<90)return i.format(f,"minute");const g=Math.round(f/60);return Math.abs(g)<36?i.format(g,"hour"):i.format(Math.round(g/24),"day")}function pe(e,n){return new Intl.DateTimeFormat(J(e),{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(n)}function _e(e,n){return new Intl.DateTimeFormat(J(e),{timeStyle:"short"}).format(n)}function me(e,n,r){return new Intl.DateTimeFormat(J(e),{month:"short",day:"numeric"}).format(n)}function ge(e,n){return new Intl.NumberFormat(J(e),{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:2}).format(n)}function be(e,n){let r;if(n.coverage==="all")r=e.t("card.budget.all");else if(n.models.length>0){const i=n.models.map(f=>f.name);r=i.length>2?`${i.slice(0,2).join(", ")} +${i.length-2}`:i.join(", ")}else n.vendors.length>0?r=n.vendors.join(", "):r=e.t("card.budget.other");return n.per==="model"?`${r} (${e.t("card.budget.perModel")})`:r}const Le={rolling:300*60*1e3,weekly:10080*60*1e3,monthly:720*60*60*1e3};function Oe(e,n,r){const i=Le[n],f=e.resetsAt-i,g=Math.max(0,e.resetsAt-r),$=Math.min(i,Math.max(0,r-f)),v=i>0?$/i:0,A=e.resetsAt<=r,s=Math.max(0,e.percent);if(s<=0||v<=.005||A)return{start:f,elapsed:A?1:v,projected:s,remaining:g,stale:A};const l=Math.min(999,s/v),a=l>100?r+(100-s)/(s/$):void 0;return{start:f,elapsed:v,projected:l,runsOutAt:a!==void 0&&a<e.resetsAt?a:void 0,remaining:g,stale:A}}function Ee(e,n){return n.limited||e.runsOutAt!==void 0||e.projected>=100?"danger":e.projected>=75?"warn":"ok"}var ze=t.template("<div class=oq-floating><header class=oq-head><span class=oq-dot></span><span class=oq-name></span><span class=oq-spacer></span></header><div class=oq-body>"),Pe=t.template("<span class=oq-launcher-value>%"),Te=t.template("<button type=button class=oq-launcher><span class=oq-dot></span><span>"),Fe=t.template("<span class=oq-ws>"),je=t.template('<div class="oq-state oq-inline"><span>'),De=t.template("<div class=oq-state><span class=oq-state-title></span><span>"),Re=t.template("<div class=oq-error-row><span class=oq-error>"),Be=t.template("<footer class=oq-foot><span class=oq-updated>"),Ie=t.template("<div class=oq-meters>"),Ne=t.template("<div class=oq-section><div class=oq-section-title>"),Ge=t.template("<div class=oq-state>"),Ye=t.template("<button type=button class=oq-fc-toggle><span class=oq-fc-toggle-label></span><span class=oq-fc-toggle-summary>"),Xe=t.template("<div class=oq-fc-wrap><div class=oq-fc-inner><div class=oq-fc-panel><div class=oq-fc-hero><span class=oq-fc-percent>%</span><span class=oq-fc-pace></span></div><div class=oq-fc-caption><span class=oq-fc-sep>·</span></div><div class=oq-fc-axis>"),We=t.template("<span>"),He=t.template("<svg><circle r=2.6 fill=#f5c451></svg>",!1,!0,!1),Qe=t.template('<svg class=oq-fc-chart viewBox="0 0 296 116"role=img><defs><linearGradient x1=0 y1=0 x2=0 y2=1><stop offset=0% stop-color=#22c55e stop-opacity=0.26></stop><stop offset=100% stop-color=#22c55e stop-opacity=0></stop></linearGradient><pattern width=7 height=7 patternUnits=userSpaceOnUse patternTransform=rotate(45)><line x1=0 y1=0 x2=0 y2=7 stroke=#f5c451 stroke-width=1.3 stroke-opacity=0.32></line></pattern></defs><line class=oq-fc-nowline y1=6 y2=112></line><circle class=oq-fc-dot r=3 fill=#22c55e>'),Ue=t.template("<svg><line></svg>",!1,!0,!1),Ve=t.template("<svg><text class=oq-fc-axis-label x=26 text-anchor=end>%</svg>",!1,!0,!1),Ze=t.template("<svg><circle r=2.8 fill=#f5c451></svg>",!1,!0,!1),Je=t.template("<svg><path></svg>",!1,!0,!1),we=t.template("<div class=oq-meter><div class=oq-meter-head><span class=oq-meter-name></span><span class=oq-meter-value></span></div><div class=oq-track><div class=oq-fill></div></div><div class=oq-reset>");const Ke="#22c55e",et="#f5c451";function te(){const n=document.querySelector('header[data-slot="titlebar-v2"]')?.getBoundingClientRect().bottom;return Math.max(4,(n??44)+6)}function tt(e){const n=e.ctx,[r,i]=b.createSignal(),[f,g]=b.createSignal(),[$,v]=b.createSignal(0),[A,s]=b.createSignal(),[l,a]=b.createSignal(),[h,q]=b.createSignal(!1),[w,E]=b.createSignal(Date.now());let L,B=!1,c=!1;const S=setInterval(()=>E(Date.now()),3e4);b.onCleanup(()=>clearInterval(S));let O;const Y=()=>e.dock.value.open,D=()=>e.quota.data(),F=()=>{const o=D();return o?he(o):e.quota.error()&&o===void 0?"danger":"ok"},Q=()=>D()?.go?.monthly.percent,y=()=>f()!==void 0||e.dock.value.placed,k=()=>{const o=f();if(o)return{left:`${o.x}px`,top:`${o.y}px`};if(e.dock.value.placed)return{left:`${e.dock.value.x}px`,top:`${e.dock.value.y+$()}px`}},C=()=>{e.dock.update(o=>{o.forecast=!o.forecast})},z=()=>{const o=r()?.getBoundingClientRect(),d=e.dock.value.placed;e.dock.update(m=>{m.open=!1,d&&o&&(m.x=o.left,m.y=o.top)}),v(0),g(void 0)},R=()=>l()!==void 0||e.dock.value.pillPlaced,K=()=>{const o=l();if(o)return{left:`${o.x}px`,top:`${o.y}px`};if(e.dock.value.pillPlaced)return{left:`${e.dock.value.pillX}px`,top:`${e.dock.value.pillY}px`}},U=()=>{if(!e.dock.value.pillPlaced)return;const o=A()?.getBoundingClientRect();if(!o)return;const d=te(),m=T(e.dock.value.pillX,4,Math.max(4,window.innerWidth-o.width-4)),u=T(e.dock.value.pillY,d,Math.max(d,window.innerHeight-o.height-4));m===e.dock.value.pillX&&u===e.dock.value.pillY||e.dock.update(M=>{M.pillX=m,M.pillY=u})},ae=o=>{if(!L)return;const d=o.clientX-L.px,m=o.clientY-L.py;if(!B&&Math.abs(d)+Math.abs(m)<3)return;B=!0;const u=A()?.getBoundingClientRect(),M=u?.width??110,P=u?.height??30,p=te(),x=T(L.x+d,4,Math.max(4,window.innerWidth-M-4)),_=T(L.y+m,p,Math.max(p,window.innerHeight-P-4));a({x,y:_})},W=()=>{if(!L)return;L=void 0,window.removeEventListener("pointermove",ae),window.removeEventListener("pointerup",W),window.removeEventListener("pointercancel",W);const o=l(),d=B;B=!1,a(void 0),!(!d||!o)&&(e.dock.update(m=>{m.pillX=o.x,m.pillY=o.y,m.pillPlaced=!0}),c=!0,window.setTimeout(()=>{c=!1},0))},xe=o=>{if(o.button!==0)return;const d=A()?.getBoundingClientRect();d&&(L={px:o.clientX,py:o.clientY,x:d.left,y:d.top},B=!1,a({x:d.left,y:d.top}),window.addEventListener("pointermove",ae),window.addEventListener("pointerup",W),window.addEventListener("pointercancel",W))},qe=()=>{if(c){c=!1;return}e.dock.update(o=>{o.open=!0})},ye=o=>{s(o),o&&requestAnimationFrame(U)};b.onCleanup(()=>{window.removeEventListener("pointermove",ae),window.removeEventListener("pointerup",W),window.removeEventListener("pointercancel",W)});const ke=o=>{const d=o.replace(/\/overview\/?$/,"");try{const m=new URL(d),u=m.hostname.toLowerCase();if(m.protocol!=="https:"||u!=="opencode.ai"&&!u.endsWith(".opencode.ai"))return;n.system.openExternal(m.toString())}catch{}},se=async()=>{q(!0);try{await e.quota.refresh("manual")}finally{q(!1)}},[ce,de]=b.createSignal(!1),ie=o=>{if(!ce()||!O)return;const d=r()?.getBoundingClientRect(),m=d?.width??320,u=d?.height??220,M=te(),P=T(O.x+o.clientX-O.px,4,Math.max(4,window.innerWidth-m-4)),p=T(O.y+o.clientY-O.py,M,Math.max(M,window.innerHeight-u-4));g({x:P,y:p})},I=()=>{if(!ce())return;de(!1),O=void 0,window.removeEventListener("pointermove",ie),window.removeEventListener("pointerup",I),window.removeEventListener("pointercancel",I),window.removeEventListener("blur",I);const o=f();o&&(e.dock.update(d=>{d.x=o.x,d.y=o.y,d.placed=!0}),g(void 0))},$e=o=>{if(o.button!==0)return;const d=o.target;if(d instanceof Element&&d.closest("button, a, input, textarea, select"))return;const m=r()?.getBoundingClientRect();if(m){if($()!==0){const u=e.dock.value.y+$();e.dock.update(M=>{M.y=u}),v(0)}O={px:o.clientX,py:o.clientY,x:m.left,y:m.top},g({x:m.left,y:m.top}),de(!0),window.addEventListener("pointermove",ie),window.addEventListener("pointerup",I),window.addEventListener("pointercancel",I),window.addEventListener("blur",I),o.preventDefault()}};b.onCleanup(()=>{window.removeEventListener("pointermove",ie),window.removeEventListener("pointerup",I),window.removeEventListener("pointercancel",I),window.removeEventListener("blur",I)});let H=0,V=!0,X;const le=()=>{const o=r()?.getBoundingClientRect();if(!o)return;const d=o.height,m=4,u=te(),M=Math.max(u,window.innerHeight-m-d),P=o.top;if(!e.dock.value.placed)v(0),V||(H=d);else if(V||H===0){const x=T(P,u,M);v(x-e.dock.value.y),V||(H=d)}else{const _=e.dock.value.y>window.innerHeight*.35?P+(H-d):P,N=T(_,u,M);v(N-e.dock.value.y),H=d}const p=T(e.dock.value.x,m,Math.max(m,window.innerWidth-o.width-m));p!==e.dock.value.x&&e.dock.update(x=>{x.x=p})};let Z;const Ce=o=>{i(o),Z?.disconnect(),Z=void 0,X!==void 0&&cancelAnimationFrame(X),X=void 0,o&&(H=0,V=!0,v(0),Z=new ResizeObserver(()=>le()),Z.observe(o),X=requestAnimationFrame(()=>{X=void 0,V=!1,le()}))},ue=()=>{le(),U()};b.onMount(()=>{window.addEventListener("resize",ue),b.onCleanup(()=>{window.removeEventListener("resize",ue),Z?.disconnect(),X!==void 0&&cancelAnimationFrame(X)})});const Se=()=>{const o=e.quota.updatedAt();return o?n.t("card.updated",{time:_e(n,o)}):""};return[t.createComponent(b.Show,{get when(){return Y()},get children(){var o=ze(),d=o.firstChild,m=d.firstChild,u=m.nextSibling,M=u.nextSibling,P=d.nextSibling;return t.use(Ce,o),d.$$pointerdown=$e,t.insert(u,()=>n.t("card.title")),t.insert(d,t.createComponent(b.Show,{get when(){return D()?.workspace.name},children:p=>(()=>{var x=Fe();return t.insert(x,p),t.effect(()=>t.setAttribute(x,"title",p())),x})()}),M),t.insert(d,t.createComponent(n.ui.IconButton,{icon:"refresh",get label(){return n.t("card.refresh")},size:"small",variant:"ghost",get busy(){return h()},onClick:()=>{se()}}),null),t.insert(d,t.createComponent(n.ui.IconButton,{icon:"minus",get label(){return n.t("card.minimize")},size:"small",variant:"ghost",onClick:z}),null),t.insert(P,(()=>{var p=t.memo(()=>D()===void 0);return()=>p()?(()=>{var x=je(),_=x.firstChild;return t.insert(x,t.createComponent(n.ui.Loader,{size:"small"}),_),t.insert(_,()=>n.t("card.loading")),x})():t.memo(()=>D()===null)()?(()=>{var x=De(),_=x.firstChild,N=_.nextSibling;return t.insert(_,()=>n.t("card.signedOut.title")),t.insert(N,()=>n.t("card.signedOut.body")),x})():t.createComponent(nt,{ctx:n,get info(){return D()},now:w,get forecastOpen(){return e.dock.value.forecast},toggleForecast:C})})(),null),t.insert(P,t.createComponent(b.Show,{get when(){return e.quota.error()},children:p=>(()=>{var x=Re(),_=x.firstChild;return t.insert(_,()=>n.t("card.error",{message:p()})),t.insert(x,t.createComponent(n.ui.Button,{variant:"ghost",size:"small",onClick:()=>{se()},get children(){return n.t("card.retry")}}),null),x})()}),null),t.insert(o,t.createComponent(b.Show,{get when(){return D()},children:p=>(()=>{var x=Be(),_=x.firstChild;return t.insert(_,Se),t.insert(x,t.createComponent(n.ui.Button,{variant:"ghost",size:"small",onClick:()=>ke(p().workspace.usageURL),get children(){return n.t("card.openDashboard")}}),null),x})()}),null),t.effect(p=>{var x=!y(),_=n.appearance.mode(),N=n.locale.direction(),ee=k(),fe=F();return x!==p.e&&o.classList.toggle("oq-dock",p.e=x),_!==p.t&&t.setAttribute(o,"data-mode",p.t=_),N!==p.a&&t.setAttribute(o,"dir",p.a=N),p.o=t.style(o,ee,p.o),fe!==p.i&&t.setAttribute(m,"data-tone",p.i=fe),p},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),o}}),t.createComponent(b.Show,{get when(){return!Y()},get children(){var o=Te(),d=o.firstChild,m=d.nextSibling;return o.$$click=qe,o.$$pointerdown=xe,t.use(ye,o),t.insert(m,()=>n.t("card.launcher")),t.insert(o,t.createComponent(b.Show,{get when(){return Q()!==void 0},get children(){var u=Pe(),M=u.firstChild;return t.insert(u,()=>Math.round(Q()),M),u}}),null),t.effect(u=>{var M=!R(),P=n.appearance.mode(),p=n.locale.direction(),x=K(),_=n.t("card.launcher.open"),N=n.t("card.launcher.open"),ee=F();return M!==u.e&&o.classList.toggle("oq-launcher-dock",u.e=M),P!==u.t&&t.setAttribute(o,"data-mode",u.t=P),p!==u.a&&t.setAttribute(o,"dir",u.a=p),u.o=t.style(o,x,u.o),_!==u.i&&t.setAttribute(o,"aria-label",u.i=_),N!==u.n&&t.setAttribute(o,"title",u.n=N),ee!==u.s&&t.setAttribute(d,"data-tone",u.s=ee),u},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),o}})]}function nt(e){const n=e.info.go,r=e.info.budgets;return[n?[(()=>{var i=Ie();return t.insert(i,t.createComponent(b.For,{each:re,children:f=>t.createComponent(at,{get ctx(){return e.ctx},get name(){return e.ctx.t(`card.go.${f}`)},get meter(){return n[f]},get now(){return e.now}})})),i})(),t.createComponent(ot,{get ctx(){return e.ctx},go:n,get now(){return e.now},get open(){return e.forecastOpen},get toggle(){return e.toggleForecast}})]:null,t.memo(()=>t.memo(()=>r.length>0)()?(()=>{var i=Ne(),f=i.firstChild;return t.insert(f,()=>e.ctx.t("card.budgets")),t.insert(i,t.createComponent(b.For,{each:r,children:g=>t.createComponent(it,{get ctx(){return e.ctx},budget:g,get now(){return e.now}})}),null),i})():null),t.memo(()=>t.memo(()=>!n&&r.length===0)()?(()=>{var i=Ge();return t.insert(i,()=>e.ctx.t("card.noGo")),i})():null)]}function ot(e){const n=e.ctx,r=()=>e.go.monthly,i=()=>Oe(r(),"monthly",e.now()),f=()=>Ee(i(),r()),g=()=>me(n,r().resetsAt),$=()=>{const s=i();return r().limited||r().percent>=100?n.t("card.limited"):s.stale||r().percent<=0?n.t("card.forecast.empty"):s.runsOutAt!==void 0?n.t("card.forecast.runsOut",{time:oe(n,s.runsOutAt,e.now())}):n.t("card.forecast.onPace",{percent:Math.round(s.projected)})},v=()=>{const s=i();return r().limited||r().percent>=100?n.t("card.limited"):s.stale||r().percent<=0?n.t("card.forecast.empty"):s.runsOutAt!==void 0?n.t("card.forecast.summaryRunOut",{time:oe(n,s.runsOutAt,e.now())}):n.t("card.forecast.summary",{percent:Math.round(s.projected)})},A=()=>{const s=i().start,l=r().resetsAt;return[0,1,2,3].map(a=>s+(l-s)*a/3)};return[(()=>{var s=Ye(),l=s.firstChild,a=l.nextSibling;return t.addEventListener(s,"click",e.toggle,!0),t.insert(l,()=>n.t("card.forecast")),t.insert(a,v),t.insert(s,t.createComponent(n.ui.Icon,{name:"chevron-down",size:"small",class:"oq-fc-chevron",get"data-open"(){return e.open?"true":"false"}}),null),t.effect(h=>{var q=e.open,w=n.t(e.open?"card.forecast.hide":"card.forecast.show");return q!==h.e&&t.setAttribute(s,"aria-expanded",h.e=q),w!==h.t&&t.setAttribute(s,"aria-label",h.t=w),h},{e:void 0,t:void 0}),s})(),(()=>{var s=Xe(),l=s.firstChild,a=l.firstChild,h=a.firstChild,q=h.firstChild,w=q.firstChild,E=q.nextSibling,L=h.nextSibling,B=L.firstChild,c=L.nextSibling;return t.insert(q,()=>Math.round(r().percent),w),t.insert(E,$),t.insert(L,()=>n.t("card.forecast.usage"),B),t.insert(L,()=>n.t("card.forecast.renews",{date:g()}),null),t.insert(a,t.createComponent(rt,{get meter(){return r()},get forecast(){return i()}}),c),t.insert(c,t.createComponent(b.For,{get each(){return A()},children:S=>(()=>{var O=We();return t.insert(O,()=>me(n,S)),O})()})),t.effect(S=>{var O=e.open?"true":"false",Y=f();return O!==S.e&&t.setAttribute(s,"data-open",S.e=O),Y!==S.t&&t.setAttribute(E,"data-tone",S.t=Y),S},{e:void 0,t:void 0}),s})()]}function rt(e){const n=`oq-fc-fill-${Math.random().toString(36).slice(2,9)}`,r=`oq-fc-hatch-${Math.random().toString(36).slice(2,9)}`,i=296,f=116,g=32,$=4,v=6,A=4,s=()=>{const c=Math.max(e.meter.percent,e.forecast.projected);return Math.max(150,Math.ceil(c/50)*50)},l=c=>g+c*(i-g-$),a=c=>{const S=s();return v+(1-Math.min(Math.max(c,0),S)/S)*(f-v-A)},h=()=>{const c=[];for(let S=0;S<=s();S+=50)c.push(S);return c},q=()=>`M${l(0)},${a(0)}L${l(e.forecast.elapsed)},${a(e.meter.percent)}`,w=()=>`${q()}L${l(e.forecast.elapsed)},${a(0)}Z`,E=()=>{const c=e.forecast;if(!(c.elapsed<=0||c.elapsed>=1))return`M${l(c.elapsed)},${a(e.meter.percent)}L${l(1)},${a(c.projected)}`},L=()=>{const c=e.forecast;if(!(c.elapsed<=0||c.elapsed>=1))return`M${l(c.elapsed)},${a(e.meter.percent)}L${l(1)},${a(c.projected)}L${l(1)},${a(0)}L${l(c.elapsed)},${a(0)}Z`},B=()=>{const c=e.forecast;if(c.projected<=100||e.meter.percent>=100)return;const S=c.elapsed+(100-e.meter.percent)*(1-c.elapsed)/(c.projected-e.meter.percent);return S>c.elapsed&&S<=1?S:void 0};return(()=>{var c=Qe(),S=c.firstChild,O=S.firstChild,Y=O.firstChild;Y.nextSibling;var D=O.nextSibling;D.firstChild;var F=S.nextSibling,Q=F.nextSibling;return t.setAttribute(O,"id",n),t.setAttribute(D,"id",r),t.insert(c,t.createComponent(b.For,{get each(){return h()},children:y=>[(()=>{var k=Ue();return t.setAttribute(k,"class",y===100?"oq-fc-grid oq-fc-limit":"oq-fc-grid"),t.effect(C=>{var z=l(0),R=l(1),K=a(y),U=a(y);return z!==C.e&&t.setAttribute(k,"x1",C.e=z),R!==C.t&&t.setAttribute(k,"x2",C.t=R),K!==C.a&&t.setAttribute(k,"y1",C.a=K),U!==C.o&&t.setAttribute(k,"y2",C.o=U),C},{e:void 0,t:void 0,a:void 0,o:void 0}),k})(),(()=>{var k=Ve(),C=k.firstChild;return t.insert(k,y,C),t.effect(()=>t.setAttribute(k,"y",a(y)+2.5)),k})()]}),F),t.insert(c,t.createComponent(ne,{get d(){return w()},fill:`url(#${n})`}),F),t.insert(c,t.createComponent(b.Show,{get when(){return L()},children:y=>t.createComponent(ne,{get d(){return y()},fill:`url(#${r})`})}),F),t.insert(c,t.createComponent(ne,{get d(){return q()},stroke:Ke,width:1.7}),F),t.insert(c,t.createComponent(b.Show,{get when(){return E()},children:y=>t.createComponent(ne,{get d(){return y()},stroke:et,width:1.7})}),F),t.insert(c,t.createComponent(b.Show,{get when(){return t.memo(()=>e.forecast.elapsed>0)()&&e.forecast.elapsed<1},get children(){var y=He();return t.effect(k=>{var C=l(1),z=a(e.forecast.projected);return C!==k.e&&t.setAttribute(y,"cx",k.e=C),z!==k.t&&t.setAttribute(y,"cy",k.t=z),k},{e:void 0,t:void 0}),y}}),null),t.insert(c,t.createComponent(b.Show,{get when(){return B()},children:y=>(()=>{var k=Ze();return t.effect(C=>{var z=l(y()),R=a(100);return z!==C.e&&t.setAttribute(k,"cx",C.e=z),R!==C.t&&t.setAttribute(k,"cy",C.t=R),C},{e:void 0,t:void 0}),k})()}),null),t.effect(y=>{var k=l(e.forecast.elapsed),C=l(e.forecast.elapsed),z=l(e.forecast.elapsed),R=a(e.meter.percent);return k!==y.e&&t.setAttribute(F,"x1",y.e=k),C!==y.t&&t.setAttribute(F,"x2",y.t=C),z!==y.a&&t.setAttribute(Q,"cx",y.a=z),R!==y.o&&t.setAttribute(Q,"cy",y.o=R),y},{e:void 0,t:void 0,a:void 0,o:void 0}),c})()}function ne(e){return(()=>{var n=Je();return t.effect(r=>{var i=e.stroke?"oq-fc-line":"oq-fc-area",f=e.d,g=e.stroke,$=e.width,v=e.fill??"none";return i!==r.e&&t.setAttribute(n,"class",r.e=i),f!==r.t&&t.setAttribute(n,"d",r.t=f),g!==r.a&&t.setAttribute(n,"stroke",r.a=g),$!==r.o&&t.setAttribute(n,"stroke-width",r.o=$),v!==r.i&&t.setAttribute(n,"fill",r.i=v),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),n})()}function at(e){const n=()=>T(Math.round(e.meter.percent),0,100),r=()=>Ae(e.meter);return(()=>{var i=we(),f=i.firstChild,g=f.firstChild,$=g.nextSibling,v=f.nextSibling,A=v.firstChild,s=v.nextSibling;return t.insert(g,()=>e.name),t.insert($,(()=>{var l=t.memo(()=>!!e.meter.limited);return()=>l()?e.ctx.t("card.limited"):e.ctx.t("card.used",{percent:n()})})()),t.insert(s,()=>e.ctx.t("card.resets",{time:oe(e.ctx,e.meter.resetsAt,e.now())})),t.effect(l=>{var a=e.name,h=r(),q=r(),w=`${n()}%`,E=pe(e.ctx,e.meter.resetsAt);return a!==l.e&&t.setAttribute(g,"title",l.e=a),h!==l.t&&t.setAttribute($,"data-tone",l.t=h),q!==l.a&&t.setAttribute(A,"data-tone",l.a=q),w!==l.o&&t.setStyleProperty(A,"width",l.o=w),E!==l.i&&t.setAttribute(s,"title",l.i=E),l},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),i})()}function it(e){const n=()=>e.budget.limit>0?T(e.budget.spent/e.budget.limit*100,0,100):100,r=()=>ve(e.budget),i=()=>be(e.ctx,e.budget);return(()=>{var f=we(),g=f.firstChild,$=g.firstChild,v=$.nextSibling,A=g.nextSibling,s=A.firstChild,l=A.nextSibling;return t.insert($,i),t.insert(v,()=>e.ctx.t("card.budget.spent",{spent:ge(e.ctx,e.budget.spent),limit:ge(e.ctx,e.budget.limit)})),t.insert(l,()=>e.ctx.t("card.resets",{time:oe(e.ctx,e.budget.resetsAt,e.now())})),t.effect(a=>{var h=i(),q=r(),w=r(),E=`${n()}%`,L=pe(e.ctx,e.budget.resetsAt);return h!==a.e&&t.setAttribute($,"title",a.e=h),q!==a.t&&t.setAttribute(v,"data-tone",a.t=q),w!==a.a&&t.setAttribute(s,"data-tone",a.a=w),E!==a.o&&t.setStyleProperty(s,"width",a.o=E),L!==a.i&&t.setAttribute(l,"title",a.i=L),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),f})()}t.delegateEvents(["pointerdown","click"]);const lt={"card.title":"OpenCode Go","card.loading":"Loading quota…","card.error":"Could not read the quota: {{message}}","card.retry":"Try again","card.signedOut.title":"Not signed in","card.signedOut.body":"Sign in to an OpenCode Console workspace to see its quota.","card.noGo":"This workspace has no OpenCode Go plan.","card.go.rolling":"5 hours","card.go.weekly":"Week","card.go.monthly":"Month","card.used":"{{percent}}% used","card.limited":"Limit reached","card.resets":"Resets {{time}}","card.budgets":"Console budgets","card.budget.all":"All spend","card.budget.other":"Budget","card.budget.perModel":"per model","card.budget.spent":"{{spent}} of {{limit}}","card.updated":"Updated {{time}}","card.openDashboard":"Open dashboard","card.launcher":"Quota","card.launcher.open":"Open the quota window (drag to move)","card.forecast":"Forecast","card.forecast.show":"Show forecast","card.forecast.hide":"Hide forecast","card.forecast.hint":"At the current pace","card.forecast.usage":"Go usage","card.forecast.renews":"Renews {{date}}","card.forecast.onPace":"On pace for {{percent}}%","card.forecast.summary":"On pace for {{percent}}%","card.forecast.summaryRunOut":"Runs out {{time}}","card.forecast.projected":"{{percent}}% at reset","card.forecast.runsOut":"Runs out {{time}}","card.forecast.now":"Now","card.forecast.empty":"Not enough usage yet to project.","card.refresh":"Refresh quota","card.minimize":"Minimize quota window","command.toggle":"Quota: Show or hide the floating window","command.toggle.description":"OpenCode Go and Console quota in a draggable window","command.refresh":"Quota: Refresh now","command.reset":"Quota: Reset window position","titlebar.label":"Go {{percent}}%","titlebar.fallback":"Quota","titlebar.title":"Quota: {{text}}","toast.refreshed":"Quota refreshed","toast.error":"Could not refresh the quota"};function st(e){const n=e,r=n.experimental?.usage;if(typeof r?.limits=="function")return r.limits.bind(r);const i=n.usage;if(typeof i?.limits=="function")return i.limits.bind(i)}function ct(e){if(e instanceof Error)return e.message;if(typeof e=="object"&&e!==null&&"message"in e){const n=e.message;if(typeof n=="string")return n}return String(e)}function dt(e){const[n,r]=b.createSignal(void 0),[i,f]=b.createSignal(),[g,$]=b.createSignal(!1),[v,A]=b.createSignal();let s,l=0;const a=()=>{const q=e.sessions.current(),w=q?.server.builtin?q.directory:void 0;return w?{location:{directory:w}}:{}};async function h(){const q=++l;$(!0);try{const w=st(e.client);if(!w)throw new Error("This OpenCode build has no usage limits API");const E=await w(a(),{signal:e.signal});if(q!==l||e.signal.aborted)return;r(E.data),f(void 0),A(Date.now())}catch(w){if(q!==l||e.signal.aborted)return;f(ct(w))}finally{q===l&&$(!1)}}return{data:n,error:i,loading:g,updatedAt:v,refresh(q="auto"){return e.signal.aborted?Promise.resolve():s||(s=h().finally(()=>{s=void 0}),s)}}}const ut=`
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
`,ft=j.Schema.Struct({x:j.Schema.Number,y:j.Schema.Number,placed:j.Schema.Boolean,open:j.Schema.Boolean,collapsed:j.Schema.Boolean,forecast:j.Schema.Boolean,pillX:j.Schema.Number,pillY:j.Schema.Number,pillPlaced:j.Schema.Boolean,layout:j.Schema.Number});function mt(e){const n=Number(e);return Number.isFinite(n)?T(Math.round(n),15,3600):60}const gt=G.Plugin.define({i18n:{en:lt},stores:{dock:G.Store.global(ft,{x:0,y:0,placed:!1,open:!0,collapsed:!1,forecast:!1,pillX:0,pillY:0,pillPlaced:!1,layout:0})},setup(e){const n=dt(e),r=e.stores.dock;if(r.value.layout<3){const a=r.value.layout;r.update(h=>{h.layout=3,a<2&&(h.placed=!1,h.x=0,h.y=0),h.pillPlaced=!1,h.pillX=0,h.pillY=0})}const i=mt(e.options.refreshSeconds);let f=!1;const g=a=>{f||n.refresh(a)},$=()=>{document.visibilityState!=="hidden"&&g("auto")},v=()=>{document.visibilityState==="visible"&&g("auto")},A=setInterval($,i*1e3);document.addEventListener("visibilitychange",v),window.addEventListener("focus",v),g("initial");const s=()=>{e.stores.dock.update(a=>{a.open=!a.open})},l=async()=>{await n.refresh("manual");const a=n.error();a?e.toast.show({variant:"error",title:e.t("toast.error"),description:a}):e.toast.show({variant:"success",title:e.t("toast.refreshed")})};return e.add(G.Style,ut),e.add(G.Command,()=>({id:"toggle",title:e.t("command.toggle"),description:e.t("command.toggle.description"),keywords:"quota usage limits go budget",bind:"mod+shift+q",featured:!0,run:s})),e.add(G.Command,()=>({id:"refresh",title:e.t("command.refresh"),run:()=>{l()}})),e.add(G.Command,()=>({id:"reset",title:e.t("command.reset"),run:()=>{e.stores.dock.update(a=>{a.placed=!1,a.x=0,a.y=0,a.open=!0,a.collapsed=!1})}})),e.add(G.TitlebarItem,()=>{const a=n.data();if(!a)return;const h=[];if(a.go)for(const w of re)h.push(`${e.t(`card.go.${w}`)} ${Math.round(a.go[w].percent)}%`);for(const w of a.budgets){const E=w.limit>0?Math.round(w.spent/w.limit*100):100;h.push(`${be(e,w)} ${E}%`)}const q=Me(a);return{id:"quota",label:q===void 0?e.t("titlebar.fallback"):e.t("titlebar.label",{percent:q}),title:e.t("titlebar.title",{text:h.join(" · ")}),icon:he(a)==="danger"?"warning":"window-analytics",run:s}}),e.add(G.Slot,{at:"window.bottom",order:100,render:()=>t.createComponent(tt,{ctx:e,quota:n,get dock(){return e.stores.dock}})}),()=>{f=!0,clearInterval(A),document.removeEventListener("visibilitychange",v),window.removeEventListener("focus",v)}}});exports.default=gt;
