import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: {type: String, require: true},
  date: {type: String, require:true},
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
