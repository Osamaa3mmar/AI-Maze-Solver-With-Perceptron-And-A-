import axios from "axios";
import { useState } from "react";
import { Bounce, toast, ToastContainer, Zoom } from "react-toastify";
import { read, utils } from "xlsx";

export default function App() {
  const [trainingData,setTrainingData]=useState([]);
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const handleDataInput=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload=(e)=>{
      const arrayBuffer=e.target.result;
      const workBook=read(arrayBuffer,{type:"array"});
      const sheetName=workBook.SheetNames[0];
      const sheet=workBook.Sheets[sheetName];
      const data=utils.sheet_to_json(sheet,{
        header:1
      });
      toast.success("Data Read Success!");
      setTrainingData(data);
    }
    
  }
const TrainData=async()=>{
try{
  setLoading(true);
  const {data}=await axios.post('http://localhost:3003/test',{
    trainingData
  });
  console.log(data);
}catch(error){
  toast.error(error?.response?.data?.message);
  console.log(error);
}
finally{
  setLoading(false);
}
}


  return (
    <div>
      <input type="file" onChange={handleDataInput} accept=".xlsx" />
    <button onClick={TrainData}>Train Data</button>

      <ToastContainer
position="bottom-right"
autoClose={3000}
hideProgressBar={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Zoom}
closeButton={false}
/>
    </div>
  )
}
