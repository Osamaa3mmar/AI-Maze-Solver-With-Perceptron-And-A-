import {Router} from 'express';
import { generateMaze, solve } from './maze.controller.js';
const router =Router();

router.post("/generate",generateMaze);
router.post("/solve",solve);





export default router;