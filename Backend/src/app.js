import express from "express";
import aiRoutes from "./routes/ai.routes.js"
const app=express();

import cors from "cors"

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("server started");
})

app.use("/",aiRoutes)
export default app;