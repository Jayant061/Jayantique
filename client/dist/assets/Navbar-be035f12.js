import{r as s,a as C,u as b,C as q,P as E,b as e,F as I,j as c,d as m}from"./index-d73aedfc.js";import{u as P}from"./user-9e6fb35d.js";const L="/assets/outline-search-be3f93f4.svg",N="/assets/cart2-37687014.svg",R="/assets/more-4e976532.svg";function Y(){const a=s.useRef(null),h=C(),u=b(),[i,r]=s.useState(!1),{quantity:d}=s.useContext(q);s.useState(!1);const{state:l,dispatch:p}=s.useContext(E),[n,v]=s.useState(l.query);s.useEffect(()=>{r(!1)},[h.pathname]),s.useEffect(()=>(document.addEventListener("mousedown",t=>{a.current&&!a.current.contains(t.target)&&r(!1)}),()=>{document.removeEventListener("mousedown",t=>{a.current&&!a.current.contains(t.target)&&r(!1)})}),[]);const[g,y]=s.useState(!1),[f,S]=s.useState(0);s.useEffect(()=>{const t=()=>{const o=window.scrollY;o>=150&&(y(o>f),S(o))};return window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}},[f]);const w={transform:g?"translateY(-100%)":"translateY(0)",transition:"transform 0.3s ease-in-out"};s.useEffect(()=>{n===l.query?sessionStorage.setItem("isProductReq","false"):sessionStorage.setItem("isProductReq","true");const t=n&&setTimeout(()=>{if(n&&l.query!==n&&p({type:"Query",payload:n}),window.location.pathname!=="/products")u(`/products?query=${n}&page=1`);else{let o=window.location.origin+window.location.pathname;o=o+`?query=${n}&page=1`,window.history.pushState(o,"",o)}},1e3);return()=>{clearTimeout(t)}},[n]);function x(t){v(t.target.value)}return e(I,{children:c("div",{className:"navbar",style:w,children:[e("div",{className:"logo",children:e("span",{onClick:()=>{u("/"),r(!1)},children:"Jayantique"})}),!i&&e("img",{src:R,alt:"button for more options",className:"moreBtn",style:i?{backgroundColor:"#f1f1f1"}:{},onClick:()=>{r(t=>!t)}}),c("div",{className:"navSearchBar",children:[e("img",{src:L,alt:"search Icon"}),e("input",{type:"text",placeholder:"Search product by name, category etc.",value:n,onChange:x})]}),c("ul",{className:"navItems",style:i?{display:"flex",height:"max-content"}:{},ref:a,children:[e("li",{id:"firstEl",children:e(m,{to:"/auth/user",children:e("img",{src:P,alt:""})})}),e("li",{children:e(m,{to:"/addToCart",children:c("div",{id:"cart",style:k,children:[e("span",{style:d?j:{display:"none"},children:d}),e("img",{src:N,alt:""})]})})})]})]})})}const k={position:"relative"},j={minWidth:"fit-content",textDecoration:"none",position:"absolute",top:"2px",left:"50%",transform:"translateX(-50%)",fontWeight:"500",fontSize:"15px",zindex:"10",color:"#fff"};export{Y as default};