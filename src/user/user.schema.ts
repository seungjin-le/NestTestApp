import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "user",
  versionKey: false,
};

export interface UserDocument extends Document {
  id: number;
  email: string;
  password: string;
  nickName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const User = new Schema<UserDocument>(
  {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickName: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
  },
  options
);

const UserSchema = mongoose.model<UserDocument>("user", User);

export default UserSchema;
