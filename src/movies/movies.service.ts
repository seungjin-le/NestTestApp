import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/Movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MovieDocument } from "./movies.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { find } from "rxjs";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>) {}

  private movies: Movie[] = [];

  async getAll({ page, size }): Promise<Movie[] | any> {
    try {
      return await this.movieModel
        .find()
        .skip(size * (page - 1))
        .limit(size)
        .exec();
    } catch (e) {
      throw new NotFoundException("영화 목록이 없습니다.");
    }
  }

  async getDetail(id: number): Promise<Movie | any> {
    try {
      return await this.movieModel.find({ id }).exec();
    } catch (e) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
  }

  async delete(id: number) {
    try {
      const movie = this.getDetail(id);
      await this.movieModel.deleteOne({ id }).exec();
      return {
        message: "영화 삭제 성공",
        data: movie,
      };
    } catch (e) {
      throw new Error("영화 삭제 실패");
    }
  }

  async post(movieData: CreateMovieDto): Promise<Movie> {
    try {
      const count = await this.movieModel.countDocuments().exec();

      const newMovie = new this.movieModel({
        ...movieData,
        id: count + 1,
      });
      const savedMovie = await newMovie.save();
      return savedMovie.toObject() as Movie;
    } catch (e) {
      console.error(e);
      throw new Error("영화 저장 실패");
    }
  }

  patch(id: number, updateData: UpdateMovieDto) {
    try {
      const movie = this.getDetail(id);
      const newMovie = { ...movie, ...updateData };
      console.log(updateData, movie);
      console.log(movie);
    } catch (e) {}

    this.delete(id);
    // this.movies.push({ ...movie, ...updateData });
  }
}
