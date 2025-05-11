import {Router} from 'express';
import { generateCustomMaze, generateMaze, solve, solveCustom } from './maze.controller.js';
const router =Router();

router.post("/generate",generateMaze);
router.post("/generatecustom",generateCustomMaze);
router.post("/solve",solve);
router.post("/solvecustom",solveCustom);





export default router;