import { applyDecorators, Controller } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  APIBodyOptions,
  APICtrlOptions,
  APIOperationOptions,
  APIParamOptions,
  APIQueryOptions,
  APIRequestOptions,
  APIResponseOptions,
} from "../types";

/**
 * @param {string} tag API 컨트롤러 태그.
 * @param {string} path API 컨트롤러 경로.
 * @returns {MethodDecorator}
 */
export const controller = (tag: string, path: string): ClassDecorator => {
  return applyDecorators(ApiTags(tag), Controller(path));
};

/**
 * @param {string} name 쿼리 이름 .
 * @param {boolean} required 쿼리 필수 여부.
 * @param {any} type 쿼리 타입.
 * @param {string} description 쿼리 설명.
 * @returns {MethodDecorator}
 */
export const apiQuery = (name: string, required: boolean, type: any, description: string): MethodDecorator => {
  return ApiQuery({ name, required, type, description });
};

/**
 * @param {string} name 파라미터 이름.
 * @param {boolean} required 파라미터 필수 여부.
 * @param {string} description 파라미터 설명.
 * @returns {MethodDecorator}
 */
export const apiParam = (name: string, required: boolean, description: string): MethodDecorator => {
  return ApiParam({ name, required, description });
};

/**
 * @param {string} summary API 요약.
 * @param {string} description API 설명.
 * @returns {MethodDecorator}
 */
export const apiOperation = (summary: string, description: string): MethodDecorator => {
  return ApiOperation({ summary, description });
};

/**
 * @param {number} status
 * @param {string} description
 * @param {any} type
 * @returns {MethodDecorator}
 */
export const apiResponse = (status: number, description: string, type?: any): MethodDecorator => {
  return ApiResponse({ status, description, type });
};

/**
 * @param {string} description API Request 설명.
 * @param {any} type API Request 타입.
 * @returns {MethodDecorator}
 */
export const apiBody = (description: string, type: any): MethodDecorator => {
  return ApiBody({ description, type });
};
