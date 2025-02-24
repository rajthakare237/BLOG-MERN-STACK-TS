import express, { Request, Response } from "express";
import Blog from "../models/Blog";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const { title, description, category, imageUrl, author, date } = req.body;

  try {
    const newBlog = new Blog({ title, description, category, imageUrl, author, date });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Errot creating blog" });
  }
});

router.put("/update/:id", async(req: Request, res: Response) => {
  const {id} = req.params;
  const { title, description, category, imageUrl, author, date } = req.body;

  try {

    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, category, imageUrl, author, date }, {new:true})
    if(updatedBlog){
      res.status(200).json(updatedBlog);
    }
    else{
      res.status(400).json({message: "blog not found"});
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.status(201).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Errot fetching blogs" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
})

router.delete("/delete/:id", async(req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
    }
    
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
