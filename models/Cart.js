const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
 userId: { type: String, required: true},
 products: [{
  productId: {
    type: String
  },
 quantity: {
  type: Number,
  default: 1,
 }
}
 ]

},
{timestamps: true} // this set the time a user created the an account.
); //is a blueprint that defines the structure of a document in a MongoDB collection.
// A schema acts as a contract between your application and the database, ensuring that data is stored and retrieved consistently

module.exports = mongoose.model("Cart", CartSchema);