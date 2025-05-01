const getRandomType = () => {
    const rand = Math.random();
    if (rand < 0.7) return "grass";
    else if (rand < 0.9) return "water";
    else return "obstacle";
};
const getRandomElevation = () => Math.floor(Math.random() * 11); 


export const generateMaze=(req,res)=>{
    const {row,col}=req.body;
   const maze=[];
   const obstacles=[];
   if(!row||!col){
    return res.status(400).json({message:"Enter Size !"});
   }
   for(let i=0;i<row;i++){
    let rowArray=[];
    for(let j=0;j<col;j++){
        let temp={
            elevation:getRandomElevation(),
            type:getRandomType(),
        }
        rowArray.push(temp);
        if(temp.type==="obstacle"){
            obstacles.push({i,j});
        }
    }
    maze.push(rowArray);
   }

   

   for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){
        if(maze[i][j].type=="obstacle"){
            maze[i][j].distanceToObstacle=0;
            continue;
        }
        let minVal=9999;
        for(let x=0;x<obstacles.length;x++){
            let dis=Math.abs(i-obstacles[x].i)+Math.abs(j-obstacles[x].j);
            if(dis<minVal){
                minVal=dis;
            }
        }
        maze[i][j].distanceToObstacle=minVal;
    }
}



console.log(maze);

    return res.status(200).json({message:"Generate success !", maze });
}