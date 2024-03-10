import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/Movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ApiResponse } from "@nestjs/swagger";
import MovieSchema, { MovieDocument } from "./movies.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MoviesService {
  // constructor(@InjectModel("Movie") private readonly movieModel: Model<MovieDocument>) {}
  private movies: Movie[] = [];

  getAll({ page, size }): Movie[] {
    console.log(page, size);
    return this.movies;
  }

  @ApiResponse({
    status: 200,
    description: "영화를 상세 조회성공",
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: "영화를 상세 조회실패",
    type: Movie,
  })
  getDetail(id: number) {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return this.movies.find((movie) => movie.id === +id);
  }
  delete(id: number) {
    this.getDetail(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  @ApiResponse({
    status: 200,
    description: "영화 저장 성공",
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: "영화 저장 실패",
    type: Movie,
  })
  async post(movieData: CreateMovieDto) {
    const newMovie = new MovieSchema({
      id: this.movies.length + 1,
      ...movieData,
    });
    // this.movies.push(newMovie);
    try {
      const savedMovie = await newMovie.save();
      console.log(savedMovie);
      return savedMovie;
    } catch (e) {
      console.error(e);
      return { message: "영화 저장 실패" };
    }
  }
  patch(id: number, updateData: UpdateMovieDto) {
    const movie: Movie = this.getDetail(id);
    this.delete(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
