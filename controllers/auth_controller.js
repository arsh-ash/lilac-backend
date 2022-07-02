const User=require("../models/user");
const jwt=require("jsonwebtoken");

module.exports.register=async (req,res)=>{

    console.log("req ki body",req.body)
    try {
        const ifEmail= await User.findOne({
            email:req.body.email
        })
        if(ifEmail){

            return res.status(409).json({
                success:false,
                message:"user alreay exist",

            })
        }
        const user=await User.create(req.body);
        console.log("user created",user);
        return res.status(200).json({
            success:true,
            message:"user created sucessfully",
            data: {
              token: jwt.sign(user.toJSON(), "lilac", { expiresIn: "100000000" }),
              user
            },
        })
        
    } catch (error) {
        console.log("error",error);
        return res.status(404).json({
            message:"internal server err",
            err:error


        })
        
    }

    



}
module.exports.login= async function(req,res){
    console.log("hhhiiii in login");
    console.log("body",req.body.email);
    try {
      let user = await User.findOne({ email: req.body.email }).select(
          "+password"
      );
      console.log("user found", user);
      const password = req.body.password;
      // Check if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        console.log('Didnt match')
        // return next(new ErrorResponse("Password is invalid ", 401));
        return res.status(201).json({
          message: "Invalid password",
          success:false
        });
      } else if (!user) {
        console.log('No user')
        return res.status(400).json({
          message: "User not found",
          success:false
        });
      }
  
      return res.status(200).json({
        message: "Sign in successful, here is your token",
        success:true,
        data: {
          token: jwt.sign(user.toJSON(), "lilac", { expiresIn: "100000000" }),
          user
        },
      });
    } catch (err) {
      console.log('server Error',err)
      return res.status(500).json({
        success:false,
        message: err,
      });
    }

}