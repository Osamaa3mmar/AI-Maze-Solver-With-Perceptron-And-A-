import { Checkbox, Divider, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Wights({weights}) {
    const [custom,setCustom]=useState(false);
    const toggle=()=>{
        setCustom(!custom);
    }
  return (
    <Stack gap={1.5} flex={1} >
        <div>
        <Typography color="primary" fontWeight={600} fontSize={22} variant="h6">Weights</Typography>
        {/* <FormControlLabel control={<Checkbox onChange={toggle} checked={custom} />} label="Custom Values ?" /> */}
        </div>
        
        <Stack direction={"row"} gap={1}>
        <TextField value={weights?weights[0]:''} type="number"  disabled={!custom} variant="filled" fullWidth label={"Terrain"}/>
        <TextField value={weights?weights[1]:''} type="number" disabled={!custom} variant="filled" fullWidth label={"Elevation"}/>
        <TextField value={weights?weights[2]:''} type="number" disabled={!custom} variant="filled" fullWidth label={"Obstical Distance"}/>
        <TextField value={weights?weights[3]:''} type="number" disabled={!custom} variant="filled" fullWidth label={"Bias"}/>
        </Stack>
    </Stack>
  )
}
