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
├── .env                 # 환경변수 (.gitignore)
└── .env.example         # 환경변수 예시
```

## 최초 배포

```bash
git clone <repo> && cd kimyohan.kr

# 테마 submodule 초기화
git submodule update --init --recursive

# UFW: Beszel Hub(컨테이너) → Agent(호스트) 45876 포트 허용
# monitoring 네트워크 서브넷 확인 후 허용 (환경마다 다를 수 있음)
docker network inspect kimyohankr_monitoring | grep Subnet
sudo ufw allow from <위에서_확인한_서브넷> to any port 45876

# 환경변수 설정 (Beszel KEY는 아래 Beszel 초기 설정 참고)
cp .env.example .env

# Hugo 빌드
docker compose run --rm hugo

# 서버 실행
docker compose up -d
```

TLS 인증서는 Caddy가 Let's Encrypt를 통해 자동 발급합니다.

## 배포 (글 추가/수정 후)

```bash
git pull
docker compose run --rm hugo
# Docker 재시작 불필요 — Caddy가 볼륨 마운트된 blog/public/을 즉시 서빙
```

## 로컬 테스트

```bash
cd blog && hugo server
```

http://localhost:1313 접속.

## 새 글 작성

```bash
cd blog && hugo new content posts/글-제목.md
# blog/content/posts/글-제목.md 편집 후 서버에 push
```

## 서비스

| 서비스 | 설명 | 접근 |
|---|---|---|
| caddy | 블로그 웹서버, TLS | https://www.kimyohan.kr |
| beszel | 서버 모니터링 Hub | http://서버IP:8090 (LAN 전용) |
| beszel-agent | 호스트 메트릭 수집 | - |
| hugo | Hugo 빌드 (실행 후 종료) | - |

## Beszel 초기 설정

1. `docker compose up -d beszel`
2. `http://서버IP:8090` 접속 → 계정 생성
3. Add System → Host: `host.docker.internal`, Port: `45876` → KEY 복사
4. `.env`에 `BESZEL_AGENT_KEY=복사한키` 입력
5. `docker compose up -d beszel-agent`

## URL

| 접근 | 동작 |
|---|---|
| `http://kimyohan.kr` | `https://www.kimyohan.kr` 로 리다이렉트 |
| `https://kimyohan.kr` | `https://www.kimyohan.kr` 로 리다이렉트 |
| `https://www.kimyohan.kr` | 블로그 홈 |
| IP 직접 접근 | 연결 차단 |
