import { Box } from "@mui/material";
import style from "./Tile.module.css"
import axios from "axios";
import Brick from "./../../public/Brick.png";
import Grass from "./../../public/Grass.png";
import Water from "./../../public/Water.png";
import Start from "./../../public/Start.png";
import End from "./../../public/End.png";
import {  useState } from "react";
export default function Tile({type, size,elevation,distanceToObstacle }) {
  const [status,setStatus]=useState(null);
  console.log(type)
  const checkSave=async()=>{
    try{
      
      const type2= type=="water"||type=='obstacle'?1:0;
      let values=[type2,elevation,distanceToObstacle];
      console.log(values);
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
      <img src={type=="water"?Water:type=="grass"?Grass:type=='start'?Start:type=='end'?End:Brick} className={style.img} alt="" />
    </Box>
  );
}
