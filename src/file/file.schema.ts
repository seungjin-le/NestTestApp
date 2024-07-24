import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "file",
};

export interface FileDocument extends Document {
  name: string;
  key: string;
  size: number;
}

const File = new Schema<FileDocument>(
  {
    name: { type: String, required: true },
    key: { type: String, required: true },
    size: { type: Number, required: true },
  },
  options
);

export default mongoose.model<FileDocument>("File", File);
