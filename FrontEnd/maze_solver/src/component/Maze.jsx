import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import Tile from "./Tile";
import { MazeContext } from "../MazeContext";
import ModalInfo from "./ModalInfo";
import { InfoContext } from "./InfoContext";

export default function Maze() {
  const {maze,col,row,testPath,setTestPath}=useContext(MazeContext);
  const {isShow}=useContext(InfoContext);
  const [cells, setCells] = useState([]);
  const tileSize = `${row==col?100 / row:100/col}dvh`; 
  
  const makeMaze = () => {
    let newCells = [];
    testPath?.forEach((element)=>{
      maze[element._location.i][element._location.j].isTest=true;
    });
    newCells=maze?.map((line)=>{
      return line.map((cell,i)=>{
        return <Tile  key={i} size={tileSize} {...cell}   />
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
        position:"relative",
        width: `calc(${tileSize} * ${col})`, 
        marginX: "auto",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        
      }}
    >
      {cells}
      {isShow?
      <ModalInfo/>
      
      :''}
    </Box>
    
      
  );
}
