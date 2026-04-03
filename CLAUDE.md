# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 실행

```bash
# 1. Hugo 빌드 (배포 전 항상 실행)
cd blog && hugo --minify

# 2. Caddy 서버 실행
docker compose up -d
```

## 로컬 테스트

```bash
cd blog && hugo server
```

브라우저에서 http://localhost:1313 접속. 파일 변경 시 자동 새로고침.

## 배포 워크플로우

글을 추가하거나 수정한 뒤:

```bash
cd blog && hugo --minify   # blog/public/ 재생성
# Docker 재시작 불필요 — Caddy가 볼륨 마운트된 blog/public/을 즉시 서빙
```

## 아키텍처

Hugo 정적 사이트를 Caddy로 서빙하는 구조입니다.

- **`blog/hugo.yaml`** — Hugo 및 PaperMod 테마 설정
- **`blog/content/posts/`** — 블로그 포스트 (Markdown)
- **`blog/static/`** — favicon 등 정적 파일. Hugo 빌드 시 `public/` 루트에 복사됨
- **`blog/public/`** — Hugo 빌드 결과물. `.gitignore` 처리됨. Caddy가 이 디렉터리를 서빙
- **`blog/themes/PaperMod/`** — PaperMod 테마 (git submodule)
- **`Caddyfile`** — TLS 자동 발급, `kimyohan.kr` → `www.kimyohan.kr` 301 리다이렉트, IP 직접 접근 차단(`abort`)

## URL 흐름

```
http(s)://kimyohan.kr     → https://www.kimyohan.kr (301)
https://www.kimyohan.kr/  → Hugo 블로그 홈
https://www.kimyohan.kr/posts/... → 블로그 포스트
IP 직접 접근              → abort
```

## 새 글 작성

```bash
cd blog && hugo new content posts/글-제목.md
```

## Hugo 버전

PaperMod는 Hugo 0.146.0 이상 필요. 설치 경로:
`C:\Users\yhk\AppData\Local\Programs\hugo\hugo.exe`

PATH에 없으면:
```powershell
$env:PATH = "C:\Users\yhk\AppData\Local\Programs\hugo;$env:PATH"
```
