const getRandomType = () => {
    const rand = Math.random();
    if (rand < 0.7) return "grass";
    else if (rand < 0.8) return "water";
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
   let s;
   let e;
   do{
    s=[Math.floor(Math.random()*row),Math.floor(Math.random()*col)];
   e=[Math.floor(Math.random()*row),Math.floor(Math.random()*col)];
}while(s[0]==e[0]&&s[1]==e[1])
    console.log(s,e);
   for(let i=0;i<row;i++){
    let rowArray=[];
    for(let j=0;j<col;j++){
        let temp={
            elevation:getRandomElevation(),
            type:getRandomType(),
        }
        if(i==s[0]&&j==s[1]){
            temp.type="start";
        }
        if(i==e[0]&&j==e[1]){
            temp.type="end";
        }
        rowArray.push(temp);
        if(temp.type==="obstacle"){
            obstacles.push({i,j});
        }
    }
    maze.push(rowArray);
   }
   if(obstacles.length==0){
    let c=Math.floor(Math.random()*row);
    let v=Math.floor(Math.random()*col);
maze[c][v]={
    type:'obstacle',
    distanceToObstacle:0,
    elevation:getRandomElevation()
};
obstacles.push({i:c,j:v});
console.log(maze[c][v]);
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





    return res.status(200).json({message:"Generate success !", maze });
}