import{j as n,b as e}from"./index-d73aedfc.js";/* empty css                   */function c({data:s,width:i}){return n("div",{className:"addressChild",style:i?{maxWidth:i}:{},children:[e("span",{className:"addressType",children:s==null?void 0:s.addressType}),n("div",{className:"mainInfo",children:[e("span",{children:s==null?void 0:s.name}),e("span",{children:s==null?void 0:s.phone})]}),n("span",{className:"addressDesc",children:[(s==null?void 0:s.address)+", ",(s==null?void 0:s.locality)+", ",(s==null?void 0:s.town)+", ",s==null?void 0:s.state]}),e("span",{className:"pincode",children:s==null?void 0:s.pincode})]},s==null?void 0:s.id)}export{c as default};