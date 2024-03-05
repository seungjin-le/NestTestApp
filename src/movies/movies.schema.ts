import * as mongoose from "mongoose";

export interface Movie extends mongoose.Document {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
