(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[2],{35:function(e,a,t){e.exports=t.p+"static/media/img1.0b7bd9f9.jpg"},43:function(e,a,t){e.exports=t(58)},48:function(e,a,t){},54:function(e,a,t){e.exports=t.p+"static/media/img2.6eb60a79.jpg"},55:function(e,a,t){e.exports=t.p+"static/media/img3.c1de829d.jpg"},56:function(e,a,t){e.exports=t.p+"static/media/img4.d9d31d7a.jpg"},57:function(e,a,t){e.exports=t.p+"static/media/img5.bc2eb0a5.jpg"},58:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),c=t(26),s=t.n(c),r=t(4),i=t(11),m=t(12),o=t(13),u=t(14),d=t(15),p=t(16),h=(t(48),Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(12)]).then(t.bind(null,427))}))),E=Object(n.lazy)((function(){return t.e(13).then(t.bind(null,428))})),v=Object(n.lazy)((function(){return t.e(14).then(t.bind(null,429))})),b=Object(n.lazy)((function(){return t.e(9).then(t.bind(null,436))})),g=Object(n.lazy)((function(){return t.e(10).then(t.bind(null,430))})),f=Object(n.lazy)((function(){return t.e(11).then(t.bind(null,431))})),N=Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(4),t.e(7)]).then(t.bind(null,432))})),y=Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(6)]).then(t.bind(null,434))})),w=Object(n.lazy)((function(){return t.e(8).then(t.bind(null,437))})),k=function(e){function a(){return Object(i.a)(this,a),Object(o.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement(n.Suspense,{fallback:""},l.a.createElement(p.d,null,l.a.createElement(p.b,{exact:!0,path:"/"},l.a.createElement(p.a,{to:"/dashboard"})),l.a.createElement(p.b,{exact:!0,path:"/dashboard",component:h}),l.a.createElement(p.b,{exact:!0,path:"/general-pages/signin",component:E}),l.a.createElement(p.b,{exact:!0,path:"/general-pages/signup",component:v}),l.a.createElement(p.b,{exact:!0,path:"/ui-elements/buttons",component:b}),l.a.createElement(p.b,{exact:!0,path:"/ui-elements/dropdowns",component:g}),l.a.createElement(p.b,{exact:!0,path:"/ui-elements/icons",component:f}),l.a.createElement(p.b,{exact:!0,path:"/form/form-elements",component:N}),l.a.createElement(p.b,{exact:!0,path:"/charts/chartjs",component:y}),l.a.createElement(p.b,{exact:!0,path:"/tables/basic-table",component:w})))}}]),a}(n.Component),z=t(60),j=function(e){function a(){return Object(i.a)(this,a),Object(o.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(m.a)(a,[{key:"closeMenu",value:function(e){e.target.closest(".dropdown").classList.remove("show"),e.target.closest(".dropdown .dropdown-menu").classList.remove("show")}},{key:"toggleHeaderMenu",value:function(e){e.preventDefault(),document.querySelector("body").classList.toggle("az-header-menu-show")}},{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&document.querySelector("body").classList.remove("az-header-menu-show")}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("div",{className:"az-header"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"az-header-left"},l.a.createElement("a",{href:"#/",className:"az-logo"},l.a.createElement("span",null)," azia"),l.a.createElement("a",{id:"azMenuShow",onClick:function(a){return e.toggleHeaderMenu(a)},className:"az-header-menu-icon d-lg-none",href:"#/"},l.a.createElement("span",null))),l.a.createElement("div",{className:"az-header-menu"},l.a.createElement("div",{className:"az-header-menu-header"},l.a.createElement(r.b,{to:"/",className:"az-logo"},l.a.createElement("span",null)," azia"),l.a.createElement("a",{href:"#/",onClick:function(a){return e.toggleHeaderMenu(a)},className:"close"},"\xd7")),l.a.createElement("ul",{className:"nav"},l.a.createElement("li",{className:this.isPathActive("/dashboard")?"nav-item active":"nav-item"},l.a.createElement(r.b,{to:"/dashboard",className:"nav-link"},l.a.createElement("i",{className:"typcn typcn-chart-area-outline"})," Dashboard")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(z.a,{className:this.isPathActive("/general-pages")?"nav-item active":"nav-item"},l.a.createElement(z.a.Toggle,{as:"a",className:"nav-link with-sub"},l.a.createElement("i",{className:"typcn typcn-document"})," Pages"),l.a.createElement(z.a.Menu,{className:"az-menu-sub"},l.a.createElement(r.b,{to:"/general-pages/signin",className:this.isPathActive("/general-pages/signin")?"nav-link active":"nav-link"},"Sign In"),l.a.createElement(r.b,{to:"/general-pages/signup",className:this.isPathActive("/general-pages/signup")?"nav-link active":"nav-link"},"Sign Up")))),l.a.createElement("li",{className:"nav-item"},l.a.createElement(z.a,{className:this.isPathActive("/ui-elements")||this.isPathActive("/form")||this.isPathActive("/charts")||this.isPathActive("/tables")?"nav-item active":"nav-item"},l.a.createElement(z.a.Toggle,{as:"a",className:"nav-link with-sub"},l.a.createElement("i",{className:"typcn typcn-book"})," Components"),l.a.createElement(z.a.Menu,{className:"az-menu-sub az-menu-sub-mega"},l.a.createElement("div",{className:"container"},l.a.createElement("div",null,l.a.createElement("nav",{className:"nav"},l.a.createElement("span",null,"UI Elements"),l.a.createElement(r.b,{to:"/ui-elements/buttons",className:this.isPathActive("/ui-elements/buttons")?"nav-link active":"nav-link"},"Buttons"),l.a.createElement(r.b,{to:"/ui-elements/dropdowns",className:this.isPathActive("/ui-elements/dropdowns")?"nav-link active":"nav-link"},"Dropdown"),l.a.createElement(r.b,{to:"/ui-elements/icons",className:this.isPathActive("/ui-elements/icons")?"nav-link active":"nav-link"},"Icons"))),l.a.createElement("div",null,l.a.createElement("nav",{className:"nav"},l.a.createElement("span",null,"Forms"),l.a.createElement(r.b,{to:"/form/form-elements",className:this.isPathActive("/form/form-elements")?"nav-link active":"nav-link"},"Form Elements"))),l.a.createElement("div",null,l.a.createElement("nav",{className:"nav"},l.a.createElement("span",null,"Charts"),l.a.createElement(r.b,{to:"/charts/chartjs",className:this.isPathActive("/charts/chartjs")?"nav-link active":"nav-link"},"ChartJS"))),l.a.createElement("div",null,l.a.createElement("nav",{className:"nav"},l.a.createElement("span",null,"Tables"),l.a.createElement(r.b,{to:"/tables/basic-table",className:this.isPathActive("/tables/basic-table")?"nav-link active":"nav-link"},"Basic Tables"))))))))),l.a.createElement("div",{className:"az-header-right"},l.a.createElement("a",{href:"https://www.bootstrapdash.com/demo/azia-react-free/documentation/documentation.html",className:"az-header-search-link"},l.a.createElement("i",{className:"fas fa-file-alt"})),l.a.createElement("a",{href:"#/",className:"az-header-search-link"},l.a.createElement("i",{className:"fas fa-search"})),l.a.createElement("div",{className:"az-header-message"},l.a.createElement(r.b,{to:"#/"},l.a.createElement("i",{className:"typcn typcn-messages"}))),l.a.createElement(z.a,{className:"az-header-notification"},l.a.createElement(z.a.Toggle,{as:"a",className:"new"},l.a.createElement("i",{className:"typcn typcn-bell"})),l.a.createElement(z.a.Menu,null,l.a.createElement("div",{className:"az-dropdown-header mg-b-20 d-sm-none"},l.a.createElement("a",{href:"#/",onClick:function(a){return e.closeMenu(a)},className:"az-header-arrow"},l.a.createElement("i",{className:"icon ion-md-arrow-back"}))),l.a.createElement("h6",{className:"az-notification-title"},"Notifications"),l.a.createElement("p",{className:"az-notification-text"},"You have 2 unread notification"),l.a.createElement("div",{className:"az-notification-list"},l.a.createElement("div",{className:"media new"},l.a.createElement("div",{className:"az-img-user"},l.a.createElement("img",{src:t(54),alt:""})),l.a.createElement("div",{className:"media-body"},l.a.createElement("p",null,"Congratulate ",l.a.createElement("strong",null,"Socrates Itumay")," for work anniversaries"),l.a.createElement("span",null,"Mar 15 12:32pm"))),l.a.createElement("div",{className:"media new"},l.a.createElement("div",{className:"az-img-user online"},l.a.createElement("img",{src:t(55),alt:""})),l.a.createElement("div",{className:"media-body"},l.a.createElement("p",null,l.a.createElement("strong",null,"Joyce Chua")," just created a new blog post"),l.a.createElement("span",null,"Mar 13 04:16am"))),l.a.createElement("div",{className:"media"},l.a.createElement("div",{className:"az-img-user"},l.a.createElement("img",{src:t(56),alt:""})),l.a.createElement("div",{className:"media-body"},l.a.createElement("p",null,l.a.createElement("strong",null,"Althea Cabardo")," just created a new blog post"),l.a.createElement("span",null,"Mar 13 02:56am"))),l.a.createElement("div",{className:"media"},l.a.createElement("div",{className:"az-img-user"},l.a.createElement("img",{src:t(57),alt:""})),l.a.createElement("div",{className:"media-body"},l.a.createElement("p",null,l.a.createElement("strong",null,"Adrian Monino")," added new comment on your photo"),l.a.createElement("span",null,"Mar 12 10:40pm")))),l.a.createElement("div",{className:"dropdown-footer"},l.a.createElement("a",{href:"#/"},"View All Notifications")))),l.a.createElement(z.a,{className:"az-profile-menu"},l.a.createElement(z.a.Toggle,{as:"a",className:"az-img-user"},l.a.createElement("img",{src:t(35),alt:""})),l.a.createElement(z.a.Menu,null,l.a.createElement("div",{className:"az-dropdown-header d-sm-none"},l.a.createElement("a",{href:"#/",onClick:function(a){return e.closeMenu(a)},className:"az-header-arrow"},l.a.createElement("i",{className:"icon ion-md-arrow-back"}))),l.a.createElement("div",{className:"az-header-profile"},l.a.createElement("div",{className:"az-img-user"},l.a.createElement("img",{src:t(35),alt:""})),l.a.createElement("h6",null,"Aziana Pechon"),l.a.createElement("span",null,"Premium Member")),l.a.createElement("a",{href:"#/",className:"dropdown-item"},l.a.createElement("i",{className:"typcn typcn-user-outline"})," My Profile"),l.a.createElement("a",{href:"#/",className:"dropdown-item"},l.a.createElement("i",{className:"typcn typcn-edit"})," Edit Profile"),l.a.createElement("a",{href:"#/",className:"dropdown-item"},l.a.createElement("i",{className:"typcn typcn-time"})," Activity Logs"),l.a.createElement("a",{href:"#/",className:"dropdown-item"},l.a.createElement("i",{className:"typcn typcn-cog-outline"})," Account Settings"),l.a.createElement(r.b,{to:"/general-pages/signin",className:"dropdown-item"},l.a.createElement("i",{className:"typcn typcn-power-outline"})," Sign Out")))))))}},{key:"isPathActive",value:function(e){return this.props.location.pathname.startsWith(e)}}]),a}(n.Component),O=Object(p.g)(j),P=function(e){function a(){return Object(i.a)(this,a),Object(o.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"az-footer ht-40"},l.a.createElement("div",{className:"container ht-100p pd-t-0-f"},l.a.createElement("div",{className:"d-sm-flex justify-content-center justify-content-sm-between py-2 w-100"},l.a.createElement("span",{className:"text-muted text-center text-sm-left d-block d-sm-inline-block"},"Copyright \xa9 ",l.a.createElement("a",{href:"https://www.bootstrapdash.com/",target:"_blank",rel:"noopener noreferrer"},"bootstrapdash.com "),"2020"),l.a.createElement("span",{className:"float-none float-sm-right d-block mt-1 mt-sm-0 text-center"},l.a.createElement("a",{href:"https://www.bootstrapdash.com/react-admin-templates/",target:"_blank",rel:"noopener noreferrer"}," react admin ")," templates from BootstrapDash.  ")))))}}]),a}(n.Component),A=function(e){function a(){var e,t;Object(i.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(t=Object(o.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(l)))).state={},t}return Object(d.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){this.onRouteChanged()}},{key:"render",value:function(){var e=this.state.isFullPageLayout?"":l.a.createElement(O,null),a=this.state.isFullPageLayout?"":l.a.createElement(P,null);return l.a.createElement("div",null,e,l.a.createElement("div",{className:"az-content-wrapper"},l.a.createElement(k,null)),a)}},{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&this.onRouteChanged()}},{key:"onRouteChanged",value:function(){console.log("ROUTE CHANGED"),window.scrollTo(0,0);for(var e=["/general-pages/signin","/general-pages/signup","/general-pages/page-404"],a=0;a<e.length;a++){if(this.props.location.pathname===e[a]){this.setState({isFullPageLayout:!0}),document.querySelector(".az-content-wrapper").classList.add("p-0");break}this.setState({isFullPageLayout:!1}),document.querySelector(".az-content-wrapper").classList.remove("p-0")}}}]),a}(n.Component),x=Object(p.g)(A);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(r.a,{basename:"/demo/azia-react-free/template/preview"},l.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[43,3,5]]]);
//# sourceMappingURL=main.c228dc62.chunk.js.map