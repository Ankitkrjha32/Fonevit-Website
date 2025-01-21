import express from 'express'
import {placeOrder,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/order.controller.js'
// import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyPayment} from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Feattures
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Frontend Feature
orderRouter.post('/place',authUser,placeOrder);
// orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//User Feature
orderRouter.post('/user-orders',authUser,userOrders);
// orderRouter.post('/verifyPayment',authUser,verifyPayment);

export default orderRouter;

 