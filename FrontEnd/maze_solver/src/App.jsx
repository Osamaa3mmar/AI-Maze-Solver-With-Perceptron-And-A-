import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MainPage from './pages/MainPage';
import { ToastContainer, Zoom } from 'react-toastify';
import MazeContextProvider from './MazeContext';

export default function App() {
 const theme=createTheme({
  palette:{
    mode: "light",
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#f5f5f5",
    },
  }
 })
  return (
    <div style={{background:"#b8a57b",paddingTop:"40px",minHeight:"100dvh"}}>
      <ThemeProvider theme={theme}>
        <MazeContextProvider>
        <MainPage/>
        </MazeContextProvider>
      </ThemeProvider>
      <ToastContainer
position="bottom-left"
autoClose={3000}
hideProgressBar={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Zoom}
/>
    </div>
  )
}
