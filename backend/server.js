import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

//config app
const app = express();
dotenv.config();
const port = process.env.PORT;
mongoDb();
connectCloudinary();

//middleware
app.use(express.json());
// Middleware to parse URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    credentials: true,
}));

// api endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/',(req,res) => {
    res.send('Server testing ....');
})

app.listen(port,() => {
    console.log(`Server is running on port: ` + port);
})