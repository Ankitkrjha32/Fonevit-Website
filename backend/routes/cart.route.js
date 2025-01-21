import express from 'express'
import {addToCart, updateToCart, getToCart} from '../controllers/cart.controller.js'
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authUser,addToCart);
cartRouter.post('/update',authUser,updateToCart);
cartRouter.post('/get',authUser,getToCart);

export default cartRouter;