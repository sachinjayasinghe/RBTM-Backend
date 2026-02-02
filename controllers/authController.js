// server/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Registers a new user in the database. 
export function createUser(req, res) {  
    const passwordHash = bcrypt.hashSync(req.body.password, 10); // hash password with salt rounds 10

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        role: req.body.role || 'user', // default role is 'user'
    };

    const user = new User(userData);  //create new user

    user.save()                         //save user to database
        .then(() => {
            res.json({ message: "User created successfully" }); 
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ message: "Failed to create user" });
        });
}

//Authenticates a user and returns a JWT token.
export function loginUser(req, res) { 
    const email = req.body.email;          //get email from request body
    const password = req.body.password;     //get password from request body

    User.findOne({ email: email }).then(user => {   //find user by email
        if (!user) {
            res.status(404).json({ message: "User not found" });   //if user not found, return 404 error
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);   //compare password with hashed password

            if (isPasswordCorrect) {
                const token = jwt.sign(                  //if the pw is correct, generate a token by playload data 
                    {
                        id: user._id,
                        name: user.name,
                        email: user.email,          //playload data
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' } // token valid for 1 day
                );

                res.json({                   //send token to frontend(client)
                    token: token,
                    message: "Login successful",
                    role: user.role         //send role to frontend(client)
                });
            } else {
                res.status(403).json({ message: "Incorrect password" }); //if password is incorrect, return 403 error
            }
        }
    });
}

// Returns the currently logged-in user’s info.
export function getUser(req, res) {  
    if (!req.user) {
        res.status(404).json({ message: "User not found" });
    } else {
        res.json(req.user);
    }
}

// Returns all users in the database (Admin only)
export async function getAllUsers(req, res) {
    try {
        // Find all users but exclude password field
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
}