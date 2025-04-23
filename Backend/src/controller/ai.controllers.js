import {generateContent} from "../services/ai.service.js";

export default async function getreview(req,res){
    const code=req.body.code;
    if(!code){
        return res.status(400).send("code not found");
    }

    try{
        const response=await generateContent(code);
    // console.log(response);
    res.send(response);
    }catch(error){
        console.error("Error generative ",error.message);
        res.status(500),send("wrong with ai");
    }
    
    
}