import { IconButton, Stack, Tooltip } from "@mui/material";
import Tools from "../component/Tools";
import Maze from "../component/Maze";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useContext, useState } from "react";
import { MazeContext } from "../MazeContext";
import { toast } from "react-toastify";
import ModalInfo from "../component/ModalInfo";
export default function MainPage() {
  const {isTrained,maze,solveMaze}=useContext(MazeContext);
  const [loading,setLoading] = useState(false);

   const solve =async ()=>{
      if(maze){
        setLoading(true);
        await solveMaze();
        setLoading(false);
      }else{
        toast.info("Generate Maze Before !");
      }
    }
  return (
    <Stack sx={{textAlign:"center",width:"95%",margin:"auto"}}>
        <Tools/>
        <Maze/>
     <Tooltip
  placement="top"
  title="Solve"
  disableHoverListener={!isTrained} // Optional: disable tooltip if not trained
>
  <span style={{cursor:"pointer",
        position: "fixed",
        bottom: "40px",
        right: "40px",}}>
    <IconButton
      onClick={solve}
      disabled={!isTrained}
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        boxShadow: 3,
        '&:hover': {
          backgroundColor: "primary.dark",
        },
        '&.Mui-disabled': {
          backgroundColor: "#ccc", // Optional: style disabled state
          color: "#888",
        },
      }}
      size="large"
      loading={loading}
    >
      <PlayArrowIcon />
    </IconButton>
  </span>
</Tooltip>
      
    </Stack>
  )
}
