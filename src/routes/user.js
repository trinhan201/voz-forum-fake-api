import {Router} from 'express';
import { updateUserController, deleteUserController, getAllUserController, getUserByIdController, changeAvatarControler, changePasswordController } from '../controllers/user.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../utils/upload.js';

const router = Router();

router.put('/update', verifyToken, updateUserController);
router.delete('/delete', verifyToken, deleteUserController);
router.get('/all', getAllUserController);
router.get('/:id', getUserByIdController);
router.post('/upload', upload.single('myFile'), changeAvatarControler);
router.patch('/change-password', verifyToken, changePasswordController);

export default router;