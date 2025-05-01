export class Perceptron{

    constructor(){
        this.epoch=20;
        this.learningRate=1;
        this.whights=[];
        this.errorRate=0;
        for (let i=0;i<4;i++){
            this.whights.push(Number((Math.random() - 0.5).toFixed(5)));
        }  
    }
    epochSetter (epoch){
        this.epoch=epoch;
    }
    learningRateSetter (learningRate){
        this.learningRate=learningRate;
    }

    pushData(data){ 
        if(this.trainingData==null){
            this.trainingData=data;
            console.log("new Data");
        }
    }
    step(sum){
        return sum>0?1:0;
    }
    compute(val1,val2,val3,val4){
        let sum=val1+val2+val3+val4;
        return this.step(sum);
    }
    editWights(error,values){
        let deltaWight;
        for(let i=0;i<values.length;i++){
            deltaWight=error*this.learningRate*values[i];
            this.whights[i]=this.whights[i]+deltaWight;
        }
    }
    learn(){
        let val1;
        let val2;
        let val3;
        let alpha=1*this.whights[3];
        let yActual;
        let errorCount=0;
        for(let i=0;i<this.epoch;i++){
            errorCount=0;
            this.trainingData.forEach((info,index) => {
                val1=info[0]*this.whights[0];
                val2=info[1]*this.whights[1];
                val3=info[2]*this.whights[2];
                yActual=this.compute(val1,val2,val3,alpha);
                if(yActual!=info[3]){
                    console.log();
                    errorCount++;
                    let error=info[3]-yActual;
                    this.editWights(error,[info[0],info[1],info[2],1]);
                }
            });
        }
        console.log("here",errorCount,this.trainingData.length);
        return (1-(errorCount/this.trainingData.length));
    }


    print (){
        console.log("Whights: ", this.whights);
    }
    getWeights (){
        return this.whights;
    }



    test(values) {
        let sum = this.whights[3];
        for (let i = 0; i < values.length; i++) {
            sum += values[i] * this.whights[i];
        }
        
        return this.step(sum);
    }
    
}


