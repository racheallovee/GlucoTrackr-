const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If the token is invalid or expired, return a 403 Forbidden response
      return res.status(403).json({ error: "Invalid or expired token." });
    }

    // If the token is valid, attach the user payload to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
