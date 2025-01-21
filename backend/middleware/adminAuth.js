import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // Retrieve token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'
    
    if (!token) {
      return res.status(403).json({ success: false, message: "No token provided. Unauthorized." });
    }

    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user role is 'admin'
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Not authorized as admin." });
    }

    // Attach the user data to the request object
    req.user = decoded; // This will include the decoded JWT payload (user ID, role, etc.)

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Could not authenticate." });
  }
};

export default adminAuth;
