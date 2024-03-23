import { applyDecorators, Controller } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

/**
 * @param {string} tag 컨트롤러 태그
 * @param {string} path 컨트롤러 경로
 * @returns { MethodDecorator }
 */
export const controller = (tag: string, path: string): MethodDecorator => {
  return applyDecorators(ApiTags(tag), Controller(path));
};

/**
 * @param {string} name 쿼리 이름
 * @param {boolean} required 필수 여부
 * @param {any} type 타입
 * @param {string} description 설명
 * @returns {MethodDecorator }
 */
export const apiQuery = (name: string, required: boolean, type: any, description: string): MethodDecorator => {
  return ApiQuery({ name, required, type, description });
};

/**
 * @param {string} name
 * @param {boolean} required
 * @param {string} description
 * @returns { MethodDecorator }
 */
export const apiParam = (name: string, required: boolean, description: string): MethodDecorator => {
  return ApiParam({ name, required, description });
};

/**
 * @param {String} summary API 요약
 * @param {String} description API 설명
 * @returns {MethodDecorator}
 * */
export const apiOperation = (summary: string, description: string): MethodDecorator => {
  return ApiOperation({ summary, description });
};

/**
 * @param {number} status HTTP 상태 코드
 * @param {string} description API 설명
 * @param {any} type 반환 타입
 * @returns {MethodDecorator }
 */
export const apiResponse = (status: number, description: string, type?: any): MethodDecorator => {
  return ApiResponse({ status, description, type });
};

/**
 * @param {string} description API Request 설명
 * @param {any} type API Request 타입
 * @returns { MethodDecorator }
 */
export const apiRequest = (description: string, type: any): MethodDecorator => {
  return ApiBody({ description, type });
};

/**
 * @param options {description: string; type: any}
 * @option description {string} API Body 설명
 * @option type {any} API Body 타입
 * @returns {MethodDecorator }
 */
export const apiBody = (options: { description: string; type: any }): MethodDecorator => {
  return ApiBody(options);
};
