import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";

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
        return <Tile type={cell.type} key={i} size={tileSize} distanceToObstacle={cell.distanceToObstacle} elevation={cell.elevation}  />
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
