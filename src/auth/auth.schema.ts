import { SchemaOptions, Schema, Document } from "mongoose";

export const AUTH_MODEL_NAME = "Auth";

const options: SchemaOptions = {
  timestamps: true,
  collection: "auth",
};

export interface AuthDocument extends Document {
  email: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
}

export const AuthSchema = new Schema<AuthDocument>(
  {
    email: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, expires: "7d", default: Date.now },
  },
  options
);
