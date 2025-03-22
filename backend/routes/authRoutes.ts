 import express from "express";
 import bcrypt from "bcryptjs";  //for hashing passwords
 import jwt from "jsonwebtoken";
 import User from "../models/User";
 import dotenv from "dotenv";

 dotenv.config();

 const secretKey = process.env.SECRET_KEY as string;

 const router = express.Router();

//  let tokenBlackList: string[] = []

 //Sign up route
 router.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10); //hash the password before saving to db
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
        //compare the provided password with hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
             res.status(401).json({ message: "Invalid Password" });
             return;
        }

        //generate the jwt token for the user, valid for 1hour
        const token = jwt.sign({id: user._id}, secretKey,  {expiresIn: "1h"});
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

 export default router;