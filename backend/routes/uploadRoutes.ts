import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary"; // Cloudinary SDK for image uploads
import dotenv from "dotenv"; // to load environment variables
import { resolve } from "path";
import { rejects } from "assert";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// Configure Multer to store files in memory (buffer) instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Route to handle image uploads
 * - Accepts a single image file under the field name "image"
 * - Uploads the image to Cloudinary and returns the URL
 */
router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
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
      res.status(200).json({ imageUrl: result });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

export default router;
