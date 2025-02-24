 import express from "express";
 import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken";
 import User from "../models/User";

 const router = express.Router();

//  let tokenBlackList: string[] = []

 //Sign up route
 router.post("/sign-up", async (req, res) => {
    const {email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    }
    catch(err){
        res.status(500).json({message: "Error creating user"});
    }
 });

 //Login route
 router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user){
            res.status(404).json({message: "User not found."});
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
             res.status(401).json({ message: "Invalid Password" });
             return;
        }

        const token = jwt.sign({id: user._id}, "hello_secret_key",  {expiresIn: "1h"});
        console.log("Token is: "+token);

        const userBio = user.bio;
        const userName = user.username;
        const userPic = user.profilePic;

        res.status(200).json({ message: "Login successful.", userBio, userName, userPic, token });
        
    }
    catch(err){
        res.status(500).json({message: "Error while logging in the user"});
    }
 });

//  router.post("/logout", async (req, res) => {

//     const authHeader = req.headers.authorization;

//     if(!authHeader){
//         res.status(400).json({message: "No token provided."});
//         return;
//     }

//     const token = authHeader.split(" ")[1];

//     if(!token){
//         res.status(400).json({message: "Invalid token provided."});
//         return;
//     }

//     try {
//         jwt.verify(token, "hello_secret_key");

//         tokenBlackList.push(token);

//         res.status(200).json({message: "Logout is successful."})
//         console.log("Logout successful...")
//     } catch (error) {
//         res.status(401).json({message: "Invalid or expired token"});
//     }



//  });

 export default router;