import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "members",
};

export interface MemberDocument extends Document {
  email: string;
  password: string;
}

const Member = new Schema<MemberDocument>(
  {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  options
);

const MembersSchema = mongoose.model<MemberDocument>("Member", Member);
export default MembersSchema;
