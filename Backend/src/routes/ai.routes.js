import express from "express";
import getreview from "../controller/ai.controllers.js"

const router=express.Router();

router.post("/",getreview)



export default router;
