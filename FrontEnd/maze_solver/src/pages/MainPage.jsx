import { Stack } from "@mui/material";
import Tools from "../component/Tools";
import Maze from "../component/Maze";

export default function MainPage() {
  return (
    <Stack sx={{textAlign:"center",width:"95%",margin:"auto"}}>
        <Tools/>
        <Maze/>
    </Stack>
  )
}
