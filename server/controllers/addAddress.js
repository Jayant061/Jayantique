
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const addAddress = (req,res)=>{
    const data = req.body;
    jwt.verify(data.token,process.env.SECRETKEY,async (err,user)=>{
        if(err){
            res.status(401).json("invalidToken");
        }
        if(user){
            const homeAddresses = user.resData.address.home;
                const workAddresses = user.resData.address.work;
                if(data.newAddress.addressType === "Home"){
                    homeAddresses.push(JSON.stringify(data.newAddress));
                }
                else if(data.newAddress.addressType === "Work"){
                    workAddresses.push(JSON.stringify(data.newAddress));
                }
            try {
                const resData = await User.findOneAndUpdate({_id:user.resData._id},
                    {address:{home:homeAddresses,work:workAddresses}},
                    {new:true}).select("-password");
                    const accessToken = jwt.sign({resData},process.env.SECRETKEY);
                    res.status(200).json(accessToken);
                    
            } catch (error) {
                res.send(error);
            }
        }
    })
}
export default addAddress;