
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const MazeContext=createContext();


const MazeContextProvider=({children})=>{
    const [col,setCol]=useState(4);
    const [row,setRow]=useState(4);
    const [maze,setMaze]=useState(null);
    const generateMaze=async ()=>{
        try{
            const {data}=await axios.post("http://localhost:6565/maze/generate",{row,col});
            toast.success(data.message);
            console.log(data);
            setMaze(data.maze);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    return (
        <MazeContext.Provider  value={{col,row,setCol,setRow,maze,generateMaze}}>
            {children}
        </MazeContext.Provider>
    )
}


export default MazeContextProvider;
