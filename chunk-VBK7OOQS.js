import{a as q,b as kt,c as gt,d as V,e as yt,g as xt,h as wt,i as At}from"./chunk-OFA7XBTK.js";import{C as ut,D as pt,H as ft,L as F,T as _t,V as bt,o as ht}from"./chunk-BW7PFCKW.js";import{c as vt,d as L,f as w,g as z,h as N}from"./chunk-WXI33M2S.js";import{Aa as X,Bb as nt,Fa as u,Fb as x,Gb as v,Ha as y,Hb as it,Ia as Y,Jb as at,Lb as st,Mb as rt,Nb as ot,Ob as B,Sb as I,Tb as E,Ub as M,Wb as j,Yb as T,_ as U,_b as O,a as p,ba as Q,cb as b,da as $,db as d,ea as Z,fb as G,ga as A,ia as h,j as m,ja as _,l as H,lb as J,lc as ct,pb as D,qa as S,qb as tt,qc as dt,ra as W,rc as P,sa as g,sc as lt,vb as R,wb as et,xa as C,xc as mt,za as K}from"./chunk-U7O5KEBD.js";function Bt(s,n){if(s&1){let c=at();x(0,"div",1)(1,"button",2),rt("click",function(){K(c);let t=B();return X(t.action())}),j(2),v()()}if(s&2){let c=B();b(2),T(" ",c.data.action," ")}}var It=["label"];function Et(s,n){}var Mt=Math.pow(2,31)-1,k=class{constructor(n,c){this._overlayRef=c,this._afterDismissed=new m,this._afterOpened=new m,this._onAction=new m,this._dismissedByAction=!1,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,Mt))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},St=new A("MatSnackBarData"),f=class{constructor(){this.politeness="assertive",this.announcementMessage="",this.duration=0,this.data=null,this.horizontalPosition="center",this.verticalPosition="bottom"}},jt=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=g({type:n,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"],standalone:!0});let s=n;return s})(),Tt=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=g({type:n,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"],standalone:!0});let s=n;return s})(),Ot=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=g({type:n,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"],standalone:!0});let s=n;return s})(),Ct=(()=>{let n=class n{constructor(e,t){this.snackBarRef=e,this.data=t}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}};n.\u0275fac=function(t){return new(t||n)(d(k),d(St))},n.\u0275cmp=S({type:n,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],standalone:!0,features:[O],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["mat-button","","matSnackBarAction","",3,"click"]],template:function(t,i){t&1&&(x(0,"div",0),j(1),v(),R(2,Bt,3,1,"div",1)),t&2&&(b(),T(" ",i.data.message,`
`),b(),nt(2,i.hasAction?2:-1))},dependencies:[_t,jt,Tt,Ot],styles:[".mat-mdc-simple-snack-bar{display:flex}"],encapsulation:2,changeDetection:0});let s=n;return s})(),Pt={snackBarState:vt("state",[z("void, hidden",w({transform:"scale(0.8)",opacity:0})),z("visible",w({transform:"scale(1)",opacity:1})),N("* => visible",L("150ms cubic-bezier(0, 0, 0.2, 1)")),N("* => void, * => hidden",L("75ms cubic-bezier(0.4, 0.0, 1, 1)",w({opacity:0})))])},Ft=0,Lt=(()=>{let n=class n extends gt{constructor(e,t,i,a,r){super(),this._ngZone=e,this._elementRef=t,this._changeDetectorRef=i,this._platform=a,this.snackBarConfig=r,this._document=_(mt),this._trackedModals=new Set,this._announceDelay=150,this._destroyed=!1,this._onAnnounce=new m,this._onExit=new m,this._onEnter=new m,this._animationState="void",this._liveElementId=`mat-snack-bar-container-live-${Ft++}`,this.attachDomPortal=o=>{this._assertNotAttached();let l=this._portalOutlet.attachDomPortal(o);return this._afterPortalAttached(),l},r.politeness==="assertive"&&!r.announcementMessage?this._live="assertive":r.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}onAnimationEnd(e){let{fromState:t,toState:i}=e;if((i==="void"&&t!=="void"||i==="hidden")&&this._completeExit(),i==="visible"){let a=this._onEnter;this._ngZone.run(()=>{a.next(),a.complete()})}}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce())}exit(){return this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId)}),this._onExit}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(r=>e.classList.add(r)):e.classList.add(t)),this._exposeToModals();let i=this._label.nativeElement,a="mdc-snackbar__label";i.classList.toggle(a,!i.querySelector(`.${a}`))}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let i=0;i<t.length;i++){let a=t[i],r=a.getAttribute("aria-owns");this._trackedModals.add(a),r?r.indexOf(e)===-1&&a.setAttribute("aria-owns",r+" "+e):a.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute("aria-owns");if(t){let i=t.replace(this._liveElementId,"").trim();i.length>0?e.setAttribute("aria-owns",i):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{let e=this._elementRef.nativeElement.querySelector("[aria-hidden]"),t=this._elementRef.nativeElement.querySelector("[aria-live]");if(e&&t){let i=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&e.contains(document.activeElement)&&(i=document.activeElement),e.removeAttribute("aria-hidden"),t.appendChild(e),i?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}};n.\u0275fac=function(t){return new(t||n)(d(J),d(Y),d(ct),d(ht),d(f))},n.\u0275cmp=S({type:n,selectors:[["mat-snack-bar-container"]],viewQuery:function(t,i){if(t&1&&(I(V,7),I(It,7)),t&2){let a;E(a=M())&&(i._portalOutlet=a.first),E(a=M())&&(i._label=a.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container","mdc-snackbar--open"],hostVars:1,hostBindings:function(t,i){t&1&&ot("@state.done",function(r){return i.onAnimationEnd(r)}),t&2&&st("@state",i._animationState)},standalone:!0,features:[tt,O],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(t,i){t&1&&(x(0,"div",1)(1,"div",2,0)(3,"div",3),R(4,Et,0,0,"ng-template",4),v(),it(5,"div"),v()()),t&2&&(b(5),et("aria-live",i._live)("role",i._role)("id",i._liveElementId))},dependencies:[V],styles:['.mdc-snackbar{display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{margin:8px;position:static}.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:100%}}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container{width:100vw}}.mat-mdc-snack-bar-container .mdc-snackbar__surface{max-width:672px}.mat-mdc-snack-bar-container .mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{background-color:var(--mdc-snackbar-container-color)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{border-radius:var(--mdc-snackbar-container-shape)}.mat-mdc-snack-bar-container .mdc-snackbar__label{color:var(--mdc-snackbar-supporting-text-color)}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-size:var(--mdc-snackbar-supporting-text-size);font-family:var(--mdc-snackbar-supporting-text-font);font-weight:var(--mdc-snackbar-supporting-text-weight);line-height:var(--mdc-snackbar-supporting-text-line-height)}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-snack-bar-button-color);--mat-text-button-state-layer-color:currentColor;--mat-text-button-ripple-color:currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{opacity:.1}.mat-mdc-snack-bar-container .mdc-snackbar__label::before{display:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}'],encapsulation:2,data:{animation:[Pt.snackBarState]}});let s=n;return s})();function zt(){return new f}var Nt=new A("mat-snack-bar-default-options",{providedIn:"root",factory:zt}),qt=(()=>{let n=class n{get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(e,t,i,a,r,o){this._overlay=e,this._live=t,this._injector=i,this._breakpointObserver=a,this._parentSnackBar=r,this._defaultConfig=o,this._snackBarRefAtThisLevel=null,this.simpleSnackBarComponent=Ct,this.snackBarContainerComponent=Lt,this.handsetCssClass="mat-mdc-snack-bar-handset"}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t="",i){let a=p(p({},this._defaultConfig),i);return a.data={message:e,action:t},a.announcementMessage===e&&(a.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,a)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,t){let i=t&&t.viewContainerRef&&t.viewContainerRef.injector,a=u.create({parent:i||this._injector,providers:[{provide:f,useValue:t}]}),r=new q(this.snackBarContainerComponent,t.viewContainerRef,a),o=e.attach(r);return o.instance.snackBarConfig=t,o.instance}_attach(e,t){let i=p(p(p({},new f),this._defaultConfig),t),a=this._createOverlay(i),r=this._attachSnackBarContainer(a,i),o=new k(r,a);if(e instanceof G){let l=new kt(e,null,{$implicit:i.data,snackBarRef:o});o.instance=r.attachTemplatePortal(l)}else{let l=this._createInjector(i,o),Dt=new q(e,void 0,l),Rt=r.attachComponentPortal(Dt);o.instance=Rt.instance}return this._breakpointObserver.observe(pt.HandsetPortrait).pipe(U(a.detachments())).subscribe(l=>{a.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),i.announcementMessage&&r._onAnnounce.subscribe(()=>{this._live.announce(i.announcementMessage,i.politeness)}),this._animateSnackBar(o,i),this._openedSnackBarRef=o,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear()}),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter(),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration))}_createOverlay(e){let t=new xt;t.direction=e.direction;let i=this._overlay.position().global(),a=e.direction==="rtl",r=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!a||e.horizontalPosition==="end"&&a,o=!r&&e.horizontalPosition!=="center";return r?i.left("0"):o?i.right("0"):i.centerHorizontally(),e.verticalPosition==="top"?i.top("0"):i.bottom("0"),t.positionStrategy=i,this._overlay.create(t)}_createInjector(e,t){let i=e&&e.viewContainerRef&&e.viewContainerRef.injector;return u.create({parent:i||this._injector,providers:[{provide:k,useValue:t},{provide:St,useValue:e.data}]})}};n.\u0275fac=function(t){return new(t||n)(h(wt),h(ft),h(u),h(ut),h(n,12),h(Nt))},n.\u0275prov=$({token:n,factory:n.\u0275fac,providedIn:"root"});let s=n;return s})();var fe=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=W({type:n}),n.\u0275inj=Z({providers:[qt],imports:[At,yt,bt,F,Ct,F]});let s=n;return s})();function Vt(s,n){!n?.injector&&C(Vt);let c=n?.injector??_(u),e=new H(1),t=lt(()=>{let i;try{i=s()}catch(a){P(()=>e.error(a));return}P(()=>e.next(i))},{injector:c,manualCleanup:!0});return c.get(y).onDestroy(()=>{t.destroy(),e.complete()}),e.asObservable()}function Ht(s,n){let c=!n?.manualCleanup;c&&!n?.injector&&C(Ht);let e=c?n?.injector?.get(y)??_(y):null,t;n?.requireSync?t=D({kind:0}):t=D({kind:1,value:n?.initialValue});let i=s.subscribe({next:a=>t.set({kind:1,value:a}),error:a=>{if(n?.rejectErrors)throw a;t.set({kind:2,error:a})}});return e?.onDestroy(i.unsubscribe.bind(i)),dt(()=>{let a=t();switch(a.kind){case 1:return a.value;case 2:throw a.error;case 0:throw new Q(601,"`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.")}})}export{qt as a,fe as b,Vt as c,Ht as d};
