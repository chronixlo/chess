var G=Object.defineProperty;var D=(n,e,t)=>e in n?G(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var r=(n,e,t)=>D(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}})();const h=8,N={p:1,n:3,b:3,r:5,q:9,k:100},R={b:"♝",q:"♛",r:"♜",k:"♚",p:"♟",n:"♞"},H=`br,bn,bb,bq,bk,bb,bn,br
bp,bp,bp,bp,bp,bp,bp,bp
,,,,,,,
,,,,,,,
,,,,,,,
,,,,,,,
wp,wp,wp,wp,wp,wp,wp,wp
wr,wn,wb,wq,wk,wb,wn,wr`,X=H.split(`
`).map(n=>n.split(","));function W(n,e,t){return[...v(n,e,t,new Array(h).fill(null).map((s,i)=>({x:-i,y:-i}))),...v(n,e,t,new Array(h).fill(null).map((s,i)=>({x:+i,y:-i}))),...v(n,e,t,new Array(h).fill(null).map((s,i)=>({x:-i,y:+i}))),...v(n,e,t,new Array(h).fill(null).map((s,i)=>({x:+i,y:+i})))]}function Y(n,e,t,s){const i=[];for(let l=-1;l<2;l++)for(let c=-1;c<2;c++)l===0&&c===0||i.push({x:e.x+l,y:e.y+c});return!s&&t==="w"&&n.canWhiteCastleQueenside&&!n.whiteChecked&&n.board[e.y][e.x-1]===""&&n.board[e.y][e.x-2]===""&&n.board[e.y][e.x-3]===""?i.push(...M(n,e,"b","q")):!s&&t==="b"&&n.canBlackCastleQueenside&&!n.blackChecked&&n.board[e.y][e.x-1]===""&&n.board[e.y][e.x-2]===""&&n.board[e.y][e.x-3]===""&&i.push(...M(n,e,"w","q")),!s&&t==="w"&&n.canWhiteCastleKingside&&!n.whiteChecked&&n.board[e.y][e.x+1]===""&&n.board[e.y][e.x+2]===""?i.push(...M(n,e,"b","k")):!s&&t==="b"&&n.canBlackCastleKingside&&!n.blackChecked&&n.board[e.y][e.x+1]===""&&n.board[e.y][e.x+2]===""&&i.push(...M(n,e,"w","k")),i.filter(E).filter(l=>!P(n,l,t))}function M(n,e,t,s){const i=s==="q"?-1:1,l=s==="q"?-2:2;let c=!0;e:for(let d=0;d<h;d++)for(let o=0;o<h;o++){const f=n.board[d][o];if((f==null?void 0:f[0])===t&&B(n,{x:o,y:d},n.board[d][o],!0).some(b=>b.x===e.x+i&&b.y===e.y)){c=!1;break e}}return c?[{x:e.x+l,y:e.y}]:[]}function j(n,e,t){return[{x:e.x+1,y:e.y+2},{x:e.x+2,y:e.y+1},{x:e.x-1,y:e.y+2},{x:e.x-2,y:e.y+1},{x:e.x+1,y:e.y-2},{x:e.x+2,y:e.y-1},{x:e.x-1,y:e.y-2},{x:e.x-2,y:e.y-1}].filter(i=>E(i)).filter(i=>!P(n,i,t))}function F(n,e,t){const s=[],i=t==="w"?[...e.y!==0?[{x:e.x,y:e.y-1}]:[]]:[...e.y!==7?[{x:e.x,y:e.y+1}]:[]];i.length&&!g(n,i[0])&&i.push(...t==="w"?[...e.y===6?[{x:e.x,y:e.y-2}]:[]]:[...e.y===1?[{x:e.x,y:e.y+2}]:[]]);const l=t==="w"?[{x:e.x-1,y:e.y-1},{x:e.x+1,y:e.y-1}]:[{x:e.x-1,y:e.y+1},{x:e.x+1,y:e.y+1}];return s.push(...i.filter(E).filter(c=>!g(n,c))),s.push(...l.filter(E).filter(c=>{var o,f,a,b;const d=n.board[c.y][c.x];return t==="w"&&((o=n.blackEnPassant)==null?void 0:o.x)===c.x&&((f=n.blackEnPassant)==null?void 0:f.y)===c.y||t==="b"&&((a=n.whiteEnPassant)==null?void 0:a.x)===c.x&&((b=n.whiteEnPassant)==null?void 0:b.y)===c.y?!0:!((d==null?void 0:d[0])===void 0||d[0]===t)})),s}function _(n,e,t){return[...v(n,e,t,new Array(h).fill(null).map((s,i)=>({x:-i}))),...v(n,e,t,new Array(h).fill(null).map((s,i)=>({x:+i}))),...v(n,e,t,new Array(h).fill(null).map((s,i)=>({y:-i}))),...v(n,e,t,new Array(h).fill(null).map((s,i)=>({y:+i})))]}function U(n,e,t){return[...W(n,e,t),..._(n,e,t)]}const E=n=>n.x<h&&n.x>=0&&n.y<h&&n.y>=0,g=(n,e)=>n.board[e.y][e.x]!=="",P=(n,e,t)=>{const s=n.board[e.y][e.x];return(s==null?void 0:s[0])===t};function O(n,e,t){return B(n,e,t).filter(i=>{const l=new K({...n,onEndTurn:null,onMove:null});return l.move(e,i),l.endTurn(),t[0]==="w"?!l.whiteChecked:!l.blackChecked})}function B(n,e,t,s){const i=t[0],l=t[1];return l==="p"?F(n,e,i):l==="n"?j(n,e,i):l==="b"?W(n,e,i):l==="r"?_(n,e,i):l==="k"?Y(n,e,i,s):l==="q"?U(n,e,i):[]}function A(n,e){return n===0||n===h-1||e===0||e===h-1}function v(n,e,t,s){const i=[];for(let l of s){if(!l.x&&!l.y)continue;const c={x:e.x+(l.x||0),y:e.y+(l.y||0)};if(!E(c)||P(n,c,t)||(i.push(c),g(n,c)))break}return i}function Z(n){return n>1e4?Math.round(n/100)/10+"k":n}class K{constructor(e){r(this,"turn",0);r(this,"moves",0);r(this,"result",null);r(this,"canWhiteCastleQueenside",!0);r(this,"canWhiteCastleKingside",!0);r(this,"canBlackCastleQueenside",!0);r(this,"canBlackCastleKingside",!0);r(this,"whiteChecked",!1);r(this,"blackChecked",!1);r(this,"whiteEnPassant",null);r(this,"blackEnPassant",null);r(this,"clickLayer",null);r(this,"piecesElement",null);r(this,"cellsElement",null);r(this,"statusText",null);r(this,"gameMode","cpu");r(this,"onEndTurn",null);r(this,"onMove",null);this.board=e.board.map(t=>[...t]),this.turn=e.turn??0,this.moves=e.moves??0,this.canWhiteCastleQueenside=e.canWhiteCastleQueenside??!0,this.canWhiteCastleKingside=e.canWhiteCastleKingside??!0,this.canBlackCastleQueenside=e.canBlackCastleQueenside??!0,this.canBlackCastleKingside=e.canBlackCastleKingside??!0,this.whiteChecked=e.whiteChecked??!1,this.blackChecked=e.blackChecked??!1,this.whiteEnPassant=e.whiteEnPassant,this.blackEnPassant=e.blackEnPassant,this.onEndTurn=e.onEndTurn,this.onMove=e.onMove}updateChecked(){var s,i;this.blackChecked=!1,this.whiteChecked=!1;let e;e:for(let l=0;l<h;l++)for(let c=0;c<h;c++)if(this.board[l][c]==="bk"){e={x:c,y:l};break e}e:for(let l=0;l<h;l++)for(let c=0;c<h;c++)if(((s=this.board[l][c])==null?void 0:s[0])==="w"&&B(this,{x:c,y:l},this.board[l][c]).some(o=>o.x===e.x&&o.y===e.y)){this.blackChecked=!0;break e}let t;e:for(let l=0;l<h;l++)for(let c=0;c<h;c++)if(this.board[l][c]==="wk"){t={x:c,y:l};break e}e:for(let l=0;l<h;l++)for(let c=0;c<h;c++)if(((i=this.board[l][c])==null?void 0:i[0])==="b"&&B(this,{x:c,y:l},this.board[l][c]).some(o=>o.x===t.x&&o.y===t.y)){this.whiteChecked=!0;break e}}move(e,t){var l,c,d,o;const s=this.board[e.y][e.x];if(s==="wk"){const f=t.x-e.x;if(f===2){const a={x:7,y:7};this.move(a,{x:a.x-2,y:a.y})}if(f===-2){const a={x:0,y:7};this.move(a,{x:a.x+3,y:a.y})}this.canWhiteCastleQueenside=!1,this.canWhiteCastleKingside=!1}else if(s==="bk"){const f=t.x-e.x;if(f===2){const a={x:7,y:0};this.move(a,{x:a.x-2,y:a.y})}if(f===-2){const a={x:0,y:0};this.move(a,{x:a.x+3,y:a.y})}this.canBlackCastleQueenside=!1,this.canBlackCastleKingside=!1}s==="wr"?this.canWhiteCastleQueenside&&e.x===0?this.canWhiteCastleQueenside=!1:this.canWhiteCastleKingside&&e.x===7&&(this.canWhiteCastleKingside=!1):s==="br"&&(this.canBlackCastleQueenside&&e.x===0?this.canBlackCastleQueenside=!1:this.canBlackCastleKingside&&e.x===7&&(this.canBlackCastleKingside=!1)),this.board[t.y][t.x]=this.board[e.y][e.x],this.board[e.y][e.x]="";const i=t.y-e.y;s==="wp"&&t.x===((l=this.blackEnPassant)==null?void 0:l.x)&&t.y===((c=this.blackEnPassant)==null?void 0:c.y)?this.board[this.blackEnPassant.y+1][this.blackEnPassant.x]="":s==="bp"&&t.x===((d=this.whiteEnPassant)==null?void 0:d.x)&&t.y===((o=this.whiteEnPassant)==null?void 0:o.y)&&(this.board[this.whiteEnPassant.y-1][this.whiteEnPassant.x]=""),this.blackEnPassant=null,this.whiteEnPassant=null,s==="wp"&&i===-2?this.whiteEnPassant={x:t.x,y:t.y+1}:s==="bp"&&i===2&&(this.blackEnPassant={x:t.x,y:t.y-1}),s==="wp"&&t.y===0?this.board[t.y][t.x]="wq":s==="bp"&&t.y===7&&(this.board[t.y][t.x]="bq"),this.onMove&&this.onMove(e,t)}endTurn(){this.turn=1-this.turn,this.moves++,this.updateChecked(),this.onEndTurn&&this.onEndTurn()}}function I(n,e,t){let s=0;const i=Q(n),l=e==="b"?"w":"b";let c=null;for(let d=0;d<h;d++)for(let o=0;o<h;o++){const f=n.board[d][o];if((f==null?void 0:f[0])===e){const a=f[1],b=A(o,d),V=O(n,{x:o,y:d},n.board[d][o]);for(let y of V){const C=A(y.x,y.y);let u=Math.random()*.1;const m=new K({...n,onEndTurn:null,onMove:null});if(m.move({x:o,y:d},y),m.endTurn(),s++,(e==="w"?m.blackChecked:m.whiteChecked)&&(u+=.6),a==="k")y.x-o===2?u+=.6:o-y.x===2?u+=.5:u-=.5;else if(a==="p"){const k=e==="b"?y.y:h-1-y.y;k>4&&(u+=k*.1),(o===3||o===4)&&y.x===o&&(Math.abs(d-y.y)===2?u+=.7:u+=.4)}else a==="n"||a==="b"?(b&&(u+=.5),C&&(u-=.2)):a==="q"?C&&(u-=.2):a==="r"&&C&&(u-=.2);if(t>0){const k=I(m,l,t-1);s+=k.count,k.bestMove&&(u+=e==="b"?-k.bestMove.value:k.bestMove.value)}const $=Q(m)-i;u+=e==="b"?-$:$,(c==null||u>(c==null?void 0:c.value))&&(c={fromSquare:{x:o,y:d},toSquare:y,value:u})}}}return c&&(n.move(c.fromSquare,c.toSquare),n.endTurn()),{bestMove:c,count:s}}function Q(n){return n.board.flat().reduce((e,t)=>t?e+N[t[1]]*(t[0]==="w"?1:-1):e,0)}const z=2;class J{constructor(){r(this,"gameState",null);r(this,"clickLayer",null);r(this,"piecesElement",null);r(this,"cellsElement",null);r(this,"statusText",null);r(this,"gameMode","cpu");r(this,"onEndTurn",()=>{if(this.updateStatus(),this.render(),this.cellsElement.querySelectorAll(".check").forEach(e=>e.classList.remove("check")),this.gameState.blackChecked){let e;e:for(let s=0;s<h;s++)for(let i=0;i<h;i++)if(this.gameState.board[s][i]==="bk"){e={x:i,y:s};break e}this.cellsElement.querySelector(`.cell-${e.x}-${e.y}`).classList.add("check")}if(this.gameState.whiteChecked){let e;e:for(let s=0;s<h;s++)for(let i=0;i<h;i++)if(this.gameState.board[s][i]==="wk"){e={x:i,y:s};break e}this.cellsElement.querySelector(`.cell-${e.x}-${e.y}`).classList.add("check")}(this.gameState.turn===1&&this.gameMode==="cpu"||this.gameMode==="cvc")&&this.doCpuMove()});r(this,"onMove",(e,t)=>{var l,c;(l=this.cellsElement.querySelector(".last-move-from"))==null||l.classList.remove("last-move-from"),(c=this.cellsElement.querySelector(".last-move-to"))==null||c.classList.remove("last-move-to"),this.cellsElement.querySelector(`.cell-${e.x}-${e.y}`).classList.add("last-move-from"),this.cellsElement.querySelector(`.cell-${t.x}-${t.y}`).classList.add("last-move-to")});this.clickLayer=document.querySelector("#click-layer"),this.piecesElement=document.querySelector("#pieces"),this.cellsElement=document.querySelector("#cells"),this.statusText=document.querySelector("#status-text"),this.calculationsText=document.querySelector("#calculations"),this.moveText=document.querySelector("#move"),this.oneOnOneButton=document.querySelector("#oneOnOne"),this.cpuButton=document.querySelector("#cpu"),this.cvcButton=document.querySelector("#cvc"),this.oneOnOneButton.addEventListener("click",()=>this.setGameMode("1v1")),this.cpuButton.addEventListener("click",()=>this.setGameMode("cpu")),this.cvcButton.addEventListener("click",()=>this.setGameMode("cvc")),this.setGameMode("cpu")}init(){var e,t;this.gameState=new K({board:X,onEndTurn:this.onEndTurn,onMove:this.onMove}),this.updateStatus(),this.render(),this.calculationsText.innerHTML="&nbsp;",(e=this.cellsElement.querySelector(".last-move-from"))==null||e.classList.remove("last-move-from"),(t=this.cellsElement.querySelector(".last-move-to"))==null||t.classList.remove("last-move-to"),this.cellsElement.querySelectorAll(".check").forEach(s=>s.classList.remove("check")),this.gameMode==="cvc"&&this.doCpuMove()}doCpuMove(){setTimeout(()=>{const e=Date.now(),{count:t}=I(this.gameState,this.gameState.turn===0?"w":"b",z);this.calculationsText.textContent=`Evaluated ${Z(t)} positions in ${Math.round((Date.now()-e)/100)/10}s`},100)}render(){this.piecesElement.innerHTML="",this.gameState.board.forEach((e,t)=>{e.forEach((s,i)=>{if(s!==""){const l=document.createElement("div");l.classList.add("piece",s[0]==="w"?"white":"black"),l.style.transform=`translate(${i*50}px, ${t*50}px)`,l.textContent=R[s[1]],this.piecesElement.appendChild(l)}})})}updateStatus(){const e=this.gameState.turn===0?"White":"Black";let t;this.gameMode==="1v1"?t=e+" to move":this.gameMode==="cpu"?t=e+(this.gameState.turn===0?" to move":" thinking..."):t=e+" thinking...",this.statusText.textContent=t,this.moveText.textContent=`Move ${Math.floor(this.gameState.moves/2)+1}`}setGameMode(e){this.gameMode=e,this.init();let t;e==="cpu"?t=this.cpuButton:e==="1v1"?t=this.oneOnOneButton:e==="cvc"&&(t=this.cvcButton),[this.cpuButton,this.oneOnOneButton,this.cvcButton].forEach(s=>s.classList.remove("selected")),t.classList.add("selected")}}const x=new J;for(let n=0;n<h;n++){const e=document.createElement("div");e.classList.add("row"),x.cellsElement.appendChild(e);for(let t=0;t<h;t++){const s=document.createElement("div");s.classList.add("cell",`cell-${t}-${n}`),e.appendChild(s)}}let L=null,w=null,T=null,p=[];const S=(n,e)=>{w&&w.classList.remove("selected"),p.length&&p.forEach(s=>s.classList.remove("valid-move")),p=[],w=x.cellsElement.querySelector(`.cell-${n.x}-${n.y}`),w.classList.add("selected"),L=n,T=e,O(x.gameState,n,e).forEach(s=>{const i=x.cellsElement.querySelector(`.cell-${s.x}-${s.y}`);i.classList.add("valid-move"),p.push(i)})},q=n=>{const e={x:Math.floor(n.offsetX/50),y:Math.floor(n.offsetY/50)},t=x.gameState.board[e.y][e.x];if((t==null?void 0:t[0])===(x.gameState.turn===0?"w":"b")){S(e,t);return}!T||!O(x.gameState,L,T).some(i=>i.x===e.x&&i.y===e.y)||(p.length&&p.forEach(i=>i.classList.remove("valid-move")),x.gameState.move(L,e),T=null,L=null,w.classList.remove("selected"),w=null,x.gameState.endTurn())};x.clickLayer.addEventListener("click",q);
