import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config()


import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"



const app = express();
app.use(cors({
    origin : "http://localhost:3000"
}

))
app.use(express.json());
connectDB()


app.get("/", (req, res) => {
    res.send("server is running")
})

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)


})
