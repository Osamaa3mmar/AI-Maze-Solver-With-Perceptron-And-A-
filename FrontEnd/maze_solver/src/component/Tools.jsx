import { Stack, TextField } from "@mui/material";
import FileSelector from "./FileSelector";
import { useState } from "react";
import Divider from '@mui/material/Divider';
import Wights from "./Wights";
import GenerateBtns from "./GenerateBtns";
import Play from "./Play";


export default function Tools() {
    const [trainData,setTrainData]=useState(null);
    const [weights,setWeights]=useState(null);
    const [lr,setLr]=useState(0.1);
    const [epoch,setEpoch]=useState(100);
    
  return (
    <form action=""><Stack gap={3} sx={{background:"#f9f9f9",padding:"20px 15px ",borderRadius:"10px"}}>
    <Stack justifyContent={'center'}  sx={{height:"180px"}} alignItems={"center"} gap={3} direction={"row"}>
        <FileSelector epoch={epoch} learnRate={lr} setWeights={setWeights} setTrainData={setTrainData} TrainData={trainData}/>
        <GenerateBtns lr={lr} epoch={epoch} setEpoch={setEpoch} setLr={setLr} flag={trainData} />
    </Stack>
    <Divider orientation="horizontal" sx={{ borderRightWidth: 2 }} flexItem  />
    <Wights weights={weights} />
    <Divider orientation="horizontal" sx={{ borderRightWidth: 2 }} flexItem  />

    <Play/>

    </Stack>
    </form>
  )
}
