(this["webpackJsonpbulk-buster"]=this["webpackJsonpbulk-buster"]||[]).push([[0],{178:function(e,t,a){},182:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(29),o=a.n(l),s=a(27),c=a(9);var u=function(e){return r.a.createElement("div",{className:"newContainer"},r.a.createElement("p",null,"This tool performs bulk tasks using the Uberflip API."),r.a.createElement("p",null,"Navigate to the various tabs in the navigation bar to perform bulk actions."),r.a.createElement("h5",{style:{marginTop:40}},"CSV Templates"),r.a.createElement("div",null,r.a.createElement("p",null,"To run a bulk create, please navigate to the following templates and tab"),r.a.createElement("label",null,r.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1iuoyIPQHMsxZiSOefFQCCPsMSY8eqKUXAPSeg9lWGts/edit?usp=sharing",target:"_blank",rel:"noopener noreferrer"},"CREATE"))),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1IoKWwlaJFmgkLYsGBh-2frUKVbSwNupsMdWeZOUH9qI/edit?usp=sharing",target:"_blank",rel:"noopener noreferrer"},"UPDATE"))),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1VeXSwQ9Cq4uXct4fegW2er3vqa9RU4Yzc-oAFeFprL4/edit?usp=sharing",target:"_blank",rel:"noopener noreferrer"},"DELETE"))))},i=a(4),m=a(20),E=a(6),p=a.n(E),h=a(21),g=a.n(h),d=a(22),A=a.n(d),f=a(23),v=a.n(f);a(65),a(41);var O=function(e){var t=Object(n.useState)(""),a=Object(i.a)(t,2),l=a[0],o=a[1],s=Object(n.useState)(""),c=Object(i.a)(s,2),u=c[0],E=c[1],h=Object(n.useState)("null"),d=Object(i.a)(h,2),f=d[0],O=d[1],b=Object(n.useState)(""),S=Object(i.a)(b,2),T=S[0],C=S[1],j=Object(n.useState)(""),y=Object(i.a)(j,2),I=y[0],w=y[1],M=Object(n.useState)(""),k=Object(i.a)(M,2),q=k[0],P=k[1],U=Object(n.useState)(!1),N=Object(i.a)(U,2),D=N[0],x=N[1],R=Object(n.useState)(!1),Q=Object(i.a)(R,2),B=Q[0],L=Q[1],H=Object(n.useState)(!1),K=Object(i.a)(H,2),V=K[0],J=K[1],W=Object(n.useState)(!1),F=Object(i.a)(W,2),G=F[0],Y=F[1],z=Object(n.useState)(!1),Z=Object(i.a)(z,2),X=Z[0],_=Z[1];Object(n.useEffect)((function(){"Tags"===f||"Streams"===f||"Items"===f||"User Profiles"===f||"Test"===f?(x(!0),L(!1),J(!1),Y(!1),_(!1)):(x(!1),L(!1),J(!1),Y(!1),_(!1))}),[f]);var $=function(e){var t=e.target.result;C(t)},ee=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("img",{style:{marginRight:5},src:g.a,width:"20",height:"20",alt:"Check"}),r.a.createElement("label",null," ",I.data))},te=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("img",{style:{marginRight:5},src:A.a,width:"20",height:"20",alt:"Check"}),r.a.createElement("label",null," ",q.status," ",q.data.message))},ae=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{style:{marginTop:30}},r.a.createElement("input",{type:"file",accept:".csv",onChange:function(e){return function(e){var t=new FileReader;t.onloadend=$,t.readAsText(e),L(!0),console.log(e.name)}(e.target.files[0])}})))},ne=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("h5",{style:{marginTop:30}},"Data Preview:"),r.a.createElement("div",null,r.a.createElement(m.CsvToHtmlTable,{data:T,csvDelimiter:",",tableClassName:"table table-striped table-hover"})))},re=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(v.a,{type:"Bars",color:"#0e8643",height:"30",weight:"30"}),r.a.createElement("label",{style:{marginLeft:-15}},"Executing operator...")))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("form",null,r.a.createElement("h3",null,"Bulk Create"),r.a.createElement("h5",{style:{marginTop:30}},"Enter API Credentials"),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"API Key",type:"text",value:l,onChange:function(e){return o(e.target.value)},required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"API Secret",type:"text",value:u,onChange:function(e){return E(e.target.value)},required:!0})),r.a.createElement("h5",{style:{marginTop:30}},"Select Operator"),r.a.createElement("div",{className:"form-group"},r.a.createElement("select",{value:f,onChange:function(e){return O(e.target.value)}},r.a.createElement("option",{default:!0,value:"null"},"Please Select..."),r.a.createElement("option",{value:"Items"},"Items"),r.a.createElement("option",{value:"Tags"},"Tags"),r.a.createElement("option",{value:"Streams"},"Streams"),r.a.createElement("option",{value:"User Profiles"},"User Profiles"))),X?r.a.createElement(re,null):null,V?r.a.createElement(ee,null):null,G?r.a.createElement(te,null):null,D?r.a.createElement(ae,null):null,B?r.a.createElement(ne,null):null,r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("input",{onClick:function(e){e.preventDefault();var t={APIKey:l,APISecret:u,fileContents:T};"Tags"===f?window.confirm("Are you sure you want to CREATE and TAG these items?")?(x(!1),L(!1),J(!1),Y(!1),_(!0),p.a.post("/create/tags/",t).then((function(e){e.status>=200&&e.status<300&&(_(!1),w(e),J(!0),console.log(e))})).catch((function(e){e.response?(_(!1),x(!1),L(!1),P(e.response),Y(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Create operation cancelled."):"Streams"===f?window.confirm("Are you sure you want to CREATE these STREAMS?")?(x(!1),L(!1),J(!1),Y(!1),_(!0),p.a.post("create/streams",t).then((function(e){e.status>=200&&e.status<300&&(_(!1),w(e),J(!0),console.log(e))})).catch((function(e){e.response?(_(!1),x(!1),L(!1),P(e.response),Y(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Create operation cancelled."):"Items"===f?window.confirm("Are you sure you want to CREATE these ITEMS?")?(x(!1),L(!1),J(!1),Y(!1),_(!0),p.a.post("create/items",t).then((function(e){e.status>=200&&e.status<300&&(_(!1),w(e),J(!0),console.log(e))})).catch((function(e){e.response?(_(!1),x(!1),L(!1),P(e.response),Y(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Create operation cancelled."):"User Profiles"===f?window.confirm("Are you sure you want to CREATE these USERS?")?(x(!1),L(!1),J(!1),Y(!1),_(!0),p.a.post("create/users",t).then((function(e){e.status>=200&&e.status<300&&(_(!1),w(e),J(!0),console.log(e))})).catch((function(e){console.log(e),console.debug(e),e.response?(_(!1),x(!1),L(!1),P(e.response),Y(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Create operation cancelled."):"Test"===f&&(window.confirm("Are you sure you want to this TEST call?")?(x(!1),L(!1),J(!1),Y(!1),_(!0),p.a.post("create/test",t).then((function(e){if(e.status>=200&&e.status<300)_(!1),w(e),J(!0),console.log(e);else if(e.status<=300)throw new Error("API ERROR")})).catch((function(e){console.log(e),console.debug(e),e.response?(_(!1),x(!1),L(!1),P(e.response),Y(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Create operation cancelled."))},type:"submit",value:"Execute",className:"btn btn-success"})))))},b=a(32),S=a.n(b);a(118);var T=function(e){var t=Object(n.useState)(""),a=Object(i.a)(t,2),l=a[0],o=a[1],s=Object(n.useState)(""),c=Object(i.a)(s,2),u=c[0],E=c[1],h=Object(n.useState)(""),d=Object(i.a)(h,2),f=d[0],O=d[1],b=Object(n.useState)(""),T=Object(i.a)(b,2),C=T[0],j=T[1],y=Object(n.useState)(""),I=Object(i.a)(y,2),w=I[0],M=I[1],k=Object(n.useState)(""),q=Object(i.a)(k,2),P=q[0],U=q[1],N=Object(n.useState)(""),D=Object(i.a)(N,2),x=D[0],R=D[1],Q=Object(n.useState)(""),B=Object(i.a)(Q,2),L=B[0],H=B[1],K=Object(n.useState)(""),V=Object(i.a)(K,2),J=V[0],W=V[1],F=Object(n.useState)(""),G=Object(i.a)(F,2),Y=G[0],z=G[1],Z=Object(n.useState)(""),X=Object(i.a)(Z,2),_=X[0],$=X[1],ee=Object(n.useState)(""),te=Object(i.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)(new Date),le=Object(i.a)(re,2),oe=le[0],se=le[1],ce=Object(n.useState)(!1),ue=Object(i.a)(ce,2),ie=ue[0],me=ue[1],Ee=Object(n.useState)(!1),pe=Object(i.a)(Ee,2),he=pe[0],ge=pe[1],de=Object(n.useState)(!1),Ae=Object(i.a)(de,2),fe=Ae[0],ve=Ae[1],Oe=Object(n.useState)(!1),be=Object(i.a)(Oe,2),Se=be[0],Te=be[1],Ce=Object(n.useState)(!1),je=Object(i.a)(Ce,2),ye=je[0],Ie=je[1],we=Object(n.useState)(!1),Me=Object(i.a)(we,2),ke=Me[0],qe=Me[1],Pe=Object(n.useState)(!1),Ue=Object(i.a)(Pe,2),Ne=Ue[0],De=Ue[1],xe=Object(n.useState)(!1),Re=Object(i.a)(xe,2),Qe=Re[0],Be=Re[1],Le=Object(n.useState)(!1),He=Object(i.a)(Le,2),Ke=He[0],Ve=He[1];Object(n.useEffect)((function(){"Hide Past Content"===f||"Show Past Content"===f?(Ve(!1),Te(!0),Ie(!1),qe(!1),De(!1),Be(!1),ve(!1),me(!1),ge(!1)):"Author"===f||"SEO"===f||"Metadata"===f||"Populate Stream"===f||"Items"===f?(Ve(!1),Te(!1),Ie(!0),qe(!1),De(!1),Be(!1),ve(!1),me(!1),ge(!1)):"Item Embedded Content"===f?(Ve(!1),Te(!1),Ie(!1),qe(!1),De(!1),Be(!1),me(!1),ve(!0),ge(!1)):"Stream Embedded Content"===f?(Ve(!1),Te(!1),Ie(!1),qe(!1),De(!1),Be(!1),me(!0),ve(!0),ge(!1)):"Tag Search"===f?(Ve(!1),Te(!1),Ie(!1),qe(!1),De(!1),Be(!1),me(!1),ve(!1),ge(!0)):(Ve(!1),Te(!1),Ie(!1),qe(!1),De(!1),Be(!1),me(!1),ve(!1),ge(!1))}),[f]);var Je=function(e){var t=e.target.result;j(t)},We=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("img",{style:{marginRight:5},src:g.a,width:"20",height:"20",alt:"Check"}),r.a.createElement("label",null," ",_.data))},Fe=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("img",{style:{marginRight:5},src:A.a,width:"20",height:"20",alt:"Check"}),r.a.createElement("label",null," ",ae.status," ",ae.data.message))},Ge=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{style:{marginTop:30}},r.a.createElement("input",{type:"file",accept:".csv",onChange:function(e){return function(e){var t=new FileReader;t.onloadend=Je,t.readAsText(e),qe(!0)}(e.target.files[0])}})))},Ye=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("h5",{style:{marginTop:30}},"Data Preview:"),r.a.createElement("div",null,r.a.createElement(m.CsvToHtmlTable,{data:C,csvDelimiter:",",tableClassName:"table table-striped table-hover"})))},ze=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(v.a,{type:"Bars",color:"#0e8643",height:"30",weight:"30"}),r.a.createElement("label",{style:{marginLeft:-15}},"Executing operator...")))},Ze=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Select date to remove past content: "),r.a.createElement("div",null,r.a.createElement(S.a,{selected:oe,onChange:function(e){return se(e)}})))},Xe=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"Stream ID",type:"text",value:P,onChange:function(e){return U(e.target.value)},required:!0}))},_e=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"Tag Search",type:"text",value:J,onChange:function(e){return W(e.target.value)},required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"Append Canonical",type:"text",value:Y,onChange:function(e){return z(e.target.value)},required:!0})))},$e=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"Unique Item Search",type:"text",value:w,onChange:function(e){return M(e.target.value)},required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"Search Value",type:"text",value:x,onChange:function(e){return R(e.target.value)},required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"Replace Value",type:"text",value:L,onChange:function(e){return H(e.target.value)},required:!0})))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("form",null,r.a.createElement("h3",null,"Bulk Update"),r.a.createElement("h5",{style:{marginTop:30}},"Enter API Credentials"),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"API Key",type:"text",value:l,onChange:function(e){return o(e.target.value)},required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"API Secret",type:"text",value:u,onChange:function(e){return E(e.target.value)},required:!0})),r.a.createElement("h5",{style:{marginTop:30}},"Select Operator"),r.a.createElement("div",{className:"form-group"},r.a.createElement("select",{value:f,onChange:function(e){return O(e.target.value)}},r.a.createElement("option",{default:!0},"Please Select..."),r.a.createElement("option",{value:"Populate Stream"},"Populate Stream"),r.a.createElement("option",{value:"Hide Past Content"},"Hide Past Content"),r.a.createElement("option",{value:"Show Past Content"},"Show Past Content"),r.a.createElement("option",{value:"Items"},"Items"),r.a.createElement("option",{value:"Author"},"Item Author"),r.a.createElement("option",{value:"SEO"},"Item SEO"),r.a.createElement("option",{value:"Metadata"},"Item Metadata"),r.a.createElement("option",{value:"Item Embedded Content"},"All Item's Embedded Content"),r.a.createElement("option",{value:"Stream Embedded Content"},"Stream Item's Embedded Content"),r.a.createElement("option",{value:"Tag Search"},"Tag Search"))),Ke?r.a.createElement(ze,null):null,Ne?r.a.createElement(We,null):null,Qe?r.a.createElement(Fe,null):null,ie?r.a.createElement(Xe,null):null,he?r.a.createElement(_e,null):null,fe?r.a.createElement($e,null):null,Se?r.a.createElement(Ze,null):null,ye?r.a.createElement(Ge,null):null,ke?r.a.createElement(Ye,null):null,r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("input",{onClick:function(e){e.preventDefault();var t={APIKey:l,APISecret:u,selectDate:oe,fileContents:C,selectValue:f,uniqueSearch:w,streamId:P,itemSearch:x,itemReplace:L,tagSearch:J,canonAppend:Y};"Hide Past Content"===f?window.confirm("Are you sure you want to HIDE items prior to "+oe+"?")?(Te(!1),Ie(!1),ge(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/hidePastContent",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Show Past Content"===f?window.confirm("Are you sure you want to SHOW items prior to "+oe+"?")?(Te(!1),Ie(!1),ge(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/showPastContent",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Author"===f?window.confirm("Are you sure you want to UPDATE the AUTHOR of these items?")?(Te(!1),Ie(!1),ge(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/author",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"SEO"===f?window.confirm("Are you sure you want to UPDATE the SEO of these items?")?(Te(!1),ge(!1),Ie(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/seo",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Metadata"===f?window.confirm("Are you sure you want to UPDATE the METADATA of these items?")?(Te(!1),ge(!1),Ie(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/metadata",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Populate Stream"===f?window.confirm("Are you sure you want to UPDATE these STREAMS?")?(Te(!1),Ie(!1),ge(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/populateStreams",t).then((function(e){if(e.status>=200&&e.status<300)Ve(!1),$(e),De(!0),console.log(e);else if(e.status<=300)throw new Error("API ERROR")})).catch((function(e){console.log(e),console.debug(e),e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Item Embedded Content"===f?window.confirm("Are you sure you want to UPDATE these ITEMS EMBEDDED CONTENT?")?(me(!1),ge(!1),ve(!1),Te(!1),Ie(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/itemContent",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Stream Embedded Content"===f?window.confirm("Are you sure you want to UPDATE stream ".concat(P," ITEM EMBEDDED CONTENT?"))?(me(!1),ge(!1),ve(!1),Te(!1),Ie(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/streamItemContent",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Items"===f?window.confirm("Are you sure you want to UPDATE the listed ITEMS?")?(me(!1),ge(!1),ve(!1),Te(!1),Ie(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/items",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."):"Tag Search"===f&&(window.confirm("Are you sure you want to UPDATE the found ITEMS?")?(me(!1),ge(!1),ve(!1),Te(!1),Ie(!1),qe(!1),Ve(!0),De(!1),Be(!1),p.a.post("/update/tagSearch",t).then((function(e){e.status>=200&&e.status<300&&(Ve(!1),$(e),De(!0),console.log(e))})).catch((function(e){e.response?(Ve(!1),Ie(!1),qe(!1),ne(e.response),Be(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):console.log("Update operation cancelled."))},type:"submit",value:"Execute",className:"btn btn-success"})))))};var C=function(e){var t=Object(n.useState)(""),a=Object(i.a)(t,2),l=a[0],o=a[1],s=Object(n.useState)(""),c=Object(i.a)(s,2),u=c[0],E=c[1],h=Object(n.useState)(""),d=Object(i.a)(h,2),f=d[0],O=d[1],b=Object(n.useState)(""),T=Object(i.a)(b,2),C=T[0],j=T[1],y=Object(n.useState)(""),I=Object(i.a)(y,2),w=I[0],M=I[1],k=Object(n.useState)(""),q=Object(i.a)(k,2),P=q[0],U=q[1],N=Object(n.useState)(""),D=Object(i.a)(N,2),x=D[0],R=D[1],Q=Object(n.useState)(new Date),B=Object(i.a)(Q,2),L=B[0],H=B[1],K=Object(n.useState)(!1),V=Object(i.a)(K,2),J=V[0],W=V[1],F=Object(n.useState)(!1),G=Object(i.a)(F,2),Y=G[0],z=G[1],Z=Object(n.useState)(!1),X=Object(i.a)(Z,2),_=X[0],$=X[1],ee=Object(n.useState)(!1),te=Object(i.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)(!1),le=Object(i.a)(re,2),oe=le[0],se=le[1],ce=Object(n.useState)(!1),ue=Object(i.a)(ce,2),ie=ue[0],me=ue[1],Ee=Object(n.useState)(!1),pe=Object(i.a)(Ee,2),he=pe[0],ge=pe[1],de=Object(n.useState)(!1),Ae=Object(i.a)(de,2),fe=Ae[0],ve=Ae[1],Oe=Object(n.useState)(!1),be=Object(i.a)(Oe,2),Se=be[0],Te=be[1],Ce=Object(n.useRef)(),je=Object(n.useRef)();Object(n.useEffect)((function(){"All Tags"===f?(Ce.current.placeholder="API Key",je.current.placeholder="API Secret",z(!0),$(!1),se(!1),me(!1),ge(!1),ve(!1),ne(!1),Te(!1)):"Tag List"===f||"Stream Items"===f||"Hidden Items"===f||"Streams"===f?(Ce.current.placeholder="API Key",je.current.placeholder="API Secret",z(!1),$(!1),se(!0),me(!1),ge(!1),ve(!1),ne(!1),Te(!1)):"Past Content"===f?(Ce.current.placeholder="API Key",je.current.placeholder="API Secret",z(!1),$(!0),se(!1),me(!1),ge(!1),ve(!1),ne(!1),Te(!1)):"Flipbook Folders"===f?(Ce.current.placeholder="API Key",je.current.placeholder="Signature",z(!1),$(!1),se(!1),me(!1),ge(!1),ve(!1),ne(!0),Te(!1)):(Ce.current.placeholder="API Key",je.current.placeholder="API Secret",z(!1),$(!1),se(!1),me(!1),ge(!1),ve(!1),ne(!1),Te(!1))}),[f]);var ye=function(e){var t=e.target.result;j(t)},Ie=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Delete All"),r.a.createElement("input",{type:"checkbox",checked:J,onChange:function(e){return W(!J)}}))},we=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("img",{style:{marginRight:5},src:g.a,width:"20",height:"20",alt:"Check"}),r.a.createElement("label",null," ",P.data))},Me=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("img",{style:{marginRight:5},src:A.a,width:"20",height:"20",alt:"Check"}),r.a.createElement("label",null," ",x.status," ",x.data.message))},ke=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{style:{marginTop:30}},r.a.createElement("input",{type:"file",accept:".csv",onChange:function(e){return function(e){var t=new FileReader;t.onloadend=ye,t.readAsText(e),me(!0)}(e.target.files[0])}})))},qe=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("h5",{style:{marginTop:30}},"Data Preview:"),r.a.createElement("div",null,r.a.createElement(m.CsvToHtmlTable,{data:C,csvDelimiter:",",tableClassName:"table table-striped table-hover"})))},Pe=function(){return r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(v.a,{type:"Bars",color:"#0e8643",height:"30",weight:"30"}),r.a.createElement("label",{style:{marginLeft:-15}},"Executing operator...")))},Ue=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Select date to remove past content: "),r.a.createElement("div",null,r.a.createElement(S.a,{selected:L,onChange:function(e){return H(e)}})))},Ne=function(){return r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{placeholder:"Hub ID",type:"text",value:w,onChange:function(e){return M(e.target.value)},required:!0})))};return r.a.createElement("div",{className:"container"},r.a.createElement("form",null,r.a.createElement("h3",null,"Bulk Delete"),r.a.createElement("h5",{style:{marginTop:30}},"Enter API Credentials"),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{ref:Ce,placeholder:"API Key",type:"text",value:l,onChange:function(e){return o(e.target.value)},required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{ref:je,placeholder:"API Secret",type:"text",value:u,onChange:function(e){return E(e.target.value)},required:!0})),ae?r.a.createElement(Ne,null):null,r.a.createElement("h5",{style:{marginTop:30}},"Select Operator"),r.a.createElement("div",{className:"form-group"},r.a.createElement("select",{value:f,onChange:function(e){return O(e.target.value)}},r.a.createElement("option",{default:!0},"Please Select..."),r.a.createElement("option",{value:"Tag List"},"Tag List"),r.a.createElement("option",{value:"Stream Items"},"Marketing Stream Items"),r.a.createElement("option",{value:"Hidden Items"},"Hidden Marketing Stream Items"),r.a.createElement("option",{value:"Past Content"},"Past Items"),r.a.createElement("option",{value:"Streams"},"Streams"),r.a.createElement("option",{value:"All Tags"},"All Tags"))),Se?r.a.createElement(Pe,null):null,he?r.a.createElement(we,null):null,fe?r.a.createElement(Me,null):null,Y?r.a.createElement(Ie,null):null,_?r.a.createElement(Ue,null):null,oe?r.a.createElement(ke,null):null,ie?r.a.createElement(qe,null):null,r.a.createElement("div",{className:"form-group",style:{marginTop:30}},r.a.createElement("input",{onClick:function(e){e.preventDefault();var t={APIKey:l,APISecret:u,selectDate:L,fileContents:C};if(!0===J)"DELETE ALL TAGS"===window.prompt("Type 'DELETE ALL TAGS' to execute.")?(se(!1),me(!1),z(!1),ge(!1),ve(!1),Te(!0),p.a.post("/delete/allTags",t).then((function(e){e.status>=200&&e.status<300&&(Te(!1),U(e),ge(!0),console.log(e))})).catch((function(e){e.response?(Te(!1),se(!1),me(!1),R(e.response),ve(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):alert("Delete operation cancelled.");else if("Tag List"===f){"DELETE TAG LIST"===window.prompt("Type 'DELETE TAG LIST' to execute.")?(se(!1),me(!1),ge(!1),ve(!1),Te(!0),p.a.post("/delete/tagList",t).then((function(e){e.status>=200&&e.status<300&&(Te(!1),U(e),ge(!0),console.log(e))})).catch((function(e){e.response?(Te(!1),se(!1),me(!1),R(e.response),ve(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):alert("Delete operation cancelled.")}else if("Stream Items"===f){"DELETE STREAM ITEMS"===window.prompt("Type 'DELETE STREAM ITEMS' to execute.")?(se(!1),me(!1),ge(!1),ve(!1),Te(!0),p.a.post("/delete/streamItems",t).then((function(e){e.status>=200&&e.status<300&&(Te(!1),U(e),ge(!0),console.log(e))})).catch((function(e){e.response?(Te(!1),se(!1),me(!1),R(e.response),ve(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):alert("Delete operation cancelled.")}else if("Hidden Items"===f){"DELETE HIDDEN ITEMS"===window.prompt("Type 'DELETE HIDDEN ITEMS' to execute.")?(se(!1),me(!1),ge(!1),ve(!1),Te(!0),p.a.post("/delete/hiddenItems",t).then((function(e){e.status>=200&&e.status<300&&(Te(!1),U(e),ge(!0),console.log(e))})).catch((function(e){e.response?(Te(!1),se(!1),me(!1),R(e.response),ve(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):alert("Delete operation cancelled.")}else if("Past Content"===f){"DELETE PAST ITEMS"===window.prompt("Type 'DELETE PAST ITEMS' to delete items before "+L+".")?(se(!1),me(!1),$(!1),ge(!1),ve(!1),Te(!0),p.a.post("/delete/pastItems",t).then((function(e){e.status>=200&&e.status<300&&(Te(!1),U(e),ge(!0),console.log(e))})).catch((function(e){e.response?(Te(!1),se(!1),me(!1),R(e.response),ve(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):alert("Delete operation cancelled.")}else if("Streams"===f){"DELETE STREAMS"===window.prompt("Type 'DELETE STREAMS' to delete these streams.")?(se(!1),me(!1),ge(!1),ve(!1),Te(!0),p.a.post("/delete/streams",t).then((function(e){e.status>=200&&e.status<300&&(Te(!1),U(e),ge(!0),console.log(e))})).catch((function(e){e.response?(Te(!1),se(!1),me(!1),R(e.response),ve(!0)):e.request?console.log("Client never recieved request: "+e.request):console.log("Error:"+e.message)}))):alert("Delete operation cancelled.")}},type:"submit",value:"Execute",className:"btn btn-success"}))))},j=(a(177),a(178),a(73)),y=a.n(j);var I=function(){return r.a.createElement(s.a,null,r.a.createElement("nav",{className:"navbar"},r.a.createElement("a",{className:"navbar-brand",href:"/"},r.a.createElement("img",{src:y.a,width:"80",height:"80",alt:"Uberflip Hulk"})),r.a.createElement(s.b,{exact:!0,activeClassName:"navbar__link--active",className:"navbar__link navbar-brand",to:"/"}," Bulk Smasher "),r.a.createElement(s.b,{activeClassName:"navbar__link--active",className:"navbar__link",to:"/create"}," Create "),r.a.createElement(s.b,{activeClassName:"navbar__link--active",className:"navbar__link",to:"/update"}," Update "),r.a.createElement(s.b,{activeClassName:"navbar__link--active",className:"navbar__link",to:"/delete"}," Delete ")),r.a.createElement(c.a,{path:"/",exact:!0,component:u}),r.a.createElement(c.a,{path:"/create",component:O}),r.a.createElement(c.a,{path:"/update",component:T}),r.a.createElement(c.a,{path:"/delete",component:C}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I,null)),document.getElementById("root"))},21:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABaFBMVEUAAAALhUMPhkMOhkMOhkMOhkQOhkMOhkQOhkMOhkMOhkQOhUQPh0QMi0YOhEIOh0MOhUMOhkMOhkQOh0MSgEkNhkMOhkMNhkMNhUMOhkMOhkMNhkMOgEcA/wAOhUQOhkIOhUMAqlUOg0UOhkQOh0MOh0AOhkMOh0IAgIAOhkMAgFUOhkIOhkQOh0MPhUQOhUQOhkMOhkMNhkMOhkMOhkMPhkMNhUQOhkMPhzwNhkIOhkIRiEQNhUQOh0MOh0MPhkMOhUINhkMPhEUOhkMNhEIPh0QPhkIOhkMMhkkOhkMXi0YPhUMOh0IOhkMOhkMOhkMNg0EQh0AOhkMMiEIOhUMOhkMRiEQPg0YAmTMPhkMOhkMOhkMOhkMOhkMPh0MOh0MPh0EOhkINhkIUiTsOhUMOhkMQgEAPhkQNhUIOh0MPg0IPh0QPh0IOh0IPhkQOhkMAgEAPhUMNh0IOhUMOhkMMhkQOhkMAAAB1bbLlAAAAdnRSTlMAF1SBp8zf7vrepoBTFjaQ1tWPNQ522ROG8O+FEgFe6m8DJcjHJPJZAo0GpbWhVlrx8ybJxmdi7BGHgw912NrSSVA0zU1E0/4VzwvBf6TK4Ccg7T6w+R4hBa/O4cvdjEgz13QN6+kQZWDFIyJVjougBJ1RWNRS7Jx7IQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCRgTMDupkSzLAAACY0lEQVRYw6WW+UMSQRTHJ64VxBs0VNRKC4TK0tLU8iqhQigKtQxTSUvtPr5/f7PcO7tzLd/f9u1+vjtvjjePEI6ueLw+f8Do6jKC/lB3uIdoqbevH4wGBodU6Uh0GI4ajkYU8JGrMXA1OjYuweMTkxDKmLom4q/fgFTTM3w+PCrngZu3OHiiTwU3lUw48bMhVR5IzTrwaXUeSNsc4rd1eMDHZqGcf3MerPwdXR64287PzOkb3LvftoDz+jyw0JqGB2544GHz/Cy6M5hcqhs8cscDy/Xzr3QCnBRbqRpE3fLAatXgsXuDJybfq/792vpG0BrZ1NrEW3TWn1pD5obu1+HJM2tsm9b/jA4f8VuDmSzxaPELbDhMvGr88xHKv3hpi+eIryMeO8Svwvudx0+VJwUmMv/qdVqdR4AUmcgbWl/fKvNYJCUmskFYBxGPks0gsMs4CHlqwKaAwh4F9t81Ht/z5r+RwgGEDhKeTuIHe7DcykI8fpjL6HQjNscg+7+5kbrBd5DzdCs7H6ZaFiuS8cM8TD3Ox/lgr1Zxxf9HhrZ/AxA4SHis0W8GOe+Cu9LxA4fUYIj3suD5uCXhcdRhWT/u9GI56fBqK1ZqSzXm1sBbv53HP7njT88aDcJndwZfWi3OtBv+PN5qki5i+nzssr1N+6pvwLTc33T572yr+0OPD9kads1me9/erv/8pc7vOPB0MZPK+ceJs34bKvjcH8LVhayAUJ1fEoHiE6divDiVIGItLQvyMLxnRK7KKqdGHZ9UFPCqNpN/mWqf2T48UqVryoZzqXzZKJWMcj6V+5flffcfoGV4U1O1HG4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDktMjRUMTk6NDg6NTkrMDA6MDC2PrQwAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA5LTI0VDE5OjQ4OjU5KzAwOjAwx2MMjAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="},22:function(e,t){e.exports="data:image/png;base64,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"},65:function(e,t,a){},73:function(e,t,a){e.exports=a.p+"static/media/logo.96b9e4de.png"},75:function(e,t,a){e.exports=a(182)}},[[75,1,2]]]);
//# sourceMappingURL=main.afe59056.chunk.js.map