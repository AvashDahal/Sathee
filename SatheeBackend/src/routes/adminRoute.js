import express from 'express';
import {  getAllUsers,getUser,deleteUser,updateUser } from '../controllers/userController.js';
import { updateTeacherStatus,getTeacherById } from '../controllers/teacherController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


router.patch('/status/:id', updateTeacherStatus);

router.get('/teachers/:id', getTeacherById);

export default router;