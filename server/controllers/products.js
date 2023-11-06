import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const limitEl = 20;
  let skipEl = req.query.page?(req.query.page - 1):0;
  const isTrendingProduct = req.query.trendingProduct;
  const itemId = req.query.itemId;
  if(isTrendingProduct){
    const queries = ["men shoe", "invictus", "lamp"];
    const result = [];

try {
  (async () => {
    for (let index = 0; index < queries.length; index++) {
      const query = queries[index];
      const keywords = query.split(' ');
      const resPromise = await Product.find({
        $and: keywords.map(keyword => (
          {
        $or: [
          { title: { $regex: `^${keyword}|\\s${keyword}`, $options: 'i' } },
          { category: { $regex: `^${keyword}|\\s${keyword}`, $options: 'i' } },
        ],
      }
      ))
      }).skip(index ===0?3:0).limit(4).exec();
      

      const resp = await Promise.all(resPromise);
      result.push(resp);
    }

    res.status(200).send(result);
  })();
} catch (error) {
  res.status(400).send(error);
}

    
  }
  else if(itemId){
    try {
      const resp = await Product.findOne({_id: itemId});
      const finalRes = await Product.find({category: { $regex: resp.category, $options: 'i' }}).skip(limitEl*skipEl).limit(limitEl/2);
      const finalData = await Promise.all(finalRes);
      finalData.push(resp);
      res.status(200).send(finalData);

    } catch (error) {
      res.status(400).send(error);
      //do nothing
    }
  }
  else{
    const arr = req?.query?.query? req.query.query.split(' '):[];
    // const keyword = req.query.query;
      const gender = req?.query?.gender;
      const category = req?.query?.category;
      const sort = req?.query?.sort;
      const conditions = [];

      if(gender){
        conditions.push({
          $or:[
          {title:{$regex:`^${gender}|\\s${gender}|unisex`,$options:"i"}},
          {category:{$regex:`^${gender}|\\s${gender}|unisex`,$options:"i"}}
        ]
      });
      }

    if(category){
      conditions.push({category:{$regex:category,$options:"i"}});
    }

    if(arr.length){
      const queryConditions = arr.map(keyword=>{
        return{
            $or: [
              { title: { $regex: `^${keyword}|\\s${keyword}`, $options: 'i' } },
              { category: { $regex: `^${keyword}|\\s${keyword}`, $options: 'i' } },
            ],
        }
        
      });
      conditions.push(...queryConditions);
      // if(sort){
      }

    try {
      const resp = await Product.find(!conditions.length?{}:{
        $and: conditions
      }).skip(skipEl*limitEl).limit(limitEl).exec();
      res.status(200).send(resp); 
    } catch (error) {
      res.status(400).send(error);
      //do nothing
    }
  }
};
  export default getProducts;