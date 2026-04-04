# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 실행

```bash
# 1. Hugo 빌드 (Docker 사용, hugo 로컬 설치 불필요)
docker compose run --rm hugo

# 2. 전체 서버 실행
docker compose up -d
```

## 로컬 테스트

```bash
cd blog && hugo server
```

브라우저에서 http://localhost:1313 접속. 파일 변경 시 자동 새로고침.

## 배포 워크플로우

글을 추가하거나 수정한 뒤 서버에서:

```bash
git pull
docker compose run --rm hugo   # blog/public/ 재생성
# Docker 재시작 불필요 — Caddy가 볼륨 마운트된 blog/public/을 즉시 서빙
```

## 최초 배포 시 추가 작업

```bash
# 테마 submodule 초기화
git submodule update --init --recursive

# UFW: Beszel Hub(컨테이너) → Agent(호스트) 45876 포트 허용
# monitoring 네트워크 서브넷 확인 후 허용 (환경마다 다를 수 있음)
docker network inspect kimyohankr_monitoring | grep Subnet
sudo ufw allow from <위에서_확인한_서브넷> to any port 45876
```

## 아키텍처

Hugo 정적 사이트를 Caddy로 서빙하는 구조. Hugo 빌드는 Docker 컨테이너로 실행.

- **`blog/hugo.yaml`** — Hugo 및 PaperMod 테마 설정
- **`blog/content/posts/`** — 블로그 포스트 (Markdown)
- **`blog/static/`** — favicon 등 정적 파일. Hugo 빌드 시 `public/` 루트에 복사됨
- **`blog/public/`** — Hugo 빌드 결과물. `.gitignore` 처리됨. Caddy가 이 디렉터리를 서빙
- **`blog/themes/PaperMod/`** — PaperMod 테마 (git submodule)
- **`Caddyfile`** — TLS 자동 발급, `kimyohan.kr` → `www.kimyohan.kr` 301 리다이렉트, IP 직접 접근 차단(`abort`)
- **`.env`** — 환경변수 (`.gitignore` 처리됨)

## 서비스

| 서비스 | 이미지 | 용도 |
|---|---|---|
| caddy | caddy:2-alpine | 블로그 웹서버, TLS |
| hugo | hugomods/hugo:exts | Hugo 빌드 (실행 후 종료) |
| beszel | henrygd/beszel | 서버 모니터링 허브 (LAN: 8090) |
| beszel-agent | henrygd/beszel-agent | 호스트 메트릭 수집 |

## Beszel 초기 설정

1. `docker compose up -d beszel`
2. `http://서버IP:8090` 접속 → 계정 생성
3. Add System → Host: `host.docker.internal`, Port: `45876` → KEY 복사
4. `.env`에 `BESZEL_AGENT_KEY=복사한키` 입력
5. `docker compose up -d beszel-agent`

Beszel Hub는 `monitoring` 브리지 네트워크, Agent는 `network_mode: host`. Hub의 `extra_hosts: host.docker.internal:host-gateway` 설정으로 연결.

## URL 흐름

```
http(s)://kimyohan.kr     → https://www.kimyohan.kr (301)
https://www.kimyohan.kr/  → Hugo 블로그 홈
https://www.kimyohan.kr/posts/... → 블로그 포스트
IP 직접 접근              → abort
http://서버IP:8090        → Beszel 모니터링 (LAN 전용)
```

## 새 글 작성

```bash
cd blog && hugo new content posts/글-제목.md
```
