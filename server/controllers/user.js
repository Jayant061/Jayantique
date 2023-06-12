
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyToken = (req,res)=>{
    const data = req.body;
    jwt.verify(data.token,process.env.SECRETKEY,async (err,user)=>{
        if(err){
            console.log(err)
            res.status(401).json("invalidToken");
        }
        if(user){
            try {  
                const resData = await User.findOneAndUpdate({_id : user.resData._id},
                    {name:data.name,email:data.email,phone:data.phone,gender:data.gender},
                    {new:true}).select("-password");
                    const accessToken = jwt.sign({resData},process.env.SECRETKEY);
                    res.status(200).json(accessToken);
            } catch (error) {
                res.status(404).send(error);
            }
        }
    })
}
export default verifyToken;