import jwt from 'jsonwebtoken';

//Checks if the user is authenticated (valid JWT).
export function protect(req, res, next) {  //middleware to protect routes //next is the next middleware to call 
  try {
    const authHeader = req.header("Authorization");  //get token from header

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });  //if no token provided
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Invalid token format" }); //if token format is invalid
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  //verify token
      if (err) {
        return res.status(403).json({ message: "Unauthorized" });  //if token is invalid
      }
 
      req.user = decoded;  //attach user data to the request
      next();              //allows request to continue
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
