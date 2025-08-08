### 도커 MYSQL 컨테이너 실행
`docker exec -it (컨테이너 이름) mysql -u root -p`

### test_erd CREATE 테이블 3개 만들기
```sql
-- 사용자 테이블
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

-- 게시글 테이블
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 댓글 테이블
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    comment TEXT,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 테이블 생성 확인하기
<img width="270" height="133" alt="스크린샷 2025-08-08 오후 2 55 18" src="https://github.com/user-attachments/assets/200413f1-6155-47d1-86e4-e9f7ee6bf9c2" /><br>

### MYSQL Workbench
- 설치 후, Workbench 열고 Docker MySQL Connect
- 이후, 상단 DATABASE - Reverse Enginner
- test_erd 스키마를 선택하고 continue
<img width="998" height="703" alt="스크린샷 2025-08-08 오후 2 59 01" src="https://github.com/user-attachments/assets/71726b26-c92e-4114-8ef9-a65369f218a8" />



