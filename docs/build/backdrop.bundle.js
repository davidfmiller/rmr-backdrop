!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){!function(){"use strict";window.Backdrop=n(1)}()},function(t,e){!function(){"use strict";var e=!1,n={color:"transparent",position:"top left",repeat:"no-repeat",attachment:"fixed",size:"cover"},r=function(t){return t+"-"+parseInt(100*Math.random(),10)+"-"+parseInt(1e3*Math.random(),10)},o=function(t){var e=t.getBoundingClientRect(),n={top:e.top,left:e.left,bottom:e.bottom,right:e.right};return n.top+=window.pageYOffset,n.left+=window.pageXOffset,n.bottom+=window.pageYOffset,n.right+=window.pageYOffset,n.width=e.right-e.left,n.height=e.bottom-e.top,n},i=function(t,e){var n={};for(var r in t)n[r]=t[r];for(r in e)n[r]=e[r];return n},s=function(t,e){for(var n in e)t.style[n]=e[n]},d=function(t,e){for(var n in e)if(e.hasOwnProperty(n)){var r="background"+n.charAt(0).toUpperCase()+n.substr(1),o=e[n];t.style[r]=o}},u=function(t){t||(t={}),this.events={end:function(){},start:function(){}},this.node=t.hasOwnProperty("node")?"string"==typeof t.node?document.querySelector(t.node):t.node:document.body,this.id=t.hasOwnProperty("id")?t.id:r("backdrop"),this.url=t.hasOwnProperty("url")?t.url:null,this.styles=t.hasOwnProperty("styles")?t.styles:null,this.url&&this.drop(this.url)};u.prototype.on=function(t,e){return this.events[t]=e,this},u.prototype.drop=function(t){"string"==typeof t?(this.url=t,this.styles=null):t&&(t.hasOwnProperty("url")&&(this.url=t.url),t.hasOwnProperty("styles")&&(this.styles=t.styles));var r=new Image,o={};return o.$=this,o.node=document.createElement("div"),o.node.setAttribute("id",this.id),o.node.classList.add("rmr-backdrop"),o.$.resize(),r.onload=function(){var t=i(n,o.$.styles);o.$.node.appendChild(o.node),o.$.resize(),o.$.events.start(o.$.url),t.image="url("+this.src+")",d(o.node,t);var s=0,u=function(){if(s+=.04,o.node.style.opacity=s,s>=1){var t=i(n,o.$.styles);t.image="url("+r.src+")",o.$.events.end(o.$.url),d(o.$.node,t),o.node.parentNode.removeChild(o.node),window.clearInterval(a)}},a=window.setInterval(u,10);e||window.addEventListener("resize",function(t){o.$.resize()}),e=!0},r.src=this.url,this},u.prototype.resize=function(){var t=(document.body,null),e=document.getElementById(this.id);return t=o(this.node),this.node==document.body&&(document.body.style.minHeight=window.innerHeight+"px"),e&&s(e,{width:t.width+"px",height:t.height+"px"}),this},u.prototype.toString=function(){return"[Backdrop v0.1]"},t.exports=u}()}]);