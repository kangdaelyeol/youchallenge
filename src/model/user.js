import mongoose from "mongoose";
import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
  id:{type: String, required: true, unique:true},
  password:{type: String, required: true},
  nickname: {type: String, required: true, maxLength: 15},
  video:[{type:mongoose.Schema.Types.ObjectId, ref:"Video"}]
})

UserSchema.static("comparePW", async function(pw1, pw2){
  return await bcrypt.compare(pw1, pw2);
})

UserSchema.static("hashPW", async function(pw){
  return await bcrypt.hash(pw, 1);
})

const userModel = mongoose.model("User", UserSchema);

export default userModel;