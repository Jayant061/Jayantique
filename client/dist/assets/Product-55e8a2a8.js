import{r as t,u as C,C as h,j as i,b as e,f,h as N}from"./index-d73aedfc.js";import{L as x}from"./LazyImage-c51bc01a.js";function A({product:a}){const[l,n]=t.useState(!1),r=C(),{cartDispatch:d,cartItems:c,addedItems:s}=t.useContext(h);function m(){r("/product/"+a._id)}function o(){d({type:f,payload:a}),d({type:N,payload:a._id}),n(!0)}return t.useEffect(()=>{s!=null&&s.has(a._id)&&n(!0)},[c]),i("div",{className:"product",children:[e(x,{id:a._id,src:a.images[0],alt:a.title,handleClick:m}),i("div",{className:"itemContent",children:[e("h4",{className:"productName",children:a==null?void 0:a.title}),i("p",{children:["₹ ",a==null?void 0:a.price]}),l?e("span",{className:"addToCart",children:"Added to cart"}):e("span",{className:"addToCart",onClick:o,children:"Add to cart"})," "]})]})}export{A as default};
