import { Box, Button, Stack, Typography } from '@mui/material';
import { readFile, utils } from 'xlsx';
import BackupIcon from '@mui/icons-material/Backup';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function FileSelector({epoch,learnRate,setTrainData,TrainData,setWeights}) {
    const [fileName,setFileName]=useState(null);
    const [status,setStatus]=useState(false);
    const [loading,setLoading]=useState(false);
    const [rate,setRate]=useState(0);
    const learn=async ()=>{
          try{
            setLoading(true);
            const {data}=await axios.post("http://localhost:6565/train/send",{data:TrainData,learnRate,epoch});
            setWeights(data.weights);
            console.log(data.weights);
            setStatus(true);
            toast.success(data.message);
            setRate(data.rate);
            console.log(data);
          }catch(error){
            console.log(error);
          }
          finally{
            setLoading(false);
          }
        }
    const handleData=(e)=>{
        const file=e.target.files[0];
        const read=new FileReader();
        read.readAsArrayBuffer(file);
        read.onload=(e)=>{
          const bufferArray=e.target.result;
          const workBook=readFile(bufferArray,{type:"array"});
          const sheetName=workBook.SheetNames[0];
          const sheet=workBook.Sheets[sheetName];
          const data=utils.sheet_to_json(sheet,{
            header:1
          });
          setTrainData(data.slice(1));
        }
        setFileName(file.name);
      }
      const deleteData=async ()=>{
        try{
          const {data}=await axios.get("http://localhost:6565/train/cancele");
          toast.info(data.message);
          setWeights(null);
        }catch(error){
          toast.error(error.response.data.message);
        }
        setTrainData(null);
        setStatus(false);
        setRate(0);
      }

      if(TrainData){
        return (<Stack gap={3} alignItems={'center'} direction={"row"}>
          <Box>
            
          <DescriptionIcon sx={{fontSize:50,color:"#1d6c41"}}/>
          
          <Typography color='#1d6c41' variant='h6' fontSize={16} fontWeight={600}>{fileName}</Typography>
          
          </Box>
          <Stack gap={2}>
            <Button size='medium' fullWidth variant='contained' disabled={status} loading={loading} onClick={learn}>Train Perceptron</Button>
            <Button size='medium' fullWidth variant='outlined' onClick={deleteData}>Cancel</Button>
            </Stack>
          <Stack gap={1} alignItems={'flex-start'} >
            {status==false?
            <Box sx={{display:"flex",alignItems:"center",gap:"4px"}}>
            <Box sx={{outline:`2px solid ${status?"rgba(0,255,0,0.6)":"rgba(255,0,0,0.6)"}`,borderRadius:"50%",width:"8px ",height:"8px",background:`${status?"rgba(0,255,0,0.2)":"rgba(255,0,0,0.2)"}`}}></Box>
            <Typography fontWeight={500} sx={{}} >Perceptron Untrained</Typography>
          </Box>
            :<>
             <Box sx={{display:"flex",alignItems:"center",gap:"4px"}}>
             <Box sx={{outline:`2px solid rgba(0,255,0,0.6)`,borderRadius:"50%",width:"8px ",height:"8px",background:`${status?"rgba(0,255,0,0.2)":"rgba(255,0,0,0.2)"}`}}></Box>
             <Typography fontWeight={500} sx={{}} >Training accuracy: {rate.accuracy}%</Typography>
           </Box>
           <Box sx={{display:"flex",alignItems:"center",gap:"4px"}}>
             <Box sx={{outline:`2px solid rgba(0,255,0,0.6)`,borderRadius:"50%",width:"8px ",height:"8px",background:`${status?"rgba(0,255,0,0.2)":"rgba(255,0,0,0.2)"}`}}></Box>
             <Typography fontWeight={500} sx={{}} >Test Data Error Rate : {rate.error.error}%</Typography>
           </Box>
           <Box sx={{display:"flex",alignItems:"center",gap:"4px"}}>
             <Box sx={{outline:`2px solid rgba(0,255,0,0.6)`,borderRadius:"50%",width:"8px ",height:"8px",background:`${status?"rgba(0,255,0,0.2)":"rgba(255,0,0,0.2)"}`}}></Box>
             <Typography fontWeight={500} sx={{}} >Mean Squared Error (MSE) : {rate.error.loss}%</Typography>
           </Box>
           </>
            }
           </Stack>
          
        </Stack>)
      }
      else
  return (
    <Box>
      <Button variant='contained' startIcon={<BackupIcon/>} component='label'>
      <input hidden type="file" accept='.xlsx' onChange={handleData} />
      Upload Training File
      </Button>
    </Box>
  )
}
