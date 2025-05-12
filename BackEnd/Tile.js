import { nanoid } from "nanoid";

export class Tile{
    constructor(tile){
        if(tile){
            this._type = tile._type;
            this._elevation = tile._elevation;
            this._id = tile._id ;
            this._location = tile._location;
            this._distanceToObstacle = tile._distanceToObstacle;
        }
        else{
            this.GenerateRandomType();
            this.GenerateRandomElevation();
            this._id=nanoid();

        }
    }
    set parent(p){
        this._parent = p;
    }
    get parent(){
        return this._parent;
    }
    get f(){
        return this.cost+this.heuristic;
    }
    set heuristic(heuristic){
        this._heuristic=heuristic;
    }

    get heuristic(){
        return this._heuristic;
    }

    set cost(cost){
        this._cost=cost;
    }

    get cost(){
        return this._cost;
    }
    set type(type){
        this._type=type;
    }
    get type(){
        return this._type;
    }
    set elevation(elevation){
        this._elevation=elevation;
    }
    get elevation(){
        return this._elevation;
    }
    set distanceToObstacle(distanceToObstacle){
        this._distanceToObstacle=distanceToObstacle;
    }
    get distanceToObstacle(){
        return this._distanceToObstacle;
    }
    set isDialog(d){
    this._isDialog = d;
}
get isDialog(){
    return this._isDialog;
}

    set location(location){
        this._location=location;
    }
    get location(){
        return this._location;
    }
    GenerateRandomType = () => {
        const rand = Math.random();
        if (rand < 0.7)  this.type="grass";
        else if (rand < 0.8) this.type="water";
        else this.type="obstacle";
    };
    GenerateRandomElevation = () => {this.elevation=Math.floor(Math.random() * 11)}; 

    toString(){
        return JSON.stringify(this);
    }
    // toJson(obj){
    //     this=JSON.parse(obj);
    // }
    clacHeuristic(end){
        let manhatance=Math.abs(this._location.i-end.i)+Math.abs(this._location.j-end.j);
        this.heuristic=manhatance;
        return manhatance;
    }
    calcCost(){
        if(this.type=='start'){
            return 0;
        }
        this.cost=this.parent.cost+this.isDialog?1.4:1;
        return this.parent.cost+this.isDialog?1.4:1;
    }
    typeToNum(){
        return this.type=='water'||this.type=='obstacle'?1:0;
    }
}