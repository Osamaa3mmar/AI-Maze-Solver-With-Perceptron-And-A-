import { Box } from "@mui/material";
import style from "./Tile.module.css"
import axios from "axios";
import Brick from "./../../public/Brick.png";
import Grass from "./../../public/Grass.png";
import Water from "./../../public/Water.png";
import Start from "./../../public/Start.png";
import End from "./../../public/End.png";
import agent from "./../../public/Agent2.png";
import {  useContext, useState } from "react";
import { MazeContext } from "../MazeContext";
import { InfoContext } from "./InfoContext";
export default function Tile({_type,_location,isTest, size,_elevation,isAgent,_distanceToObstacle ,onPath}) {
  const [status,setStatus]=useState(null);
  const {setCurrent}=useContext(InfoContext);
  
  const {type,mode,allMaze,setAllMaze,end,start,setStart,setEnd,testPath}=useContext(MazeContext);
  const checkSave=async()=>{
    try{
      
      const type2= _type=="water"||_type=='obstacle'?1:0;
      let values=[type2,_elevation,_distanceToObstacle];
      const {data}=await axios.post("http://localhost:6565/train/test",{values});
      if(data.result==1){
        setStatus("green");
      }
      else{
        setStatus("red")
      }
      setCurrent({
        type:_type,
        elevation:_elevation,
        distanceToObstacle:_distanceToObstacle,
        isTest,
        onPath,
        location:_location,
        status:data.result==1?1:0
      })
    }catch(e){
      console.log(e);
    }
  }
const setTileTo=()=>{
  const tempMaze = allMaze.map(row => row.map(cell => ({ ...cell })));
  // Update the correct tile
  tempMaze[_location.i][_location.j]._type = type;
  if(type=="start"){
    if(start)
    tempMaze[start.i][start.j]._type="grass";
    setStart({i:_location.i,j:_location.j});
  }else if(type=="end"){
    if(end)
tempMaze[end.i][end.j]._type="grass";
    setEnd({i:_location.i,j:_location.j});
  }
  setAllMaze(tempMaze);
}

  return (
    <Box
    className={style.parentBox}
    onClick={mode?setTileTo:checkSave}
      sx={{
        position:"relative",
        width: size,
        height: size,
        padding: "2px",
        boxSizing: "border-box",
        borderRadius: "6px",
        overflow: "hidden",
        outline:`${isAgent?"3px":"2px"} solid ${isAgent?"orange":onPath?"blue":isTest==true?"purple":status}`
      }}
    >
      {/* <Box  className={style.overlayBox} sx={{position:"absolute",zIndex:2,background:"rgba(0,0,0,0.2)",width:"100%",height:"100%"}}>
       <p className={style.overlayElement+" "+style.overlayElevation}>Elevation: {_elevation}</p> 
       <p className={style.overlayElement+" "+style.overlayDistance}>Destance: {_distanceToObstacle}</p> 
        </Box> */}
      {isAgent?
      <img src={agent} style={{position:"absolute",width:"100%",top:0}} alt="" />
      :''}
      <img src={_type=="water"?Water:_type=="grass"?Grass:_type=='start'?Start:_type=='end'?End:Brick} className={style.img} alt="" />
    </Box>
  );
}
