import {Router} from 'express';
import { signUpController, signInController, getCurrentUserController } from '../controllers/auth.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.get('/current-user', verifyToken, getCurrentUserController);

export default router;