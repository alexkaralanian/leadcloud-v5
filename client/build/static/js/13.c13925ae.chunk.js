webpackJsonp([13],{1042:function(e,t,n){(function(t){function n(e,t,n){function r(t){var n=y,a=b;return y=b=void 0,C=t,d=e.apply(a,n)}function o(e){return C=e,g=setTimeout(f,t),P?r(e):d}function l(e){var n=e-w,a=e-C,r=t-n;return _?j(r,E-a):r}function u(e){var n=e-w,a=e-C;return void 0===w||n>=t||n<0||_&&a>=E}function f(){var e=O();if(u(e))return s(e);g=setTimeout(f,l(e))}function s(e){return g=void 0,k&&y?r(e):(y=b=void 0,d)}function m(){void 0!==g&&clearTimeout(g),C=0,y=w=b=g=void 0}function p(){return void 0===g?d:s(O())}function h(){var e=O(),n=u(e);if(y=arguments,b=this,w=e,n){if(void 0===g)return o(w);if(_)return g=setTimeout(f,t),r(w)}return void 0===g&&(g=setTimeout(f,t)),d}var y,b,E,d,g,w,C=0,P=!1,_=!1,k=!0;if("function"!=typeof e)throw new TypeError(i);return t=c(t)||0,a(n)&&(P=!!n.leading,_="maxWait"in n,E=_?v(c(n.maxWait)||0,t):E,k="trailing"in n?!!n.trailing:k),h.cancel=m,h.flush=p,h}function a(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==typeof e}function o(e){return"symbol"==typeof e||r(e)&&g.call(e)==u}function c(e){if("number"==typeof e)return e;if(o(e))return l;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(f,"");var n=m.test(e);return n||p.test(e)?h(e.slice(2),n?2:8):s.test(e)?l:+e}var i="Expected a function",l=NaN,u="[object Symbol]",f=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,p=/^0o[0-7]+$/i,h=parseInt,y="object"==typeof t&&t&&t.Object===Object&&t,b="object"==typeof self&&self&&self.Object===Object&&self,E=y||b||Function("return this")(),d=Object.prototype,g=d.toString,v=Math.max,j=Math.min,O=function(){return E.Date.now()};e.exports=n}).call(t,n(28))},1043:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(0),i=n.n(c),l=n(27),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),f=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(){return i.a.createElement(l.G,{"aria-label":"Page navigation example",className:"mt-4 float-right"},i.a.createElement(l.H,null,i.a.createElement(l.I,{previous:!0,href:"#"})),i.a.createElement(l.H,null,i.a.createElement(l.I,{href:"#"},"1")),i.a.createElement(l.H,null,i.a.createElement(l.I,{href:"#"},"2")),i.a.createElement(l.H,null,i.a.createElement(l.I,{href:"#"},"3")),i.a.createElement(l.H,null,i.a.createElement(l.I,{href:"#"},"4")),i.a.createElement(l.H,null,i.a.createElement(l.I,{href:"#"},"5")),i.a.createElement(l.H,null,i.a.createElement(l.I,{next:!0,href:"#"})))}}]),t}(i.a.Component);t.a=f},1237:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(0),i=n.n(c),l=n(21),u=n(262),f=n(91),s=n(265),m=n.n(s),p=n(27),h=n(1042),y=n.n(h),b=n(278),E=n(1043),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),g=function(e){function t(){var e,n,o,c;a(this,t);for(var i=arguments.length,l=Array(i),u=0;u<i;u++)l[u]=arguments[u];return n=o=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.makeEmailsQuery=function(e){var t="";return e.forEach(function(e){t+="from: "+e.value.trim()+" OR "}),t=t.slice(0,t.length-4)},o.makeSearchQuery=function(e){var t=o.props,n=t.contact,a=t.setPageToken,r=o.makeEmailsQuery(n.email);return e.length<1&&a(""),e.toLowerCase()+" "+r},c=n,r(o,c)}return o(t,e),d(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.contact,n=e.fetchContactEmails;t.email&&n(this.makeEmailsQuery(t.email))}},{key:"componentWillReceiveProps",value:function(e){var t=this.props,n=t.contact,a=t.fetchContactEmails;n!==e.contact&&e.contact.email&&a(this.makeEmailsQuery(e.contact.email))}},{key:"componentWillUnmount",value:function(){(0,this.props.setContactEmails)([]),Object(b.g)("")}},{key:"render",value:function(){var e=this,t=this.props,n=t.contactEmails,a=(t.onPageChange,t.onPageSizeChange,t.onFilteredChange,t.fetchContactEmails),r=(t.page,t.pages,t.pageSize,t.loading,t.match),o=(r.params.id,[{Header:"Sender",id:"name",accessor:function(e){return i.a.createElement("span",null,e.emailAddress)}},{Header:"Subject",id:"subject",accessor:function(e){return i.a.createElement("span",null,i.a.createElement(f.a,{to:"/emails/"+e.id},e.subject))}},{Header:"Date",id:"date",accessor:function(e){return i.a.createElement("span",null,m()(e.date).format("ddd, M/D/YY h:mma"))}}]);return i.a.createElement(p.g,{className:"mb-0"},i.a.createElement(p.j,null,i.a.createElement("i",{className:"fa fa-align-justify"}),i.a.createElement("strong",null,"Contact Emails")),i.a.createElement(p.h,null,i.a.createElement(u.a,{className:"-highlight",data:n,columns:o,defaultPageSize:20,minRows:3,showPaginationBottom:!1},function(t,n,r){var o=void 0;return i.a.createElement("div",null,i.a.createElement("input",{className:"form-control mb-4",placeholder:"Search...",type:"text",ref:function(e){return o=e},onChange:y()(function(){return a(e.makeSearchQuery(o.value))},500)}),n(),i.a.createElement(E.a,null))})))}}]),t}(i.a.Component),v=function(e){return{contactEmails:e.contactEmails.contactEmails,contact:e.contact.contact,page:e.contactEmails.page,pages:e.contactEmails.pages,loading:e.contactEmails.loading,filtered:e.contactEmails.filtered}},j={fetchContactEmails:b.b,onPageChange:b.d,onPageSizeChange:b.e,onFilteredChange:b.c,setContactEmails:b.f,setPageToken:b.g};t.default=Object(l.b)(v,j)(g)}});
//# sourceMappingURL=13.c13925ae.chunk.js.map