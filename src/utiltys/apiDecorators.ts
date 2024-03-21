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
 * @param {string} name
 * @param {boolean} required
 * @param {any} type
 * @param {string} description
 * @returns {MethodDecorator }
 */
export const apiQuery = (
  name: string,
  required: boolean,
  type: any,
  description: string
): MethodDecorator & ClassDecorator => {
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
 * @param {String} summary 설명
 * @param {String} description 설명
 * */
export const apiOperation = (summary: string, description: string) => {
  return ApiOperation({ summary, description });
};

/**
 * @param {number} status
 * @param {string} description
 * @param {any} type
 * @returns {MethodDecorator & ClassDecorator}
 */
export const apiResponse = (status: number, description: string, type?: any): MethodDecorator & ClassDecorator => {
  return ApiResponse({ status, description, type });
};

/**
 * @param {string} description
 * @param {any} type
 * @returns { MethodDecorator }
 */
export const apiRequest = (description: string, type: any): MethodDecorator => {
  return ApiBody({ description, type });
};

/**
 * @returns {MethodDecorator }
 * @param options {description: string; type: any}
 */
export const apiBody = (options: { description: string; type: any }): MethodDecorator => {
  return ApiBody(options);
};
