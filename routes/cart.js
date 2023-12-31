const Cart = require("../models/Cart");
// const { create } = require("../models/User");
const { 
  verifyToken, 
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// CREATE
 
 router.post("/", verifyToken, async (req, res) => {
  const newCart = new create(req.body)
  
  try{
   const savedCart = await newCart.save();
   res.status(200).json(savedCart)
  }catch(err) {
    res.status(500).json(err)
  }
 })
  

  //UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) =>{
  try{
    const updateCart =  await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    },
    {
      new: true
    });
    res.status(200).json(updateCart)
  }catch(err){
   res.status(500).json(err);
  }
});

//DELETE

router.delete("/id:", verifyTokenAndAuthorization, async (req, res) => {
   try{
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted...")
   }catch(err){
    res.status(500).json(err)
   }
})

//GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try{
   const cart = await Cart.findOne({usedId: req.params.userId });
   res.status(200).json(cart)
  }catch(err) {
   res.status(500).json(err)
  }
});

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  try{
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch(err) {
    res.status(500).json(err)
  }
 })

module.exports = router