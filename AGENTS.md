# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## 개요

개인 블로그 저장소. Hugo + PaperMod 테마로 구성되어 있으며, Docker Compose는 Hugo 빌드용 서비스만 제공합니다.

## 빌드

```bash
# Docker 사용, Hugo 로컬 설치 불필요
docker compose run --rm hugo
```

빌드 결과물은 `blog/public/`에 생성됩니다.

## 로컬 테스트

```bash
cd blog && hugo server
```

브라우저에서 http://localhost:1313 접속. 파일 변경 시 자동 새로고침.

## 초기 설정

```bash
git submodule update --init --recursive
```

## 아키텍처

Hugo 정적 사이트. Hugo 빌드는 Docker 컨테이너로 실행할 수 있습니다.

- **`blog/hugo.yaml`** — Hugo 및 PaperMod 테마 설정
- **`blog/content/posts/`** — 블로그 포스트 (Markdown)
- **`blog/static/`** — favicon 등 정적 파일. Hugo 빌드 시 `public/` 루트에 복사됨
- **`blog/public/`** — Hugo 빌드 결과물. `.gitignore` 처리됨
- **`blog/themes/PaperMod/`** — PaperMod 테마 (git submodule)

## 새 글 작성

```bash
cd blog && hugo new content posts/글-제목.md
```
