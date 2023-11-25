const mongoose = require("mongoose");

// const { boolean } = require("webidl-conversions"); // help to convert value into booleans

const UserSchema = new mongoose.Schema({
 username: { type: String, required: true, unique: true},
 email: { type: String, required: true, unique: true},
 password: { type: String, required: true},
 isAdmin: { 
  type: Boolean,
  default: false,
 },
},
{timestamps: true} // this set the time a user created the an account.
); //is a blueprint that defines the structure of a document in a MongoDB collection.
// A schema acts as a contract between your application and the database, ensuring that data is stored and retrieved consistently

module.exports = mongoose.model("User", UserSchema);