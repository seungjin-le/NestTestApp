import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/Movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }
  getDetail(id: string) {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return this.movies.find((movie) => movie.id === +id);
  }
  delete(id: string) {
    this.getDetail(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
  post(movieData: CreateMovieDto) {
    this.movies.push({
      ...movieData,
      id: this.movies.length + 1,
    });
  }
  patch(id: string, updateData: CreateMovieDto) {
    const movie: Movie = this.getDetail(id);
    this.delete(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
