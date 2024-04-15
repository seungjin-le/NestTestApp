import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

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

const Auth = new Schema<AuthDocument>(
  {
    email: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, expires: "7d", default: Date.now },
  },
  options
);

const AuthSchema = mongoose.model<AuthDocument>("auth", Auth);

export default AuthSchema;
