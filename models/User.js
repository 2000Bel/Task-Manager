const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try{
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = await bcrypt.hash(this.password, hashed);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;