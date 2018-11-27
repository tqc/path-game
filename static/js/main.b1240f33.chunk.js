(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){e.exports=n(33)},24:function(e,t,n){},26:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),l=n(16),o=n.n(l),a=(n(24),n(1)),s=n(2),c=n(5),v=n(3),u=n(4),d=(n(26),n(10)),f=function(e){return{type:"NEW_GAME",text:e}},h=function(e){return{type:"VISIT_VERTEX",id:e}},g=function(e){return{type:"RESET_LEVEL",id:e}},p=n(7),m=function(e){function t(){return Object(a.a)(this,t),Object(c.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.tile,n=e.tileState,r=e.tileSize,l=e.edgeSize;return i.a.createElement("div",{className:"tile "+(t.tileType||"")+(n.valid?" valid":" invalid"),style:{width:r,height:r,left:t.x1*(r+l),top:t.y1*(r+l),color:t.color||"black"}})}}]),t}(r.Component),b=function(e){function t(){return Object(a.a)(this,t),Object(c.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.edge,n=e.edgeState,r=e.tileSize,l=e.edgeSize;return t.x1===t.x2?i.a.createElement("div",{className:"edge vertical"+(n.visited?" visited":"")+(t.broken?" broken":""),style:{width:l,height:r,left:t.x1*(r+l)-l,top:t.y1*(r+l)}}):i.a.createElement("div",{className:"edge horizontal"+(n.visited?" visited":"")+(t.broken?" broken":""),style:{width:r,height:l,left:t.x1*(r+l),top:t.y1*(r+l)-l}})}}]),t}(r.Component),y=function(e){function t(){return Object(a.a)(this,t),Object(c.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.vertex,n=e.vertexState,r=e.tileSize,l=e.edgeSize;return"entry"===t.vertexType?i.a.createElement("div",{className:"vertex "+(t.vertexType||"")+(n.visited?" visited":""),style:{width:3*l,height:3*l,left:t.x*(r+l)-l-l,top:t.y*(r+l)-l-l}}):"exit"===t.vertexType?i.a.createElement("div",{className:"vertex "+(t.vertexType||"")+(n.visited?" visited":""),style:{width:3*l,height:3*l,left:t.x*(r+l)-l-l,top:t.y*(r+l)-l-l}}):i.a.createElement("div",{className:"vertex "+(t.vertexType||"")+(n.visited?" visited":""),style:{width:l,height:l,left:t.x*(r+l)-l,top:t.y*(r+l)-l}})}}]),t}(r.Component),x=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(c.a)(this,Object(v.a)(t).call(this))).onMouseDown=e.onMouseDown.bind(Object(p.a)(Object(p.a)(e))),e.onMouseMove=e.onMouseMove.bind(Object(p.a)(Object(p.a)(e))),e.onMouseUp=e.onMouseUp.bind(Object(p.a)(Object(p.a)(e))),e.state={},e.dragging=!1,e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"onMouseDown",value:function(e){this.dragging=!0}},{key:"onMouseMove",value:function(e){if(this.dragging){var t=this.props,n=t.level,r=t.visitVertex,i=e.nativeEvent.clientX-this.div.offsetLeft,l=e.nativeEvent.clientY-this.div.offsetTop,o=Math.round(i/60)-1,a=Math.round(l/60)-1;if(console.log(i+", "+l+" => "+o+", "+a),o>=0&&a>=0&&a<=n.rows&&o<=n.cols)r(a*(n.cols+1)+o)}}},{key:"onMouseUp",value:function(e){if(this.dragging){this.dragging=!1;var t=this.props,n=t.level,r=t.visitVertex,i=e.nativeEvent.clientX-this.div.offsetLeft,l=e.nativeEvent.clientY-this.div.offsetTop,o=Math.round(i/60)-1,a=Math.round(l/60)-1;if(console.log(i+", "+l+" => "+o+", "+a),o>=0&&a>=0&&a<=n.rows&&o<=n.cols)r(a*(n.cols+1)+o)}}},{key:"render",value:function(){var e=this,t=this.props.level;if(t&&t.tiles&&t.tiles[0]){var n=null;return t.completed&&!t.won?n=i.a.createElement("div",{className:"boardOverlay"}):t.completed&&t.won&&(n=i.a.createElement("div",{className:"boardOverlay"})),i.a.createElement("div",{className:"board "+(t.completed?" completed":"")+(t.won?" won":""),ref:function(t){return e.div=t},onMouseDown:this.onMouseDown,onMouseMove:this.onMouseMove,onMouseUp:this.onMouseUp},t.tiles.map(function(e,n){return i.a.createElement(m,{key:n,tile:e,tileState:t.tileState[n],tileSize:50,edgeSize:10})}),t.edges.map(function(e,n){return i.a.createElement(b,{key:n,edge:e,edgeId:n,edgeState:t.edgeState[n],tileSize:50,edgeSize:10})}),t.vertices.map(function(e,n){return i.a.createElement(y,{key:n,vertex:e,vertexId:n,vertexState:t.vertexState[n],tileSize:50,edgeSize:10})}),n)}return i.a.createElement("div",{className:"board"},"No game loaded;")}}]),t}(r.Component),O=Object(d.b)(function(e){return{}},function(e){return{resetLevel:function(t){return e(g(t))},newGame:function(t){return e(f(t))},visitVertex:function(t){return e(h(t))}}})(x),j=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(c.a)(this,Object(v.a)(t).call(this))).state={},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.level,r=t.prevLevel,l=t.nextLevel;return i.a.createElement("div",{className:"boardcontainer",ref:function(t){return e.div=t},onClick:this.onClick},r?i.a.createElement("div",{className:"prevLevel"},i.a.createElement(O,{level:r})):null,n?i.a.createElement("div",{className:"currentLevel"},i.a.createElement(O,{level:n})):null,l?i.a.createElement("div",{className:"nextLevel"},i.a.createElement(O,{level:l})):null)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return t.level&&e.level?t.level&&e.level&&t.level.levelId!==e.level.levelId?(console.log("resetting"),{nextLevel:e.level,level:null,prevLevel:t.level}):(!t.level.completed&&e.level.completed&&(e.level.won?setTimeout(function(){return e.newGame()},500):setTimeout(function(){return e.resetLevel()},1e3)),{nextLevel:null,level:e.level,prevLevel:null}):{nextLevel:null,level:e.level,prevLevel:null}}}]),t}(r.Component),M=Object(d.b)(function(e){return{level:e.level}},function(e){return{resetLevel:function(t){return e(g(t))},newGame:function(t){return e(f(t))},visitVertex:function(t){return e(h(t))}}})(j),E=function(e){function t(){return Object(a.a)(this,t),Object(c.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(M,null))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w=n(9),S=n(8),k=n(11),T={blank:{validate:function(){return!0}},sameColor:{place:function(e,t){console.log("placing sameColor tiles");var n=["black","white","red","blue","green"],r=Math.min(n.length,Math.floor(Math.random()*(e.length-2)+2));console.log("placing sameColor tiles - "+r);for(var i=Object(k.a)(e.keys()),l=0;l<r;l++){var o=Math.floor(Math.random()*i.length),a=i[o];i.splice(o,1);for(var s=e[a],c=Math.ceil(s.length/2),v=Math.floor(Math.random()*(c-1)+1),u=0;u<v;u++){var d=t[s[Math.floor(Math.random()*s.length)]];"blank"===d.tileType&&(d.tileType="sameColor",d.color=n[l])}}},validate:function(e,t,n,r){var i=n[e],l=t.filter(function(t){if(t===e)return!1;var r=n[t];return i.tileType===r.tileType&&i.color!==r.color});return l.length>0&&(console.log("failed on tile "+e),console.log(i),console.log(t),console.log(l),console.log(n[l[0]])),0===l.length}}};function L(e,t){return t.filter(function(t,n){return!(t.vertices.length<2)&&(t.vertices[0]===e||t.vertices[1]===e)}).map(function(t,n){return t.vertices[0]===e?t.vertices[1]:t.vertices[0]})}function N(e,t){for(var n=[],r=0;r<t.length;r++){var i=e.indexOf(t[r].vertices[0]),l=e.indexOf(t[r].vertices[1]);i>=0&&l>=0&&1===Math.abs(l-i)&&n.push(r)}return n}function z(e,t,n,r,i,l){n.splice(n.indexOf(e),1),t.push(e);var o=i.filter(function(t,r){if(t.tiles.length<2)return!1;if(l.indexOf(r)>=0)return!1;var i;if(t.tiles[0]===e)i=t.tiles[1];else{if(t.tiles[1]!==e)return!1;i=t.tiles[0]}return!(n.indexOf(i)<0)}).map(function(t,n){return t.tiles[0]===e?t.tiles[1]:t.tiles[0]}),a=!0,s=!1,c=void 0;try{for(var v,u=o[Symbol.iterator]();!(a=(v=u.next()).done);a=!0){var d=v.value;n.indexOf(d)<0||z(d,t,n,r,i,l)}}catch(f){s=!0,c=f}finally{try{a||null==u.return||u.return()}finally{if(s)throw c}}}function C(e,t,n){for(var r=e.map(function(e,t){return t}),i=[];r.length>0;){var l=[];z(r[0],l,r,e,t,n),i.push(l)}return i}function I(e,t){for(var n={name:"Generated Level",levelId:Math.floor(1e7*Math.random()),rows:e,cols:t,tiles:[],edges:[],vertices:[],path:[],completed:!1,won:!1},r=0;r<=e;r++)for(var i=0;i<=t;i++){var l={x:i+1,y:r+1};n.vertices.push(l)}for(var o=0;o<=e;o++){for(var a=0;a<t;a++){var s={x1:a+1,y1:o+1,x2:a+2,y2:o+1,broken:!1,tiles:[],vertices:[o*(t+1)+a,o*(t+1)+a+1]};o>0&&s.tiles.push((o-1)*t+a),o<e&&s.tiles.push(o*t+a),n.edges.push(s)}if(o<e)for(var c=0;c<=t;c++){var v={x1:c+1,y1:o+1,x2:c+1,y2:o+2,broken:!1,tiles:[],vertices:[o*(t+1)+c,(o+1)*(t+1)+c]};c>0&&v.tiles.push(o*t+c-1),c<t&&v.tiles.push(o*t+c),n.edges.push(v)}}for(var u=0;u<e;u++)for(var d=0;d<t;d++){var f={tileType:"blank",x1:d+1,y1:u+1,x2:d+2,y2:u+2};n.tiles.push(f)}for(var h=0;h<n.vertices.length;h++)n.vertices[h].neighbours=L(h,n.edges);for(var g=[(e+1)*(t+1)-5],p=0;p<g.length;p++)n.vertices[g[p]].vertexType="entry";for(var m=[4],b=0;b<m.length;b++)n.vertices[m[b]].vertexType="exit";for(var y=function e(t,n,r,i){if("exit"===n[t[t.length-1]].vertexType){var l=N(t,r),o={path:t,length:t.length,regions:C(i,r,l),edges:l};return o.regions.length<4?null:o}var a=n[t[t.length-1]].neighbours.filter(function(e){return t.indexOf(e)<0});if(0===a.length)return null;for(var s,c=Math.random()>.5&&t.length>1;!c&&!s;){var v=a[Math.floor(Math.random()*a.length)];if(s=e(Object(k.a)(t).concat([v]),n,r,i))return s;c=Math.random()>.5&&t.length>1}return null}([g[0]],n.vertices,n.edges,n.tiles),x=0;x<y.regions.length;x++)for(var O=0;O<y.regions[x].length;O++)n.tiles[y.regions[x][O]].solutionRegion=x;for(var j=Math.floor(15*Math.random()+5),M=0;M<j;M++){var E=Math.floor(Math.random()*n.edges.length);y.edges.indexOf(E)>=0||(console.log("breaking edge "+E),n.edges[E].broken=!0)}for(var w=["sameColor"],S=0;S<w.length;S++){T[w[S]].place(y.regions,n.tiles)}return n.edgeState=n.edges.map(function(e){return{visited:!1}}),n.vertexState=n.vertices.map(function(e){return{visited:!1}}),n.tileState=n.tiles.map(function(e){return{valid:!0}}),n.regions=[n.tiles.map(function(e,t){return t})],n.vertexState[g[0]].visited=!0,n.path=[g[0]],n}var V={level:Object(S.a)({},I(8,8))},D=Object(w.b)({level:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V.level,t=arguments.length>1?arguments[1]:void 0;switch(console.log(t.type),t.type){case"NEW_GAME":return Object(S.a)({},e,I(8,8));case"RESET_LEVEL":return Object(S.a)({},e,{edgeState:e.edges.map(function(e){return{visited:!1}}),vertexState:e.vertices.map(function(e){return{visited:!1}}),tileState:e.tiles.map(function(e){return{valid:!0}}),regions:[e.tiles.map(function(e,t){return t})],path:[],completed:!1,won:!1});case"VISIT_VERTEX":console.log(t.type),console.log(t.id);var n=t.id,r=Object(k.a)(e.vertexState);r[n]=Object(S.a)({},r[n]);var i=e.vertices[n],l=Object(k.a)(e.path),o=!1,a=!1;if(!i)return e;if(e.completed)return e;var s=l[l.length-1],c=l[l.length-2],v=e.edges.findIndex(function(e){return e.vertices.indexOf(n)>=0&&e.vertices.indexOf(s)>=0&&!e.broken}),u=e.edges[v];if(console.log("Found edge "+v),console.log(u),0===l.length&&"entry"!==i.vertexType)return e;if(1===l.length&&"entry"===i.vertexType)l=[n],(r=e.vertices.map(function(e){return{visited:!1}}))[n].visited=!0;else if("entry"!==i.vertexType||u)if(n===c)r[l.pop()]={visited:!1};else{if(r[n].visited)return e;if(l.length>0&&!u)return e;r[n].visited=!0,l.push(n),"exit"===i.vertexType&&(o=!0)}else l=[n],(r=e.vertices.map(function(e){return{visited:!1}}))[n].visited=!0;var d=N(l,e.edges),f=e.edgeState.map(function(e,t){return d.indexOf(t)>=0?{visited:!0}:{visited:!1}}),h=C(e.tiles,e.edges,d);a=!0;for(var g=e.tiles.map(function(t,n){return Object(S.a)({},e.tileState[n],{valid:!0})}),p=0;p<h.length;p++){var m=!0,b=!1,y=void 0;try{for(var x,O=h[p][Symbol.iterator]();!(m=(x=O.next()).done);m=!0){var j=x.value;g[j].region=p;var M=T[e.tiles[j].tileType].validate(j,h[p],e.tiles,g);M||(a=!1),g[j].valid=M}}catch(E){b=!0,y=E}finally{try{m||null==O.return||O.return()}finally{if(b)throw y}}}return Object(S.a)({},e,{vertexState:r,edgeState:f,tileState:g,path:l,completed:o,won:a,regions:h});default:return e}}}),G=Object(w.c)(D);o.a.render(i.a.createElement(d.a,{store:G},i.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.b1240f33.chunk.js.map