import { Button, Stack, TextField } from "@mui/material";
import { useContext,useState } from "react";
import { MazeContext } from "../MazeContext";
import { toast } from "react-toastify";

export default function GenerateBtns({flag,setLr,setEpoch,epoch,lr}) {
  const {generateMaze,maze,isTrained}=useContext(MazeContext);
  const [loading,setLoading] = useState(false);
  const {setRow,setCol,col,row,solveMaze,play}=useContext(MazeContext);
  const solve =async ()=>{
    if(maze){
      setLoading(true);
      await solveMaze();
      setLoading(false);
    }else{
      toast.info("Generate Maze Before !");
    }
  }
  console.log(maze);
  return (
    <Stack gap={2}>
      <Stack direction={"row"} gap={2}>
        <TextField value={lr} onChange={(e)=>{setLr(e.target.value)
        }} fullWidth  disabled={flag==null}  type="number"  label="learning Rate"/>
        <TextField value={epoch} onChange={(e)=>{setEpoch(e.target.value)
        }} fullWidth disabled={flag==null}  type="text"  label="Epoch"/>
        </Stack>
<Stack direction={"row"} gap={2}>
        <Button variant="outlined" onClick={()=>{generateMaze()}}>Generate Maze</Button>
        <Button variant="contained" disabled={!(isTrained)} loading={loading} onClick={solve}>Solve</Button>
        <TextField  value={row} label={"Row"} onChange={(e)=>{setRow(e.target.value)}} sx={{width:"100px"}}/>
        <TextField value={col} label={"Col"} onChange={(e)=>{setCol(e.target.value)}} sx={{width:"100px"}}/>
        </Stack>
    </Stack>
  )
}
