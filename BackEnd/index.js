import express from 'express';
import cors from 'cors';
const app= express();
app.use(express.json());
app.use(cors());
app.post("/test",(req,res)=>{
    try{
        const {trainingData}=req.body;
        const filterdData=trainingData.slice(1);
        console.log(filterdData)
    return res.status(200).json({message:trainingData});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Server Error !"});
    }
});




app.listen(3003,()=>{
    console.log("listing on port 3003 . . .");
})








