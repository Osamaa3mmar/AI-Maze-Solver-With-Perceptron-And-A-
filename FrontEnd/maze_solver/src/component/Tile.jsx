import { Box } from "@mui/material";
import style from "./Tile.module.css"
import axios from "axios";
import Brick from "./../../public/Brick.png";
import Grass from "./../../public/Grass.png";
import Water from "./../../public/Water.png";
import Start from "./../../public/Start.png";
import End from "./../../public/End.png";
import {  useState } from "react";
export default function Tile({_type, size,_elevation,_distanceToObstacle }) {
  const [status,setStatus]=useState(null);
  console.log(_type)
  const checkSave=async()=>{
    try{
      
      const type2= _type=="water"||_type=='obstacle'?1:0;
      let values=[type2,_elevation,_distanceToObstacle];
      const {data}=await axios.post("http://localhost:6565/train/test",{values});
      console.log(data);
      if(data.result==1){
        setStatus("green");
      }
      else{
        setStatus("red")
      }
    }catch(e){
      console.log(e);
    }
  }


  return (
    <Box
    onClick={checkSave}
      sx={{
        width: size,
        height: size,
        padding: "2px",
        boxSizing: "border-box",
        borderRadius: "6px",
        overflow: "hidden",
        outline:`2px solid ${status}`
      }}
    >
      {/* <p>{distanceToObstacle}</p>
      <p>{elevation}</p> */}
      <img src={_type=="water"?Water:_type=="grass"?Grass:_type=='start'?Start:_type=='end'?End:Brick} className={style.img} alt="" />
    </Box>
  );
}
