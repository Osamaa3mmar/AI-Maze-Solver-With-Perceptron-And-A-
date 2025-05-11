import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useContext, useState } from "react";
import { MazeContext } from "../MazeContext";

export default function Play() {
  const {mode,setMode,type,setType}=useContext(MazeContext);
  const changeLabel=()=>{
    if(type=="start"){
      setType("end");
    }
    else if(type=="end"){
      setType("water");
    }else if(type=='water'){
      setType('obstacle')
    }else {
      setType("start");
    }
  }
  return (
    <div>
           <FormControlLabel
           onChange={()=>{setMode(prev=>!prev)}}
  control={<Checkbox checked={mode}  />}
  label="Custom Mode?"
/>
{mode?
<Button variant="outlined" onClick={changeLabel}>{type}</Button>
:''}
    </div>
  )
}
