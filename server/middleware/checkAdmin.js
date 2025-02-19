import jwt from 'jsonwebtoken'; // Import the jsonwebtoken module

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Set the JWT secret

export const checkAdmin = (req, res, next) => { // Middleware to check if the user is an admin
  const authHeader = req.headers['authorization'];  // Get the authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from the authorization header  

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Verify the token with the JWT secret by decoding it 
    console.log('Decoded token:', decoded); // Debugging: Log the entire decoded token
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    req.user = decoded; // Set the user in the request object
    next(); // Call the next middleware
  } catch (error) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};