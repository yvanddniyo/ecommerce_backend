const mongoose = require("mongoose");

const { boolean } = require("webidl-conversions"); // help to convert value into booleans

const ProductSchema = new mongoose.Schema({
 title: { type: String, required: true, unique: true},
 desc: { type: String, required: true},
 img: { type: String, required: true},
 categories: { type: Array},
 size: { type: String},
 color: { type: String},
 price: { type: String, required: true},

},
{timestamps: true} // this set the time a user created the an account.
); //is a blueprint that defines the structure of a document in a MongoDB collection.
// A schema acts as a contract between your application and the database, ensuring that data is stored and retrieved consistently

module.exports = mongoose.model("Product", ProductSchema);