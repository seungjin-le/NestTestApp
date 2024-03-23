export interface APICtrlOptions {
  tag: string; // API 컨트롤러 태그.
  path: string; // API 컨트롤러 경로.
}

export interface APIQueryOptions {
  name: string; // 쿼리 이름.
  required: boolean; // 쿼리 필수 여부.
  type: any; // 쿼리 타입.
  description: string; // 쿼리 설명.
}

export interface APIParamOptions {
  name: string; // 파라미터 이름.
  required: boolean; // 파라미터 필수 여부.
  description: string; // 파라미터 설명.
}

export interface APIOperationOptions {
  summary: string; // API 요약.
  description: string; // API 설명.
}

export interface APIResponseOptions {
  status: number; // HTTP 상태 코드.
  description: string; // API 설명.
  type?: any; // 반환 타입.
}

export interface APIRequestOptions {
  description: string; // API Request 설명.
  type: any; // API Request 타입.
}

export interface APIBodyOptions {
  description: string;
  type: any;
}
