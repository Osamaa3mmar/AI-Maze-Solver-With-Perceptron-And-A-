import { Perceptron } from "../../Perceptron.js";

let cell=new Perceptron();
export const getTrainingData=(req,res)=>{
    try{
        const {data,learnRate,epoch}=req.body;
        cell.setEpochs(epoch);
        cell.setLearningRate(learnRate);
        cell.setData(data);
        let rate=cell.learn();
        cell.setIsLearned(true);
        return res.status(200).json({message:"Data Trained Success !",rate,weights:cell.getWeights()});
    }catch(error){
        return res.status(500).json({message:"Server Error v!",error});
    }
}

export const test=(req,res)=>{
    if(!cell.getIsLearned()){
        return res.status(400).json({message:"Train Before !"});
    }
    const {values}=req.body;
    const result=cell.test(values);
    return res.json({result});
}

export const cancele=(req,res)=>{
    cell=new Perceptron();
    cell.setIsLearned(false);
    return res.status(200).json({message:"Data Cleared !"});
}