import { Tile } from "../../../Tile.js";
import { cell } from "../Training/training.controller.js";
export const generateCustomMaze=(req,res)=>{
    const {row,col}=req.body;
   const maze=[];
   if(!row||!col){
    return res.status(400).json({message:"Enter Size !"});
   }
   for(let i=0;i<row;i++){
    let rowArray=[];
    for(let j=0;j<col;j++){
        let temp=new Tile();
        temp.location={i,j};
        temp.type="grass";
        temp.distanceToObstacle=Infinity;
        rowArray.push(temp);
    }
    maze.push(rowArray);
   }
    return res.status(200).json({message:"Generate success !", maze });
}
export const generateMaze=(req,res)=>{
    const {row,col}=req.body;
   const maze=[];
   const obstacles=[];
   if(!row||!col){
    return res.status(400).json({message:"Enter Size !"});
   }
   let s;
   let e;
   do{
    s=[Math.floor(Math.random()*row),Math.floor(Math.random()*col)];
   e=[Math.floor(Math.random()*row),Math.floor(Math.random()*col)];
}while(s[0]==e[0]&&s[1]==e[1])
   for(let i=0;i<row;i++){
    let rowArray=[];
    for(let j=0;j<col;j++){
        let temp=new Tile();
        temp.location={i,j};
        if(i==s[0]&&j==s[1]){
            temp.type="start";
        }
        if(i==e[0]&&j==e[1]){
            temp.type="end";
        }
        if(temp.type==="obstacle"){
            obstacles.push({i,j});
        }
        rowArray.push(temp);

    }
    maze.push(rowArray);
   }
   if(obstacles.length==0){
    let c;
    let v;
    do{
    c=Math.floor(Math.random()*row);
    v=Math.floor(Math.random()*col);
    }while((c==s[0]&&v==s[1])||(c==e[0]&&v==e[1]))
const tile=maze[c][v];
tile.type='obstacle';
tile.distanceToObstacle = 0;
tile.GenerateRandomElevation();
obstacles.push({i:c,j:v});
}
   for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){
        const tile=maze[i][j];
        if(tile.type==="obstacle"){
            tile.distanceToObstacle=0;
            continue;
        }
        let minVal=Infinity;
        for(let x=0;x<obstacles.length;x++){
            let dis=Math.abs(i-obstacles[x].i)+Math.abs(j-obstacles[x].j);
            if(dis<minVal){
                minVal=dis;
            }
        }
        tile.distanceToObstacle=minVal;
    }
}
    let start={
        i:s[0],
        j:s[1],
    }
    
    let end={
        i:e[0],
        j:e[1],
    }
    return res.status(200).json({message:"Generate success !",start,end, maze });
}

const typeToNum=(type)=>{
    return type=='water'||type=='obstacle'?1:0;

}
function getNeighbors(tile, maze, row, col,number) {
    let neighbors=[];
    let temp;
    if(tile.location.i-1>=0&&cell.test([typeToNum(maze[tile.location.i-1][tile.location.j]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i-1][tile.location.j]);
        temp.parent=tile;
        neighbors.push(temp);

        temp.isDialog=false;

    }
    
    if(tile.location.i+1<row&&cell.test([typeToNum(maze[tile.location.i+1][tile.location.j]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i+1][tile.location.j]);
        temp.parent=tile;
        neighbors.push(temp);
        temp.isDialog=false;
    }
    if(tile.location.j-1>=0&&cell.test([typeToNum(maze[tile.location.i][tile.location.j-1]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i][tile.location.j-1]);
        temp.parent=tile;
        neighbors.push(temp);
        temp.isDialog=false;
    }
    if(tile.location.j+1<col&&cell.test([typeToNum(maze[tile.location.i][tile.location.j+1]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i][tile.location.j+1]);
        temp.parent=tile;
        neighbors.push(temp);
        temp.isDialog=false;
    }
    if(number==4)
    return neighbors;

    if(tile.location.j+1<col&&tile.location.i+1<row&&cell.test([typeToNum(maze[tile.location.i+1][tile.location.j+1]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i+1][tile.location.j+1]);
        temp.parent=tile;
        neighbors.push(temp);
        temp.isDialog=true;
    }
    if(tile.location.j-1>=0&&tile.location.i+1<row&&cell.test([typeToNum(maze[tile.location.i+1][tile.location.j-1]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i+1][tile.location.j-1]);
        temp.parent=tile;
        neighbors.push(temp);
        temp.isDialog=true;
    }
    if(tile.location.j+1<col&&tile.location.i-1>=0&&cell.test([typeToNum(maze[tile.location.i-1][tile.location.j+1]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i-1][tile.location.j+1]);
        temp.parent=tile;
        neighbors.push(temp);
        temp.isDialog=true;
    }
     if(tile.location.j-1>=0&&tile.location.i-1>=0&&cell.test([typeToNum(maze[tile.location.i-1][tile.location.j-1]._type),tile.elevation,tile.distanceToObstacle])){
        temp=new Tile(maze[tile.location.i-1][tile.location.j-1]);
        temp.parent=tile;
        neighbors.push(temp);
        temp.isDialog=true;
    }
    return neighbors;
}

const aStar=(maze,start,end,row,col,walkType)=>{
    let openList=[];
    let closeList=[];
    let startTile=new Tile(maze[start.i][start.j]);
    startTile.cost = 0;
    

    
    

    openList.push(startTile);


    while(openList.length>0){
        let minF=Infinity;
        let currentTile=null;
        openList.forEach((tile)=>{
            tile.clacHeuristic(end);
            tile.calcCost();
            if(tile.f<minF){
                minF=tile.f;
                currentTile=tile;
            }
        })
        if (!currentTile) return null;
        closeList.push(currentTile);
        openList=openList.filter((tile)=>{
            return tile._id!=currentTile._id
        })
        if(currentTile.type === 'end' ){
            return {c:currentTile,t:closeList};
        }
        let neighbors=getNeighbors(currentTile, maze, row, col,walkType);
        neighbors.forEach((neighbor)=>{
            if(!closeList.find((t) => t._id === neighbor._id) &&
            !openList.find((t) => t._id === neighbor._id)){
            openList.push(neighbor);
            }
        })
    }
    return null;
}





export const solve=(req,res)=>{
    try{
        const {maze,start,end,row,col,walkType}=req.body;
        let temp=aStar(maze,start,end,row,col,walkType);
        if(temp==null){
            return res.status(200).json({message:"There is no save path !",er:1})
        }
        let endOfPath=temp.c;
        let path=[];
        let current=endOfPath;
        while(true){
            if(current._type=='start'){
                path.push(current.location);
                break;
            }
            path.push(current.location);
            current=current.parent;
        }
        path.reverse();
         return res.status(200).json({message:"success !",path,test:temp.t})
    }catch(error){
        return res.status(500).json({message:"cd"})
    }
}

export const solveCustom=(req,res)=>{
    try{
        const {maze,start,end,row,col,walkType}=req.body;
        const newMaze=calcObsticalDestance(maze,start,end,row,col);
        let temp=aStar(newMaze,start,end,row,col,walkType);
        if(temp==null){
            return res.status(200).json({message:"There is no save path !",er:1})
        }
        let endOfPath=temp.c;
        let path=[];
        let current=endOfPath;
        while(true){
            if(current._type=='start'){
                path.push(current.location);
                break;
            }
            path.push(current.location);
            current=current.parent;
        }
        path.reverse();
         return res.status(200).json({message:"success !",path,test:temp.t});
    }catch(error){
        return res.status(500).json({message:"cd"})
    }
}


const calcObsticalDestance=(maze,start,end,row,col)=>{


   const obstacles=[];
   if(!row||!col){
    return res.status(400).json({message:"Enter Size !"});
   }
   
   for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){
        if(maze[i][j]._type==="obstacle"){
            obstacles.push({i,j});
        }
    }
   }

   for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){
        const tile=maze[i][j];
        if(tile._type==="obstacle"){
            tile.distanceToObstacle=0;
            continue;
        }
        let minVal=Infinity;
        for(let x=0;x<obstacles.length;x++){
            let dis=Math.abs(i-obstacles[x].i)+Math.abs(j-obstacles[x].j);
            if(dis<minVal){
                minVal=dis;
            }
        }
        tile.distanceToObstacle=minVal;
    }
}

    return maze;



}




























































































































































// const getRandomType = () => {
//     const rand = Math.random();
//     if (rand < 0.7) return "grass";
//     else if (rand < 0.8) return "water";
//     else return "obstacle";
// };
// const getRandomElevation = () => Math.floor(Math.random() * 11); 
// export const generateMaze=(req,res)=>{
//     const {row,col}=req.body;
//    const maze=[];
//    const obstacles=[];
//    if(!row||!col){
//     return res.status(400).json({message:"Enter Size !"});
//    }
//    let s;
//    let e;
//    do{
//     s=[Math.floor(Math.random()*row),Math.floor(Math.random()*col)];
//    e=[Math.floor(Math.random()*row),Math.floor(Math.random()*col)];
// }while(s[0]==e[0]&&s[1]==e[1])
//    for(let i=0;i<row;i++){
//     let rowArray=[];
//     for(let j=0;j<col;j++){
//         let temp={
//             elevation:getRandomElevation(),
//             type:getRandomType(),
//         }
//         if(i==s[0]&&j==s[1]){
//             temp.type="start";
//         }
//         if(i==e[0]&&j==e[1]){
//             temp.type="end";
//         }
//         rowArray.push(temp);
//         if(temp.type==="obstacle"){
//             obstacles.push({i,j});
//         }
//     }
//     maze.push(rowArray);
//    }
//    if(obstacles.length==0){
//     let c=Math.floor(Math.random()*row);
//     let v=Math.floor(Math.random()*col);
// maze[c][v]={
//     type:'obstacle',
//     distanceToObstacle:0,
//     elevation:getRandomElevation()
// };
// obstacles.push({i:c,j:v});
// console.log(maze[c][v]);
// }
//    for(let i=0;i<row;i++){
//     for(let j=0;j<col;j++){
//         if(maze[i][j].type=="obstacle"){
//             maze[i][j].distanceToObstacle=0;
//             continue;
//         }
//         let minVal=9999;
//         for(let x=0;x<obstacles.length;x++){
//             let dis=Math.abs(i-obstacles[x].i)+Math.abs(j-obstacles[x].j);
//             if(dis<minVal){
//                 minVal=dis;
//             }
//         }
//         maze[i][j].distanceToObstacle=minVal;
//     }
// }





//     return res.status(200).json({message:"Generate success !", maze });
// }