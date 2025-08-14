# 1단계 : Vue 프로젝트 빌드
FROM node:20 AS build-stage

WORKDIR /app

# package.json / package-lock.json 복사 → 캐시 효율
COPY package*.json ./
RUN npm install

# 전체 소스 복사 + 빌드
COPY . .
RUN npm run build

# 2단계 : Nginx로 정적 파일 서빙
FROM nginx:stable-alpine

# 빌드 결과물을 Nginx html 디렉토리로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 필요하면 기본 Nginx 설정 그대로 사용
# COPY nginx.conf /etc/nginx/nginx.conf

# 컨테이너 포트 오픈
EXPOSE 80

# 컨테이너 실행
CMD ["nginx", "-g", "daemon off;"]
