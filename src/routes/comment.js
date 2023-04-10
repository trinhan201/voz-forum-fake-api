import {Router} from 'express';
import { createCommentController, 
    updateCommentController, 
    deleteCommentController, 
    getAllCommentController, 
    getCommentByIdController } from '../controllers/comment.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/create', verifyToken, createCommentController);
router.patch('/update/:id', verifyToken, updateCommentController);
router.delete('/delete/:id', verifyToken, deleteCommentController);
router.get('/all', getAllCommentController);
router.get('/:id', getCommentByIdController);

export default router;