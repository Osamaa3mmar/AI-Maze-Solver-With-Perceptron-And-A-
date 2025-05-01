import trainingRouter from './Modules/Training/training.router.js'
import mazeRouter from './Modules/Maze/maze.router.js'
export const initApp=(app)=>{
    app.use('/train',trainingRouter);
    app.use('/maze',mazeRouter);
}