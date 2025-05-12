import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useContext, useState } from "react";
import { MazeContext } from "../MazeContext";
import mode2 from "../../public/Mode2.png";
import mode1 from "../../public/Mode1.png";
export default function Play() {
  const {mode,setMode,type,setType,walkType,setWalkType}=useContext(MazeContext);
  const changeLabel=()=>{
    if(type=="start"){
      setType("end");
    }
    else if(type=="end"){
      setType("water");
    }else if(type=='water'){
      setType('obstacle')
    }else if(type=='obstacle') {
      setType("grass");
    }else{
      setType("start")
    }
  }
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Box>
           <FormControlLabel
           onChange={()=>{setMode(prev=>!prev)}}
  control={<Checkbox checked={mode}  />}
  label="Custom Mode?"
/>
{mode?
<Button variant="outlined" onClick={changeLabel}>{type}</Button>
:''}
</Box>
<Box sx={{display:"flex",alignItems:"center",gap:"20px"}}>
  <Box sx={{cursor:"pointer",width:"160px",height:"160px",overflow:"hidden",borderRadius:"10px",outline: walkType === 4 ? "4px solid #6366f190" : "none"}} onClick={()=>{setWalkType(4)}}><img style={{width:"90%"}} src={mode1} alt="" /></Box>
  <Box sx={{cursor:"pointer",width:"160px",height:"160px",overflow:"hidden",borderRadius:"10px",outline: walkType === 8 ? "4px solid #6366f190" : "none"}} onClick={()=>{setWalkType(8)}}><img style={{width:"100%"}} src={mode2} alt="" /></Box>
</Box>
    </div>
  )
}
