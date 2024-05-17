import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "file",
};

export interface FileUploadDocument extends Document {
  name: string;
  path: string;
  size: number;
}

const Member = new Schema<FileUploadDocument>(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  options
);

const FileUploadSchema = mongoose.model<FileUploadDocument>("FileUpload", Member);
export default FileUploadSchema;
