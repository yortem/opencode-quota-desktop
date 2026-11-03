"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("solid-js/web"),R=require("@opencode/plugin/gui"),I=require("effect"),q=require("solid-js"),Y=["rolling","weekly","monthly"];function G(e,r,n){return Math.min(n,Math.max(r,e))}function ie(e){return e.limited||e.percent>=100?"danger":e.percent>=75?"warn":"ok"}function te(e){return e.limit<=0?"ok":e.spent>=e.limit?"danger":e.spent/e.limit>=.75?"warn":"ok"}function re(e){if(!e)return"ok";let r="ok";if(e.go)for(const n of Y){const i=e.go[n];if(i.limited||i.percent>=100)return"danger";i.percent>=75&&(r="warn")}for(const n of e.budgets){const i=te(n);if(i==="danger")return"danger";i==="warn"&&(r="warn")}return r}function se(e){if(e.go)return Math.round(Math.max(...Y.map(r=>e.go[r].percent)))}function W(e){return e.locale.locale()||"en"}function V(e,r,n){const i=new Intl.RelativeTimeFormat(W(e),{numeric:"auto",style:"short"}),d=Math.round((r-n)/6e4);if(Math.abs(d)<90)return i.format(d,"minute");const u=Math.round(d/60);return Math.abs(u)<36?i.format(u,"hour"):i.format(Math.round(u/24),"day")}function oe(e,r){return new Intl.DateTimeFormat(W(e),{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(r)}function ce(e,r){return new Intl.DateTimeFormat(W(e),{timeStyle:"short"}).format(r)}function J(e,r,n){return new Intl.DateTimeFormat(W(e),{month:"short",day:"numeric"}).format(r)}function K(e,r){return new Intl.NumberFormat(W(e),{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:2}).format(r)}function ne(e,r){let n;if(r.coverage==="all")n=e.t("card.budget.all");else if(r.models.length>0){const i=r.models.map(d=>d.name);n=i.length>2?`${i.slice(0,2).join(", ")} +${i.length-2}`:i.join(", ")}else r.vendors.length>0?n=r.vendors.join(", "):n=e.t("card.budget.other");return r.per==="model"?`${n} (${e.t("card.budget.perModel")})`:n}const le={rolling:300*60*1e3,weekly:10080*60*1e3,monthly:720*60*60*1e3};function de(e,r,n){const i=le[r],d=e.resetsAt-i,u=Math.max(0,e.resetsAt-n),k=Math.min(i,Math.max(0,n-d)),m=i>0?k/i:0,A=e.resetsAt<=n,c=Math.max(0,e.percent);if(c<=0||m<=.005||A)return{start:d,elapsed:A?1:m,projected:c,remaining:u,stale:A};const s=Math.min(999,c/m),o=s>100?n+(100-c)/(c/k):void 0;return{start:d,elapsed:m,projected:s,runsOutAt:o!==void 0&&o<e.resetsAt?o:void 0,remaining:u,stale:A}}function ue(e,r){return r.limited||e.runsOutAt!==void 0||e.projected>=100?"danger":e.projected>=75?"warn":"ok"}var fe=t.template("<div class=oq-floating><header class=oq-head><span class=oq-dot></span><span class=oq-name></span><span class=oq-spacer></span></header><div class=oq-body>"),me=t.template("<span class=oq-launcher-value>%"),ge=t.template('<button type=button class="oq-launcher oq-launcher-dock"><span class=oq-dot></span><span>'),ve=t.template("<span class=oq-ws>"),he=t.template('<div class="oq-state oq-inline"><span>'),pe=t.template("<div class=oq-state><span class=oq-state-title></span><span>"),be=t.template("<div class=oq-error-row><span class=oq-error>"),we=t.template("<footer class=oq-foot><span class=oq-updated>"),xe=t.template("<div class=oq-meters>"),qe=t.template("<div class=oq-section><div class=oq-section-title>"),ye=t.template("<div class=oq-state>"),ke=t.template("<button type=button class=oq-fc-toggle><span class=oq-fc-toggle-label></span><span class=oq-fc-toggle-summary>"),$e=t.template("<div class=oq-fc-wrap><div class=oq-fc-inner><div class=oq-fc-panel><div class=oq-fc-hero><span class=oq-fc-percent>%</span><span class=oq-fc-pace></span></div><div class=oq-fc-caption><span class=oq-fc-sep>·</span></div><div class=oq-fc-axis>"),Ce=t.template("<span>"),Se=t.template("<svg><circle r=2.6 fill=#f5c451></svg>",!1,!0,!1),Ae=t.template('<svg class=oq-fc-chart viewBox="0 0 296 116"role=img><defs><linearGradient x1=0 y1=0 x2=0 y2=1><stop offset=0% stop-color=#22c55e stop-opacity=0.26></stop><stop offset=100% stop-color=#22c55e stop-opacity=0></stop></linearGradient><pattern width=7 height=7 patternUnits=userSpaceOnUse patternTransform=rotate(45)><line x1=0 y1=0 x2=0 y2=7 stroke=#f5c451 stroke-width=1.3 stroke-opacity=0.32></line></pattern></defs><line class=oq-fc-nowline y1=6 y2=112></line><circle class=oq-fc-dot r=3 fill=#22c55e>'),_e=t.template("<svg><line></svg>",!1,!0,!1),Me=t.template("<svg><text class=oq-fc-axis-label x=26 text-anchor=end>%</svg>",!1,!0,!1),Oe=t.template("<svg><circle r=2.8 fill=#f5c451></svg>",!1,!0,!1),Le=t.template("<svg><path></svg>",!1,!0,!1),ae=t.template("<div class=oq-meter><div class=oq-meter-head><span class=oq-meter-name></span><span class=oq-meter-value></span></div><div class=oq-track><div class=oq-fill></div></div><div class=oq-reset>");const ze="#22c55e",Ee="#f5c451";function ee(){const r=document.querySelector('header[data-slot="titlebar-v2"]')?.getBoundingClientRect().bottom;return Math.max(4,(r??44)+6)}function je(e){const r=e.ctx,[n,i]=q.createSignal(),[d,u]=q.createSignal(),[k,m]=q.createSignal(0),[A,c]=q.createSignal(Date.now()),s=setInterval(()=>c(Date.now()),3e4);q.onCleanup(()=>clearInterval(s));let o;const $=()=>e.dock.value.open,f=()=>e.quota.data(),g=()=>{const a=f();return a?re(a):e.quota.error()&&a===void 0?"danger":"ok"},_=()=>f()?.go?.monthly.percent,j=()=>d()!==void 0||e.dock.value.placed,P=()=>{const a=d();if(a)return{left:`${a.x}px`,top:`${a.y}px`};if(e.dock.value.placed)return{left:`${e.dock.value.x}px`,top:`${e.dock.value.y+k()}px`}},l=()=>{e.dock.update(a=>{a.forecast=!a.forecast})},S=()=>{const a=n()?.getBoundingClientRect(),b=e.dock.value.placed;e.dock.update(C=>{C.open=!1,b&&a&&(C.x=a.left,C.y=a.top)}),m(0),u(void 0)},T=a=>{const b=a.replace(/\/overview\/?$/,"");try{const C=new URL(b),h=C.hostname.toLowerCase();if(C.protocol!=="https:"||h!=="opencode.ai"&&!h.endsWith(".opencode.ai"))return;r.system.openExternal(C.toString())}catch{}},[B,Q]=q.createSignal(!1),z=a=>{if(!B()||!o)return;const b=n()?.getBoundingClientRect(),C=b?.width??320,h=b?.height??220,L=ee(),F=G(o.x+a.clientX-o.px,4,Math.max(4,window.innerWidth-C-4)),x=G(o.y+a.clientY-o.py,L,Math.max(L,window.innerHeight-h-4));u({x:F,y:x})},E=()=>{if(!B())return;Q(!1),o=void 0,window.removeEventListener("pointermove",z),window.removeEventListener("pointerup",E),window.removeEventListener("pointercancel",E),window.removeEventListener("blur",E);const a=d();a&&(e.dock.update(b=>{b.x=a.x,b.y=a.y,b.placed=!0}),u(void 0))},w=a=>{if(a.button!==0)return;const b=a.target;if(b instanceof Element&&b.closest("button, a, input, textarea, select"))return;const C=n()?.getBoundingClientRect();if(C){if(k()!==0){const h=e.dock.value.y+k();e.dock.update(L=>{L.y=h}),m(0)}o={px:a.clientX,py:a.clientY,x:C.left,y:C.top},u({x:C.left,y:C.top}),Q(!0),window.addEventListener("pointermove",z),window.addEventListener("pointerup",E),window.addEventListener("pointercancel",E),window.addEventListener("blur",E),a.preventDefault()}};q.onCleanup(()=>{window.removeEventListener("pointermove",z),window.removeEventListener("pointerup",E),window.removeEventListener("pointercancel",E),window.removeEventListener("blur",E)});let v=0;const p=()=>{const a=n()?.getBoundingClientRect();if(!a)return;const b=a.height;if(!e.dock.value.placed){m(0),v=b;return}const C=4,h=ee(),L=Math.max(h,window.innerHeight-C-b),F=a.top,x=e.dock.value.y>window.innerHeight*.35,y=v===0||!x?F:F+(v-b),O=G(y,h,L);m(O-e.dock.value.y),v=b;const N=G(e.dock.value.x,C,Math.max(C,window.innerWidth-a.width-C));N!==e.dock.value.x&&e.dock.update(X=>{X.x=N})};let M;const D=a=>{i(a),M?.disconnect(),M=void 0,a&&(v=0,m(0),M=new ResizeObserver(()=>p()),M.observe(a),p())};q.onMount(()=>{window.addEventListener("resize",p),q.onCleanup(()=>{window.removeEventListener("resize",p),M?.disconnect()})});const H=()=>{const a=e.quota.updatedAt();return a?r.t("card.updated",{time:ce(r,a)}):""};return[t.createComponent(q.Show,{get when(){return $()},get children(){var a=fe(),b=a.firstChild,C=b.firstChild,h=C.nextSibling,L=h.nextSibling,F=b.nextSibling;return t.use(D,a),b.$$pointerdown=w,t.insert(h,()=>r.t("card.title")),t.insert(b,t.createComponent(q.Show,{get when(){return f()?.workspace.name},children:x=>(()=>{var y=ve();return t.insert(y,x),t.effect(()=>t.setAttribute(y,"title",x())),y})()}),L),t.insert(b,t.createComponent(r.ui.IconButton,{icon:"refresh",get label(){return r.t("card.refresh")},size:"small",variant:"ghost",get busy(){return e.quota.loading()},onClick:()=>{e.quota.refresh("manual")}}),null),t.insert(b,t.createComponent(r.ui.IconButton,{icon:"minus",get label(){return r.t("card.minimize")},size:"small",variant:"ghost",onClick:S}),null),t.insert(F,(()=>{var x=t.memo(()=>f()===void 0);return()=>x()?(()=>{var y=he(),O=y.firstChild;return t.insert(y,t.createComponent(r.ui.Loader,{size:"small"}),O),t.insert(O,()=>r.t("card.loading")),y})():t.memo(()=>f()===null)()?(()=>{var y=pe(),O=y.firstChild,N=O.nextSibling;return t.insert(O,()=>r.t("card.signedOut.title")),t.insert(N,()=>r.t("card.signedOut.body")),y})():t.createComponent(Te,{ctx:r,get info(){return f()},now:A,get forecastOpen(){return e.dock.value.forecast},toggleForecast:l})})(),null),t.insert(F,t.createComponent(q.Show,{get when(){return e.quota.error()},children:x=>(()=>{var y=be(),O=y.firstChild;return t.insert(O,()=>r.t("card.error",{message:x()})),t.insert(y,t.createComponent(r.ui.Button,{variant:"ghost",size:"small",onClick:()=>{e.quota.refresh("manual")},get children(){return r.t("card.retry")}}),null),y})()}),null),t.insert(a,t.createComponent(q.Show,{get when(){return f()},children:x=>(()=>{var y=we(),O=y.firstChild;return t.insert(O,H),t.insert(y,t.createComponent(r.ui.Button,{variant:"ghost",size:"small",onClick:()=>T(x().workspace.usageURL),get children(){return r.t("card.openDashboard")}}),null),y})()}),null),t.effect(x=>{var y=!j(),O=r.appearance.mode(),N=r.locale.direction(),X=P(),Z=g();return y!==x.e&&a.classList.toggle("oq-dock",x.e=y),O!==x.t&&t.setAttribute(a,"data-mode",x.t=O),N!==x.a&&t.setAttribute(a,"dir",x.a=N),x.o=t.style(a,X,x.o),Z!==x.i&&t.setAttribute(C,"data-tone",x.i=Z),x},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),a}}),t.createComponent(q.Show,{get when(){return!$()},get children(){var a=ge(),b=a.firstChild,C=b.nextSibling;return a.$$click=()=>{e.dock.update(h=>{h.open=!0})},t.insert(C,()=>r.t("card.launcher")),t.insert(a,t.createComponent(q.Show,{get when(){return _()!==void 0},get children(){var h=me(),L=h.firstChild;return t.insert(h,()=>Math.round(_()),L),h}}),null),t.effect(h=>{var L=r.appearance.mode(),F=r.locale.direction(),x=r.t("card.launcher.open"),y=r.t("card.launcher.open"),O=g();return L!==h.e&&t.setAttribute(a,"data-mode",h.e=L),F!==h.t&&t.setAttribute(a,"dir",h.t=F),x!==h.a&&t.setAttribute(a,"aria-label",h.a=x),y!==h.o&&t.setAttribute(a,"title",h.o=y),O!==h.i&&t.setAttribute(b,"data-tone",h.i=O),h},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),a}})]}function Te(e){const r=e.info.go,n=e.info.budgets;return[r?[(()=>{var i=xe();return t.insert(i,t.createComponent(q.For,{each:Y,children:d=>t.createComponent(Re,{get ctx(){return e.ctx},get name(){return e.ctx.t(`card.go.${d}`)},get meter(){return r[d]},get now(){return e.now}})})),i})(),t.createComponent(De,{get ctx(){return e.ctx},go:r,get now(){return e.now},get open(){return e.forecastOpen},get toggle(){return e.toggleForecast}})]:null,t.memo(()=>t.memo(()=>n.length>0)()?(()=>{var i=qe(),d=i.firstChild;return t.insert(d,()=>e.ctx.t("card.budgets")),t.insert(i,t.createComponent(q.For,{each:n,children:u=>t.createComponent(Ie,{get ctx(){return e.ctx},budget:u,get now(){return e.now}})}),null),i})():null),t.memo(()=>t.memo(()=>!r&&n.length===0)()?(()=>{var i=ye();return t.insert(i,()=>e.ctx.t("card.noGo")),i})():null)]}function De(e){const r=e.ctx,n=()=>e.go.monthly,i=()=>de(n(),"monthly",e.now()),d=()=>ue(i(),n()),u=()=>J(r,n().resetsAt),k=()=>{const c=i();return n().limited||n().percent>=100?r.t("card.limited"):c.stale||n().percent<=0?r.t("card.forecast.empty"):c.runsOutAt!==void 0?r.t("card.forecast.runsOut",{time:V(r,c.runsOutAt,e.now())}):r.t("card.forecast.onPace",{percent:Math.round(c.projected)})},m=()=>{const c=i();return n().limited||n().percent>=100?r.t("card.limited"):c.stale||n().percent<=0?r.t("card.forecast.empty"):c.runsOutAt!==void 0?r.t("card.forecast.summaryRunOut",{time:V(r,c.runsOutAt,e.now())}):r.t("card.forecast.summary",{percent:Math.round(c.projected)})},A=()=>{const c=i().start,s=n().resetsAt;return[0,1,2,3].map(o=>c+(s-c)*o/3)};return[(()=>{var c=ke(),s=c.firstChild,o=s.nextSibling;return t.addEventListener(c,"click",e.toggle,!0),t.insert(s,()=>r.t("card.forecast")),t.insert(o,m),t.insert(c,t.createComponent(r.ui.Icon,{name:"chevron-down",size:"small",class:"oq-fc-chevron",get"data-open"(){return e.open?"true":"false"}}),null),t.effect($=>{var f=e.open,g=r.t(e.open?"card.forecast.hide":"card.forecast.show");return f!==$.e&&t.setAttribute(c,"aria-expanded",$.e=f),g!==$.t&&t.setAttribute(c,"aria-label",$.t=g),$},{e:void 0,t:void 0}),c})(),(()=>{var c=$e(),s=c.firstChild,o=s.firstChild,$=o.firstChild,f=$.firstChild,g=f.firstChild,_=f.nextSibling,j=$.nextSibling,P=j.firstChild,l=j.nextSibling;return t.insert(f,()=>Math.round(n().percent),g),t.insert(_,k),t.insert(j,()=>r.t("card.forecast.usage"),P),t.insert(j,()=>r.t("card.forecast.renews",{date:u()}),null),t.insert(o,t.createComponent(Fe,{get meter(){return n()},get forecast(){return i()}}),l),t.insert(l,t.createComponent(q.For,{get each(){return A()},children:S=>(()=>{var T=Ce();return t.insert(T,()=>J(r,S)),T})()})),t.effect(S=>{var T=e.open?"true":"false",B=d();return T!==S.e&&t.setAttribute(c,"data-open",S.e=T),B!==S.t&&t.setAttribute(_,"data-tone",S.t=B),S},{e:void 0,t:void 0}),c})()]}function Fe(e){const r=`oq-fc-fill-${Math.random().toString(36).slice(2,9)}`,n=`oq-fc-hatch-${Math.random().toString(36).slice(2,9)}`,i=296,d=116,u=32,k=4,m=6,A=4,c=()=>{const l=Math.max(e.meter.percent,e.forecast.projected);return Math.max(150,Math.ceil(l/50)*50)},s=l=>u+l*(i-u-k),o=l=>{const S=c();return m+(1-Math.min(Math.max(l,0),S)/S)*(d-m-A)},$=()=>{const l=[];for(let S=0;S<=c();S+=50)l.push(S);return l},f=()=>`M${s(0)},${o(0)}L${s(e.forecast.elapsed)},${o(e.meter.percent)}`,g=()=>`${f()}L${s(e.forecast.elapsed)},${o(0)}Z`,_=()=>{const l=e.forecast;if(!(l.elapsed<=0||l.elapsed>=1))return`M${s(l.elapsed)},${o(e.meter.percent)}L${s(1)},${o(l.projected)}`},j=()=>{const l=e.forecast;if(!(l.elapsed<=0||l.elapsed>=1))return`M${s(l.elapsed)},${o(e.meter.percent)}L${s(1)},${o(l.projected)}L${s(1)},${o(0)}L${s(l.elapsed)},${o(0)}Z`},P=()=>{const l=e.forecast;if(l.projected<=100||e.meter.percent>=100)return;const S=l.elapsed+(100-e.meter.percent)*(1-l.elapsed)/(l.projected-e.meter.percent);return S>l.elapsed&&S<=1?S:void 0};return(()=>{var l=Ae(),S=l.firstChild,T=S.firstChild,B=T.firstChild;B.nextSibling;var Q=T.nextSibling;Q.firstChild;var z=S.nextSibling,E=z.nextSibling;return t.setAttribute(T,"id",r),t.setAttribute(Q,"id",n),t.insert(l,t.createComponent(q.For,{get each(){return $()},children:w=>[(()=>{var v=_e();return t.setAttribute(v,"class",w===100?"oq-fc-grid oq-fc-limit":"oq-fc-grid"),t.effect(p=>{var M=s(0),D=s(1),H=o(w),a=o(w);return M!==p.e&&t.setAttribute(v,"x1",p.e=M),D!==p.t&&t.setAttribute(v,"x2",p.t=D),H!==p.a&&t.setAttribute(v,"y1",p.a=H),a!==p.o&&t.setAttribute(v,"y2",p.o=a),p},{e:void 0,t:void 0,a:void 0,o:void 0}),v})(),(()=>{var v=Me(),p=v.firstChild;return t.insert(v,w,p),t.effect(()=>t.setAttribute(v,"y",o(w)+2.5)),v})()]}),z),t.insert(l,t.createComponent(U,{get d(){return g()},fill:`url(#${r})`}),z),t.insert(l,t.createComponent(q.Show,{get when(){return j()},children:w=>t.createComponent(U,{get d(){return w()},fill:`url(#${n})`})}),z),t.insert(l,t.createComponent(U,{get d(){return f()},stroke:ze,width:1.7}),z),t.insert(l,t.createComponent(q.Show,{get when(){return _()},children:w=>t.createComponent(U,{get d(){return w()},stroke:Ee,width:1.7})}),z),t.insert(l,t.createComponent(q.Show,{get when(){return t.memo(()=>e.forecast.elapsed>0)()&&e.forecast.elapsed<1},get children(){var w=Se();return t.effect(v=>{var p=s(1),M=o(e.forecast.projected);return p!==v.e&&t.setAttribute(w,"cx",v.e=p),M!==v.t&&t.setAttribute(w,"cy",v.t=M),v},{e:void 0,t:void 0}),w}}),null),t.insert(l,t.createComponent(q.Show,{get when(){return P()},children:w=>(()=>{var v=Oe();return t.effect(p=>{var M=s(w()),D=o(100);return M!==p.e&&t.setAttribute(v,"cx",p.e=M),D!==p.t&&t.setAttribute(v,"cy",p.t=D),p},{e:void 0,t:void 0}),v})()}),null),t.effect(w=>{var v=s(e.forecast.elapsed),p=s(e.forecast.elapsed),M=s(e.forecast.elapsed),D=o(e.meter.percent);return v!==w.e&&t.setAttribute(z,"x1",w.e=v),p!==w.t&&t.setAttribute(z,"x2",w.t=p),M!==w.a&&t.setAttribute(E,"cx",w.a=M),D!==w.o&&t.setAttribute(E,"cy",w.o=D),w},{e:void 0,t:void 0,a:void 0,o:void 0}),l})()}function U(e){return(()=>{var r=Le();return t.effect(n=>{var i=e.stroke?"oq-fc-line":"oq-fc-area",d=e.d,u=e.stroke,k=e.width,m=e.fill??"none";return i!==n.e&&t.setAttribute(r,"class",n.e=i),d!==n.t&&t.setAttribute(r,"d",n.t=d),u!==n.a&&t.setAttribute(r,"stroke",n.a=u),k!==n.o&&t.setAttribute(r,"stroke-width",n.o=k),m!==n.i&&t.setAttribute(r,"fill",n.i=m),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),r})()}function Re(e){const r=()=>G(Math.round(e.meter.percent),0,100),n=()=>ie(e.meter);return(()=>{var i=ae(),d=i.firstChild,u=d.firstChild,k=u.nextSibling,m=d.nextSibling,A=m.firstChild,c=m.nextSibling;return t.insert(u,()=>e.name),t.insert(k,(()=>{var s=t.memo(()=>!!e.meter.limited);return()=>s()?e.ctx.t("card.limited"):e.ctx.t("card.used",{percent:r()})})()),t.insert(c,()=>e.ctx.t("card.resets",{time:V(e.ctx,e.meter.resetsAt,e.now())})),t.effect(s=>{var o=e.name,$=n(),f=n(),g=`${r()}%`,_=oe(e.ctx,e.meter.resetsAt);return o!==s.e&&t.setAttribute(u,"title",s.e=o),$!==s.t&&t.setAttribute(k,"data-tone",s.t=$),f!==s.a&&t.setAttribute(A,"data-tone",s.a=f),g!==s.o&&t.setStyleProperty(A,"width",s.o=g),_!==s.i&&t.setAttribute(c,"title",s.i=_),s},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),i})()}function Ie(e){const r=()=>e.budget.limit>0?G(e.budget.spent/e.budget.limit*100,0,100):100,n=()=>te(e.budget),i=()=>ne(e.ctx,e.budget);return(()=>{var d=ae(),u=d.firstChild,k=u.firstChild,m=k.nextSibling,A=u.nextSibling,c=A.firstChild,s=A.nextSibling;return t.insert(k,i),t.insert(m,()=>e.ctx.t("card.budget.spent",{spent:K(e.ctx,e.budget.spent),limit:K(e.ctx,e.budget.limit)})),t.insert(s,()=>e.ctx.t("card.resets",{time:V(e.ctx,e.budget.resetsAt,e.now())})),t.effect(o=>{var $=i(),f=n(),g=n(),_=`${r()}%`,j=oe(e.ctx,e.budget.resetsAt);return $!==o.e&&t.setAttribute(k,"title",o.e=$),f!==o.t&&t.setAttribute(m,"data-tone",o.t=f),g!==o.a&&t.setAttribute(c,"data-tone",o.a=g),_!==o.o&&t.setStyleProperty(c,"width",o.o=_),j!==o.i&&t.setAttribute(s,"title",o.i=j),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),d})()}t.delegateEvents(["pointerdown","click"]);const Be={"card.title":"OpenCode Go","card.loading":"Loading quota…","card.error":"Could not read the quota: {{message}}","card.retry":"Try again","card.signedOut.title":"Not signed in","card.signedOut.body":"Sign in to an OpenCode Console workspace to see its quota.","card.noGo":"This workspace has no OpenCode Go plan.","card.go.rolling":"5 hours","card.go.weekly":"Week","card.go.monthly":"Month","card.used":"{{percent}}% used","card.limited":"Limit reached","card.resets":"Resets {{time}}","card.budgets":"Console budgets","card.budget.all":"All spend","card.budget.other":"Budget","card.budget.perModel":"per model","card.budget.spent":"{{spent}} of {{limit}}","card.updated":"Updated {{time}}","card.openDashboard":"Open dashboard","card.launcher":"Quota","card.launcher.open":"Show the quota window","card.forecast":"Forecast","card.forecast.show":"Show forecast","card.forecast.hide":"Hide forecast","card.forecast.hint":"At the current pace","card.forecast.usage":"Go usage","card.forecast.renews":"Renews {{date}}","card.forecast.onPace":"On pace for {{percent}}%","card.forecast.summary":"On pace for {{percent}}%","card.forecast.summaryRunOut":"Runs out {{time}}","card.forecast.projected":"{{percent}}% at reset","card.forecast.runsOut":"Runs out {{time}}","card.forecast.now":"Now","card.forecast.empty":"Not enough usage yet to project.","card.refresh":"Refresh quota","card.minimize":"Minimize quota window","command.toggle":"Quota: Show or hide the floating window","command.toggle.description":"OpenCode Go and Console quota in a draggable window","command.refresh":"Quota: Refresh now","command.reset":"Quota: Reset window position","titlebar.label":"Go {{percent}}%","titlebar.fallback":"Quota","titlebar.title":"Quota: {{text}}","toast.refreshed":"Quota refreshed","toast.error":"Could not refresh the quota"};function Ne(e){const r=e,n=r.experimental?.usage;if(typeof n?.limits=="function")return n.limits.bind(n);const i=r.usage;if(typeof i?.limits=="function")return i.limits.bind(i)}function Ge(e){if(e instanceof Error)return e.message;if(typeof e=="object"&&e!==null&&"message"in e){const r=e.message;if(typeof r=="string")return r}return String(e)}function Pe(e){const[r,n]=q.createSignal(void 0),[i,d]=q.createSignal(),[u,k]=q.createSignal(!1),[m,A]=q.createSignal();let c,s=0;const o=()=>{const f=e.sessions.current(),g=f?.server.builtin?f.directory:void 0;return g?{location:{directory:g}}:{}};async function $(){const f=++s;k(!0);try{const g=Ne(e.client);if(!g)throw new Error("This OpenCode build has no usage limits API");const _=await g(o(),{signal:e.signal});if(f!==s||e.signal.aborted)return;n(_.data),d(void 0),A(Date.now())}catch(g){if(f!==s||e.signal.aborted)return;d(Ge(g))}finally{f===s&&k(!1)}}return{data:r,error:i,loading:u,updatedAt:m,refresh(f="auto"){return e.signal.aborted?Promise.resolve():c||(c=$().finally(()=>{c=void 0}),c)}}}const Qe=`
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
  cursor: pointer;
  pointer-events: auto;
  -webkit-app-region: no-drag;
  app-region: no-drag;
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
`,We=I.Schema.Struct({x:I.Schema.Number,y:I.Schema.Number,placed:I.Schema.Boolean,open:I.Schema.Boolean,collapsed:I.Schema.Boolean,forecast:I.Schema.Boolean,layout:I.Schema.Number});function He(e){const r=Number(e);return Number.isFinite(r)?G(Math.round(r),15,3600):60}const Ue=R.Plugin.define({i18n:{en:Be},stores:{dock:R.Store.global(We,{x:0,y:0,placed:!1,open:!0,collapsed:!1,forecast:!1,layout:0})},setup(e){const r=Pe(e),n=e.stores.dock;n.value.layout<2&&n.update(o=>{o.layout=2,o.placed=!1,o.x=0,o.y=0});const i=He(e.options.refreshSeconds);let d=!1;const u=o=>{d||r.refresh(o)},k=()=>{document.visibilityState!=="hidden"&&u("auto")},m=()=>{document.visibilityState==="visible"&&u("auto")},A=setInterval(k,i*1e3);document.addEventListener("visibilitychange",m),window.addEventListener("focus",m),u("initial");const c=()=>{e.stores.dock.update(o=>{o.open=!o.open})},s=async()=>{await r.refresh("manual");const o=r.error();o?e.toast.show({variant:"error",title:e.t("toast.error"),description:o}):e.toast.show({variant:"success",title:e.t("toast.refreshed")})};return e.add(R.Style,Qe),e.add(R.Command,()=>({id:"toggle",title:e.t("command.toggle"),description:e.t("command.toggle.description"),keywords:"quota usage limits go budget",bind:"mod+shift+q",featured:!0,run:c})),e.add(R.Command,()=>({id:"refresh",title:e.t("command.refresh"),run:()=>{s()}})),e.add(R.Command,()=>({id:"reset",title:e.t("command.reset"),run:()=>{e.stores.dock.update(o=>{o.placed=!1,o.x=0,o.y=0,o.open=!0,o.collapsed=!1})}})),e.add(R.TitlebarItem,()=>{const o=r.data();if(!o)return;const $=[];if(o.go)for(const g of Y)$.push(`${e.t(`card.go.${g}`)} ${Math.round(o.go[g].percent)}%`);for(const g of o.budgets){const _=g.limit>0?Math.round(g.spent/g.limit*100):100;$.push(`${ne(e,g)} ${_}%`)}const f=se(o);return{id:"quota",label:f===void 0?e.t("titlebar.fallback"):e.t("titlebar.label",{percent:f}),title:e.t("titlebar.title",{text:$.join(" · ")}),icon:re(o)==="danger"?"warning":"window-analytics",run:c}}),e.add(R.Slot,{at:"window.bottom",order:100,render:()=>t.createComponent(je,{ctx:e,quota:r,get dock(){return e.stores.dock}})}),()=>{d=!0,clearInterval(A),document.removeEventListener("visibilitychange",m),window.removeEventListener("focus",m)}}});exports.default=Ue;
