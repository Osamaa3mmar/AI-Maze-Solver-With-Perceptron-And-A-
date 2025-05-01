import { Perceptron } from "../../Perceptron.js";

let cell=new Perceptron();
let train=false;
export const getTrainingData=(req,res)=>{
    try{
        const {data,learnRate,epoch}=req.body;
        cell.epochSetter(epoch);
        cell.learningRateSetter(learnRate);
        cell.pushData(data);
        let rate=cell.learn();
        train=true;
        return res.status(200).json({message:"Data Trained Success !",weights:cell.getWeights(),rate});
    }catch(error){
        return res.status(500).json({message:"Server Error !",error});
    }
}

export const test=(req,res)=>{
    if(train==false){
        return res.status(400).json({message:"Train Before !"});
    }
    const {values}=req.body;
    const result=cell.test(values);
    return res.json({result});
}

export const cancele=(req,res)=>{
    cell=new Perceptron();
    train=false;
    return res.status(200).json({message:"Data Cleared !"});
}