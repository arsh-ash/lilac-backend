const Product=require("../models/products");
const User=require("../models/user");
const fs = require("fs");
const path = require("path");
const { findById } = require("../models/products");

module.exports.createProduct=async(req,res)=>{
    let product= await Product.create(req.body);
    return res.status(200).json({
        success:true,
        message:"new product has been created",
        product
   })
}
module.exports.editProduct=async(req,res)=>{
    console.log("req.paramsm in edit request",req.params.productId);
    const item=await Product.findById(req.params.productId);
    console.log("item",item);

  
    Product.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("multerError");
        }
    
        if (req.file) {
          if (item.thumbnail) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          item.thumbnail = Product.avatarPath + "/" + req.file.filename;
        }
        item.save();
      });

      return res.status(200).json({
        success:true,
        message:"product image added successfully"
      })
    





}

module.exports.getAllProducts=async(req,res)=>{
    let products= await Product.find({})
    console.log("All products",products);
    return res.status(200).json({
        success:true,
        message:"All products fetched Successfully",
        data:products
    })

}

module.exports.addProductToCart=async(req,res)=>{
   console.log("req.params.product id",req.params.productId);

    const user= await User.findById(req.user._id);
    const product=
    console.log("user",user);
    let updatedUser = await User.findByIdAndUpdate(req.user._id,
        { $push: { cart: req.params.productId } },
        { new: true }
    )

    return res.status(200).json({
        message:"appi working fine",
        data:updatedUser
        
    })



}

module.exports.removeProductFromCart=async(req,res)=>{
    const user= await User.findById(req.user._id);
    console.log("user of remove from cart",user);
    let index=user.cart.indexOf(req.params.productId);
    console.log("index",index);
    console.log("user ka before",user.cart.length);

    if(index>-1){
        user.cart.splice(index,1);
    }
    console.log("hiiii spl",user.cart.length);
    user.save();

    // let updatedUser = await User.findByIdAndUpdate(req.user._id,
    //     { $pull: { cart: req.params.productId } },
    //     { new: true }
    // )

    return res.status(200).json({
        message:"appi working fine",
        // data:updatedUser
        
    })

}
module.exports.getUserCart=async (req,res)=>{
    console.log("hiiiii in cart api")

    let user= await User.findById(req.user._id).populate("cart");
    console.log("user ka cart",user);
     let count=0;
    for(let item of user.cart){
        count+=item.price

    }
    console.log("count",count);
    return res.status(200).json({
        message:"everthing is fine",
        data:user,
        count
    })


}