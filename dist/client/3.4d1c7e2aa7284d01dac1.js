webpackJsonp([3,4],{1183:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function s(t){return l("div",{},void 0,l(d["default"],{title:t.post.title}),l("div",{className:p["default"]["single-post"]+" "+p["default"]["post-detail"]},void 0,l("h3",{className:p["default"]["post-title"]},void 0,t.post.title),l("p",{className:p["default"]["author-name"]},void 0,m," ",t.post.name),l("p",{className:p["default"]["post-desc"]},void 0,t.post.content)))}function r(t,e){return{post:(0,_.getPost)(t,e.params.cuid)}}Object.defineProperty(e,"__esModule",{value:!0});var l=function(){var t="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(e,o,n,s){var r=e&&e.defaultProps,l=arguments.length-3;if(o||0===l||(o={}),o&&r)for(var a in r)void 0===o[a]&&(o[a]=r[a]);else o||(o=r||{});if(1===l)o.children=s;else if(l>1){for(var i=Array(l),u=0;u<l;u++)i[u]=arguments[u+3];o.children=i}return{$$typeof:t,type:e,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}();e.PostDetailPage=s;var a=o(2),i=(n(a),o(126)),u=o(456),d=n(u),f=o(125),c=o(1194),p=n(c),v=o(447),_=o(448),m=l(f.FormattedMessage,{id:"by"});s.need=[function(t){return(0,v.fetchPost)(t.cuid)}],e["default"]=(0,i.connect)(r)(s)},1194:function(t,e){t.exports={"single-post":"_2wFZUrnLLPIM2UvuNgnV1r","post-title":"_1BU3HyU1b5fh1tsPA9MtRq","author-name":"_2pYEGhQRMs0Mh9CsoJsCrq","post-desc":"_2hG8tPFCGI0k7BZ5cz9nnH","post-action":"_37qYFcYfJHxrTH_bV6-TQo",divider:"_3H_6OlXO_Hx_93avyoPoZ2","post-detail":"_16xorg78DM6DwmPTBglw02"}}});