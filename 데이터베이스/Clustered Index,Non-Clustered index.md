## Clustered Index
- 유일성과 최소성을 가진 기본키 중 하나로 설정한다.
- 테이블당 한개, 보통 테이블의 기본키가 클러스터형 인덱스가 된다.
- 데이터베이스가 정렬되서 저장되며 Index Page의  Leaf Node에 `데이터페이지`가 있다.
- 정렬되었으므로 탐색에 빠르지만, 데이터가 추가될때마다 재정렬해야하므로 삽입,삭제,수정에는 느리다.
- 테이블 레코드와 인덱스의 순서가 같게 조정된다.

## Non-clustered Index
- 보조 인덱스라고도 한다. 1개가 아닌 여러 개를 만들 수 있다.
- 클러스터형키가 복합키가 될 가능성도 있지만, 대부분 보통 복합키는 보조인덱스로 만든다.
- Index Page의 Leaf Node에 실제 데이터가 아닌, 데이터 페이지에 관한 포인터가 있다.
- 정렬되어있지 않아 탐색은 느리나, 삽입, 삭제, 수정 등이 빠르다.
- 인덱스의 순서와 데이터의 순서가 일치하지 않는다.

<br><br>

## 차이 비교
```sql
-- 두 개의 테이블을 생성하는 단일 SQL 블록
-- 클러스터형 인덱스 테이블 (PRIMARY KEY를 통해 자동 생성)
CREATE TABLE users_clustered (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50),
    user_city VARCHAR(50)
);

-- 비클러스터형 인덱스 테이블 (PRIMARY KEY 없음)
CREATE TABLE users_non_clustered (
    user_id INT,
    user_name VARCHAR(50),
    user_city VARCHAR(50)
);

-- 데이터 삽입
INSERT INTO users_clustered (user_id, user_name, user_city) VALUES
(103, 'Charlie', 'Busan'),
(101, 'Alice', 'Seoul'),
(102, 'Bob', 'Daejeon');

INSERT INTO users_non_clustered (user_id, user_name, user_city) VALUES
(103, 'Charlie', 'Busan'),
(101, 'Alice', 'Seoul'),
(102, 'Bob', 'Daejeon');

-- 비클러스터형 인덱스 생성
CREATE INDEX idx_user_city ON users_non_clustered (user_city);

-- 결과 확인
-- 1. 클러스터형 인덱스 테이블은 user_id에 따라 정렬되어 있음 (물리적 정렬)
--    실제 데이터는 user_id 순서인 101, 102, 103으로 저장됨
--    이 쿼리를 실행하면 데이터가 정렬된 순서대로 반환됩니다.
SELECT * FROM users_clustered ORDER BY user_id ASC;

-- 2. 비클러스터형 인덱스 테이블은 데이터가 정렬되지 않음
--    이 쿼리는 삽입된 순서대로 데이터를 반환합니다.
SELECT * FROM users_non_clustered;

-- 3. 비클러스터형 인덱스를 사용한 검색 (빠른 검색)
--    'Seoul'을 찾는 쿼리는 idx_user_city 인덱스를 사용합니다.
--    EXPLAIN으로 인덱스 사용 여부 확인 가능
EXPLAIN SELECT * FROM users_non_clustered WHERE user_city = 'Seoul';
```
