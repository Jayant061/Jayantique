import{r as c,_ as V,u as $,P as K,e as Q,C as U,b as s,L as q,j as t,F as A,c as G,f as H,h as J}from"./index-d73aedfc.js";import{a as W}from"./axios-707ed124.js";/* empty css                */const Y="/assets/star-2051a8e8.svg",Z=c.lazy(()=>V(()=>import("./Product-55e8a2a8.js"),["assets/Product-55e8a2a8.js","assets/index-d73aedfc.js","assets/index-af484219.css","assets/LazyImage-c51bc01a.js"]));function te(){var z,D,L,k,w;const v=c.useRef(),T=$(),{state:h,dispatch:R}=c.useContext(K),{params:u}=Q(),[e,j]=c.useState({}),[N,p]=c.useState([]),[g,F]=c.useState(null),[C,f]=c.useState(""),[S,y]=c.useState();c.useEffect(()=>{var a,r,l,d,x,E;document.title=e==null?void 0:e.title,(a=v.current)==null||a.scrollIntoView({behavior:"smooth"}),(r=e==null?void 0:e.images)!=null&&r.length&&y(e.images[0]),(l=e==null?void 0:e.category)!=null&&l.includes("Footwear")?p(["6","7","8","9","10"]):(d=e==null?void 0:e.category)!=null&&d.includes("cloth")?p(["S","M","L","XL","XXL"]):(E=(x=e==null?void 0:e.category)==null?void 0:x.toLowerCase())!=null&&E.includes("bedsheet")&&p(["Single","Double","Queen","King"])},[e]),c.useEffect(()=>{let a=!0;return a&&(async()=>{const l=await W.get(`${G}/products?itemId=${u}`);j(l.data.find(d=>{if(d._id===u)return d})),R({type:"similarProducts",payload:l.data})})(),()=>{a=!1}},[u]);const[b,m]=c.useState(!1),{cartDispatch:I,cartItems:X,addedItems:o}=c.useContext(U);function P(){g===null?f("Note: Please select size before proceeding"):(I({type:H,payload:e}),I({type:J,payload:e==null?void 0:e._id}),m(!0))}c.useEffect(()=>{o!=null&&o.has(e==null?void 0:e._id)?m(!0):m(!1)},[X,o,e]);function B(){g===null?f("Note: Please select size before proceeding"):(!b&&P(),T("/addToCart"))}let i=(z=h==null?void 0:h.similarProducts)==null?void 0:z.filter(a=>(a==null?void 0:a._id)!==(e==null?void 0:e._id));i=i==null?void 0:i.map((a,r)=>s(c.Suspense,{fallback:s(q,{}),children:s(Z,{product:a},a._id)},r));const M=(D=e==null?void 0:e.images)==null?void 0:D.map((a,r)=>s("img",{src:a,onClick:()=>{y(a)},style:a===S?{border:"1px solid gray"}:{}},r)),_=N.length&&N.map((a,r)=>s("div",{className:"eachSize",id:r,onClick:()=>{F(r)},style:g===r?{backgroundColor:"#13395b",color:"white"}:{},children:s("span",{children:a})},r)),n=(e==null?void 0:e.description)&&((L=e==null?void 0:e.description)==null?void 0:L.split(",")),O=(n==null?void 0:n.length)&&(n==null?void 0:n.map((a,r)=>s("p",{children:a},r)));return t(A,{children:[t("div",{className:"productDescription",ref:v,children:[t("div",{className:"imgSection",children:[s("div",{className:"mainImg",children:s("img",{src:S,alt:""})}),s("div",{className:"images",children:M})]}),t("div",{className:"contentSection",children:[s("div",{className:"title",children:s("h2",{children:e==null?void 0:e.title})}),t("div",{className:"ratings",children:[t("h3",{children:[(k=e==null?void 0:e.rating)==null?void 0:k.rate," ",s("img",{src:Y})]}),t("span",{children:[(w=e==null?void 0:e.rating)==null?void 0:w.count," Ratings"]})]}),t("div",{className:"price",children:[t("h3",{children:["₹",e==null?void 0:e.price]}),t("span",{children:["MRP: ₹",parseInt(2.5*(e==null?void 0:e.price))]}),s("p",{children:"60% Off"})]}),_.length&&t("div",{className:"productSize",children:[s("h4",{children:"Select Size:"}),s("div",{className:"sizes",onClick:()=>{f("")},children:_})]}),C&&s("div",{className:"note",children:s("span",{style:{color:"red"},children:C})}),t("div",{className:"buttons",children:[b?s("button",{children:"Added to Cart"}):s("button",{onClick:P,children:"Add to Cart"}),s("button",{onClick:B,children:"Buy Now"})]}),t("div",{className:"itemDescription",children:[s("h3",{children:"Product Details"}),t("div",{className:"descriptions",children:[s("h4",{children:"Descriptions:"}),s(A,{children:O})]}),t("div",{className:"category",children:[s("h4",{children:"Category:"}),s("p",{children:e==null?void 0:e.category})]})]})]})]}),t("div",{className:"similar",children:[s("div",{className:"similarProductsheading",children:s("span",{children:"Similar Products"})}),s("div",{className:"similarProducts",children:i})]})]})}export{te as default};
