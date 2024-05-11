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

  // 전체 조회 API
  async getAll({ page, size, res }): Promise<Movie[] | unknown> {
    try {
      console.log(page, size);
      return await this.movieModel
        .find()
        .skip(size * (page - 1))
        .limit(size)
        .exec();
    } catch (e) {
      throw res.status(404).send("해당 정보가 없습니다.");
    }
  }

  // 상세 조회 API
  async getDetail(id: number): Promise<Movie | unknown> {
    try {
      return await this.movieModel.find({ id }).exec();
    } catch (e) {
      throw new NotFoundException(`해당 정보가 없습니다. (${id})`);
    }
  }

  async delete(id: number): Promise<{ data: Promise<Movie | unknown>; message: string }> {
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

  // 생성 API
  async post(movieData: CreateMovieDto): Promise<Movie | unknown> {
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

  // 업데이트 API
  async patch(id: number, updateData: UpdateMovieDto): Promise<Movie | unknown> {
    try {
      return await this.movieModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
    } catch (e) {
      console.error(e);
      throw new Error("영화 업데이트 실패");
    }
  }
}
