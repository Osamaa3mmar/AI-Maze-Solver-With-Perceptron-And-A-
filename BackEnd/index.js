import express from 'express';
import cors from 'cors';
import { initApp } from './src/index.router.js';
const app=express();
const port=6565;
app.use(cors());
app.use(express.json());

initApp(app);



app.listen(port,()=>{
    console.log("Listening on port "+ port+ ".");
})

// import { Tile } from "./Tile.js";

// const osama=new Tile();
