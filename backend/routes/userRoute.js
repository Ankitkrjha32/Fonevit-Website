import express from 'express'
import {loginUser, registerUser, admin,getUserDetails} from '../controllers/userController.js'

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/admin',admin)
router.get('/:id', getUserDetails);

export default router;