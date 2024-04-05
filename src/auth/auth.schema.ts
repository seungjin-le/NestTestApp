import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "auth",
};

export interface AuthDocument extends Document {
  email: string;
  password: string;
}

const Auth = new Schema<AuthDocument>(
  {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  options
);

const AuthSchema = mongoose.model<AuthDocument>("Auth", Auth);
export default AuthSchema;
