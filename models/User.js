// backend/models/User.js;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  // optional: password for future login feature
  password: { 
    type: String, 
    required: false 
},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);