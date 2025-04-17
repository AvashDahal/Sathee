import express from 'express';
import { getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import  chatWithLLM  from '../controllers/llmController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/chat', protect,chatWithLLM);
 
// User routes
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);



//profile Completion


export default router;
