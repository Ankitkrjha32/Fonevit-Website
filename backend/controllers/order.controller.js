import orderModel from "../models/order.model.js";
import userModel from "../models/userModel.js";
// import Stripe from 'stripe'

//global variable
const currency = 'pkr';
const delivery_charge = 10;
//GATEWAY INITIALIZED
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Placing orders using COD method
const placeOrder = async (req,res) => {
    try {
        const {userId,items,address,amount} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData: {}});
        res.json({success: true, message : "Order Placed"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// //Placing orders using Stripe method
// const placeOrderStripe = async (req,res) => {
//     try {
//         const {userId, items, amount, address} = req.body;
//         const {origin} = req.headers;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "Stripe",
//             payment: false,
//             date: Date.now()

//         }
//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         const line_items = items.map((item) =>( {
//             price_data : {
//                 currency: currency,
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.price * 100,
//             },
//             quantity: item.quantity,
//         }));

//         line_items.push({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: "Delivery charges"
//                 },
//                 unit_amount: delivery_charge * 100,
//             },
//             quantity: 1,
//         });

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: "payment",
//         });
//         res.json({success: true, session_url: session.url })

//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message});
//     }
// }

// //verify stripe
//   const verifyPayment = async (req,res) => {
//     try {
//         const {userId, orderId, success} = req.body;
//         if(success === "true"){
//             await orderModel.findByIdAndUpdate(orderId, {payment: true});
//             await userModel.findByIdAndUpdate(userId, {cartData : {}});
//             res.json({success: true})
//         }else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success: false});
//         }
//     } catch (error) {

//         console.log(error)
//         res.json({success: true, message: error.message});
//     }
// }

//Placing orders using Razorpay method
const placeOrderRazorpay = async (req,res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address, 
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()

        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options ={
            amount : amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// All orders data for Admin panel
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//User Order Data for frontend
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
    
}

// Update order status from admin panel
const updateStatus = async (req,res)=> {
    try {
       const {orderId,status} = req.body;
       await orderModel.findByIdAndUpdate(orderId,{status});
       res.json({success: true, message: "Order Status updated"});
    } catch (error) {
        res.json({success: false, message:error.message});
    }
}

export  {placeOrder,placeOrderRazorpay,allOrders,userOrders,updateStatus};
// export  {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyPayment};