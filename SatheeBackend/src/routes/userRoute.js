import express from 'express';
import { getAllUsers, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();


 
// User routes
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);

//profile Completion


export default router;
