# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 실행

```bash
docker compose up -d
```

## 아키텍처

정적 이력서 사이트를 Caddy로 서빙하는 단순한 구조입니다.

- **`resume/data.js`** — 이력서 콘텐츠 전체. 이 파일만 수정하면 이력서 내용이 바뀝니다.
- **`resume/render.js`** — `data.js`의 `resumeData` 객체를 읽어 DOM을 구성합니다. 데이터와 렌더링이 분리된 구조입니다.
- **`Caddyfile`** — TLS 자동 발급, `kimyohan.kr` → `www.kimyohan.kr` 301 리다이렉트, IP 직접 접근 차단(`abort`).

## URL 흐름

```
http(s)://kimyohan.kr     → https://www.kimyohan.kr (301)
https://www.kimyohan.kr   → /resume (302)
https://www.kimyohan.kr/resume → 이력서 정적 파일 서빙
IP 직접 접근              → abort
```
