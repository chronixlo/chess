var z=Object.defineProperty;var J=(t,e,n)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var a=(t,e,n)=>J(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();const f=8,G={p:1,n:3,b:3,r:5,q:9,k:100},S={b:"♝",q:"♛",r:"♜",k:"♚",p:"♟",n:"♞"},q=`br,bn,bb,bq,bk,bb,bn,br
bp,bp,bp,bp,bp,bp,bp,bp
,,,,,,,
,,,,,,,
,,,,,,,
,,,,,,,
wp,wp,wp,wp,wp,wp,wp,wp
wr,wn,wb,wq,wk,wb,wn,wr`,ee=q.split(`
`).map(t=>t.split(",")),te=new Array(f).fill(null).map((t,e)=>({x:-e,y:-e})),ne=new Array(f).fill(null).map((t,e)=>({x:-e,y:+e})),se=new Array(f).fill(null).map((t,e)=>({x:+e,y:+e})),ie=new Array(f).fill(null).map((t,e)=>({x:+e,y:-e}));function K(t,e,n){return[...p(t,e,n,te),...p(t,e,n,ie),...p(t,e,n,ne),...p(t,e,n,se)]}function R(t,e,n,i){const s=V(e);return!i&&n==="w"&&t.canWhiteCastleQueenside&&!t.whiteChecked&&t.board[e.y][e.x-1]===""&&t.board[e.y][e.x-2]===""&&t.board[e.y][e.x-3]===""?s.push(...P(t,e,"b","q")):!i&&n==="b"&&t.canBlackCastleQueenside&&!t.blackChecked&&t.board[e.y][e.x-1]===""&&t.board[e.y][e.x-2]===""&&t.board[e.y][e.x-3]===""&&s.push(...P(t,e,"w","q")),!i&&n==="w"&&t.canWhiteCastleKingside&&!t.whiteChecked&&t.board[e.y][e.x+1]===""&&t.board[e.y][e.x+2]===""?s.push(...P(t,e,"b","k")):!i&&n==="b"&&t.canBlackCastleKingside&&!t.blackChecked&&t.board[e.y][e.x+1]===""&&t.board[e.y][e.x+2]===""&&s.push(...P(t,e,"w","k")),s.filter(E).filter(l=>!V(l).filter(E).some(d=>t.board[d.y][d.x]===(n==="b"?"wk":"bk"))).filter(l=>!A(t,l,n))}function P(t,e,n,i){const s=i==="q"?-1:1,l=i==="q"?-2:2;let r=!0;e:for(let d=0;d<f;d++)for(let y=0;y<f;y++){const o=t.board[d][y];if((o==null?void 0:o[0])===n&&H(t,{x:y,y:d},t.board[d][y],!0).some(h=>h.x===e.x+s&&h.y===e.y)){r=!1;break e}}return r?[{x:e.x+l,y:e.y}]:[]}function V(t){const e=[];for(let n=-1;n<2;n++)for(let i=-1;i<2;i++)n===0&&i===0||e.push({x:t.x+n,y:t.y+i});return e}function X(t,e,n){return[{x:e.x+1,y:e.y+2},{x:e.x+2,y:e.y+1},{x:e.x-1,y:e.y+2},{x:e.x-2,y:e.y+1},{x:e.x+1,y:e.y-2},{x:e.x+2,y:e.y-1},{x:e.x-1,y:e.y-2},{x:e.x-2,y:e.y-1}].filter(s=>E(s)).filter(s=>!A(t,s,n))}function le(t,e,n){const i=[],s=n==="w"?[...e.y!==0?[{x:e.x,y:e.y-1}]:[]]:[...e.y!==7?[{x:e.x,y:e.y+1}]:[]];s.length&&!g(t,s[0])&&(n==="w"&&e.y===6?s.push({x:e.x,y:e.y-2}):n==="b"&&e.y===1&&s.push({x:e.x,y:e.y+2}));const l=n==="w"?[{x:e.x-1,y:e.y-1},{x:e.x+1,y:e.y-1}]:[{x:e.x-1,y:e.y+1},{x:e.x+1,y:e.y+1}];return i.push(...s.filter(E).filter(r=>!g(t,r))),i.push(...l.filter(E).filter(r=>{var y,o,c,h;if(n==="w"&&((y=t.blackEnPassant)==null?void 0:y.x)===r.x&&((o=t.blackEnPassant)==null?void 0:o.y)===r.y||n==="b"&&((c=t.whiteEnPassant)==null?void 0:c.x)===r.x&&((h=t.whiteEnPassant)==null?void 0:h.y)===r.y)return!0;const d=t.board[r.y][r.x];return!((d==null?void 0:d[0])===void 0||d[0]===n)})),i}const ce=new Array(f).fill(null).map((t,e)=>({x:-e})),oe=new Array(f).fill(null).map((t,e)=>({x:+e})),re=new Array(f).fill(null).map((t,e)=>({y:-e})),he=new Array(f).fill(null).map((t,e)=>({y:+e}));function _(t,e,n){return[...p(t,e,n,ce),...p(t,e,n,oe),...p(t,e,n,re),...p(t,e,n,he)]}function de(t,e,n){return[...K(t,e,n),..._(t,e,n)]}const E=t=>t.x<f&&t.x>=0&&t.y<f&&t.y>=0,g=(t,e)=>t.board[e.y][e.x]!=="",A=(t,e,n)=>{const i=t.board[e.y][e.x];return(i==null?void 0:i[0])===n};function $(t,e,n){return H(t,e,n).filter(s=>{const l=new I({...t,onEndTurn:null,onMove:null});return l.move(e,s),l.updateChecked(),n[0]==="w"?!l.whiteChecked:!l.blackChecked})}function H(t,e,n,i){const s=n[0],l=n[1];return l==="p"?le(t,e,s):l==="n"?X(t,e,s):l==="b"?K(t,e,s):l==="r"?_(t,e,s):l==="k"?R(t,e,s,i):l==="q"?de(t,e,s):[]}function N(t,e){return t===0||t===f-1||e===0||e===f-1}function p(t,e,n,i){const s=[];for(let l of i){if(!l.x&&!l.y)continue;const r={x:e.x+(l.x||0),y:e.y+(l.y||0)};if(!E(r)||A(t,r,n)||(s.push(r),g(t,r)))break}return s}function ae(t){return t>1e6?Math.round(t/1e5)/10+"M":t>1e4?Math.round(t/100)/10+"K":t}function fe(t){const e=t.turn===0?"w":"b",n=[];for(let i=0;i<f;i++)for(let s=0;s<f;s++){const l=t.board[i][s];(l==null?void 0:l[0])===e&&n.push({x:s,y:i})}return n}function O(t,e){for(let n=0;n<f;n++)for(let i=0;i<f;i++)if(t.board[n][i]===e)return{x:i,y:n}}function Y(t,e,n,i){const s=n==="w"?"b":"w";return!!(i&&R(t,e,n,!0).some(c=>t.board[c.y][c.x]===s+"k")||X(t,e,n).some(o=>t.board[o.y][o.x]===s+"n")||K(t,e,n).some(o=>t.board[o.y][o.x]===s+"b"||t.board[o.y][o.x]===s+"q")||_(t,e,n).some(o=>t.board[o.y][o.x]===s+"r"||t.board[o.y][o.x]===s+"q")||(n==="b"?[{x:e.x+1,y:e.y+1},{x:e.x-1,y:e.y+1}]:[{x:e.x+1,y:e.y-1},{x:e.x-1,y:e.y-1}]).filter(E).some(o=>t.board[o.y][o.x]===s+"p"))}class I{constructor(e){a(this,"turn",0);a(this,"moves",0);a(this,"result",null);a(this,"canWhiteCastleQueenside",!0);a(this,"canWhiteCastleKingside",!0);a(this,"canBlackCastleQueenside",!0);a(this,"canBlackCastleKingside",!0);a(this,"whiteChecked",!1);a(this,"blackChecked",!1);a(this,"whiteEnPassant",null);a(this,"blackEnPassant",null);a(this,"clickLayer",null);a(this,"piecesElement",null);a(this,"cellsElement",null);a(this,"statusText",null);a(this,"gameMode","cpu");a(this,"onEndTurn",null);a(this,"onMove",null);this.board=e.board.map(n=>[...n]),this.turn=e.turn??0,this.moves=e.moves??0,this.canWhiteCastleQueenside=e.canWhiteCastleQueenside??!0,this.canWhiteCastleKingside=e.canWhiteCastleKingside??!0,this.canBlackCastleQueenside=e.canBlackCastleQueenside??!0,this.canBlackCastleKingside=e.canBlackCastleKingside??!0,this.whiteChecked=e.whiteChecked??!1,this.blackChecked=e.blackChecked??!1,this.whiteEnPassant=e.whiteEnPassant,this.blackEnPassant=e.blackEnPassant,this.onEndTurn=e.onEndTurn,this.onMove=e.onMove}updateChecked(){this.blackChecked=!1,this.whiteChecked=!1;const e=this.turn===0?"w":"b",n=O(this,e+"k");n&&Y(this,n,e,!1)&&(e==="b"?this.blackChecked=!0:this.whiteChecked=!0)}move(e,n){var l,r,d,y;const i=this.board[e.y][e.x];if(i==="wk"){const o=n.x-e.x;if(o===2){const c={x:7,y:7};this.move(c,{x:c.x-2,y:c.y})}if(o===-2){const c={x:0,y:7};this.move(c,{x:c.x+3,y:c.y})}this.canWhiteCastleQueenside=!1,this.canWhiteCastleKingside=!1}else if(i==="bk"){const o=n.x-e.x;if(o===2){const c={x:7,y:0};this.move(c,{x:c.x-2,y:c.y})}if(o===-2){const c={x:0,y:0};this.move(c,{x:c.x+3,y:c.y})}this.canBlackCastleQueenside=!1,this.canBlackCastleKingside=!1}i==="wr"?this.canWhiteCastleQueenside&&e.x===0?this.canWhiteCastleQueenside=!1:this.canWhiteCastleKingside&&e.x===7&&(this.canWhiteCastleKingside=!1):i==="br"&&(this.canBlackCastleQueenside&&e.x===0?this.canBlackCastleQueenside=!1:this.canBlackCastleKingside&&e.x===7&&(this.canBlackCastleKingside=!1)),this.board[n.y][n.x]=this.board[e.y][e.x],this.board[e.y][e.x]="";const s=n.y-e.y;i==="wp"&&n.x===((l=this.blackEnPassant)==null?void 0:l.x)&&n.y===((r=this.blackEnPassant)==null?void 0:r.y)?this.board[this.blackEnPassant.y+1][this.blackEnPassant.x]="":i==="bp"&&n.x===((d=this.whiteEnPassant)==null?void 0:d.x)&&n.y===((y=this.whiteEnPassant)==null?void 0:y.y)&&(this.board[this.whiteEnPassant.y-1][this.whiteEnPassant.x]=""),this.blackEnPassant=null,this.whiteEnPassant=null,i==="wp"&&s===-2?this.whiteEnPassant={x:n.x,y:n.y+1}:i==="bp"&&s===2&&(this.blackEnPassant={x:n.x,y:n.y-1}),i==="wp"&&n.y===0?this.board[n.y][n.x]="wq":i==="bp"&&n.y===7&&(this.board[n.y][n.x]="bq"),this.onMove&&this.onMove(e,n)}endTurn(){this.turn=1-this.turn,this.moves++,this.updateChecked(),this.onEndTurn&&this.onEndTurn()}}const ue=3,ye={0:100,1:30,2:10,3:7,4:4};function j(t,e,n=0,i=0){let s=0;const l=D(t),r=e==="b"?"w":"b";let d=null;const y=fe(t);let o=[];return y.forEach(c=>{const{x:h,y:x}=c,b=t.board[x][h];if((b==null?void 0:b[0])===e){const w=b[1],Q=N(h,x),F=$(t,c,t.board[x][h]);for(let v of F){const L=N(v.x,v.y);let u=Math.random()*.1;const m=new I({...t,onEndTurn:null,onMove:null});if(m.move(c,v),m.endTurn(),s++,(e==="w"?m.blackChecked:m.whiteChecked)&&(u+=.2),w==="k")v.x-h===2?u+=.6:h-v.x===2?u+=.5:u-=.5;else if(w==="p"){const U=e==="b"?v.y:f-1-v.y;U>4&&(u+=U*.1),(h===3||h===4)&&v.x===h&&(Math.abs(x-v.y)===2?u+=.7:u+=.4)}else w==="n"||w==="b"?(Q&&(u+=.5),L&&(u-=.2)):w==="q"?L&&(u-=.2):w==="r"&&L&&(u-=.2);const W=D(m)-l;u+=e==="b"?-W:W;const Z={fromSquare:c,toSquare:v,value:u,gameState:m};o.push(Z)}}}),o.sort((c,h)=>h.value-c.value),o=o.slice(0,ye[n]||2),n<ue&&i<1e6?o.forEach(c=>{let h=c.value,x;const b=j(c.gameState,r,n+1,s+i);s+=b.count,b.bestMove?(x=b.bestMove,h-=b.bestMove.value/1.1):(c.gameState.blackChecked||c.gameState.whiteChecked)&&(h+=1e3),(d==null||h>(d==null?void 0:d.value))&&(d={fromSquare:c.fromSquare,toSquare:c.toSquare,value:h,preContinuationValue:c.value,sub:x})}):d=o.reduce((c,h)=>{if(!c||h.value>c.value){const x=h.gameState.board[h.toSquare.y][h.toSquare.x],b=Y(h.gameState,h.toSquare,x[0],x[1]!=="k"),w=h.value-(b?G[x[1]]:0);if(!c||w>c.value)return{...h,value:w}}return c},null),d&&(t.move(d.fromSquare,d.toSquare),t.endTurn()),{bestMove:d,count:s}}function D(t){return t.board.flat().reduce((e,n)=>n?e+G[n[1]]*(n[0]==="w"?1:-1):e,0)}class xe{constructor(){a(this,"gameState",null);a(this,"clickLayer",null);a(this,"piecesElement",null);a(this,"cellsElement",null);a(this,"statusText",null);a(this,"gameMode","cpu");a(this,"onEndTurn",()=>{if(this.updateStatus(),this.render(),this.cellsElement.querySelectorAll(".check").forEach(e=>e.classList.remove("check")),this.gameState.blackChecked){const e=O(this.gameState,"bk");this.cellsElement.querySelector(`.cell-${e.x}-${e.y}`).classList.add("check")}if(this.gameState.whiteChecked){const e=O(this.gameState,"wk");this.cellsElement.querySelector(`.cell-${e.x}-${e.y}`).classList.add("check")}(this.gameState.turn===1&&this.gameMode==="cpu"||this.gameMode==="cvc")&&this.doCpuMove()});a(this,"onMove",(e,n)=>{var l,r;(l=this.cellsElement.querySelector(".last-move-from"))==null||l.classList.remove("last-move-from"),(r=this.cellsElement.querySelector(".last-move-to"))==null||r.classList.remove("last-move-to"),this.cellsElement.querySelector(`.cell-${e.x}-${e.y}`).classList.add("last-move-from"),this.cellsElement.querySelector(`.cell-${n.x}-${n.y}`).classList.add("last-move-to")});this.clickLayer=document.querySelector("#click-layer"),this.piecesElement=document.querySelector("#pieces"),this.cellsElement=document.querySelector("#cells"),this.statusText=document.querySelector("#status-text"),this.calculationsText=document.querySelector("#calculations"),this.moveText=document.querySelector("#move"),this.oneOnOneButton=document.querySelector("#oneOnOne"),this.cpuButton=document.querySelector("#cpu"),this.cvcButton=document.querySelector("#cvc"),this.oneOnOneButton.addEventListener("click",()=>this.setGameMode("1v1")),this.cpuButton.addEventListener("click",()=>this.setGameMode("cpu")),this.cvcButton.addEventListener("click",()=>this.setGameMode("cvc")),this.setGameMode("cpu")}init(){var e,n;this.gameState=new I({board:ee,onEndTurn:this.onEndTurn,onMove:this.onMove}),this.updateStatus(),this.render(),this.calculationsText.innerHTML="&nbsp;",(e=this.cellsElement.querySelector(".last-move-from"))==null||e.classList.remove("last-move-from"),(n=this.cellsElement.querySelector(".last-move-to"))==null||n.classList.remove("last-move-to"),this.cellsElement.querySelectorAll(".check").forEach(i=>i.classList.remove("check")),this.gameMode==="cvc"&&this.doCpuMove()}doCpuMove(){setTimeout(()=>{const e=Date.now(),{count:n,bestMove:i}=j(this.gameState,this.gameState.turn===0?"w":"b");console.log(i),this.calculationsText.textContent=`Evaluated ${ae(n)} positions in ${Math.round((Date.now()-e)/100)/10}s`},100)}render(){this.piecesElement.innerHTML="",this.gameState.board.forEach((e,n)=>{e.forEach((i,s)=>{if(i!==""){const l=document.createElement("div");l.classList.add("piece",i[0]==="w"?"white":"black"),l.style.transform=`translate(${s*50}px, ${n*50}px)`,l.textContent=S[i[1]],this.piecesElement.appendChild(l)}})})}updateStatus(){const e=this.gameState.turn===0?"White":"Black";let n;this.gameMode==="1v1"?n=e+" to move":this.gameMode==="cpu"?n=e+(this.gameState.turn===0?" to move":" thinking..."):n=e+" thinking...",this.statusText.textContent=n,this.moveText.textContent=`Move ${Math.floor(this.gameState.moves/2)+1}`}setGameMode(e){this.gameMode=e,this.init();let n;e==="cpu"?n=this.cpuButton:e==="1v1"?n=this.oneOnOneButton:e==="cvc"&&(n=this.cvcButton),[this.cpuButton,this.oneOnOneButton,this.cvcButton].forEach(i=>i.classList.remove("selected")),n.classList.add("selected")}}const k=new xe;for(let t=0;t<f;t++){const e=document.createElement("div");e.classList.add("row"),k.cellsElement.appendChild(e);for(let n=0;n<f;n++){const i=document.createElement("div");i.classList.add("cell",`cell-${n}-${t}`),e.appendChild(i)}}let T=null,M=null,B=null,C=[];const be=(t,e)=>{M&&M.classList.remove("selected"),C.length&&C.forEach(i=>i.classList.remove("valid-move")),C=[],M=k.cellsElement.querySelector(`.cell-${t.x}-${t.y}`),M.classList.add("selected"),T=t,B=e,$(k.gameState,t,e).forEach(i=>{const s=k.cellsElement.querySelector(`.cell-${i.x}-${i.y}`);s.classList.add("valid-move"),C.push(s)})},ve=t=>{const e={x:Math.floor(t.offsetX/50),y:Math.floor(t.offsetY/50)},n=k.gameState.board[e.y][e.x];if((n==null?void 0:n[0])===(k.gameState.turn===0?"w":"b")){be(e,n);return}!B||!$(k.gameState,T,B).some(s=>s.x===e.x&&s.y===e.y)||(C.length&&C.forEach(s=>s.classList.remove("valid-move")),k.gameState.move(T,e),B=null,T=null,M.classList.remove("selected"),M=null,k.gameState.endTurn())};k.clickLayer.addEventListener("click",ve);
