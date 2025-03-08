import mongoose, { Schema, Document } from "mongoose";
//Schema is a Mongoose class used to define the structure of documents in MongoDB.
//Document is a TypeScript type that represents a MongoDB document. To ensure TypeScript enforces correct data types.

//define interface to enforce type safety
interface IBlog extends Document {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
}

//define schema that maps to mongodb collection
const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: {type: String, require: true},
  date: {type: String, require:true},
});

//export the model. 
//The "Blog" represents the name of the MongoDB collection that Mongoose will use to store documents based on this schema.
//Mongoose automatically converts the model name ("Blog") into a pluralized, lowercase collection name in MongoDB.
//In MongoDB database, the documents will be stored in a collection named blogs.
export default mongoose.model<IBlog>("Blog", BlogSchema);
