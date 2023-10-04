import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const isTrendingProduct = req.query.trendingProduct;
  const itemId = req.query.itemId;
  if(isTrendingProduct){
    try {
      const resp = (await Product.find({category:{ "$regex": "decoration", "$options": "i" }}))
      .splice(1,3);
      res.json(resp);
      
    } catch (error) {
      res.json(error);
      //do nothing
    }
    
  }
  else if(itemId){
    try {
      
      const resp = await Product.findOne({_id: itemId});
      const finalRes = await Product.find({category: resp.category});
      res.json(finalRes);

    } catch (error) {
      res.json(error);
      //do nothing
    }
  }
  else{
    try {
      const resp = (await Product.find(
        {title:{ "$regex": req.query.query, "$options": "i" }} 
        ));
      res.json(resp);
      
    } catch (error) {
      res.json(error);
      //do nothing
    }
  }
  };
  export default getProducts;