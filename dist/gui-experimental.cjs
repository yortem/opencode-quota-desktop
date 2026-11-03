"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("solid-js/web"),B=require("@opencode/plugin/gui"),R=require("effect"),w=require("solid-js"),J=["rolling","weekly","monthly"];function G(e,o,n){return Math.min(n,Math.max(o,e))}function ge(e){return e.limited||e.percent>=100?"danger":e.percent>=75?"warn":"ok"}function ae(e){return e.limit<=0?"ok":e.spent>=e.limit?"danger":e.spent/e.limit>=.75?"warn":"ok"}function ie(e){if(!e)return"ok";let o="ok";if(e.go)for(const n of J){const i=e.go[n];if(i.limited||i.percent>=100)return"danger";i.percent>=75&&(o="warn")}for(const n of e.budgets){const i=ae(n);if(i==="danger")return"danger";i==="warn"&&(o="warn")}return o}function se(e){if(e.go)return Math.round(Math.max(...J.map(o=>e.go[o].percent)))}function W(e){return e.locale.locale()||"en"}function Z(e,o,n){const i=new Intl.RelativeTimeFormat(W(e),{numeric:"auto",style:"short"}),d=Math.round((o-n)/6e4);if(Math.abs(d)<90)return i.format(d,"minute");const g=Math.round(d/60);return Math.abs(g)<36?i.format(g,"hour"):i.format(Math.round(g/24),"day")}function le(e,o){return new Intl.DateTimeFormat(W(e),{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(o)}function me(e,o){return new Intl.DateTimeFormat(W(e),{timeStyle:"short"}).format(o)}function oe(e,o,n){return new Intl.DateTimeFormat(W(e),{month:"short",day:"numeric"}).format(o)}function re(e,o){return new Intl.NumberFormat(W(e),{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:2}).format(o)}function ce(e,o){let n;if(o.coverage==="all")n=e.t("card.budget.all");else if(o.models.length>0){const i=o.models.map(d=>d.name);n=i.length>2?`${i.slice(0,2).join(", ")} +${i.length-2}`:i.join(", ")}else o.vendors.length>0?n=o.vendors.join(", "):n=e.t("card.budget.other");return o.per==="model"?`${n} (${e.t("card.budget.perModel")})`:n}const ve={rolling:300*60*1e3,weekly:10080*60*1e3,monthly:720*60*60*1e3};function he(e,o,n){const i=ve[o],d=e.resetsAt-i,g=Math.max(0,e.resetsAt-n),x=Math.min(i,Math.max(0,n-d)),v=i>0?x/i:0,S=e.resetsAt<=n,l=Math.max(0,e.percent);if(l<=0||v<=.005||S)return{start:d,elapsed:S?1:v,projected:l,remaining:g,stale:S};const s=Math.min(999,l/v),r=s>100?n+(100-l)/(l/x):void 0;return{start:d,elapsed:v,projected:s,runsOutAt:r!==void 0&&r<e.resetsAt?r:void 0,remaining:g,stale:S}}function pe(e,o){return o.limited||e.runsOutAt!==void 0||e.projected>=100?"danger":e.projected>=75?"warn":"ok"}var be=t.template("<div class=oq-floating><header class=oq-head><span class=oq-dot></span><span class=oq-name></span><span class=oq-spacer></span></header><div class=oq-fold><div class=oq-fold-inner><div class=oq-body>"),we=t.template("<span class=oq-launcher-value>%"),xe=t.template("<button type=button class=oq-launcher><span class=oq-dot></span><span>"),qe=t.template("<span class=oq-ws>"),ye=t.template('<div class="oq-state oq-inline"><span>'),ke=t.template("<div class=oq-state><span class=oq-state-title></span><span>"),$e=t.template("<div class=oq-error-row><span class=oq-error>"),Ce=t.template("<footer class=oq-foot><span class=oq-updated>"),Se=t.template("<div class=oq-meters>"),Ae=t.template("<div class=oq-section><div class=oq-section-title>"),_e=t.template("<div class=oq-state>"),Me=t.template("<button type=button class=oq-fc-toggle><span class=oq-fc-toggle-label></span><span class=oq-fc-toggle-summary>"),Oe=t.template("<div class=oq-fc-wrap><div class=oq-fc-inner><div class=oq-fc-panel><div class=oq-fc-hero><span class=oq-fc-percent>%</span><span class=oq-fc-pace></span></div><div class=oq-fc-caption><span class=oq-fc-sep>·</span></div><div class=oq-fc-axis>"),Le=t.template("<span>"),ze=t.template("<svg><circle r=2.6 fill=#f5c451></svg>",!1,!0,!1),Ee=t.template('<svg class=oq-fc-chart viewBox="0 0 296 116"role=img><defs><linearGradient x1=0 y1=0 x2=0 y2=1><stop offset=0% stop-color=#22c55e stop-opacity=0.26></stop><stop offset=100% stop-color=#22c55e stop-opacity=0></stop></linearGradient><pattern width=7 height=7 patternUnits=userSpaceOnUse patternTransform=rotate(45)><line x1=0 y1=0 x2=0 y2=7 stroke=#f5c451 stroke-width=1.3 stroke-opacity=0.32></line></pattern></defs><line class=oq-fc-nowline y1=6 y2=112></line><circle class=oq-fc-dot r=3 fill=#22c55e>'),je=t.template("<svg><line></svg>",!1,!0,!1),Te=t.template("<svg><text class=oq-fc-axis-label x=26 text-anchor=end>%</svg>",!1,!0,!1),De=t.template("<svg><circle r=2.8 fill=#f5c451></svg>",!1,!0,!1),Fe=t.template("<svg><path></svg>",!1,!0,!1),de=t.template("<div class=oq-meter><div class=oq-meter-head><span class=oq-meter-name></span><span class=oq-meter-value></span></div><div class=oq-track><div class=oq-fill></div></div><div class=oq-reset>");const Ie="#22c55e",Be="#f5c451";function ne(){const o=document.querySelector('header[data-slot="titlebar-v2"]')?.getBoundingClientRect().bottom;return Math.max(4,(o??44)+6)}function Re(e){const o=e.ctx,[n,i]=w.createSignal(),[d,g]=w.createSignal(),[x,v]=w.createSignal(0),[S,l]=w.createSignal(Date.now()),s=setInterval(()=>l(Date.now()),3e4);w.onCleanup(()=>clearInterval(s));let r;const q=()=>e.dock.value.open,m=()=>e.dock.value.collapsed,u=()=>e.quota.data(),A=()=>{const a=u();return a?ie(a):e.quota.error()&&a===void 0?"danger":"ok"},E=()=>{const a=u();return a?se(a):void 0},P=()=>d()!==void 0||e.dock.value.placed,c=()=>{const a=d();if(a)return{left:`${a.x}px`,top:`${a.y}px`};if(e.dock.value.placed)return{left:`${e.dock.value.x}px`,top:`${e.dock.value.y+x()}px`}},C=()=>{e.dock.update(a=>{a.collapsed=!a.collapsed})},j=()=>{e.dock.update(a=>{a.forecast=!a.forecast})},Q=()=>{e.dock.update(a=>{a.open=!1}),o.toast.show({title:o.t("toast.hidden"),description:o.t("toast.hidden.description"),actions:[{label:o.t("toast.hidden.show"),run:()=>{e.dock.update(a=>{a.open=!0})}}]})},U=a=>{o.system.openExternal(a.replace(/\/overview\/?$/,""))},[T,H]=w.createSignal(!1),h=a=>{if(!T()||!r)return;const k=n()?.getBoundingClientRect(),M=k?.width??320,b=k?.height??220,z=ne(),D=G(r.x+a.clientX-r.px,4,Math.max(4,window.innerWidth-M-4)),F=G(r.y+a.clientY-r.py,z,Math.max(z,window.innerHeight-b-4));g({x:D,y:F})},f=()=>{if(!T())return;H(!1),r=void 0,window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",f),window.removeEventListener("blur",f);const a=d();a&&(e.dock.update(k=>{k.x=a.x,k.y=a.y,k.placed=!0}),g(void 0))},y=a=>{if(a.button!==0)return;const k=a.target;if(k instanceof Element&&k.closest("button, a, input, textarea, select"))return;const M=n()?.getBoundingClientRect();if(M){if(x()!==0){const b=e.dock.value.y+x();e.dock.update(z=>{z.y=b}),v(0)}r={px:a.clientX,py:a.clientY,x:M.left,y:M.top},g({x:M.left,y:M.top}),H(!0),window.addEventListener("pointermove",h),window.addEventListener("pointerup",f),window.addEventListener("pointercancel",f),window.addEventListener("blur",f),a.preventDefault()}};w.onCleanup(()=>{window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",f),window.removeEventListener("blur",f)});let _=0;const L=()=>{const a=n()?.getBoundingClientRect();if(!a)return;const k=a.height;if(!e.dock.value.placed){v(0),_=k;return}const M=4,b=ne(),z=Math.max(b,window.innerHeight-M-k),D=a.top,F=e.dock.value.y>window.innerHeight*.35,N=_===0||!F?D:D+(_-k),p=G(N,b,z);v(p-e.dock.value.y),_=k;const $=G(e.dock.value.x,M,Math.max(M,window.innerWidth-a.width-M));$!==e.dock.value.x&&e.dock.update(O=>{O.x=$})};let I;const V=a=>{i(a),I?.disconnect(),I=void 0,a&&(_=0,I=new ResizeObserver(()=>L()),I.observe(a),L())};w.onMount(()=>{window.addEventListener("resize",L),w.onCleanup(()=>{window.removeEventListener("resize",L),I?.disconnect()})});const ue=()=>{const a=e.quota.updatedAt();return a?o.t("card.updated",{time:me(o,a)}):""};return[t.createComponent(w.Show,{get when(){return q()},get children(){var a=be(),k=a.firstChild,M=k.firstChild,b=M.nextSibling,z=b.nextSibling,D=k.nextSibling,F=D.firstChild,N=F.firstChild;return t.use(V,a),k.$$pointerdown=y,t.insert(b,()=>o.t("card.title")),t.insert(k,t.createComponent(w.Show,{get when(){return u()?.workspace.name},children:p=>(()=>{var $=qe();return t.insert($,p),t.effect(()=>t.setAttribute($,"title",p())),$})()}),z),t.insert(k,t.createComponent(o.ui.IconButton,{icon:"refresh",get label(){return o.t("card.refresh")},size:"small",variant:"ghost",get busy(){return e.quota.loading()},onClick:()=>{e.quota.refresh("manual")}}),null),t.insert(k,t.createComponent(o.ui.IconButton,{get icon(){return m()?"plus":"minus"},get label(){return o.t(m()?"card.expand":"card.collapse")},size:"small",variant:"ghost",onClick:C}),null),t.insert(k,t.createComponent(o.ui.IconButton,{icon:"close",get label(){return o.t("card.close")},size:"small",variant:"ghost",onClick:Q}),null),t.insert(N,(()=>{var p=t.memo(()=>u()===void 0);return()=>p()?(()=>{var $=ye(),O=$.firstChild;return t.insert($,t.createComponent(o.ui.Loader,{size:"small"}),O),t.insert(O,()=>o.t("card.loading")),$})():t.memo(()=>u()===null)()?(()=>{var $=ke(),O=$.firstChild,Y=O.nextSibling;return t.insert(O,()=>o.t("card.signedOut.title")),t.insert(Y,()=>o.t("card.signedOut.body")),$})():t.createComponent(Ne,{ctx:o,get info(){return u()},now:S,get forecastOpen(){return e.dock.value.forecast},toggleForecast:j})})(),null),t.insert(N,t.createComponent(w.Show,{get when(){return e.quota.error()},children:p=>(()=>{var $=$e(),O=$.firstChild;return t.insert(O,()=>o.t("card.error",{message:p()})),t.insert($,t.createComponent(o.ui.Button,{variant:"ghost",size:"small",onClick:()=>{e.quota.refresh("manual")},get children(){return o.t("card.retry")}}),null),$})()}),null),t.insert(F,t.createComponent(w.Show,{get when(){return u()},children:p=>(()=>{var $=Ce(),O=$.firstChild;return t.insert(O,ue),t.insert($,t.createComponent(o.ui.Button,{variant:"ghost",size:"small",onClick:()=>U(p().workspace.usageURL),get children(){return o.t("card.openDashboard")}}),null),$})()}),null),t.effect(p=>{var $=!P(),O=o.appearance.mode(),Y=m()?"true":"false",K=o.locale.direction(),fe=c(),ee=A(),te=m()?"true":"false";return $!==p.e&&a.classList.toggle("oq-dock",p.e=$),O!==p.t&&t.setAttribute(a,"data-mode",p.t=O),Y!==p.a&&t.setAttribute(a,"data-collapsed",p.a=Y),K!==p.o&&t.setAttribute(a,"dir",p.o=K),p.i=t.style(a,fe,p.i),ee!==p.n&&t.setAttribute(M,"data-tone",p.n=ee),te!==p.s&&t.setAttribute(D,"data-collapsed",p.s=te),p},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),a}}),t.createComponent(w.Show,{get when(){return!q()},get children(){var a=xe(),k=a.firstChild,M=k.nextSibling;return a.$$click=()=>{e.dock.update(b=>{b.open=!0})},t.insert(M,()=>o.t("card.launcher")),t.insert(a,t.createComponent(w.Show,{get when(){return E()!==void 0},get children(){var b=we(),z=b.firstChild;return t.insert(b,E,z),b}}),null),t.effect(b=>{var z=o.appearance.mode(),D=o.locale.direction(),F=o.t("card.launcher.open"),N=o.t("card.launcher.open"),p=A();return z!==b.e&&t.setAttribute(a,"data-mode",b.e=z),D!==b.t&&t.setAttribute(a,"dir",b.t=D),F!==b.a&&t.setAttribute(a,"aria-label",b.a=F),N!==b.o&&t.setAttribute(a,"title",b.o=N),p!==b.i&&t.setAttribute(k,"data-tone",b.i=p),b},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),a}})]}function Ne(e){const o=e.info.go,n=e.info.budgets;return[o?[(()=>{var i=Se();return t.insert(i,t.createComponent(w.For,{each:J,children:d=>t.createComponent(Pe,{get ctx(){return e.ctx},get name(){return e.ctx.t(`card.go.${d}`)},get meter(){return o[d]},get now(){return e.now}})})),i})(),t.createComponent(Ge,{get ctx(){return e.ctx},go:o,get now(){return e.now},get open(){return e.forecastOpen},get toggle(){return e.toggleForecast}})]:null,t.memo(()=>t.memo(()=>n.length>0)()?(()=>{var i=Ae(),d=i.firstChild;return t.insert(d,()=>e.ctx.t("card.budgets")),t.insert(i,t.createComponent(w.For,{each:n,children:g=>t.createComponent(He,{get ctx(){return e.ctx},budget:g,get now(){return e.now}})}),null),i})():null),t.memo(()=>t.memo(()=>!o&&n.length===0)()?(()=>{var i=_e();return t.insert(i,()=>e.ctx.t("card.noGo")),i})():null)]}function Ge(e){const o=e.ctx,n=()=>e.go.monthly,i=()=>he(n(),"monthly",e.now()),d=()=>pe(i(),n()),g=()=>oe(o,n().resetsAt),x=()=>{const l=i();return n().limited||n().percent>=100?o.t("card.limited"):l.stale||n().percent<=0?o.t("card.forecast.empty"):l.runsOutAt!==void 0?o.t("card.forecast.runsOut",{time:Z(o,l.runsOutAt,e.now())}):o.t("card.forecast.onPace",{percent:Math.round(l.projected)})},v=()=>{const l=i();return n().limited||n().percent>=100?o.t("card.limited"):l.stale||n().percent<=0?o.t("card.forecast.empty"):l.runsOutAt!==void 0?o.t("card.forecast.summaryRunOut",{time:Z(o,l.runsOutAt,e.now())}):o.t("card.forecast.summary",{percent:Math.round(l.projected)})},S=()=>{const l=i().start,s=n().resetsAt;return[0,1,2,3].map(r=>l+(s-l)*r/3)};return[(()=>{var l=Me(),s=l.firstChild,r=s.nextSibling;return t.addEventListener(l,"click",e.toggle,!0),t.insert(l,t.createComponent(o.ui.Icon,{name:"window-analytics",size:"small"}),s),t.insert(s,()=>o.t("card.forecast")),t.insert(r,v),t.insert(l,t.createComponent(o.ui.Icon,{name:"chevron-down",size:"small",class:"oq-fc-chevron",get"data-open"(){return e.open?"true":"false"}}),null),t.effect(q=>{var m=e.open,u=o.t(e.open?"card.forecast.hide":"card.forecast.show");return m!==q.e&&t.setAttribute(l,"aria-expanded",q.e=m),u!==q.t&&t.setAttribute(l,"aria-label",q.t=u),q},{e:void 0,t:void 0}),l})(),(()=>{var l=Oe(),s=l.firstChild,r=s.firstChild,q=r.firstChild,m=q.firstChild,u=m.firstChild,A=m.nextSibling,E=q.nextSibling,P=E.firstChild,c=E.nextSibling;return t.insert(m,()=>Math.round(n().percent),u),t.insert(A,x),t.insert(E,()=>o.t("card.forecast.usage"),P),t.insert(E,()=>o.t("card.forecast.renews",{date:g()}),null),t.insert(r,t.createComponent(Qe,{get meter(){return n()},get forecast(){return i()}}),c),t.insert(c,t.createComponent(w.For,{get each(){return S()},children:C=>(()=>{var j=Le();return t.insert(j,()=>oe(o,C)),j})()})),t.effect(C=>{var j=e.open?"true":"false",Q=d();return j!==C.e&&t.setAttribute(l,"data-open",C.e=j),Q!==C.t&&t.setAttribute(A,"data-tone",C.t=Q),C},{e:void 0,t:void 0}),l})()]}function Qe(e){const o=`oq-fc-fill-${Math.random().toString(36).slice(2,9)}`,n=`oq-fc-hatch-${Math.random().toString(36).slice(2,9)}`,i=296,d=116,g=32,x=4,v=6,S=4,l=()=>{const c=Math.max(e.meter.percent,e.forecast.projected);return Math.max(150,Math.ceil(c/50)*50)},s=c=>g+c*(i-g-x),r=c=>{const C=l();return v+(1-Math.min(Math.max(c,0),C)/C)*(d-v-S)},q=()=>{const c=[];for(let C=0;C<=l();C+=50)c.push(C);return c},m=()=>`M${s(0)},${r(0)}L${s(e.forecast.elapsed)},${r(e.meter.percent)}`,u=()=>`${m()}L${s(e.forecast.elapsed)},${r(0)}Z`,A=()=>{const c=e.forecast;if(!(c.elapsed<=0||c.elapsed>=1))return`M${s(c.elapsed)},${r(e.meter.percent)}L${s(1)},${r(c.projected)}`},E=()=>{const c=e.forecast;if(!(c.elapsed<=0||c.elapsed>=1))return`M${s(c.elapsed)},${r(e.meter.percent)}L${s(1)},${r(c.projected)}L${s(1)},${r(0)}L${s(c.elapsed)},${r(0)}Z`},P=()=>{const c=e.forecast;if(c.projected<=100||e.meter.percent>=100)return;const C=c.elapsed+(100-e.meter.percent)*(1-c.elapsed)/(c.projected-e.meter.percent);return C>c.elapsed&&C<=1?C:void 0};return(()=>{var c=Ee(),C=c.firstChild,j=C.firstChild,Q=j.firstChild;Q.nextSibling;var U=j.nextSibling;U.firstChild;var T=C.nextSibling,H=T.nextSibling;return t.setAttribute(j,"id",o),t.setAttribute(U,"id",n),t.insert(c,t.createComponent(w.For,{get each(){return q()},children:h=>[(()=>{var f=je();return t.setAttribute(f,"class",h===100?"oq-fc-grid oq-fc-limit":"oq-fc-grid"),t.effect(y=>{var _=s(0),L=s(1),I=r(h),V=r(h);return _!==y.e&&t.setAttribute(f,"x1",y.e=_),L!==y.t&&t.setAttribute(f,"x2",y.t=L),I!==y.a&&t.setAttribute(f,"y1",y.a=I),V!==y.o&&t.setAttribute(f,"y2",y.o=V),y},{e:void 0,t:void 0,a:void 0,o:void 0}),f})(),(()=>{var f=Te(),y=f.firstChild;return t.insert(f,h,y),t.effect(()=>t.setAttribute(f,"y",r(h)+2.5)),f})()]}),T),t.insert(c,t.createComponent(X,{get d(){return u()},fill:`url(#${o})`}),T),t.insert(c,t.createComponent(w.Show,{get when(){return E()},children:h=>t.createComponent(X,{get d(){return h()},fill:`url(#${n})`})}),T),t.insert(c,t.createComponent(X,{get d(){return m()},stroke:Ie,width:1.7}),T),t.insert(c,t.createComponent(w.Show,{get when(){return A()},children:h=>t.createComponent(X,{get d(){return h()},stroke:Be,width:1.7})}),T),t.insert(c,t.createComponent(w.Show,{get when(){return t.memo(()=>e.forecast.elapsed>0)()&&e.forecast.elapsed<1},get children(){var h=ze();return t.effect(f=>{var y=s(1),_=r(e.forecast.projected);return y!==f.e&&t.setAttribute(h,"cx",f.e=y),_!==f.t&&t.setAttribute(h,"cy",f.t=_),f},{e:void 0,t:void 0}),h}}),null),t.insert(c,t.createComponent(w.Show,{get when(){return P()},children:h=>(()=>{var f=De();return t.effect(y=>{var _=s(h()),L=r(100);return _!==y.e&&t.setAttribute(f,"cx",y.e=_),L!==y.t&&t.setAttribute(f,"cy",y.t=L),y},{e:void 0,t:void 0}),f})()}),null),t.effect(h=>{var f=s(e.forecast.elapsed),y=s(e.forecast.elapsed),_=s(e.forecast.elapsed),L=r(e.meter.percent);return f!==h.e&&t.setAttribute(T,"x1",h.e=f),y!==h.t&&t.setAttribute(T,"x2",h.t=y),_!==h.a&&t.setAttribute(H,"cx",h.a=_),L!==h.o&&t.setAttribute(H,"cy",h.o=L),h},{e:void 0,t:void 0,a:void 0,o:void 0}),c})()}function X(e){return(()=>{var o=Fe();return t.effect(n=>{var i=e.stroke?"oq-fc-line":"oq-fc-area",d=e.d,g=e.stroke,x=e.width,v=e.fill??"none";return i!==n.e&&t.setAttribute(o,"class",n.e=i),d!==n.t&&t.setAttribute(o,"d",n.t=d),g!==n.a&&t.setAttribute(o,"stroke",n.a=g),x!==n.o&&t.setAttribute(o,"stroke-width",n.o=x),v!==n.i&&t.setAttribute(o,"fill",n.i=v),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),o})()}function Pe(e){const o=()=>G(Math.round(e.meter.percent),0,100),n=()=>ge(e.meter);return(()=>{var i=de(),d=i.firstChild,g=d.firstChild,x=g.nextSibling,v=d.nextSibling,S=v.firstChild,l=v.nextSibling;return t.insert(g,()=>e.name),t.insert(x,(()=>{var s=t.memo(()=>!!e.meter.limited);return()=>s()?e.ctx.t("card.limited"):e.ctx.t("card.used",{percent:o()})})()),t.insert(l,()=>e.ctx.t("card.resets",{time:Z(e.ctx,e.meter.resetsAt,e.now())})),t.effect(s=>{var r=e.name,q=n(),m=n(),u=`${o()}%`,A=le(e.ctx,e.meter.resetsAt);return r!==s.e&&t.setAttribute(g,"title",s.e=r),q!==s.t&&t.setAttribute(x,"data-tone",s.t=q),m!==s.a&&t.setAttribute(S,"data-tone",s.a=m),u!==s.o&&t.setStyleProperty(S,"width",s.o=u),A!==s.i&&t.setAttribute(l,"title",s.i=A),s},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),i})()}function He(e){const o=()=>e.budget.limit>0?G(e.budget.spent/e.budget.limit*100,0,100):100,n=()=>ae(e.budget),i=()=>ce(e.ctx,e.budget);return(()=>{var d=de(),g=d.firstChild,x=g.firstChild,v=x.nextSibling,S=g.nextSibling,l=S.firstChild,s=S.nextSibling;return t.insert(x,i),t.insert(v,()=>e.ctx.t("card.budget.spent",{spent:re(e.ctx,e.budget.spent),limit:re(e.ctx,e.budget.limit)})),t.insert(s,()=>e.ctx.t("card.resets",{time:Z(e.ctx,e.budget.resetsAt,e.now())})),t.effect(r=>{var q=i(),m=n(),u=n(),A=`${o()}%`,E=le(e.ctx,e.budget.resetsAt);return q!==r.e&&t.setAttribute(x,"title",r.e=q),m!==r.t&&t.setAttribute(v,"data-tone",r.t=m),u!==r.a&&t.setAttribute(l,"data-tone",r.a=u),A!==r.o&&t.setStyleProperty(l,"width",r.o=A),E!==r.i&&t.setAttribute(s,"title",r.i=E),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),d})()}t.delegateEvents(["pointerdown","click"]);const We={"card.title":"OpenCode Go","card.loading":"Loading quota…","card.error":"Could not read the quota: {{message}}","card.retry":"Try again","card.signedOut.title":"Not signed in","card.signedOut.body":"Sign in to an OpenCode Console workspace to see its quota.","card.noGo":"This workspace has no OpenCode Go plan.","card.go.rolling":"5 hours","card.go.weekly":"Week","card.go.monthly":"Month","card.used":"{{percent}}% used","card.limited":"Limit reached","card.resets":"Resets {{time}}","card.budgets":"Console budgets","card.budget.all":"All spend","card.budget.other":"Budget","card.budget.perModel":"per model","card.budget.spent":"{{spent}} of {{limit}}","card.updated":"Updated {{time}}","card.openDashboard":"Open dashboard","card.launcher":"Quota","card.launcher.open":"Show the quota window","card.forecast":"Forecast","card.forecast.show":"Show forecast","card.forecast.hide":"Hide forecast","card.forecast.hint":"At the current pace","card.forecast.usage":"Go usage","card.forecast.renews":"Renews {{date}}","card.forecast.onPace":"On pace for {{percent}}%","card.forecast.summary":"On pace for {{percent}}%","card.forecast.summaryRunOut":"Runs out {{time}}","card.forecast.projected":"{{percent}}% at reset","card.forecast.runsOut":"Runs out {{time}}","card.forecast.now":"Now","card.forecast.empty":"Not enough usage yet to project.","card.refresh":"Refresh quota","card.collapse":"Collapse","card.expand":"Expand","card.close":"Hide quota window","command.toggle":"Quota: Show or hide the floating window","command.toggle.description":"OpenCode Go and Console quota in a draggable window","command.refresh":"Quota: Refresh now","command.reset":"Quota: Reset window position","titlebar.label":"Go {{percent}}%","titlebar.fallback":"Quota","titlebar.title":"Quota: {{text}}","toast.refreshed":"Quota refreshed","toast.error":"Could not refresh the quota","toast.hidden":"Quota hidden","toast.hidden.description":"Click the Quota pill at the bottom-right to open it again.","toast.hidden.show":"Show"};function Ue(e){const o=e,n=o.experimental?.usage;if(typeof n?.limits=="function")return n.limits.bind(n);const i=o.usage;if(typeof i?.limits=="function")return i.limits.bind(i)}function Ve(e){if(e instanceof Error)return e.message;if(typeof e=="object"&&e!==null&&"message"in e){const o=e.message;if(typeof o=="string")return o}return String(e)}function Ye(e){const[o,n]=w.createSignal(void 0),[i,d]=w.createSignal(),[g,x]=w.createSignal(!1),[v,S]=w.createSignal();let l,s=0;const r=()=>{const m=e.sessions.current(),u=m?.server.builtin?m.directory:void 0;return u?{location:{directory:u}}:{}};async function q(){const m=++s;x(!0);try{const u=Ue(e.client);if(!u)throw new Error("This OpenCode build has no usage limits API");const A=await u(r(),{signal:e.signal});if(m!==s||e.signal.aborted)return;n(A.data),d(void 0),S(Date.now())}catch(u){if(m!==s||e.signal.aborted)return;d(Ve(u))}finally{m===s&&x(!1)}}return{data:o,error:i,loading:g,updatedAt:v,refresh(m="auto"){return e.signal.aborted?Promise.resolve():l||(l=q().finally(()=>{l=void 0}),l)}}}const Xe=`
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
  inset-inline-end: 20px;
  bottom: 20px;
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

.oq-fold {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition:
    grid-template-rows 260ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 180ms ease;
}

.oq-fold[data-collapsed="true"] {
  grid-template-rows: 0fr;
  opacity: 0;
}

.oq-fold-inner {
  min-height: 0;
  overflow: hidden;
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
`,Ze=R.Schema.Struct({x:R.Schema.Number,y:R.Schema.Number,placed:R.Schema.Boolean,open:R.Schema.Boolean,collapsed:R.Schema.Boolean,forecast:R.Schema.Boolean,layout:R.Schema.Number});function Je(e){const o=Number(e);return Number.isFinite(o)?G(Math.round(o),15,3600):60}const Ke=B.Plugin.define({i18n:{en:We},stores:{dock:B.Store.global(Ze,{x:0,y:0,placed:!1,open:!0,collapsed:!1,forecast:!1,layout:0})},setup(e){const o=Ye(e),n=e.stores.dock;n.value.layout<2&&n.update(r=>{r.layout=2,r.placed=!1,r.x=0,r.y=0});const i=Je(e.options.refreshSeconds);let d=!1;const g=r=>{d||o.refresh(r)},x=()=>{document.visibilityState!=="hidden"&&g("auto")},v=()=>{document.visibilityState==="visible"&&g("auto")},S=setInterval(x,i*1e3);document.addEventListener("visibilitychange",v),window.addEventListener("focus",v),g("initial");const l=()=>{e.stores.dock.update(r=>{r.open=!r.open})},s=async()=>{await o.refresh("manual");const r=o.error();r?e.toast.show({variant:"error",title:e.t("toast.error"),description:r}):e.toast.show({variant:"success",title:e.t("toast.refreshed")})};return e.add(B.Style,Xe),e.add(B.Command,()=>({id:"toggle",title:e.t("command.toggle"),description:e.t("command.toggle.description"),keywords:"quota usage limits go budget",bind:"mod+shift+q",featured:!0,run:l})),e.add(B.Command,()=>({id:"refresh",title:e.t("command.refresh"),run:()=>{s()}})),e.add(B.Command,()=>({id:"reset",title:e.t("command.reset"),run:()=>{e.stores.dock.update(r=>{r.placed=!1,r.x=0,r.y=0,r.open=!0,r.collapsed=!1})}})),e.add(B.TitlebarItem,()=>{const r=o.data();if(!r)return;const q=[];if(r.go)for(const u of J)q.push(`${e.t(`card.go.${u}`)} ${Math.round(r.go[u].percent)}%`);for(const u of r.budgets){const A=u.limit>0?Math.round(u.spent/u.limit*100):100;q.push(`${ce(e,u)} ${A}%`)}const m=se(r);return{id:"quota",label:m===void 0?e.t("titlebar.fallback"):e.t("titlebar.label",{percent:m}),title:e.t("titlebar.title",{text:q.join(" · ")}),icon:ie(r)==="danger"?"warning":"window-analytics",run:l}}),e.add(B.Slot,{at:"window.bottom",order:100,render:()=>t.createComponent(Re,{ctx:e,quota:o,get dock(){return e.stores.dock}})}),()=>{d=!0,clearInterval(S),document.removeEventListener("visibilitychange",v),window.removeEventListener("focus",v)}}});exports.default=Ke;
