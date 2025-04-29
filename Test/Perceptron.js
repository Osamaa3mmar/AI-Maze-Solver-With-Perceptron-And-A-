export class Perceptron{

    constructor(){
        this.epoch=20;
        this.learningRate=0.1;
        this.whights=[];

        for (let i=0;i<4;i++){
            this.whights.push(Number((Math.random() - 0.5).toFixed(5)));
        }
    }
    

    pushData(data){
        this.trainingData=data;
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
        let val4=1*this.whights[3];
        let yActual;
        for(let i=0;i<this.epoch;i++){
            this.trainingData.forEach((info) => {
                val1=info.Terrain*this.whights[0];
                val2=info.Elevation*this.whights[1];
                val3=info.ObsticalDistance*this.whights[2];
                yActual=this.compute(val1,val2,val3,val4);
                if(yActual!=info.label){
                    let error=info.label-yActual;
                    this.editWights(error,[info.Terrain,info.Elevation,info.ObsticalDistance,1]);
                }
            });
        }
    }


    print (){
        console.log("Whights: ", this.whights);
    }

}


