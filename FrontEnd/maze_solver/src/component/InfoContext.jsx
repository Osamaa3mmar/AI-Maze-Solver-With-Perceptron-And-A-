import { createContext, useState } from "react";

export const InfoContext=createContext();


const InfoContextProvider=({children})=>{
    const [isShow,setIsShow]=useState(false);
    const [current,setCurrent]=useState(null);
    return (
        <InfoContext.Provider value={{current,setCurrent,isShow,setIsShow}}>
            {children}
        </InfoContext.Provider>
    )
}

export default InfoContextProvider;
