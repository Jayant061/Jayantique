import{r as s,_ as w,P as R,b as a,L as v,j as q,F as E,c as L,g as I}from"./index-d73aedfc.js";import{a as b}from"./axios-707ed124.js";/* empty css                */const T="/assets/loading-e1663a4d.svg",x=s.lazy(()=>w(()=>import("./Product-55e8a2a8.js"),["assets/Product-55e8a2a8.js","assets/index-d73aedfc.js","assets/index-af484219.css","assets/LazyImage-c51bc01a.js"])),$=s.lazy(()=>w(()=>import("./Pagination-46f9a483.js"),["assets/Pagination-46f9a483.js","assets/index-d73aedfc.js","assets/index-af484219.css","assets/axios-707ed124.js","assets/Pagination-5596654b.css","assets/product-fb1defa8.css"]));function j(){var h,y;const{dispatch:p,state:e}=s.useContext(R),[i,u]=s.useState(1),[d,c]=s.useState(!0),[g,m]=s.useState(""),f=s.useRef();s.useEffect(()=>{document.title="Jayantique | All products",e.products.length||sessionStorage.setItem("isProductReq","true");const o=new URLSearchParams(window.location.search),t=o.get("query");t&&p({type:"Query",payload:t});const r=o.get("page");r&&u(parseInt(r))},[]),s.useEffect(()=>{function o(){const r=new URLSearchParams(window.location.search).get("page");r&&u(parseInt(r)),sessionStorage.setItem("isProductReq","true")}return window.addEventListener("popstate",o),()=>{window.removeEventListener("popstate",o)}},[]),s.useEffect(()=>{const o=e.query;sessionStorage.getItem("isProductReq")==="false"&&c(!1);const t=async()=>{var n;try{const l=await b.get(`${L}/products?query=${o}&page=${i}`);c(!1),p({type:I,payload:l.data}),sessionStorage.setItem("isProductReq","false")}catch(l){!((n=e.products)!=null&&n.length)&&m(l.message),c(!1);const S=setTimeout(()=>{var P;t(),(P=e.product)!=null&&P.length&&clearTimeout(S)},2e3)}},r=sessionStorage.getItem("isProductReq")==="true"&&setTimeout(()=>{var n;!((n=e.products)!=null&&n.length)&&c(!0),t()},1e3);return()=>{clearTimeout(r),c(!1)}},[e.query,i]),s.useEffect(()=>{var r,n;const o=e.query;(r=f.current)==null||r.scrollIntoView({behavior:"smooth",block:"start"});let t=window.location.origin+window.location.pathname;t=t+`?query=${o}&page=${i}`,window.history.pushState(t,"",t),(n=e.products)!=null&&n.length&&m("")},[e,i]);const _=(h=e==null?void 0:e.products)==null?void 0:h.map((o,t)=>a(s.Suspense,{fallback:a(v,{}),children:a(x,{product:o},t)},t));return q("div",{className:"products",children:[a("div",{className:"productsHeading",children:a("span",{ref:f,children:"All Products"})}),q("div",{className:"items",children:[d?a("img",{src:T,style:{width:"30%"},alt:"three dots loading"}):_,g&&a("p",{style:{color:"red"},children:g})]}),(y=e==null?void 0:e.products)!=null&&y.length&&!d?a($,{setPage:u,itemNumber:e.products.length,isLoading:d}):a(E,{})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));export{U as P,T as l};