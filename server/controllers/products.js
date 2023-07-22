import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const count = 0;
  const limit = 20;
  const isTrendingProduct = req.query.trendingProduct;
  const itemId = req.query.itemId;
  if(isTrendingProduct){
    try {
      const resp = (await Product.find()).splice(4,3);
      res.send(resp);
      
    } catch (error) {
      // console.log(error);
      res.send(error);
      //do nothing
    }
    
  }
  else if(itemId){
    try {
      
      const resp = await Product.findOne({_id: itemId});
      const finalRes = await Product.find({category: resp.category});
      res.send(finalRes);

    } catch (error) {
      res.send(error);
      //do nothing
    }
  }
  else{
    try {
      const resp = (await Product.find(
        {title:{ "$regex": req.query.query, "$options": "i" }} 
        )).splice(limit*count,limit*(count+1));
      res.send(resp);
      
    } catch (error) {
      res.send(error);
      //do nothing
    }
  }
  };
  export default getProducts;