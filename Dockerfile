# Node.js 버전 명시 (18-alpine 사용하여 이미지 크기 줄이기)
FROM node:18-alpine

# 작업 디렉토리 생성 및 설정
WORKDIR /app

# 의존성 파일 복사 및 설치 (캐싱 활용)
COPY package*.json ./
RUN npm ci --only=production  # production 환경에 필요한 의존성만 설치

# 소스 코드 복사
COPY . .

# 빌드 결과물 디렉토리 생성
RUN mkdir -p dist

# 빌드 (production 환경에 맞게 수정)
RUN npm run build

# 3000 포트 노출
EXPOSE 3000

# 실행 명령어 (production 환경에 맞게 수정)
CMD [ "node", "dist/main.js" ]
