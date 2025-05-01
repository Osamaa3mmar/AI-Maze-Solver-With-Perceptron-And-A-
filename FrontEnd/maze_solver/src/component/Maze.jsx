import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Brick from "./../../public/Brick.png";
import Grass from "./../../public/Grass.png";
import Water from "./../../public/Water.png";
import Tile from "./Tile";
import { MazeContext } from "../MazeContext";

export default function Maze() {
  const {maze,col,row}=useContext(MazeContext);
  const [cells, setCells] = useState([]);

  const tileSize = `${row==col?100 / row:100/col}dvh`; 
  
  const makeMaze = () => {
    let newCells = [];
    newCells=maze?.map((line)=>{
      return line.map((cell,i)=>{
        return <Tile key={i} size={tileSize} distanceToObstacle={cell.distanceToObstacle} elevation={cell.elevation} img={cell.type=="water"?Water:cell.type=="grass"?Grass:Brick} />
      })
    })
    // for (let i = 0; i < row * col; i++) {
    //   newCells.push(<Tile key={i} size={tileSize} img={Brick} />);
    // }
    setCells(newCells);
  };

  useEffect(() => {
    makeMaze();
  }, [maze]);

  return (
    <Box
      sx={{
        marginTop:4,
        
        width: `calc(${tileSize} * ${col})`, 
        marginX: "auto",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        
      }}
    >
      {cells}
    </Box>
  );
}
