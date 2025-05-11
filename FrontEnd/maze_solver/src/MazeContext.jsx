
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


export const MazeContext=createContext();


const MazeContextProvider=({children})=>{
    const [col,setCol]=useState(4);
    const [row,setRow]=useState(4);
    const [allMaze,setAllMaze]=useState(null);
    const [start,setStart]=useState({i:-1,j:-1});
    const [end,setEnd]=useState({i:-1,j:-1});
    const [isTrained,setIsTrained]=useState(false);
    const [path,setPath]=useState(null);
    const [play,setPlay]=useState(false);
    const [currentStep, setCurrentStep] = useState(null);
    const [mode,setMode]=useState(false);
    const [type,setType]=useState('start');
    const maze=useMemo(()=>{
        
     if(path){
        const newMaze = allMaze.map((row, i) =>
            row.map((cell, j) => {
              const isOnPath = path.some(p => p.i === i && p.j === j);
              return {
                ...cell,
                onPath: isOnPath,
                isAgent:currentStep?currentStep.i==i&&currentStep.j==j?true:false:null,
              };
            })
          );
          return newMaze;
    }else{
        return allMaze;
    }
    },[start,end,col,row,allMaze,path,currentStep]);


    const makePlayAnimation=(path)=>{
        setPlay(true);
        path=path.reverse();
        console.log(path.length);
        let length=path.length;
        let i=setInterval(()=>{
            length--;
            setCurrentStep(path[length]);
            console.log(path[length]);
            if(length==0){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                clearInterval(i);
            }
        },500)
        setCurrentStep(null);
        setPlay(false);
    }
    const generateRandom=async()=>{
 try{
            setPlay(false);
            setPath(null);
            setAllMaze(null);
            const {data}=await axios.post("http://localhost:6565/maze/generate",{row,col});
            toast.success(data.message);
            console.log(data);
            setAllMaze(data.maze);
            setStart(data.start);
            setEnd(data.end);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    const generateCustom=async()=>{
            try{
            setPlay(false);
            setPath(null);
            setAllMaze(null);
            const {data}=await axios.post("http://localhost:6565/maze/generatecustom",{row,col});
            toast.success(data.message);
            console.log(data);
            setAllMaze(data.maze);
            setStart(data.start);
            setEnd(data.end);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    const generateMaze=async ()=>{
       if(mode){
           generateCustom();
    }
    else{
           generateRandom();
       }
    }
    const solve=async ()=>{
if(maze&&start&&end&&col&&row){
        try{
            const {data}=await axios.post("http://localhost:6565/maze/solve",{row,col,start,end,maze});
            if(data.er){
                toast.error(data.message);
        setPlay(false);

            }
            setPath(data.path);
            console.log(data.path);
            makePlayAnimation(data.path);
        }catch(error){
            console.log(error);
        }
    }else{
        toast.warning("Enter All Data !");
    }
    }
    const solveMaze=async()=>{
        if(mode){
            solveCustomMaze();
        }else
        solve();
}
  const solveCustomMaze=async()=>{
        if(maze&&start&&end&&col&&row){
        try{
            const {data}=await axios.post("http://localhost:6565/maze/solvecustom",{row,col,start,end,maze});
            if(data.er){
                toast.error(data.message);
                setPlay(false);

            }
            setPath(data.path);
            console.log(data.path);
            makePlayAnimation(data.path);
        }catch(error){
            console.log(error);
        }
    }else{
        toast.warning("Enter All Data !");
    }
}
    return (
        <MazeContext.Provider  value={{setAllMaze,allMaze,type,setType,mode,setMode,play,isTrained,setIsTrained,end,setEnd,setStart,start,col,row,setCol,setRow,maze,generateMaze,solveMaze}}>
            {children}
        </MazeContext.Provider>
    )
}


export default MazeContextProvider;
