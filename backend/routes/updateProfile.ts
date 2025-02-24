import express, {Request, Response} from "express";
import multer from "multer";
import User from "../models/User";

const router = express.Router();

// configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage});

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
            user.profilePic = `/uploads/${req.file.filename}`;
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
