export class Perceptron {
    constructor(inputSize=3){
        this.inputSize = inputSize;
        this.epochs=0;
        this.data=[];
        this.weights=[];
        this.learningRate=0;
        this.isLearned=false;
        for(let i=0;i<=inputSize;i++){
            this.weights.push(Math.random()-0.5);//this give me from -0.5 to 0.49999 the last one is for bias
        }
    }
    setData(data){
        this.data = data;
    }
    setEpochs(epochs){
        this.epochs = epochs;
    }
    setLearningRate(learningRate){
        this.learningRate = learningRate;
    }
    train(data){
        let values=[];
        let error=0;
        let totalError=0;
        let totalLoss=0;
        for(let i=0;i<this.epochs;i++){
            let epochLoss=0;
            error=0;
            data.map((element,index)=>{
                values=[element[0],element[1],element[2],1];//bias value 1
                let yActual=this.compute(values);
                let yExpected = element[3];

                let loss = Math.pow(yExpected - yActual, 2);
            epochLoss += loss;
                if(yActual!==yExpected){
                    error++;
                    this.editWeights((yExpected-yActual),values);
                }
            })
            totalError+=error;
            totalLoss+=epochLoss;
            let avgEpochLoss = epochLoss / data.length;
            if(error==0){
                console.log("object");
                break;
            }
            //console.log(error,i);
        }
        let avgTrainingLoss = totalLoss / (this.epochs * data.length);

        return{error:((totalError/(this.epochs*data.length))*100).toFixed(2),
            loss:avgTrainingLoss.toFixed(8)
        };
    }
    
    learn(){
        let div=Math.floor(this.data.length*0.7);
       let trainData=this.data.slice(0,div);
       let test=this.data.slice(div,this.data.length);
       let error=this.train(trainData);
       let accuracy=this.testAll(test);
       return {error,accuracy};

    }

    testAll(data){
       // console.log("object")
       let count=0;
       while(true){
       let correct=0;
        data.map((element)=>{
           // console.log("object")
            let x=this.test([element[0],element[1],element[2]]);
            if(x==element[3]){
                correct++;
               // console.log(element);
            }

        })
        let accuracy = (correct / data.length) * 100;
        if(accuracy>93){
        return  accuracy.toFixed(2);

        }
        count++;
        if(count==this.epochs){
        return  accuracy.toFixed(2);

        }
    }
    }
    compute(values){//values is array have the x values and 1 for bias
        let sum=0;
        values.map((element,index)=>{
            sum+=element*this.weights[index];
        })
        return this.step(sum);
    }

    step(sum){
        return sum>0?1:0;
    }
    editWeights(error,values){
        let deltaWeight=0;
        values.map((element,index)=>{
            deltaWeight=element*this.learningRate*error;
            this.weights[index]+=deltaWeight;
        })

    }

    print(){
        console.log("weights:",this.weights);
    }
    getWeights(){
        return this.weights;
    }


    test(element){
        let values=[...element,1]//add 1 to the array for the bias
        return this.compute(values);
    }
    getIsLearned(){
        return this.isLearned;
    }
    setIsLearned(value){
        this.isLearned=value;
    }
}

























































































































































































































































































































// export class Perceptron{

//     constructor(inputSize=3){
//         this.epoch=20;
//         this.learningRate=0.1;
//         this.whights=[];
//         this.errorRate=0;
//         for (let i=0;i<=inputSize;i++){
//             this.whights.push(Math.random() - 0.5);
//         }  
//     }
//     epochSetter (epoch){
//         this.epoch=epoch;
//     }
//     learningRateSetter (learningRate){
//         this.learningRate=learningRate;
//     }

//     pushData(data){ 
//         if(this.trainingData==null){
//             this.trainingData=data;
//             console.log("new Data");
//         }
//     }
//     step(sum){
//         return sum>0?1:0;
//     }
//     compute(val1,val2,val3,val4){
//         let sum=val1+val2+val3+val4;
//         return this.step(sum);
//     }
//     editWights(error,values){
//         let deltaWight;
//         for(let i=0;i<values.length;i++){
//             deltaWight=error*this.learningRate*values[i];
//             this.whights[i]=this.whights[i]+deltaWight;
//         }
//     }
//     learn(){
//         let val1;
//         let val2;
//         let val3;
//         let alpha=1*this.whights[3];
//         let yActual;
//         let errorCount=0;
//         console.log(this.epoch)
//         for(let i=0;i<1;i++){
            
//             this.trainingData.forEach((info) => {
//                 val1=info[0]*this.whights[0];
//                 val2=info[1]*this.whights[1];
//                 val3=info[2]*this.whights[2];
//                 yActual=this.compute(val1,val2,val3,alpha);
//                 if(yActual!=info[3]){
//                     errorCount++;
//                     let error=info[3]-yActual;
//                     this.editWights(error,[info[0],info[1],info[2],1]);
//                 }
//             });
//             console.log(errorCount,"| i:"+i);
//             if(errorCount<=0.01){
//                 console.log("stoped before");
//                 break;
//             }
//         }
//         console.log("here",errorCount,this.trainingData.length);
//         return (1-(errorCount/this.trainingData.length));
//     }


//     print (){
//         console.log("Whights: ", this.whights);
//     }
//     getWeights (){
//         return this.whights;
//     }



//     test(values) {
//         let sum = this.whights[3];
//         for (let i = 0; i < values.length; i++) {
//             sum += values[i] * this.whights[i];
//         }
        
//         return this.step(sum);
//     }
    
// }





