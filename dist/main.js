(()=>{"use strict";var e={28:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(81),r=n.n(a),o=n(645),i=n.n(o),l=n(667),s=n.n(l),c=new URL(n(792),n.b),d=i()(r());d.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Dancing+Script:wght@700&family=Della+Respira&family=Handjet:wght@500;900&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Mooli&family=Pacifico&family=Pangolin&family=Playfair:wght@300&family=Roboto:ital,wght@0,400;0,700;1,300&family=VT323&display=swap);"]);var p=s()(c);d.push([e.id,`:root {\n    --header-height: 100px;\n    --board-size: 318px;\n    --cell-size: 30px;\n    background: url(${p});\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    background-size: cover;\n    /*--background-color: rgb(240, 240, 240);\n    --background-color-transparent: rgba(240, 240, 240, 0.7);*/\n    --cell-color: rgb(230, 230, 230);\n    --cell-hover-color: rgb(200, 200, 200);\n    --cell-border-color: rgb(70, 70, 70);\n    --ship-color: rgb(150, 150, 150);\n    --hit-color: rgb(155, 99, 61);\n    --miss-color: rgb(161, 216, 161);\n    --sunk-color: rgb(206, 134, 134);\n    --text-color-main: rgb(230, 230, 230);\n    --footer-color: rgb(230, 230, 230);\n    --text-color-grey: rgb(100, 100, 100);\n    --button-color: rgb(50, 50, 50);\n    --battle-button: rgb(155, 61, 61);\n    --button-color-hover: rgb(230, 230, 230);\n    --button-color-active: grey;\n}\n\n:root.dark {\n    /* --background-color: rgb(30, 30, 30);\n    --background-color-transparent: rgba(30, 30, 30, 0.7);*/\n    background: url(${p});\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    background-size: cover;\n    --cell-color: rgb(40, 40, 40);\n    --cell-hover-color: rgb(90, 90, 90);\n    --cell-border-color: rgb(220, 220, 220);\n    --ship-color: rgb(153, 153, 153);\n    --hit-color: rgb(155, 99, 61);\n    --miss-color: rgb(52, 109, 52);\n    --sunk-color: rgb(155, 61, 61);\n    --text-color-main: rgb(220, 220, 220);\n    --text-color-grey: rgb(160, 160, 160);\n    --button-color: rgb(50, 50, 50);\n    --button-color-hover: rgb(20, 20, 20);\n    --button-color-active: grey;\n}\n\n*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0;\n    padding: 0;\n    background-color: var(--background-color);\n    color: var(--text-color-main);\n}\n\n#app {\n    padding: 0 5%;\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n}\n\nh3 {\n    margin: 0;\n    font-family: 'Black Ops One', cursive;\n}\n\nh1 {\n    font-family: 'Black Ops One', cursive;\n}\n\n/* Header */\nheader {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\nheader button {\n    height: 32px;\n    width: 120px;\n    font-size: 1rem;\n    padding-bottom: 2px;\n}\n\nbutton {\n    font-family: 'Mooli', sans-serif;\n    color: var(--text-color-main);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid var(--text-color-main);\n    border-radius: 0;\n    background-color: var(--button-color);\n}\n\nbutton:active {\n    background-color: var(--button-color-active);\n}\n\n@media (hover: hover) {\n    button:hover {\n        cursor: pointer;\n        border-width: 2px;\n        background-color: var(--button-color-hover);\n    }\n}\n\n#game-container {\n    display: flex;\n    justify-content: center;\n    align-content: center;\n    flex-wrap: wrap;\n    gap: 40px;\n}\n\n/* Player setup */\n.setup-ships-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    width: var(--board-size);\n    height: calc(var(--board-size) + 25px);\n    text-align: right;\n}\n\n.setup-ships-header p {\n    margin: 0;\n    font-size: 0.8rem;\n}\n\n.setup-ship-shiplist {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    font-family: 'Pangolin', cursive;\n}\n\n.setup-ship {\n    height: 40px;\n    position: relative;\n    display: flex;\n    flex-direction: row-reverse;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.setup-ship p {\n    margin: 0;\n    display: inline-block;\n    font-family: 'Pangolin', cursive;\n}\n\n.setup-ship-box {\n    cursor: grab;\n    display: inline-flex;\n    gap: 2px;\n    position: relative;\n    z-index: 20;\n}\n\n.setup-ship-vertical {\n    flex-direction: column;\n}\n\n.setup-ship-hide div {\n    background-color: rgba(0, 0, 0, 0);\n    opacity: 0.5;\n}\n\n.setup-ship-dropped {\n    position: absolute;\n    left: -1px;\n    top: -1px;\n}\n\n.ghost-ship {\n    position: absolute;\n    z-index: 200;\n    opacity: 0.8;\n}\n\n.ghost-ship>.setup-ship-cell {\n    background-color: var(--cell-hover-color);\n}\n\n.setup-ship-cell {\n    width: var(--cell-size);\n    height: var(--cell-size);\n    background-color: var(--cell-hover-color);\n    border: 1px solid var(--cell-border-color);\n}\n\n.setup-ships-options {\n    display: flex;\n    justify-content: space-between;\n}\n\n.setup-button-start,\n.setup-button-random {\n    width: 120px;\n    height: 36px;\n}\n\n.setup-button-start {\n    font-weight: 600;\n    font-size: 1rem;\n    background-color: var(--hit-color);\n    transition: transform 0.1s ease;\n}\n\n.setup-button-start-disabled {\n    opacity: 0.5;\n    pointer-events: none;\n}\n\n@media (hover: hover) {\n    .setup-button-start:hover {\n        transform: scale(1.1);\n        background-color: rgb(226, 116, 116);\n    }\n}\n\n/* Player sections */\n.board-container {\n    display: inline-block;\n}\n\n/* Player boards */\n.board {\n    display: grid;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    gap: 2px;\n}\n\n.cell {\n    position: relative;\n    cursor: crosshair;\n    height: var(--cell-size);\n    width: var(--cell-size);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: var(--cell-color);\n    border: 1px solid var(--cell-border-color);\n}\n\n.cell-setup {\n    display: inline-block;\n}\n\n.cell-drag-over {\n    pointer-events: none;\n    position: absolute;\n    display: inline-block;\n    z-index: 40;\n}\n\n.cell-drag-valid {\n    background-color: var(--miss-color);\n}\n\n.cell-drag-invalid {\n    background-color: var(--hit-color);\n}\n\n\n@media (hover: hover) {\n    .cell:not([data-player='1']):not(.cell-hit):not(.cell-miss):hover {\n        background-color: var(--cell-hover-color);\n    }\n}\n\n.cell-ship {\n    background-color: var(--ship-color);\n}\n\n.cell-hit {\n    background-color: var(--hit-color);\n}\n\n.cell-hit::after {\n    content: '✖';\n    opacity: 0.8;\n    font-size: 1.3rem;\n    padding-bottom: 1px;\n}\n\n.cell-miss {\n    background-color: var(--miss-color);\n}\n\n.cell-miss::after {\n    content: '●';\n    opacity: 0.6;\n    padding-bottom: 4px;\n}\n\n.cell-sunk {\n    background-color: var(--sunk-color);\n    transition: background-color 0.2s ease;\n}\n\n/* Victory container */\n.victory-container {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 318px;\n    text-align: center;\n    padding: 20px;\n    border: 3px solid var(--text-color-main);\n    background-color: var(--background-color-transparent);\n    backdrop-filter: blur(4px);\n}\n\n.victory-container h2 {\n    margin: 0;\n    text-shadow: 0 0 2px black, 0 0 4px black, 0 0 6px black;\n}\n\n.victory-container p {\n    margin: 6px;\n}\n\n.victory-victory {\n    color: var(--miss-color);\n}\n\n.victory-defeat {\n    color: var(--sunk-color);\n}\n\n\nfooter {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    gap: 16px;\n    padding: 0 32px;\n}\n\n#footer-link {\n    text-decoration: none;\n}\n\nfooter p {\n    font-weight: 600;\n    font-size: 1.1rem;\n    color: var(--text-color-main);\n\n}\n\nfooter i {\n\n    transition: transform 0.1s ease;\n    color: var(--text-color-main);\n}\n\n@media (hover: hover) {\n\n    #footer-link:hover,\n    #footer-dark-mode:hover {\n        cursor: pointer;\n        transform: scale(1.2);\n        transition: transform 0.1s ease;\n    }\n}\n\n@media screen and (max-width: 800px) {\n    :root {\n        --header-height: 80px;\n        --board-size: 278px;\n        --cell-size: 26px;\n    }\n\n    body {\n        background-size: cover;\n        background-attachment: fixed;\n        background-position: center;\n        background-repeat: no-repeat;\n    }\n\n    header button {\n        height: 28px;\n        width: 100px;\n        font-size: 0.9rem;\n        padding-bottom: 2px;\n    }\n\n    #game-container {\n        gap: 20px;\n    }\n\n    .setup-button-start,\n    .setup-button-random {\n        width: 100px;\n        height: 28px;\n    }\n\n    .setup-button-start {\n        font-size: 0.9rem;\n    }\n}`,""]);const u=d},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",a=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),a&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),a&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,a,r,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(a)for(var l=0;l<this.length;l++){var s=this[l][0];null!=s&&(i[s]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);a&&i[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),t.push(d))}},t}},667:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,a=0;a<t.length;a++)if(t[a].identifier===e){n=a;break}return n}function a(e,a){for(var o={},i=[],l=0;l<e.length;l++){var s=e[l],c=a.base?s[0]+a.base:s[0],d=o[c]||0,p="".concat(c," ").concat(d);o[c]=d+1;var u=n(p),h={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)t[u].references++,t[u].updater(h);else{var m=r(h,a);a.byIndex=l,t.splice(l,0,{identifier:p,updater:m,references:1})}i.push(p)}return i}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var o=a(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var l=n(o[i]);t[l].references--}for(var s=a(e,r),c=0;c<o.length;c++){var d=n(o[c]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}o=s}}},569:e=>{var t={};e.exports=function(e,n){var a=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var a="";n.supports&&(a+="@supports (".concat(n.supports,") {")),n.media&&(a+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(a+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),a+=n.css,r&&(a+="}"),n.media&&(a+="}"),n.supports&&(a+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(a,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},792:(e,t,n)=>{e.exports=n.p+"36d906260b011f76146c.gif"}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={id:a,exports:{}};return e[a](o,o.exports,n),o.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var a=t.getElementsByTagName("script");if(a.length)for(var r=a.length-1;r>-1&&!e;)e=a[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href,n.nc=void 0,(()=>{var e=n(379),t=n.n(e),a=n(795),r=n.n(a),o=n(569),i=n.n(o),l=n(565),s=n.n(l),c=n(216),d=n.n(c),p=n(589),u=n.n(p),h=n(28),m={};m.styleTagTransform=u(),m.setAttributes=s(),m.insert=i().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=d(),t()(h.Z,m),h.Z&&h.Z.locals&&h.Z.locals;const f={carrier:{id:1,name:"carrier",length:5},battleship:{id:2,name:"battleship",length:4},destroyer:{id:3,name:"destroyer",length:3},submarine:{id:4,name:"submarine",length:3},patrol:{id:5,name:"patrol",length:2}},g=function(){const e=function(){let e=[];for(let t=0;t<=9;t++){let n=[];for(let e=0;e<=9;e++)n[e]=null;e[t]=n}return e}(),t=[];return{board:e,placedShips:t,checkSquare:function(e,t){if(!(e<0||t<0))return e>9||t>9?void 0:this.board[e][t]},checkValidPlacement:function(e,t,n){let[a,r]=t,o=[];for(let t=0;t<e;t++)o.push([a,r]),"horizontal"===n?r++:a++;return{isValid:o.every((e=>{let[t,n]=e;return void 0!==this.checkSquare(t,n)&&null===this.board[t][n]})),squares:o}},placeShip:function(e,n,a){const r=f[e].length,o=this.checkValidPlacement(r,n,a);if(o.isValid){const n=function(e){return{type:e,length:f[e].length,hits:0,squares:void 0,alignment:void 0,hit:function(){this.hits++},isSunk:function(){return this.hits>=this.length}}}(e);return n.squares=o.squares,n.alignment=a,o.squares.forEach((e=>{let[t,a]=e;this.board[t][a]=n})),t.push(n),n}return"Cannot place ship in that location"},removeShip:function(e){const[t,n]=e,a=this.checkSquare(t,n);a.squares.forEach((e=>{const[t,n]=e;this.board[t][n]=null}));const r=this.placedShips.indexOf(a);this.placedShips.splice(r,1)},placeAllShipsRandomly:function(){!function(e){for(let t=0;t<10;t++)for(let n=0;n<10;n++)e[t][n]=null}(this.board),function(e){for(;e.length>0;)e.pop()}(this.placedShips);for(let e in f){let t=this.placeShipRandomly(e);for(;"object"!=typeof t||null===t;)t=this.placeShipRandomly(e)}},placeShipRandomly:function(e){const t=f[e].length;function n(){return Math.random()<.5?"horizontal":"vertical"}function a(e){let n=0,a=0;return"vertical"===e?n=t-1:a=t-1,[Math.floor(Math.random()*(10-n)),Math.floor(Math.random()*(10-a))]}let r=n(),o=a(r),i=this.checkValidPlacement(t,o,r);for(;!i.isValid;)r=n(),o=a(r),i=this.checkValidPlacement(t,o,r);return this.placeShip(e,o,r)},receiveAttack:function(e,t){if(void 0===this.checkSquare(e,t))return"Invalid location";const n=this.board[e][t];return null===n?this.board[e][t]="miss":(n.hit(),this.board[e][t]="hit"),[this.board[e][t],[e,t],n]},checkAllShipsSunk:function(){return t.every((e=>e.isSunk()))}}},b=function(){const e=function(){const e=[];for(let t=0;t<10;t++){let n=[];for(let e=0;e<10;e++)n.push([t,e]);e.push(n)}return e}(),t=[],n=["up","down","left","right"];function a(e,t){let[n,a]=e;switch(t){case"up":n--;break;case"down":n++;break;case"left":a--;break;case"right":a++}return[n,a]}return{availableAttacks:e,lastShip:void 0,lastHitArray:t,possibleDirections:n,concurrentMisses:0,attack:function(e){if(this.lastHitArray.length>0&&this.checkIfShipIsSunk(e,this.lastHitArray[t.length-1]),0===this.availableAttacks.length)return"No squares to attack";if(0===this.lastHitArray.length){if(this.concurrentMisses>5&&Math.random()>.8){e.gameboard.board;for(let t=0;t<10;t++)for(let n=0;n<10;n++){const a=e.gameboard.checkSquare(t,n);if("object"==typeof a&&null!==a)return console.log("cheating!"),[t,n]}}return this.getRandomCell(e)}const n=this.lastHitArray[t.length-1],a=this.getAllAdjacentCells(e,n),r=a.filter((t=>"hit"===t.cellResult&&!1===this.checkIfShipIsSunk(e,t.adjacentCell)));if(r.length>0){const t=r[Math.floor(Math.random()*r.length)];let a=this.getNextAttackableCell(e,n,this.flipDirection(t.direction));for(!1===a&&(a=this.getNextAttackableCell(e,n,t.direction));!1===a;)a=this.getNextAttackableCell(e,n,this.possibleDirections[Math.floor(Math.random()*this.possibleDirections.length)]);return a}for(let t=this.lastHitArray.length-2;t>=0;t--){const a=this.lastHitArray[t],r=this.getAdjacency(n,a);if(r){let t=this.getNextAttackableCell(e,n,r.direction);if(t)return t}}const o=a.filter((e=>"string"!=typeof e.cellResult&&void 0!==e.cellResult)),i=o[Math.floor(Math.random()*o.length)];return console.log(i.adjacentCell),i.adjacentCell},getRandomCell:function(e){if(0===this.availableAttacks.length)return"No squares to attack";let t=Math.floor(Math.random()*this.availableAttacks.length),n=Math.floor(Math.random()*this.availableAttacks[t].length),a=this.availableAttacks[t][n];return this.getAllAdjacentCells(e,a).every((e=>"object"!=typeof e.cellResult))?this.getRandomCell(e):a},removeCellFromAvailableAttacks:function(e){for(let t=0;t<this.availableAttacks.length;t++)for(let n=0;n<this.availableAttacks[t].length;n++){const a=this.availableAttacks[t][n];if(e[0]===a[0]&&e[1]===a[1])return this.availableAttacks[t].splice(n,1),void(0===this.availableAttacks[t].length&&this.availableAttacks.splice(t,1))}},getAdjacentCell:a,getAllAdjacentCells:function(e,t){return n.map((n=>{const a=this.getAdjacentCell(t,n);let r=e.gameboard.checkSquare(a[0],a[1]);return"hit"===r&&this.checkIfShipIsSunk(e,a)&&(r="sunk"),{cellResult:r,adjacentCell:a,direction:n}}))},getNextAttackableCell:function(e,t,n){let r=a(t,n);for(let t=0;t<4;t++){let t=e.gameboard.checkSquare(r[0],r[1]);if("object"==typeof t||null===t)return r;if(void 0===t)return!1;if("miss"===t)return!1;if("hit"===t&&this.checkIfShipIsSunk(e,r))return!1;r=a(r,n)}return!1},getAdjacency:function(e,t){let n,a,r;if(e[0]===t[0]){const o=e[1]-t[1];n=o>1?"left":"right",a=o>1?"right":"left",r=Math.abs(o)}else{if(e[1]!==t[1])return!1;{const o=e[0]-t[0];n=o>1?"down":"up",a=o>1?"up":"down",r=Math.abs(o)}}return{direction:n,oppositeDirection:a,distance:r}},flipDirection:function(e){switch(e){case"up":return"down";case"down":return"up";case"left":return"right";case"right":return"left";default:return!1}},checkIfShipIsSunk:function(e,t){let n;return e.gameboard.placedShips.forEach((e=>{e.squares.some((e=>e[0]===t[0]&&e[1]===t[1]))&&(n=e)})),!!n.isSunk()&&(n.squares.forEach((e=>{const t=this.lastHitArray.findIndex((t=>t[0]===e[0]&&t[1]===e[1]));t>-1&&this.lastHitArray.splice(t,1)})),!0)}}};let v,y;const k={shipObject:null,shipElement:null,offsetX:null,offsetY:null,rowDif:0,colDif:0,shipHomeContainer:null,previousContainer:null,previousCell:null,currentCell:null};function x(e){const t=document.createElement("div");t.classList.add("setup-ship"),t.id=`${e.name}-home`;const n=document.createElement("div");n.id=e.name,n.dataset.length=e.length,n.classList.add("setup-ship-box");for(let t=0;t<e.length;t++){const e=document.createElement("div");e.classList.add("setup-ship-cell"),n.appendChild(e)}n.draggable=!0,n.dataset.alignment="horizontal",n.addEventListener("dragstart",w),n.addEventListener("dragend",C),n.addEventListener("dblclick",S),n.addEventListener("touchmove",(function(e){const t=e.touches[0].clientX,a=e.touches[0].clientY,r=document.elementsFromPoint(t,a).filter((e=>e.classList.contains("cell")));r.length>0?L(e,r[0]):I();const o=document.querySelector("#app"),i=document.querySelector(".ghost-ship");i&&i.remove();const l=n.cloneNode(!0),s=e.targetTouches[0];"vertical"===k.shipElement.dataset.alignment&&l.classList.add("setup-ship-vertical"),l.classList.add("ghost-ship"),l.style.left=s.pageX-k.offsetX+"px",l.style.top=s.pageY-k.offsetY+"px",o.appendChild(l)})),n.addEventListener("touchend",(function(e){const t=document.querySelector(".ghost-ship");t&&t.remove(),C();const n=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY,r=document.elementsFromPoint(n,a).filter((e=>e.classList.contains("cell")));r.length>0&&q(e,r[0])})),n.addEventListener("touchstart",(function(e){e.preventDefault();let t=(new Date).getTime();t-n.lastClick<200?(S(),w(e)):w(e),n.lastClick=t}));const a=document.createElement("p");return"patrol"===e.name?a.textContent="patrol boat":a.textContent=e.name,t.append(a,n),t}function E(){v.gameboard.placeAllShipsRandomly(),v.gameboard.placedShips.forEach((e=>{const t=e.type,n=e.squares[0],a=e.alignment,r=document.querySelector(`#${t}`);r.dataset.alignment=a,r.classList.add("setup-ship-dropped"),"vertical"===a?r.classList.add("setup-ship-vertical"):r.classList.remove("setup-ship-vertical");const[o,i]=n;y.querySelector(`[data-row='${o}'][data-col='${i}']`).appendChild(r)}))}function S(e){const t=k.shipElement,n=f[t.id].length,a=t.parentElement;if(!a.classList.contains("cell"))return;const r=parseInt(a.dataset.row),o=parseInt(a.dataset.col);console.log(r,o),v.gameboard.removeShip([r,o]);let i,l=r,s=o,c=t.dataset.alignment;"horizontal"===c?(i="vertical",10-l<n&&(l=10-n)):(i="horizontal",10-s<n&&(s=10-n));let d=0,p=v.gameboard.checkValidPlacement(n,[l,s],i);for(;!1===p.isValid&&d<10;)"horizontal"===i?l=l<9?l+1:0:s=s<9?s+1:0,p=v.gameboard.checkValidPlacement(n,[l,s],i),d++;p.isValid?(v.gameboard.placeShip(t.id,[l,s],i),y.querySelector(`[data-row='${l}'][data-col='${s}']`).appendChild(t),t.dataset.alignment=i,"vertical"===i?t.classList.add("setup-ship-vertical"):t.classList.remove("setup-ship-vertical")):v.gameboard.placeShip(t.id,[r,o],c)}function w(e){if("touchstart"===e.type?(k.shipElement=e.target.parentElement,k.shipHomeContainer=document.querySelector(`#${e.target.parentElement.id}-home`),k.previousContainer=e.target.parentElement.parentElement):(k.shipElement=e.target,k.shipHomeContainer=document.querySelector(`#${e.target.id}-home`),k.previousContainer=e.target.parentElement),function(e){let t,n;if("touchstart"===e.type){let a=e.target.parentElement.getBoundingClientRect();t=e.targetTouches[0].clientX-a.x,n=e.targetTouches[0].clientY-a.y,k.offsetX=t,k.offsetY=n}else t=e.offsetX,n=e.offsetY;const a=document.querySelector(".setup-ship-cell").offsetWidth;"horizontal"===k.shipElement.dataset.alignment?(k.rowDif=0,k.colDif=Math.floor(t/(a+2))):(k.rowDif=Math.floor(n/(a+2)),k.colDif=0)}(e),"vertical"===k.shipElement.dataset.alignment&&k.shipElement.classList.add("setup-ship-vertical"),setTimeout((()=>{k.shipElement.classList.add("setup-ship-hide"),k.shipElement.classList.remove("setup-ship-dropped"),k.shipElement.classList.remove("setup-ship-vertical"),k.shipHomeContainer.appendChild(k.shipElement)}),0),k.previousContainer.classList.contains("cell")){const e=k.previousContainer,t=parseInt(e.dataset.row),n=parseInt(e.dataset.col);v.gameboard.removeShip([t,n])}}function C(e){k.shipElement.classList.remove("setup-ship-hide")}function L(e,t){I(),e.preventDefault();const n=k.shipElement.id;let a,r;"touchmove"===e.type?(a=parseInt(t.dataset.row)-parseInt(k.rowDif),r=parseInt(t.dataset.col)-parseInt(k.colDif)):(a=parseInt(e.target.dataset.row)-parseInt(k.rowDif),r=parseInt(e.target.dataset.col)-parseInt(k.colDif));const o=v.gameboard.checkValidPlacement(f[n].length,[a,r],k.shipElement.dataset.alignment);o.squares=o.squares.filter((e=>void 0!==v.gameboard.checkSquare(e[0],e[1]))),o.squares.forEach((e=>{const t=y.querySelector(`[data-row='${e[0]}'][data-col='${e[1]}']`),n=document.createElement("div");n.classList.add("cell","cell-drag-over"),t.appendChild(n),o.isValid?n.classList.add("cell-drag-valid"):n.classList.add("cell-drag-invalid")}))}function A(e){e.preventDefault()}function I(e){document.querySelectorAll(".cell-drag-over").forEach((e=>{e.remove()}))}function q(e,t){let n,a;I();const r=k.shipElement.id;if("touchend"===e.type?(n=parseInt(t.dataset.row)-parseInt(k.rowDif),a=parseInt(t.dataset.col)-parseInt(k.colDif)):(n=parseInt(e.target.dataset.row)-parseInt(k.rowDif),a=parseInt(e.target.dataset.col)-parseInt(k.colDif)),v.gameboard.checkValidPlacement(f[r].length,[n,a],k.shipElement.dataset.alignment).isValid){const e=y.querySelector(`[data-row='${n}'][data-col='${a}']`);e.appendChild(k.shipElement),k.shipElement.classList.add("setup-ship-dropped"),k.previousContainer=e,v.gameboard.placeShip(k.shipElement.id,[n,a],k.shipElement.dataset.alignment)}else{if(k.previousContainer.classList.contains("cell")){k.shipElement.classList.add("setup-ship-dropped");const e=k.previousContainer.dataset.row,t=k.previousContainer.dataset.col;v.gameboard.placeShip(k.shipElement.id,[e,t],k.shipElement.dataset.alignment)}k.previousContainer.appendChild(k.shipElement)}k.shipElement.classList.remove("setup-ship-hide"),"vertical"===k.shipElement.dataset.alignment?k.shipElement.classList.add("setup-ship-vertical"):k.shipElement.classList.remove("setup-ship-vertical")}const P={drawSetupBoard:function(e,t){return v=e,y=t,y.querySelectorAll(".cell").forEach((e=>{e.addEventListener("dragenter",L),e.addEventListener("dragover",A),e.addEventListener("dragleave",I),e.addEventListener("drop",q)})),t},drawSetupShips:function(){const e=document.createElement("div");e.classList.add("setup-ships-container");const t=document.createElement("div");t.classList.add("setup-ships-header");const n=document.createElement("h3");n.textContent="place your ships:";const a=document.createElement("p");a.textContent="double click to rotate (once placed)";const r=document.createElement("div");r.classList.add("setup-ships-options");const o=document.createElement("button");o.classList.add("setup-button-start"),o.textContent="BATTLE!";const i=document.createElement("button");i.classList.add("setup-button-random"),i.textContent="randomize",i.addEventListener("click",E),r.append(o,i);const l=document.createElement("div");for(let e in f)l.appendChild(x(f[e]));return t.append(n,a),e.append(t,l,r),e}},M=P,z=document.createElement("div");z.id="app",document.body.appendChild(z);const j=function(){const e=document.createElement("header");e.id="header";const t=document.createElement("h1");t.textContent="Battleship";const n=document.createElement("button");return n.classList.add("new-game-button"),n.textContent="new game",e.appendChild(t),e.appendChild(n),e}(),$=function(){const e=document.createElement("footer"),t=document.createElement("p");t.classList.add("footer-author"),t.textContent="Jeff Doyle 2023";const n=document.createElement("a");n.id="footer-link",n.setAttribute("href","https://github.com/codingmster1/battle-ship");const a=document.createElement("i");function r(){return localStorage.getItem("theme")}function o(){document.querySelector(":root").classList.toggle("dark"),i.classList.toggle("fa-moon"),i.classList.toggle("fa-sun")}a.classList.add("fa-brands","fa-github","fa-xl","footer-logo"),n.appendChild(a);const i=document.createElement("i");return i.id="footer-dark-mode",i.classList.add("fa-solid","fa-moon","fa-xl"),i.addEventListener("mousedown",(function(){o(),"dark"===r()?localStorage.setItem("theme","light"):localStorage.setItem("theme","dark")})),("dark"===r()||!r()&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)&&o(),e.appendChild(t),e.appendChild(n),e.appendChild(i),e}(),D=document.createElement("div");D.id="game-container",z.appendChild(j),z.appendChild(D),z.appendChild($),j.querySelector(".new-game-button").addEventListener("click",R);const T={player1:void 0,player2:void 0,currentPlayer:void 0,defendingPlayer:void 0,createPlayer:function(e,t){return{name:"string"==typeof(n=e)?n:"Enemy",number:t,isAI:"string"!=typeof n,gameboard:g(),battleBot:b(),attack:function(e,t,n){if(this.isAI){if(0===this.battleBot.availableAttacks.length)return"No squares to attack";[t,n]=this.battleBot.attack(e)}const a=e.gameboard.receiveAttack(t,n);return this.isAI&&("hit"===a[0]&&(this.battleBot.lastHitArray.push(a[1]),this.battleBot.concurrentMisses=0),"miss"===a[0]&&this.battleBot.concurrentMisses++,null!==a[2]&&(this.battleBot.lastShip=a[2]),this.battleBot.removeCellFromAvailableAttacks(a[1])),a}};var n},newGame:function(e,t){this.player1=e,this.player2=t,this.currentPlayer=this.player1,this.defendingPlayer=this.player2},changeTurn:function(){this.currentPlayer=this.currentPlayer===this.player1?this.player2:this.player1,this.defendingPlayer=this.defendingPlayer===this.player2?this.player1:this.player2},checkGameOver:function(){return this.player1.gameboard.checkAllShipsSunk()?this.player2:!!this.player2.gameboard.checkAllShipsSunk()&&this.player1},testGame:function(){this.player1.gameboard.placeShip(3,[1,3],"vertical"),this.player1.gameboard.placeShip(4,[7,2],"horizontal"),this.player1.gameboard.placeShip(5,[2,7],"vertical"),this.player2.gameboard.placeShip(3,[1,3],"vertical"),this.player2.gameboard.placeShip(4,[7,2],"horizontal"),this.player2.gameboard.placeShip(5,[2,7],"vertical")}};function R(){const e=T.createPlayer("Mysterio",1),t=T.createPlayer(!1,2);t.gameboard.placeAllShipsRandomly(),function(e){H(D);const t=M.drawSetupBoard(e,V(e)),n=M.drawSetupShips();n.querySelectorAll(".setup-ship-box"),D.append(t,n)}(e),document.querySelector(".setup-button-start").addEventListener("click",(function(n){var a,r;5===e.gameboard.placedShips.length&&(a=e,r=t,T.newGame(a,r),function(){H(D);const e=V(T.player1),t=V(T.player2);(function(e,t){for(let n=0;n<10;n++)for(let a=0;a<10;a++){const r=e.gameboard.board[n][a],o=t.querySelector(`[data-row='${n}'][data-col='${a}']`);null!==r&&"object"==typeof r?o.classList.add("cell-ship"):o.classList.remove("cell-ship")}})(T.player1,e.querySelector(".board")),D.append(e,t)}())}))}function H(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function V(e){const t=document.createElement("div");t.classList.add("board-container");const n=document.createElement("h3");e.isAI?n.textContent=`${e.name}'s fleet`:n.textContent="Your fleet";const a=function(e){const t=document.createElement("div");t.classList.add("board");for(let n=0;n<10;n++)for(let a=0;a<10;a++){const r=document.createElement("div");r.classList.add("cell"),r.dataset.player=e?e.number:0,r.dataset.row=n,r.dataset.col=a,t.appendChild(r),e&&e.isAI&&r.addEventListener("click",B,!1)}return t}(e);return t.append(n,a),t}function B(e){const t=e.target,n=t.dataset.player,a=T["player"+("1"===n?"2":"1")],r=T[`player${n}`];if(T.currentPlayer!==a)return;const o=t.dataset.row,i=t.dataset.col,[l,s,c]=a.attack(r,o,i);O(t,n,l,c),t.removeEventListener("click",B,!1),N()}function O(e,t,n,a){"hit"===n&&(e.classList.add("cell-hit"),a.isSunk()&&a.squares.forEach((e=>{document.querySelector(`[data-player='${t}'][data-row='${e[0]}'][data-col='${e[1]}']`).classList.add("cell-sunk")}))),"miss"===n&&e.classList.add("cell-miss")}function N(){const e=T.checkGameOver();if(e)return function(e){document.querySelectorAll(".cell").forEach((e=>e.removeEventListener("click",B,!1))),D.appendChild(function(e){const t=T.checkGameOver()===T.player1?T.player2:T.player1,n=document.createElement("div");n.classList.add("victory-container");const a=document.createElement("h2"),r=document.createElement("p"),o=document.createElement("p");return e.isAI?(a.classList.add("victory-defeat"),a.textContent="DEFEAT",r.textContent=`${e.name} has claimed domination!`,o.textContent="Your fleet is sunk."):(a.classList.add("victory-victory"),a.textContent="VICTORY",r.textContent="You have claimed domination!",o.textContent=`${t.name}'s fleet is sunk.`),n.append(a,r,o),n}(e))}(e);T.changeTurn(),T.currentPlayer.isAI&&function(e){if(e!==T.currentPlayer)return;const t=T.defendingPlayer===T.player1?"1":"2",[n,a,r]=e.attack(T.defendingPlayer);O(document.querySelector(`[data-player='${t}'][data-row='${a[0]}'][data-col='${a[1]}']`),t,n,r),N()}(T.currentPlayer)}R(),new ResizeObserver((e=>{e[0].contentRect.height>500?j.style.width="320px":j.style.width=`${e[0].contentRect.width}px`})).observe(D)})()})();