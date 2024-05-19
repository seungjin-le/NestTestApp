import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "file",
};

export interface FileDocument extends Document {
  name: string;
  path: string;
  size: number;
}

const Member = new Schema<FileDocument>(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  options
);

const FileSchema = mongoose.model<FileDocument>("File", Member);
export default FileSchema;
