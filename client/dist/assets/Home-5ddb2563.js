import{r as a,_ as d,P as p,u as h,a as f,j as n,b as e,L as c}from"./index-d73aedfc.js";const _=a.lazy(()=>d(()=>import("./Trending-d94232cd.js"),["assets/Trending-d94232cd.js","assets/index-d73aedfc.js","assets/index-af484219.css","assets/axios-707ed124.js","assets/LazyImage-c51bc01a.js"])),E=a.lazy(()=>d(()=>import("./Testimonial-3ced4db8.js"),["assets/Testimonial-3ced4db8.js","assets/index-d73aedfc.js","assets/index-af484219.css"]));function y(){const[t,i]=a.useState(!1),{state:s}=a.useContext(p),l=h(),m=f(),o=new URLSearchParams(m.search);o.get("paymentSuccess"),o.get("paymentCancel"),o.get("transactionError"),a.useEffect(()=>(document.title="Jayantique | Home",()=>{i(!1)}),[]);function u(){var r;((r=s==null?void 0:s.products)==null?void 0:r.length)!==0&&s.products[0].category.includes("watch")?sessionStorage.setItem("isProductReq","false"):sessionStorage.setItem("isProductReq","true")}function g(){i(!0)}return n("div",{className:"home",children:[n("div",{className:"homeHeader",children:[n("div",{className:"text",children:[e("h1",{style:t?{animation:"slideIn 1s ease 0.1s forwards"}:{},children:"Design Your Signature Space"}),e("p",{style:t?{animation:"slideIn 1s ease 0.2s forwards"}:{},children:"Explore Exquisite Fashion and Home Decor Choices to Redefine Your Space with Elegance."}),e("button",{style:t?{animation:"slideIn 1s ease 0.35s forwards"}:{},onClick:()=>{u(),l("/products?query=women perfume")},children:"Shop Now ➔"})]}),e("div",{className:"homeImg",children:e("img",{src:"https://firebasestorage.googleapis.com/v0/b/ecommerce-app-7604d.appspot.com/o/JayantiqueHomepage.png?alt=media&token=ba006548-b59b-4d1b-985a-8d84da113844&_gl=1*1r4cqd0*_ga*NTYzODcyMjgwLjE2ODU1OTE4MzA.*_ga_CW55HF8NVT*MTY5ODE1NzU3Mi4zLjEuMTY5ODE1NzY4NC4xMS4wLjA.",alt:"background image",id:"bgimg",onLoad:g})})]}),e(a.Suspense,{fallback:e(c,{}),children:e(_,{})}),e(a.Suspense,{fallback:e(c,{}),children:e(E,{})})]})}export{y as default};