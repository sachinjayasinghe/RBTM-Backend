// server/middleware/roleMiddleware.js

//Allows access only if the user’s role is admin.
export function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') { //if user is exists and role is admin
        next();                                  //alloww access
    } else {
        res.status(403).json({ message: "Admin access only" }); //if user is not admin 
    }
}

//Allows access only if the user’s role is user.
export function isUser(req, res, next) {
    if (req.user && req.user.role === 'user') { //if user is regular user
        next();                   
    } else {
        res.status(403).json({ message: "User access only" });
    }
}
