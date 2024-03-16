import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/Movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MovieDocument } from "./movies.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>) {}
  private movies: Movie[] = [];

  async getAll({ page, size }): Promise<Movie[]> {
    const movies: any = await this.movieModel.find().exec();

    if (!movies) throw new NotFoundException("영화 목록이 없습니다.");

    return movies;
  }

  async getDetail(id: number): Promise<Movie> {
    const testMovie = this.movies.find((movie) => movie.id === +id);
    try {
      const movie: MovieDocument | Movie | any = await this.movieModel.find((movie) => movie.id === +id).exec();
      console.log(movie);
    } catch (e) {
      console.error(e);
    }

    return testMovie;
  }

  delete(id: number) {
    const movie = this.getDetail(id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  async post(movieData: CreateMovieDto): Promise<Movie> {
    const count = await this.movieModel.countDocuments().exec();

    const newMovie = new this.movieModel({
      id: count + 1, // Assuming id is provided in movieData
      ...movieData,
    });

    try {
      const savedMovie = await newMovie.save();
      return savedMovie.toObject() as Movie;
    } catch (e) {
      console.error(e);
      throw new Error("영화 저장 실패");
    }
  }

  patch(id: number, updateData: UpdateMovieDto) {
    // const movie: Movie = this.getDetail(id);
    this.delete(id);
    // this.movies.push({ ...movie, ...updateData });
  }
}
