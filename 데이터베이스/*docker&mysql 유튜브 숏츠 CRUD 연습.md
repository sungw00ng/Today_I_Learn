### 1. 도커 설치하기
- https://www.docker.com/

### 2. 도커 데몬 확인하기
- `docker info`

### 3. MYSQL 컨테이너 실행하기
- `docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=비밀번호 -p 3306:3306 -d mysql:latest
`

### 4. 실행되었는지 확인하기
- `docker ps`

### 5. MYSQL 접속하기
- `docker exec -it some-mysql mysql -u root -p`
- 이후 비밀번호를 입력하면 MySQL 쉘( mysql> )로 진입할 수 있다.

<br><br>

## shorts 테이블 설계

```sql
CREATE DATABASE IF NOT EXISTS youtube_shorts;
USE youtube_shorts;

CREATE TABLE shorts (
  short_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- 숏츠 고유 ID
  user_id BIGINT UNSIGNED NOT NULL, -- 업로더 유저 ID
  title VARCHAR(150) NOT NULL, -- 제목 (최대 150자)
  description TEXT, -- 설명
  video_url VARCHAR(500) NOT NULL, -- 영상 URL
  thumbnail_url VARCHAR(500), -- 썸네일 URL
  duration_sec INT UNSIGNED NOT NULL, -- 영상 길이(초)
  views BIGINT UNSIGNED NOT NULL DEFAULT 0, -- 조회수 (누적)
  likes BIGINT UNSIGNED NOT NULL DEFAULT 0, -- 좋아요 수 (누적)
  comments_count INT UNSIGNED NOT NULL DEFAULT 0, -- 댓글 수
  is_public BOOLEAN NOT NULL DEFAULT TRUE, -- 공개 여부
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE, -- 논리 삭제 여부
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_is_public_is_deleted (is_public, is_deleted),
  FULLTEXT INDEX idx_title_description (title,description)
);
```

<br>

### CREATE
```sql
INSERT INTO shorts
  (user_id, title, description, video_url, thumbnail_url,duration_sec,is_public)
VALUES
  (12345, '햄버거 티어리스트','맘스터치 1황..','http://youtu...be/abcd1234','http://img.youtube.com/vi/abcd1234/default.jpg',45,TRUE);
```

<br>

### READ
#### 공개된 shorts 최신순 조회
```sql
SELECT short_id,user_id,title,thumbnail_url,views,likes,comments_count,duration_sec,created_at
FROM shorts
WHERE is_public=TRUE AND is_deleted=FALSE
ORDER BY created_at  DESC
LIMIT 20 OFFSET 0; --페이지당 20개, 첫 페이지
```

#### 사용자 개인 shorts 조회
```sql
SELECT * FROM shorts
WHERE user_id=12345 AND is_deleted=FALSE
ORDER BY created_at DESC;
```

#### 특정 shorts 상세 조회
```sql
SELECT * FROM shorts
WHERE short_id=67890 AND is_deleted=FALSE;
```

#### 제목/설명 내 키워드 검색
```sql
SELECT short_id,title,description
FROM shorts
WHERE MATCH(title,description) AGAINST ('햄버거' IN NATURAL LANGUAGE MODE)
AND is_public=TRUE AND is_deleted=FALSE
ORDER BY created_at DESC
LIMIT 10;
```

<br>

### UPDATE(1. 조회수,좋아요,댓글 수 증가)
#### 조회수 1증가
```sql
UPDATE shorts
SET views=views+1
WHERE short_id=67890 AND is_deleted=FALSE;
```

### 좋아요 1증가/감소 (좋아요 토글을 한다면 따로 트랜잭션이 필요하다)
```sql
UPDATE shorts
SET likes=likes+1
WHERE short_id 67890 AND is_deleted=FALSE;
```

#### 좋아요 취소 시
```sql
UPDATE shorts
SET likes=likes-1
WHERE short_id=67890 AND is_deleted=FALSE AND likes>0;
```

#### 댓글 수 증가/감소
```sql
UPDATE shorts
SET comments_count=comments_count+1
WHERE short_id=67890 AND is_deleted=FALSE;
```

### UPDATE(2. shorts 수정)
```sql
UPDATE shorts
SET title='수정된 제목',
  description='수정된 설명',
  is_public=FALSE,
  updated_at=CURRENT_TIMESTAMP
WHERE short_id=67890 AND user_id=12345 AND is_deleted=FALSE:
```

### DELETE
#### *논리 삭제( DB에서 행을 실제로 지우지 않고, 삭제된 것처럼 '표시만'해두는 것)
```sql
UPDATE shorts
SET is_deleted=TRUE,
  is_public=FALSE,
  updated_at=CURRENT_TIMESTAMP
WHERE short_id=67890 AND user_id=12345; 
```

#### 복구
```sql
UPDATE shorts
SET is_deleted=FALSE,
  is_public=TRUE,
  updated_at=CURRENT_TIMESTAMP
WHERE short_id=67890 AND user_id=12345;
```

#### 완전 삭제 (관리자 권한으로)
```sql
DELETE FROM shorts
WHERE short_id=67890
```
