import express from "express";
import mongoose, { connect } from "mongoose"
import dotenv from "dotenv";
import cors from "cors";
//import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cardRoutes.js";
import checkoutRoutes from "./routes/checkoutRouters.js";
import userRoutes from "./routes/userRoutes.js";
import orderRouters from "./routes/orderRoutes.js";
import Products from "./models/Products.js";

dotenv.config();

const app = express();


// app.use(cors({
//   origin: "http://localhost:5173", // your React app URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization", "userId"],
// }));



app.use(cors());
app.use(express.json());

let isConnected = false;
async function ConnectedToMongoDB() {
    try {
        mongoose.connect(process.env.MONGO_URI , {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }).then(() => {
            isConnected = true;
            console.log("MongoDB connection successful"); 
        })
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
    
}
 

app.use(async (req, res, next)=>{
    if(!isConnected){
        await ConnectedToMongoDB();
    }
    next();
})
app.get("/", (req, res) => {
  res.send("API IS RUNING!");
});
// Routes
 
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRouters);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;