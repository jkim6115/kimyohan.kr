# kimyohan.kr

개인 이력서 사이트. Caddy + Docker로 홈서버에서 운영합니다.

## 구조

```
kimyohan.kr/
├── Caddyfile
├── docker-compose.yaml
└── resume/
    ├── index.html
    ├── style.css
    ├── data.js         # 이력서 내용 (이 파일만 수정)
    └── render.js       # DOM 렌더러
```

## 실행

```bash
docker compose up -d
```

TLS 인증서는 Caddy가 Let's Encrypt를 통해 자동 발급합니다.

## 이력서 수정

`resume/data.js` 파일만 수정하면 됩니다. 컨테이너 재시작 없이 반영됩니다.

## URL

| 접근 | 동작 |
|---|---|
| `http://kimyohan.kr` | `https://www.kimyohan.kr` 로 리다이렉트 |
| `https://kimyohan.kr` | `https://www.kimyohan.kr` 로 리다이렉트 |
| `https://www.kimyohan.kr` | `/resume` 로 리다이렉트 |
| `https://www.kimyohan.kr/resume` | 이력서 |
| IP 직접 접근 | 연결 차단 |
