# kimyohan.kr

개인 블로그. Hugo + PaperMod 테마로 구성되어 있습니다.

## 구조

```
kimyohan.kr/
├── blog/
│   ├── content/posts/   # 블로그 포스트 (Markdown)
│   ├── static/          # favicon 등 정적 파일
│   ├── themes/PaperMod/ # PaperMod 테마 (git submodule)
│   ├── public/          # Hugo 빌드 결과물 (.gitignore)
│   └── hugo.yaml        # Hugo 설정
└── docker-compose.yaml  # Docker 기반 Hugo 빌드
```

## 초기 설정

```bash
git clone <repo> && cd kimyohan.kr
git submodule update --init --recursive
```

## 빌드

```bash
# Docker 사용, Hugo 로컬 설치 불필요
docker compose run --rm hugo
```

빌드 결과물은 `blog/public/`에 생성됩니다.

로컬에 Hugo가 설치되어 있다면 직접 빌드할 수도 있습니다.

```bash
cd blog && hugo --minify
```

## 로컬 테스트

```bash
cd blog && hugo server
```

http://localhost:1313 접속.

## 글 작성

```bash
cd blog && hugo new content posts/글-제목.md
```

생성된 Markdown 파일을 편집한 뒤 빌드합니다.

## 주요 경로

| 경로 | 설명 |
|---|---|
| `blog/hugo.yaml` | Hugo 및 PaperMod 테마 설정 |
| `blog/content/posts/` | 블로그 포스트 |
| `blog/static/` | favicon 등 정적 파일 |
| `blog/public/` | Hugo 빌드 결과물 |
| `blog/themes/PaperMod/` | PaperMod 테마 submodule |
