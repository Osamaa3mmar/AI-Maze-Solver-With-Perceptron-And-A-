
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const MazeContext=createContext();


const MazeContextProvider=({children})=>{
    const [col,setCol]=useState(4);
    const [row,setRow]=useState(4);
    const [maze,setMaze]=useState(null);
    const [start,setStart]=useState({i:-1,j:-1});
    const [end,setEnd]=useState({i:-1,j:-1});
    const generateMaze=async ()=>{
        try{
            setMaze(null);
            const {data}=await axios.post("http://localhost:6565/maze/generate",{row,col});
            toast.success(data.message);
            console.log(data);
            setMaze(data.maze);
            setStart(data.start);
            setEnd(data.end);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    const solveMaze=async()=>{
        if(maze&&start&&end&&col&&row){
        try{
            const {data}=await axios.post("http://localhost:6565/maze/solve",{row,col,start,end,maze});
            console.log(data)
        }catch(error){
            console.log(error);
        }
    }else{
        toast.warning("Enter All Data !");
    }
}
    return (
        <MazeContext.Provider  value={{end,start,col,row,setCol,setRow,maze,generateMaze,solveMaze}}>
            {children}
        </MazeContext.Provider>
    )
}


export default MazeContextProvider;
