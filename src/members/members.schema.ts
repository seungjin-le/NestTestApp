import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "movie",
};

export interface MemberDocument extends Document {
  id: number;
  name: string;
  age: number;
  gender: string;
}

const Member = new Schema<MemberDocument>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: false },
  },
  options
);

const MembersSchema = mongoose.model<MemberDocument>("Member", Member);
export default MembersSchema;
