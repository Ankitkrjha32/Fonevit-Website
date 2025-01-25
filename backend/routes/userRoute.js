import express from 'express'
import {loginUser, registerUser, admin,getUserDetails,VerfiyEmail} from '../controllers/userController.js'

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/admin',admin)
router.get('/:id', getUserDetails);
router.post('/verifyEmail',VerfiyEmail);
export default router;