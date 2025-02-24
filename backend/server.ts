import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes";
import mongoose, { ConnectOptions } from "mongoose";
import uploadRoutes from "./routes/uploadRoutes";
import militaryNewsRoutes from "./routes/militaryNewsRoutes";
import geopoliticsNewsRoutes from "./routes/geopoliticsNewsRoutes";
import spaceNewsRoutes from "./routes/spaceNewsRoutes";
import authRoutes from "./routes/authRoutes";
import updateProfileRoutes from "./routes/updateProfile"
import path from "path";

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/blogs", blogRoutes);
app.use("/upload", uploadRoutes);
app.use("/api", militaryNewsRoutes);
app.use("/api", geopoliticsNewsRoutes);
app.use("/api", spaceNewsRoutes);
app.use("/api", updateProfileRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Helper function to fetch news by category
const fetchNewsByCategory = async (category: string) => {
  return axios.get(`https://newsapi.org/v2/top-headlines`, {
    params: {
      country: "us",
      apiKey: process.env.NEWS_API_KEY,
      category: category,
    },
  });
};

app.get("/api/news", async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch news from both "science" and "technology" categories simultaneously
    const [scienceNewsResponse, technologyNewsResponse] = await Promise.all([
      fetchNewsByCategory("science"),
      fetchNewsByCategory("technology"),
    ]);

    // Combine articles from both categories
    const combinedArticles = [
      ...scienceNewsResponse.data.articles,
      ...technologyNewsResponse.data.articles,
    ];

    // Send combined news articles back to the client
    res.json({ articles: combinedArticles });
  } catch (error) {
    console.error("Error fetching the news", error);
    res.status(500).send("Error fetching news");
  }
});

mongoose
  .connect(process.env.MONGO_URI || "", {} as ConnectOptions)
  .then(() => console.log("MongoDB Connected"))
  .catch((err: Error) => console.error("Error connecting to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
