FROM node:18-alpine AS base
# Node.js 18 버전의 경량 Alpine 이미지를 기반으로 설정.

# 개발 환경을 위한 의존성 설치 (Nest.js)
FROM base AS deps
# 작업 디렉토리를 /usr/src/app으로 설정.
WORKDIR /usr/src/app

# package.json과 yarn.lock 파일을 복사하여 의존성 설치에 사용.
COPY --chown=node:node package.json yarn.lock ./

# yarn을 사용하여 의존성을 설치. --frozen-lockfile 옵션은 lockfile을 변경하지 않도록.
RUN yarn --frozen-lockfile;

# node 사용자를 설정하여 권한을 제한.
USER node


# 프로덕션을 위한 의존성 설치 및 빌드
FROM base AS build

# 작업 디렉토리를 /usr/src/app으로 설정.
WORKDIR /usr/src/app

# 이전 단계에서 설치한 node_modules를 복사.
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules

# 소스 코드를 복사.
COPY --chown=node:node . .

# 소스 코드를 빌드.
RUN yarn build



# 환경 변수를 production으로 설정.
ENV NODE_ENV production

# 프로덕션 환경에 필요한 의존성만 설치.
RUN yarn --frozen-lockfile --production;

# 빌드 캐시를 제거하여 이미지 크기를 줄임.
RUN rm -rf ./.next/cache

# node 사용자를 설정하여 권한을 제한.
USER node


# 프로덕션 이미지
FROM base AS production

# 작업 디렉토리를 /usr/src/app으로 설정.
WORKDIR /usr/src/app

# 빌드 단계에서 생성된 node_modules를 복사.
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

# 빌드된 dist 디렉토리를 복사.
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# 애플리케이션을 실행.
CMD [ "node", "dist/main.js" ]
