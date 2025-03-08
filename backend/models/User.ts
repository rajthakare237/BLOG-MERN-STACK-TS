import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document{
  email: string;
  password: string;
  username: string;
  bio: string;
  profilePic: string;
}

const UserSchema: Schema  = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String, required: false, default: ""},
  bio: {type: String, required: false, default: ""},
  profilePic: {type: String, required: false, default: ""}
});

export default mongoose.model<IUser>("User", UserSchema);