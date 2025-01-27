// import jwt from 'jsonwebtoken'

// const authUser = async (req, res, next) => {
//     const {token} = req.headers;
     
//     if(!token){
//         return res.json({
//             success: false,
//             message: "Unauthorizeded, Please login again"
//         })
//     }
//     try {
//         const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         console.log(req.body.userId);
//         next();
//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message});
//     }
// }

// export default authUser;

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, Please login again",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    // Verify token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to req object (use req.user instead of req.body)
    req.user = { id: token_decode.id };

    console.log(`User authenticated: ${req.user.id}`);
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token, Please login again",
    });
  }
};

export default authUser;
