const express=require("express");
const router=express.Router();
const auth=require("./auth")
const Product=require("./product")


router.use("/auth",auth);
router.use("/product",Product);






module.exports=router;