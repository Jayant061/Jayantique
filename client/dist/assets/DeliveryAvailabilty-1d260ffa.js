import{r as s,C as g,B as n,j as t,b as a,D as p}from"./index-d73aedfc.js";const y="/assets/tick-137425cc.svg",x="/assets/location-783bfb0a.svg";function T(){let v=s.useRef();const[i,o]=s.useState({freeDelivery:!1,COD:!1,deliveryTime:{min:"",max:""}}),{cartDispatch:l,pincode:u}=s.useContext(g),[r,h]=s.useState(u),[D,f]=s.useState(!1),[c,m]=s.useState(!1),C=d=>{if(d.preventDefault(),m(!1),r.length!==6||parseInt(r)<=1e5)f(!0),l({type:n,payload:null}),l({type:p,payload:r});else{f(!1),l({type:p,payload:r});const e=parseInt(parseInt(r)/1e4);10<=e&&e<=13||40<=e&&e<=44||56<=e&&e<=64?(o({freeDelivery:!0,COD:!0,deliveryTime:{min:3,max:3+(e%10-1)}}),l({type:n,payload:0})):70<=e&&e<=85?(o({freeDelivery:!1,COD:!0,deliveryTime:{min:5,max:2+e%10}}),l({type:n,payload:40})):(o({freeDelivery:!1,COD:!1,deliveryTime:{min:9,max:14}}),l({type:n,payload:45}))}};return s.useEffect(()=>{c&&l({type:n,payload:null})},[c]),t("div",{className:"deliveryAvailabilty",children:[a("span",{className:"deliveryHeading",children:"Delivery availability"}),t("form",{className:"locationInput",onSubmit:C,children:[a("img",{src:x,alt:""}),a("input",{type:"number",placeholder:"Enter Pincode here!",onChange:d=>{h(d.target.value),m(!0)},value:r,ref:v}),a("button",{type:"submit",children:"CHECK"})]}),D&&!c?a("span",{style:{fontSize:"17px",fontWeight:"500",color:"red",textAlign:"center"},children:"Please Enter a valid Pincode"}):t("div",{className:"offers",style:c?{display:"none"}:{},children:[t("div",{className:"freeDelivery offer",style:i.freeDelivery?{}:{display:"none"},children:[a("img",{src:y,alt:""}),a("span",{children:"Free delivery"})]}),t("div",{className:"cashOnDelivery offer",style:i.COD?{}:{display:"none"},children:[a("img",{src:y,alt:""}),a("span",{children:"Cash on delivery"})]}),t("div",{className:"deliveryTime offer",style:i.deliveryTime.min?{}:{display:"none"},children:[a("img",{src:y,alt:""}),t("span",{children:["Estimated delivery time is ",i.deliveryTime.min,"-",i.deliveryTime.min!==i.deliveryTime.max&&i.deliveryTime.max," days"]})]})]})]})}export{T as default};
