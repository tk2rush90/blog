(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{rZ4n:function(t,e,s){"use strict";s.r(e),s.d(e,"PostSearchPageModule",function(){return L});var i=s("ofXK"),o=s("tyNb"),n=s("PcbD"),r=s("nYR2"),a=s("UM8G"),c=s("B8ql"),p=s("itXk"),l=s("fXoL"),h=s("Lpyx"),b=s("ShDn"),g=s("/Ft3"),u=s("Iw+v"),d=s("y3nj"),_=s("Yud9");function f(t,e){if(1&t&&l.Hb(0,"app-post-list-item",8),2&t){const t=e.$implicit,s=l.Wb();l.cc("searchingLabels",s.labels)("post",t)}}function v(t,e){1&t&&(l.Kb(0),l.Mb(1,"div",9),l.Mb(2,"div",10),l.qc(3," \ud45c\uc2dc\ud560 \uae00\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. "),l.Lb(),l.Lb(),l.Jb())}function P(t,e){1&t&&l.Hb(0,"app-loading-spot",11),2&t&&l.cc("size",50)}var m=function(t){return t.keyword="keyword",t.labels="labels",t}({});const w=[{path:":type",component:(()=>{class t extends c.a{constructor(t,e,s,i,o){super(t),this.elementRef=t,this.toastService=e,this.activatedRoute=s,this.postApiService=i,this.subscriptionService=o,this.posts=[],this.loading=!1,this.labels="",this._search=""}ngOnInit(){this._subscribeScrollEnd(),this._subscribeRouteChanges()}get empty(){return 0===this.posts.length&&!this.loading}_subscribeRouteChanges(){const t=Object(p.a)([this.activatedRoute.paramMap,this.activatedRoute.queryParamMap]).subscribe(t=>{var e,s,i;this._type=(null===(e=t[0])||void 0===e?void 0:e.get("type"))||void 0,this._search=(null===(s=t[1])||void 0===s?void 0:s.get("search"))||"",this.labels=(null===(i=t[1])||void 0===i?void 0:i.get("labels"))||"",this.posts=[],this._response=void 0,this._searchOrGetPosts()});this.subscriptionService.store("_subscribeRouteChanges",t)}_searchOrGetPosts(t){switch(this._type){case m.keyword:this._searchPosts(t);break;case m.labels:this._getPostsByLabels(t)}}_searchPosts(t){if(this._search){const e=this.postApiService.searchPosts(this._search||"").pipe(Object(r.a)(()=>this.loading=!1)).subscribe({next:e=>{this._handlePostResponse(e,t)},error:t=>{this._showErrorMessage()}});this.subscriptionService.store("_searchPosts",e),this.loading=!0}}_getPostsByLabels(t){if(this.labels){const e=this.postApiService.getPosts({category:this.labels,status:"live",pageToken:t}).pipe(Object(r.a)(()=>this.loading=!1)).subscribe({next:e=>{this._handlePostResponse(e,t)},error:t=>{this._showErrorMessage()}});this.subscriptionService.store("_getPostsByLabels",e),this.loading=!0}}_handlePostResponse(t,e){this._response=t,e?this.posts.push(...t.items):this.posts=t.items||[]}_showErrorMessage(){this.toastService.open({message:"\ud3ec\uc2a4\ud2b8 \ubaa9\ub85d\uc744 \uac00\uc838\uc624\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4",type:a.b.error})}_subscribeScrollEnd(){const t=this.scrollEnd.subscribe(()=>{this._getNextPage()});this.subscriptionService.store("_subscribeScrollEnd",t)}_getNextPage(){var t;!this.loading&&(null===(t=this._response)||void 0===t?void 0:t.nextPageToken)&&this._searchPosts(this._response.nextPageToken)}}return t.\u0275fac=function(e){return new(e||t)(l.Gb(l.l),l.Gb(a.a),l.Gb(o.a),l.Gb(h.a),l.Gb(n.a))},t.\u0275cmp=l.Ab({type:t,selectors:[["app-post-search-page"]],features:[l.vb([n.a]),l.tb],decls:9,vars:5,consts:[[1,"scripter-top-bar"],[1,"scripter-page-container"],[3,"scrollContainer"],[3,"hideCategories"],[1,"scripter-post-list-container"],["baseUrl","/post/view",3,"searchingLabels","post",4,"ngFor","ngForOf"],[4,"ngIf"],[3,"size",4,"ngIf"],["baseUrl","/post/view",3,"searchingLabels","post"],[1,"scripter-empty-container"],[1,"scripter-empty-text"],[3,"size"]],template:function(t,e){1&t&&(l.Hb(0,"div",0),l.Mb(1,"div",1),l.Hb(2,"app-header",2),l.Hb(3,"app-post-list-header",3),l.Mb(4,"div",4),l.oc(5,f,1,2,"app-post-list-item",5),l.oc(6,v,4,0,"ng-container",6),l.oc(7,P,1,1,"app-loading-spot",7),l.Lb(),l.Lb(),l.Hb(8,"app-footer")),2&t&&(l.wb(2),l.cc("scrollContainer",e.elementRef),l.wb(1),l.cc("hideCategories",!0),l.wb(2),l.cc("ngForOf",e.posts),l.wb(1),l.cc("ngIf",e.empty),l.wb(1),l.cc("ngIf",e.loading))},directives:[b.a,g.a,i.j,i.k,u.a,d.a,_.a],styles:["","[_nghost-%COMP%]{width:100%;height:100%;display:flex;align-items:stretch;flex-direction:column;flex-wrap:nowrap;position:absolute;overflow:auto}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{flex:0 0 auto}[_nghost-%COMP%]   .scripter-page-container[_ngcontent-%COMP%]{flex-grow:1;flex-shrink:1;flex-basis:0}.scripter-post-list-container[_ngcontent-%COMP%], app-post-list-header[_ngcontent-%COMP%]{margin-top:50px}app-post-list-item[_ngcontent-%COMP%] + app-post-list-item[_ngcontent-%COMP%]{margin-top:55px}app-loading-spot[_ngcontent-%COMP%]{height:100px}app-footer[_ngcontent-%COMP%]{margin-top:200px}.scripter-empty-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;height:100px}.scripter-empty-container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:0 0 auto}.scripter-empty-text[_ngcontent-%COMP%]{text-align:center;font-size:14px;color:#bebebe}"]}),t})()}];let y=(()=>{class t{}return t.\u0275mod=l.Eb({type:t}),t.\u0275inj=l.Db({factory:function(e){return new(e||t)},imports:[[o.s.forChild(w)],o.s]}),t})();var x=s("YwCB"),M=s("DcXL"),C=s("eX/7"),O=s("B6jC"),S=s("24OP");let L=(()=>{class t{}return t.\u0275mod=l.Eb({type:t}),t.\u0275inj=l.Db({factory:function(e){return new(e||t)},imports:[[i.c,y,x.a,M.a,C.a,O.a,S.a]]}),t})()}}]);