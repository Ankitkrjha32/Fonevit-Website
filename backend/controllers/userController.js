import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendVerificationEamil,senWelcomeEmail} from "../nodemailer/Email.js";


// Create token
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            const token = createToken(user._id);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character",
            });
        }

        // Check if user exists
        const exist = await userModel.findOne({ email });

        if (exist) {
            // Check if user is not verified and OTP has expired
            if (!exist.isVerified || exist.verificationTokenExpiresAt < Date.now()) {
                // Delete the expired user entry
                await userModel.deleteOne({ email: exist.email });

                // Log message to indicate entry deletion
                console.log("User OTP expired. Old entry deleted. Creating a new one.");

                // Generate new OTP and set new expiration time
                const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
                const verificationTokenExpiresAt = new Date(Date.now() + 1 * 60 * 1000); // OTP expiry in 5 minutes

                // Create new user with fresh OTP and send it
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = new userModel({
                    name,
                    email,
                    password: hashedPassword,
                    isVerified: false,
                    verificationToken, // New OTP
                    verificationTokenExpiresAt, // New expiry
                    lastLogin: new Date(),
                });

                // Save new user and send verification email
                await newUser.save();
                await sendVerificationEamil(newUser.email, verificationToken);

                // Return response with success and the new token
                const token = createToken(newUser._id);
                return res.status(200).json({
                    success: true,
                    message: "User registered successfully. A new OTP has been sent.",
                    newUser,
                    token,
                });
            } else {
                // If OTP has not expired or user is already verified
                return res.status(409).json({ success: false, message: "User already exists" });
            }
        }

        // If user does not exist, create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 1 * 60 * 1000); // OTP expiry in 5 minutes

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            verificationToken, // OTP
            verificationTokenExpiresAt, // Expiry
            lastLogin: new Date(),
        });

        await newUser.save();
        await sendVerificationEamil(newUser.email, verificationToken);

        // Generate a token and respond
        const token = createToken(newUser._id);
        return res.status(200).json({
            success: true,
            message: "User registered successfully. Please verify your email.",
            newUser,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Admin Login
const admin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received Email:", email);
        console.log("Received Password:", password);
        console.log("Admin Email:", process.env.ADMIN_EMAIL);
        console.log("Admin Password Hash:", process.env.ADMIN_PASSWORD_HASH);


        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        if (
            email === process.env.ADMIN_EMAIL &&
            //skipping hashing step
            // bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH)
            password===process.env.ADMIN_PASSWORD_HASH
        ) {
            const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
            
            return res.status(200).json({ success: true, token });
        } else {
            // console.log('ADMIN_EMAIL',process.env.ADMIN_EMAIL);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const getUserDetails = async (req, res) => {
    try {
        
        const {id} = req.params;
        

        
        const user = await userModel.findById(id);
        console.log("user" ,user);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        
        res.status(200).json({ success: true, name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// verify otp controller for email verification
const VerfiyEmail=async(req,res)=>{
    try {
        const {otp}=req.body 
        console.log("received code from body",otp);
        const userp= await userModel.findOne({
            verificationToken:otp,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })

        console.log("user details with code",userp);
        if (!userp) {
            return res.status(400).json({success:false,message:"Inavlid or Expired Code"})
                
            }
          
     userp.isVerified=true;
     userp.verificationToken=undefined;
     userp.verificationTokenExpiresAt=undefined;
     await userp.save()
     await senWelcomeEmail(userp.email,userp.name)
     return res.status(200).json({success:true,message:"Email Verifed Successfully"})
           
    } catch (error) {
        console.log(error)
        return res.status(400).json({success:false,message:"internal server error"})
    }
}

export { loginUser, registerUser, admin ,getUserDetails,VerfiyEmail};
