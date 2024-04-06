import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "user",
};

export interface UserDocument extends Document {
  id: number;
  email: string;
  password: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

const User = new Schema<UserDocument>(
  {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    deleted_at: { type: Date, required: true },
  },
  options
);

const UserSchema = mongoose.model<UserDocument>("user", User);

export default UserSchema;
