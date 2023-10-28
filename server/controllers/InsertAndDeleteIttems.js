// import Product from "../models/Product.js";
// // import productsData from "./dummy.js";
// import {rawData} from './rawData.js';
// const insertProducts = async (req, res) => {
//   // const uri1 = "https://dummyjson.com/products?skip=0&limit=0";
//   // const uri2 = "https://fakestoreapi.com/products";
//   // fetch(uri2)
//   //   .then((res) => res.json())
//   //   .then(async (json) => {
//   //     json.forEach(async (product, index) => {
//   //       // await Product.findOneAndDelete({id:product.id});
//   //       // insertNew Element
//   //       const val = await Product.find({ id: "fakeStore" + product.id });
//   //       if (!val.length) {
//   //         const newProduct = new Product({
//   //           id: "fakeStore" + product.id,
//   //           title: product.title,
//   //           price: product.price,
//   //           description: product.description,
//   //           category: product.category,
//   //           image: product.images,
//   //           rating:product.rating,
//   //         });
//   //         await newProduct.save();
//   //       }
//   //       //update
//   //       const doc = await Product.findOneAndUpdate({id:"fakeStore" + product.id}, {image:product.image}, {
//   //           new: true
//   //         });
//   //     });
//   //   });

//   // const data = await Product.find({});
//   // res.send(data);
//   // //   console.log(Product.countDocuments({}));
//   rawData.forEach(async(data)=>{
//     const imagesData = data.images.split('~');
//     // const category = data.gender.toLowerCase()==="unisex"?"Men Women clothing":data.gender + " clothing";
//     // const rate = Math.random()*1 + 4;
//     // const count = Math.random()*300 + 100;
//     await Product.findOneAndUpdate({id:data.mpn},{$unset:{image:""}});
//     // if(!result.length){
//     //   const prodcut = new Product({
//     //     id:data.mpn,
//     //     title:data.name,
//     //     price:data.price,
//     //     description:data.description,
//     //     category:category,
//     //     images:imagesData,
//     //     rating:{
//     //       rate:parseFloat(rate).toFixed(1),
//     //       count:parseInt(count)
//     //     }
//     //   });
//     //   await prodcut.save();
//     // }
//   });
//   const result = await Product.find({}).limit(20).exec();
//   res.json(result)
// };
// export default insertProducts;
