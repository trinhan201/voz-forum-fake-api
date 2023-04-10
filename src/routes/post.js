import {Router} from 'express';
import { createPostController, 
    updatePostController, 
    deletePostController, 
    uploadPostImgControler, 
    getAllPostController, 
    getPostByIdController } from '../controllers/post.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../utils/upload.js';

const router = Router();

router.post('/create', verifyToken, createPostController)
router.put('/update/:id', verifyToken, updatePostController);
router.delete('/delete/:id', verifyToken, deletePostController);
router.get('/all', getAllPostController);
router.get('/:id', getPostByIdController);
router.post('/upload', upload.array('myFile', 10), uploadPostImgControler);

export default router;