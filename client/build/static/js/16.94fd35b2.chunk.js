webpackJsonp([16],{668:function(n,t,e){"use strict";function a(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function A(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?n:t}function o(n,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=e(0),i=e.n(r),s=e(23),m=(e(135),e(839)),l=function(){function n(n,t){for(var e=0;e<t.length;e++){var a=t[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(n,a.key,a)}}return function(t,e,a){return e&&n(t.prototype,e),a&&n(t,a),t}}(),C=function(n){function t(n){return a(this,t),A(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n))}return o(t,n),l(t,[{key:"componentWillReceiveProps",value:function(n){n.isAuthed&&this.props.history.push("/dashboard")}},{key:"componentDidMount",value:function(){this.props.isAuthed&&this.props.history.push("/dashboard")}},{key:"render",value:function(){return i.a.createElement(m.a,null)}}]),t}(i.a.Component),c=function(n){return{isAuthed:n.authReducer.isAuthed}};t.default=Object(s.b)(c,null)(C)},839:function(n,t,e){"use strict";var a=e(0),A=e.n(a),o=e(840),r=e(843),i=(e.n(r),function(){return A.a.createElement("div",{className:"LandingPageContainer"},A.a.createElement("div",{className:"LandingPage"},A.a.createElement("div",{className:"ContentBox"},A.a.createElement("div",{className:"PrimaryHeading"},A.a.createElement("h1",{className:"PrimaryHeading_Main"},"Tempo"),A.a.createElement("h2",{className:"PrimaryHeading_Sub"},"by LeadCloud")),A.a.createElement(o.a,null))))});t.a=i},840:function(n,t,e){"use strict";var a=e(0),A=e.n(a),o=e(841),r=(e.n(o),function(){return A.a.createElement("button",{className:"googleButton"},A.a.createElement("a",{target:"_self",href:"/api/auth/google"},A.a.createElement("span",{className:"googleButton_text"},"Login with Google")))});t.a=r},841:function(n,t,e){var a=e(842);"string"===typeof a&&(a=[[n.i,a,""]]);var A={hmr:!1};A.transform=void 0;e(664)(a,A);a.locals&&(n.exports=a.locals)},842:function(n,t,e){t=n.exports=e(663)(!0),t.push([n.i,".googleButton{display:block;margin-top:2.5rem;width:22.5rem;height:4.5rem;border-radius:3rem;margin-bottom:14px;outline:none;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s;background-color:#fff;border:none}.googleButton a{font-size:14px;font-weight:400;text-decoration:none}.googleButton_text{color:#000;font-size:1.6rem;font-weight:300;letter-spacing:.125rem;margin-right:-.125rem;text-decoration:none}.googleButton:hover{-webkit-transform:translateY(-.2rem);-ms-transform:translateY(-.2rem);transform:translateY(-.2rem);-webkit-box-shadow:0 1rem 2rem rgba(0,0,0,.2);box-shadow:0 1rem 2rem rgba(0,0,0,.2)}.googleButton:active{-webkit-transform:translateY(-.1rem);-ms-transform:translateY(-.1rem);transform:translateY(-.1rem);-webkit-box-shadow:0 .5rem 1rem rgba(0,0,0,.2);box-shadow:0 .5rem 1rem rgba(0,0,0,.2)}","",{version:3,sources:["/Users/Alex_K/Dropbox/Development/Portfolio/leadcloud-v5/client/src/components/GoogleButton/GoogleButton.css"],names:[],mappings:"AAAA,cACE,cAAe,AACf,kBAAmB,AACnB,cAAe,AACf,cAAe,AACf,mBAAoB,AACpB,mBAAoB,AACpB,aAAc,AACd,2BAA6B,AAC7B,sBAAwB,AACxB,mBAAqB,AACrB,sBAAwB,AACxB,WAAa,CACd,AAED,gBACE,eAAgB,AAChB,gBAAiB,AACjB,oBAAsB,CACvB,AAED,mBACE,WAAa,AACb,iBAAkB,AAClB,gBAAiB,AACjB,uBAAyB,AACzB,sBAAwB,AACxB,oBAAsB,CACvB,AAED,oBACE,qCAAuC,AACnC,iCAAmC,AAC/B,6BAA+B,AACvC,8CAAmD,AAC3C,qCAA2C,CACpD,AAED,qBACE,qCAAuC,AACnC,iCAAmC,AAC/B,6BAA+B,AACvC,+CAAqD,AAC7C,sCAA6C,CACtD",file:"GoogleButton.css",sourcesContent:[".googleButton {\n  display: block;\n  margin-top: 2.5rem;\n  width: 22.5rem;\n  height: 4.5rem;\n  border-radius: 3rem;\n  margin-bottom: 14px;\n  outline: none;\n  -webkit-transition: all 0.2s;\n  -o-transition: all 0.2s;\n  transition: all 0.2s;\n  background-color: white;\n  border: none;\n}\n\n.googleButton a {\n  font-size: 14px;\n  font-weight: 400;\n  text-decoration: none;\n}\n\n.googleButton_text {\n  color: black;\n  font-size: 1.6rem;\n  font-weight: 300;\n  letter-spacing: 0.125rem;\n  margin-right: -0.125rem;\n  text-decoration: none;\n}\n\n.googleButton:hover {\n  -webkit-transform: translateY(-0.2rem);\n      -ms-transform: translateY(-0.2rem);\n          transform: translateY(-0.2rem);\n  -webkit-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);\n          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);\n}\n\n.googleButton:active {\n  -webkit-transform: translateY(-0.1rem);\n      -ms-transform: translateY(-0.1rem);\n          transform: translateY(-0.1rem);\n  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);\n          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);\n}\n"],sourceRoot:""}])},843:function(n,t,e){var a=e(844);"string"===typeof a&&(a=[[n.i,a,""]]);var A={hmr:!1};A.transform=void 0;e(664)(a,A);a.locals&&(n.exports=a.locals)},844:function(n,t,e){t=n.exports=e(663)(!0),t.push([n.i,"@media (max-width:375px){html{font-size:8.8px}}.LandingPageContainer{background-image:url("+e(667)+");background-position:top;background-size:cover;height:100vh}.LandingPage{height:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.ContentBox{background-color:rgba(0,0,0,.75);color:#000;height:48rem;width:33rem;padding:1rem;border-radius:3px;overflow:hidden;margin-top:0}.ContentBox,.PrimaryHeading{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.PrimaryHeading{text-align:center}.PrimaryHeading_Main{display:block;padding:0;font-size:7rem;font-weight:300;margin-top:-4rem;letter-spacing:2.5rem;margin-right:-2.5rem;-webkit-animation-name:moveInLeft;animation-name:moveInLeft;-webkit-animation-duration:2.5s;animation-duration:2.5s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;color:#fff}.PrimaryHeading_Sub{display:block;font-size:3.2rem;font-weight:100;margin-top:0;letter-spacing:.5rem;margin-right:-.5rem;-webkit-animation-name:moveInRight;animation-name:moveInRight;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;color:#fff}@-webkit-keyframes moveInLeft{0%{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes moveInLeft{0%{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes moveInRight{0%{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes moveInRight{0%{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}","",{version:3,sources:["/Users/Alex_K/Dropbox/Development/Portfolio/leadcloud-v5/client/src/components/LandingPage/LandingPage.css"],names:[],mappings:"AAEA,yBACE,KACE,eAAiB,CAClB,CACF,AAED,sBACE,+CAAiD,AACjD,wBAAyB,AACzB,sBAAuB,AACvB,YAAoB,CAErB,AAED,aACE,YAAa,AACb,oBAAqB,AACrB,aAAc,AACd,sBAAuB,AACnB,mBAAoB,AACxB,qBAAsB,AAClB,sBAAwB,CAC7B,AAED,YASE,iCAAsC,AACtC,WAAa,AACb,aAAc,AACd,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,gBAAiB,AACjB,YAAkB,CACnB,AAGD,4BAnBE,oBAAqB,AACrB,aAAc,AACd,0BAA2B,AACvB,sBAAuB,AAC3B,sBAAuB,AACnB,mBAAoB,AACxB,qBAAsB,AAClB,sBAAwB,CAuB7B,AAXD,gBACE,iBAAmB,CAUpB,AAED,qBACE,cAAe,AACf,UAAc,AACd,eAAgB,AAChB,gBAAiB,AACjB,iBAAkB,AAClB,sBAAuB,AACvB,qBAAsB,AACtB,kCAAmC,AAC3B,0BAA2B,AACnC,gCAAiC,AACzB,wBAAyB,AACjC,2CAA4C,AACpC,mCAAoC,AAC5C,UAAa,CACd,AAED,oBACE,cAAe,AACf,iBAAkB,AAClB,gBAAiB,AACjB,aAAiB,AACjB,qBAAuB,AACvB,oBAAsB,AACtB,mCAAoC,AAC5B,2BAA4B,AACpC,8BAA+B,AACvB,sBAAuB,AAC/B,2CAA4C,AACpC,mCAAoC,AAC5C,UAAa,CACd,AAID,8BACE,GACE,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACtC,AAID,GACE,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CAClC,CACF,AAED,sBACE,GACE,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACtC,AAID,GACE,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CAClC,CACF,AAED,+BACE,GACE,UAAW,AACX,mCAAoC,AAC5B,0BAA4B,CACrC,AACD,GACE,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CAClC,CACF,AAED,uBACE,GACE,UAAW,AACX,mCAAoC,AAC5B,0BAA4B,CACrC,AACD,GACE,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CAClC,CACF",file:"LandingPage.css",sourcesContent:["/*Media Queries*/\n\n@media (max-width: 375px) {\n  html {\n    font-size: 8.8px;\n  }\n}\n\n.LandingPageContainer {\n  background-image: url(../../images/mountain.jpg);\n  background-position: top;\n  background-size: cover;\n  height: calc(100vh);\n  /*clip-path: polygon(0 0, 100% 0, 100% 87%, 0 100%);*/\n}\n\n.LandingPage {\n  height: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n\n.ContentBox {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  background-color: rgba(0, 0, 0, 0.75);\n  color: black;\n  height: 48rem;\n  width: 33rem;\n  padding: 1rem;\n  border-radius: 3px;\n  overflow: hidden;\n  margin-top: -0rem;\n}\n/*Heading*/\n\n.PrimaryHeading {\n  text-align: center;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  /*backface-visibility: hidden;*/\n}\n\n.PrimaryHeading_Main {\n  display: block;\n  padding: 0rem;\n  font-size: 7rem;\n  font-weight: 300;\n  margin-top: -4rem;\n  letter-spacing: 2.5rem;\n  margin-right: -2.5rem;\n  -webkit-animation-name: moveInLeft;\n          animation-name: moveInLeft;\n  -webkit-animation-duration: 2.5s;\n          animation-duration: 2.5s;\n  -webkit-animation-timing-function: ease-out;\n          animation-timing-function: ease-out;\n  color: white;\n}\n\n.PrimaryHeading_Sub {\n  display: block;\n  font-size: 3.2rem;\n  font-weight: 100;\n  margin-top: 0rem;\n  letter-spacing: 0.5rem;\n  margin-right: -0.5rem;\n  -webkit-animation-name: moveInRight;\n          animation-name: moveInRight;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-timing-function: ease-out;\n          animation-timing-function: ease-out;\n  color: white;\n}\n\n/*Animations*/\n\n@-webkit-keyframes moveInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px);\n  }\n  /*80% {\n    transform: translateX(5px);\n  }*/\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n}\n\n@keyframes moveInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px);\n  }\n  /*80% {\n    transform: translateX(5px);\n  }*/\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n}\n\n@-webkit-keyframes moveInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n            transform: translateX(20px);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n}\n\n@keyframes moveInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n            transform: translateX(20px);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=16.94fd35b2.chunk.js.map