const express=require("express");
const router=express.Router();
const passport = require("passport");


const {createProduct,
    editProduct,
    getAllProducts,
    addProductToCart,
    getUserCart,
    removeProductFromCart
    
}=require("../controllers/product_controller")


router.post("/create",
passport.authenticate("jwt", { session: false }),
createProduct
);

router.put("/edit/:productId",
passport.authenticate("jwt", { session: false }),
editProduct
);

router.get("/getAllProducts",
passport.authenticate("jwt", { session: false }),
getAllProducts
)
router.post("/addProductToCart/:productId",
passport.authenticate("jwt", { session: false }),
addProductToCart
)
router.get("/userCart",
passport.authenticate("jwt", { session: false }),
getUserCart

)
router.delete("/removeProductFromCart/:productId",
passport.authenticate("jwt", { session: false }),
removeProductFromCart
)




module.exports=router;