const Order = require("../models/Order");
// const { create } = require("../models/User");
const { 
  verifyToken, 
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// CREATE
 
 router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  
  try{
   const savedOrder = await newOrder.save();
   res.status(200).json(savedOrder)
  }catch(err) {
    res.status(500).json(err)
  }
 })
  

  //UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) =>{
  try{
    const updateOrder =  await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    },
    {
      new: true
    }); 
    res.status(200).json(updateOrder)
  }catch(err){
   res.status(500).json(err);
  }
});

//DELETE

router.delete("/id:", verifyTokenAndAdmin, async (req, res) => {
   try{
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted...")
   }catch(err){
    res.status(500).json(err)
   }
})

//GET USER ORDER

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try{
   const orders = await Order.find({usedId: req.params.userId });
   res.status(200).json(orders)
  }catch(err) {
   res.status(500).json(err)
  }
});

// GET ALL

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  try{
    const orders = await Order.find()
    res.status(200).json(carts)
  } catch(err) {
    res.status(500).json(err)
  }
 })

 // GET MONTHLY STATS

 router.get("/income", verifyTokenAndAdmin, async(req, res) => {
   const date = new Date();
   const lastMonth = new Date(date.setMonth(date.getMonth() -1 ));
   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
   try{
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt"},
          sales: "$amount"
        },
      },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },  
        },
    ]);
    res.status(200).json(income)
   }catch(err){
      res.status(500).json(err);
   }
 });


module.exports = router