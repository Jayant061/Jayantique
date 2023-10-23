import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const limitEl = 20;
  let skipEl = req.query.page?(req.query.page - 1):0;
  const isTrendingProduct = req.query.trendingProduct;
  const itemId = req.query.itemId;
  if(isTrendingProduct){
    try {
      const resp = await Product.find({
        title:{ $regex: "lamp", $options: 'i' }
      }).limit(4);
      res.send(resp);
      
    } catch (error) {
      res.json(error);
      //do nothing
    }
    
  }
  else if(itemId){
    try {
      const resp = await Product.findOne({_id: itemId});
      const finalRes = await Product.find({category: { $regex: resp.category, $options: 'i' }}).skip(limitEl*skipEl).limit(limitEl);
      res.json(finalRes);

    } catch (error) {
      res.json(error);
      //do nothing
    }
  }
  else{
    try {
      const resp = await Product.find({
        $or: [
          { title: { $regex: `^${req.query.query}|\\s${req.query.query}`, $options: 'i' } },
          { category: { $regex: `^${req.query.query}|\\s${req.query.query}`, $options: 'i' } },
        ],
      }).skip(skipEl*limitEl).limit(limitEl).exec();
      res.json(resp); 
    } catch (error) {
      res.json(error);
      //do nothing
    }
  }
  };
  export default getProducts;