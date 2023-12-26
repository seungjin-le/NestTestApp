import { Injectable } from "@nestjs/common";
import { Movie } from "./entities/Movie.entity";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }
  getDetail(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }
  delete(id: string) {
    this.movies.filter((movie) => movie.id !== +id);
  }
  post(movieData) {
    this.movies.push({
      ...movieData,
      id: this.movies.length + 1,
    });
  }
  patch(id: string, updateData) {
    const movie = this.getDetail(id);
    this.delete(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
