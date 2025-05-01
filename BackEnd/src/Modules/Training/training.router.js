import {Router} from 'express';
import {cancele, getTrainingData, test} from "./training.controller.js"
const router=Router();

router.post('/send',getTrainingData);
router.post('/test',test);
router.get('/cancele',cancele);



export default router;