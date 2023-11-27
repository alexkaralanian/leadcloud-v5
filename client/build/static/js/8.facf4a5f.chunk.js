webpackJsonp([8],{1010:function(e,n,t){"use strict";var r=t(0),a=t.n(r),o=t(27),c=function(e){var n=e.headerText,t=e.ctaFunc,r=e.ctaText;return a.a.createElement(o.K,{className:"margin-top-2"},a.a.createElement(o.m,{xs:"12"},a.a.createElement(o.g,null,a.a.createElement(o.h,null,a.a.createElement("div",{className:"flex-container-column"},a.a.createElement("h3",{className:"mb-4"},n),a.a.createElement(o.d,{onClick:t,color:"primary"},r))))))};n.a=c},1262:function(e,n,t){"use strict";var r=t(0),a=t.n(r),o=t(265),c=t.n(o),i=t(27),l=t(91),s=t(1263),u=(t.n(s),function(e){var n=e.campaigns;return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.K,{className:"margin-top-2"},a.a.createElement(i.m,{xs:"12"},a.a.createElement(i.g,null,a.a.createElement(i.j,null,a.a.createElement("i",{className:"fa fa-align-justify"}),a.a.createElement("strong",null,"All Campaigns")),a.a.createElement(i.h,null,a.a.createElement(i.L,{responsive:!0,striped:!0},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"Title"),a.a.createElement("th",null,"Subject"),a.a.createElement("th",null,"Created At"))),a.a.createElement("tbody",null,n.map(function(e){return a.a.createElement("tr",{key:e.id},a.a.createElement("td",null,a.a.createElement(l.a,{to:"/campaigns/"+e.id+"/edit"},a.a.createElement("span",null,e.title))),a.a.createElement("td",null,e.subject),a.a.createElement("td",null,c()(e.createdAt).format("ddd, M/D/YY h:mma")))}))))))))});n.a=u},1263:function(e,n,t){var r=t(1264);"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!1};a.transform=void 0;t(146)(r,a);r.locals&&(e.exports=r.locals)},1264:function(e,n,t){n=e.exports=t(145)(!0),n.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Campaigns.css",sourceRoot:""}])},763:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function o(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var c=t(0),i=t.n(c),l=(t(91),t(40)),s=t(21),u=t(27),p=t(774),m=t(782),f=t(267),d=t(1010),A=t(1262),h=t(861),g=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),b=function(e){function n(){var e,t,o,c;r(this,n);for(var i=arguments.length,l=Array(i),s=0;s<i;s++)l[s]=arguments[s];return t=o=a(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(l))),o.createNewCampaign=function(){var e=o.props,n=e.setCampaign,t=e.push;n({}),t("/campaigns/new")},c=t,a(o,c)}return o(n,e),g(n,[{key:"componentDidMount",value:function(){(0,this.props.fetchCampaigns)()}},{key:"render",value:function(){var e=this.props,n=e.campaigns,t=e.isFetching;return console.log("CAMPAIGNS",n),i.a.createElement(i.a.Fragment,null,i.a.createElement(p.a,null),i.a.createElement(m.a,null,i.a.createElement("h1",null,"Campaigns"),i.a.createElement(u.d,{onClick:this.createNewCampaign,color:"primary"},"Create Campaign")),t?i.a.createElement(f.a,null):n.length>0?i.a.createElement(A.a,{campaigns:n}):i.a.createElement(d.a,{headerText:"You Dont Have Any Campaigns Yet...",ctaText:"Create New Campaign",ctaFunc:this.createNewCampaign}))}}]),n}(i.a.Component),v=function(e){return{campaigns:e.campaign.campaigns}},C={fetchCampaigns:h.c,setCampaign:h.e,push:l.b};n.default=Object(s.b)(v,C)(b)},774:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function o(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var c=t(0),i=t.n(c),l=t(21),s=(t(91),t(40)),u=t(27),p=t(775),m=(t.n(p),function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}()),f=function(e){function n(){return r(this,n),a(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return o(n,e),m(n,[{key:"render",value:function(){var e=this,n=this.props.path.slice(1).split("/"),t=function(e){return e.trim().charAt(0).toUpperCase()+e.slice(1).toLowerCase()};return i.a.createElement("div",{id:"breadcrumb_component",className:"row"},i.a.createElement("div",{className:"col-sm"},i.a.createElement(u.b,null,i.a.createElement(u.c,{onClick:function(){return e.props.push("/")}},"Home"),n&&n.map(function(r,a){var o=n.slice(0,n.indexOf(r)+1),c=o.join("/");return i.a.createElement(u.c,{key:a,onClick:function(){return e.props.push("/"+c)}},t(r))}))))}}]),n}(i.a.Component),d=function(e){return{path:e.router.location.pathname}};n.a=Object(l.b)(d,{push:s.b})(f)},775:function(e,n,t){var r=t(776);"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0};a.transform=void 0;t(146)(r,a);r.locals&&(e.exports=r.locals)},776:function(e,n,t){n=e.exports=t(145)(void 0),n.push([e.i,"@media screen and (min-width: 0px) and (max-width: 587px) {\n  #breadcrumb_component {\n    display: none; } }\n\n.breadcrumb {\n  margin: 0;\n  padding-left: 0; }\n\n.breadcrumb-item:hover {\n  cursor: pointer; }\n\n.breadcrumb li {\n  color: #20a8d8; }\n\n.breadcrumb li:last-child {\n  color: #9fa1a3;\n  list-style: none;\n  cursor: default; }\n",""])},777:function(e,n,t){var r=t(778);"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!1};a.transform=void 0;t(146)(r,a);r.locals&&(e.exports=r.locals)},778:function(e,n,t){n=e.exports=t(145)(!0),n.push([e.i,".header-old{-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:#333;padding:1rem;border-radius:2px}.header-old,.header__content{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.header__content{-ms-flex-pack:justify;justify-content:space-between}.header__content h1{color:#fff;font-weight:200;margin-right:1rem}.header__content img{height:3rem;border-radius:3px;margin-right:2rem}.header__button-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.btn-lg,.header__button-row .btn-toolbar{margin-left:0!important;margin-right:1rem}.header__button-row .btn-toolbar:last-child{margin-right:0;margin-bottom:0}.header__button-row .button-lg{margin-left:0;margin-top:0;margin-bottom:0}","",{version:3,sources:["/Users/Alex_K/Dropbox/Development/leadcloud-v5/client/src/components/Header/Header-old.css"],names:[],mappings:"AAAA,YAIE,mBAAoB,AAChB,eAAgB,AAGpB,sBAAuB,AACvB,aAAc,AACd,iBAAmB,CACpB,AAED,6BAZE,WAAY,AACZ,oBAAqB,AACrB,aAAc,AAGd,sBAAuB,AACnB,kBAAoB,CAczB,AARD,iBACE,sBAAuB,AACnB,6BAA+B,CAMpC,AAED,oBAGE,WAAa,AACb,gBAAiB,AACjB,iBAAmB,CACpB,AAED,qBACE,YAAa,AACb,kBAAmB,AACnB,iBAAmB,CACpB,AAED,oBAEE,oBAAqB,AACrB,aAAc,AACd,mBAAoB,AAChB,cAAgB,CACrB,AAED,yCAEE,wBAA0B,AAC1B,iBAAmB,CAEpB,AAED,4CACE,eAAgB,AAChB,eAAiB,CAClB,AAED,+BACE,cAAe,AACf,aAAc,AACd,eAAiB,CAClB",file:"Header-old.css",sourcesContent:[".header-old {\n  width: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-align: center;\n      align-items: center;\n  background-color: #333;\n  padding: 1rem;\n  border-radius: 2px;\n}\n\n.header__content {\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  width: 100%;\n}\n\n.header__content h1 {\n  /*  margin-top: 0;\n  margin-bottom: 0;*/\n  color: white;\n  font-weight: 200;\n  margin-right: 1rem;\n}\n\n.header__content img {\n  height: 3rem;\n  border-radius: 3px;\n  margin-right: 2rem;\n}\n\n.header__button-row {\n  /*margin-top: 1.4rem;*/\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.header__button-row .btn-toolbar,\n.btn-lg {\n  margin-left: 0 !important;\n  margin-right: 1rem;\n  /*margin-bottom: 1rem;*/\n}\n\n.header__button-row .btn-toolbar:last-child {\n  margin-right: 0;\n  margin-bottom: 0;\n}\n\n.header__button-row .button-lg {\n  margin-left: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n"],sourceRoot:""}])},782:function(e,n,t){"use strict";var r=t(0),a=t.n(r),o=t(27),c=t(777),i=(t.n(c),function(e){var n=e.children;return a.a.createElement(o.K,null,a.a.createElement(o.m,{xs:"12"},a.a.createElement("div",{className:"header-old"},a.a.createElement("div",{className:"header__content"},n))))});n.a=i},861:function(e,n,t){"use strict";function r(e){return function(){var n=e.apply(this,arguments);return new Promise(function(e,t){function r(a,o){try{var c=n[a](o),i=c.value}catch(e){return void t(e)}if(!c.done)return Promise.resolve(i).then(function(e){r("next",e)},function(e){r("throw",e)});e(i)}return r("next")})}}t.d(n,"e",function(){return m}),t.d(n,"b",function(){return d}),t.d(n,"c",function(){return A}),t.d(n,"a",function(){return h}),t.d(n,"f",function(){return g}),t.d(n,"d",function(){return b});var a=t(10),o=t.n(a),c=t(9),i=t.n(c),l=t(40),s=t(13),u=t(261),p=this,m=function(e){return{type:s.i,payload:e}},f=function(e){return{type:s.j,payload:e}},d=function(e){return function(){var n=r(o.a.mark(function n(t){var r;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i.a.get("/api/campaigns/"+e);case 3:r=n.sent,t(m(r.data)),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.error("Fetching Campaign unsuccessful",n.t0);case 10:case"end":return n.stop()}},n,p,[[0,7]])}));return function(e){return n.apply(this,arguments)}}()},A=function(){return function(){var e=r(o.a.mark(function e(n){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.get("/api/campaigns");case 3:t=e.sent,n(f(t.data)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Fetching Campaigns unsuccessful",e.t0);case 10:case"end":return e.stop()}},e,p,[[0,7]])}));return function(n){return e.apply(this,arguments)}}()},h=function(e){return function(){var n=r(o.a.mark(function n(t){var r;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t(Object(u.c)(!0)),n.prev=1,n.next=4,i.a.post("/api/campaigns",{values:e});case 4:r=n.sent,t(m(r.data)),t(Object(l.b)("/campaigns/"+r.data.id+"/edit")),t(Object(u.c)(!1)),n.next=15;break;case 10:n.prev=10,n.t0=n.catch(1),console.error("Creating new campaign unsuccessful",n.t0),t(Object(u.c)(!1)),t(Object(u.d)("ERROR CREATING NEW CAMPAIGN"));case 15:case"end":return n.stop()}},n,p,[[1,10]])}));return function(e){return n.apply(this,arguments)}}()},g=function(e){return function(){var n=r(o.a.mark(function n(t){var r;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i.a.patch("/api/campaigns/"+e.id,e);case 3:r=n.sent,t(m(r.data)),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.error("Updating Campaign Unsuccessful",n.t0);case 10:case"end":return n.stop()}},n,p,[[0,7]])}));return function(e){return n.apply(this,arguments)}}()},b=function(e,n){return function(){var t=r(o.a.mark(function t(r){var a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("SEND CAMPAIGN",e),t.prev=1,t.next=4,i.a.post("/api/campaigns/send",{html:e,campaignId:n.id});case 4:a=t.sent,r(m(a.data)),r(Object(l.b)("/campaigns")),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),console.error("Submitting campaign unsuccessful",t.t0);case 12:case"end":return t.stop()}},t,p,[[1,9]])}));return function(e){return t.apply(this,arguments)}}()}}});
//# sourceMappingURL=8.facf4a5f.chunk.js.map