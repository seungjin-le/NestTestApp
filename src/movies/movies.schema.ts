import mongoose, { SchemaOptions, Schema, Document } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
  collection: "movie",
};

export interface MovieDocument extends Document {
  id: number;
  title: string;
  year: number;
  genres?: string[];
}

const Movie = new Schema<MovieDocument>(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genres: { type: [String], required: false },
  },
  options
);

const MovieSchema = mongoose.model<MovieDocument>("Movie", Movie);
export default MovieSchema;
