import { SchemaOptions, Schema, Document } from "mongoose";

export const USER_MODEL_NAME = "User";

const options: SchemaOptions<UserDocument> = {
  timestamps: true,
  collection: "user",
  versionKey: false,
};

export interface UserDocument extends Document {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const UserSchema = new Schema<UserDocument>(
  {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
  },
  options
);
