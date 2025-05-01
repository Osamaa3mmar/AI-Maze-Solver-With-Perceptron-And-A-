import {Router} from 'express';
import { generateMaze } from './maze.controller.js';
const router =Router();

router.post("/generate",generateMaze);





export default router;