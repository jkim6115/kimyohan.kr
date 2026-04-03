# kimyohan.kr

개인 블로그. Hugo + PaperMod 테마, Caddy + Docker로 홈서버에서 운영합니다.

## 구조

```
kimyohan.kr/
├── blog/
│   ├── content/posts/   # 블로그 포스트 (Markdown)
│   ├── static/          # favicon 등 정적 파일
│   ├── themes/PaperMod/ # PaperMod 테마 (git submodule)
│   ├── public/          # Hugo 빌드 결과물 (.gitignore)
│   └── hugo.yaml        # Hugo 설정
├── Caddyfile
├── docker-compose.yaml
└── .env                 # 환경변수 (.gitignore)
```

## 실행

```bash
# Hugo 빌드
cd blog && hugo --minify

# 서버 실행
docker compose up -d
```

TLS 인증서는 Caddy가 Let's Encrypt를 통해 자동 발급합니다.

## 로컬 테스트

```bash
cd blog && hugo server
```

http://localhost:1313 접속.

## 새 글 작성

```bash
cd blog && hugo new content posts/글-제목.md
# blog/content/posts/글-제목.md 편집 후
cd blog && hugo --minify
```

Docker 재시작 없이 즉시 반영됩니다.

## 서비스

| 서비스 | 설명 | 접근 |
|---|---|---|
| Caddy | 블로그 웹서버 | https://www.kimyohan.kr |
| Beszel | 서버 모니터링 | http://서버IP:8090 (LAN 전용) |

## URL

| 접근 | 동작 |
|---|---|
| `http://kimyohan.kr` | `https://www.kimyohan.kr` 로 리다이렉트 |
| `https://kimyohan.kr` | `https://www.kimyohan.kr` 로 리다이렉트 |
| `https://www.kimyohan.kr` | 블로그 홈 |
| IP 직접 접근 | 연결 차단 |
