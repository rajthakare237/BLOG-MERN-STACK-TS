import express, {Request, Response} from "express";
import multer from "multer"; //for handling file uploads
import User from "../models/User";
import { v2 as cloudinary } from "cloudinary"; // Cloudinary SDK for image uploads
import dotenv from "dotenv"; // to load environment variables

const router = express.Router();

// configure multer for file uploads
/**
 * Configure Multer for handling file uploads
 * - `destination`: Specifies where to store uploaded files (`uploads/` directory)
 * - `filename`: Generates a unique filename using the current timestamp and original filename
 */
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Configure Multer to store files in memory (buffer) instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/updateProfile", upload.single("profilePic"), async (req: Request, res: Response) : Promise<void> => {
    const {email, username, bio} = req.body;
    try {
        const user = await User.findOne({email});
        console.log("email in updateProfile.ts"+email);

        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }

        if(username) user.username = username;
        if(bio) user.bio = bio;
        
        if(req.file){
            // Update profile picture if a file was uploaded
            // Upload the image file buffer to Cloudinary using a Promise
            const result = await new Promise((resolve, reject) => {
                if (req.file) {
                cloudinary.uploader
                    .upload_stream((error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url);
                    })
                    .end(req.file.buffer);
                }
            });
            user.profilePic = String(result);
        }    

        
        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            profilePicUrl: user.profilePic,
        })

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
});

export default router;







// import express, {Request, Response} from "express";
// import multer from "multer"; //for handling file uploads
// import User from "../models/User";

// const router = express.Router();

// // configure multer for file uploads
// /**
//  * Configure Multer for handling file uploads
//  * - `destination`: Specifies where to store uploaded files (`uploads/` directory)
//  * - `filename`: Generates a unique filename using the current timestamp and original filename
//  */
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({storage});

// router.post("/updateProfile", upload.single("profilePic"), async (req: Request, res: Response) : Promise<void> => {
//     const {email, username, bio} = req.body;
//     try {
//         const user = await User.findOne({email});
//         console.log("email in updateProfile.ts"+email);

//         if(!user){
//             res.status(404).json({message: "User not found"});
//             return;
//         }

//         if(username) user.username = username;
//         if(bio) user.bio = bio;
        
//         // Update profile picture if a file was uploaded
//         if(req.file){
//             user.profilePic = `/uploads/${req.file.filename}`;
//         }

//         await user.save();

//         res.status(200).json({
//             message: "Profile updated successfully",
//             profilePicUrl: user.profilePic,
//         })

//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ message: "Error updating profile" });
//     }
// });

// export default router;
