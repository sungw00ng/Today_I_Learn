## InnoDB vs MyISAM
| 구분                    | **InnoDB**                         | **MyISAM**                           |
| --------------------- | ---------------------------------- | ------------------------------------ |
| **트랜잭션 지원**           | ✅ 지원 (COMMIT, ROLLBACK, SAVEPOINT) | ❌ 지원 안 함                             |
| **잠금 방식**             | 레코드 단위(Row-level Locking) → 동시성 높음 | 테이블 단위(Table-level Locking) → 동시성 낮음 |
| **외래 키(Foreign Key)** | ✅ 지원 (참조 무결성 보장)                   | ❌ 지원 안 함                             |
| **충돌 복구**             | ✅ 자동 복구(크래시 리커버리)                  | ❌ 수동 복구 필요                           |
| **읽기/쓰기 성능**          | 쓰기와 동시성이 중요한 환경에 강함                | 읽기 위주(SELECT가 많음) 환경에 빠름             |
| **데이터 무결성**           | ✅ 트랜잭션 + FK로 무결성 강력 보장             | ❌ 애플리케이션 레벨에서 보장해야 함                 |
| **저장 형식**             | 클러스터형 인덱스(데이터 자체가 PK 인덱스 구조에 저장됨)  | 비클러스터형 인덱스(인덱스는 위치만 가리킴)             |
| **파일 구조**             | `.ibd` (또는 공용 테이블스페이스)             | `.MYD` (데이터), `.MYI` (인덱스)           |
| **디스크 사용량**           | 상대적으로 큼 (트랜잭션 로그 포함)               | 상대적으로 적음                             |
| **FULLTEXT 인덱스**      | MySQL 5.6 이상부터 지원                  | 원래부터 지원                              |

## 정리
- InnoDB : 트랜잭션, 동시성, 무결성 등이 중요한 은행,쇼핑몰,ERP 등의 서비스에 사용된다.
- MyISAM : 빠른 읽기 성능이 필요한 단순 검색인 로그, 읽기 전용 게시판 등에 사용된다. (요새는 안쓰는 추세)
- MySQL 8.x 기준 InnoDB가 기본 스토리지 엔진이며, MyISAM은 레거시 용도로만 거의 쓰이고 있다.

## 외래 키, 트랜잭션 롤백할 때 차이 비교 (예시)
### 외래키
```sql
-- InnoDB
CREATE TABLE parent (
  id INT PRIMARY KEY
) ENGINE=InnoDB;

CREATE TABLE child (
  id INT PRIMARY KEY,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES parent(id)
) ENGINE=InnoDB;

INSERT INTO child VALUES (1,999); -- ERROR: 참조 무결성 위배
```

```sql
-- MyISAM
CREATE TABLE parent (
    id INT PRIMARY KEY
) ENGINE=MyISAM;

CREATE TABLE child (
    id INT PRIMARY KEY,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES parent(id)  -- 선언해도 무시됨
) ENGINE=MyISAM;

INSERT INTO child VALUES (1, 999);  -- 따라서, 그대로 들어감
```

### 트랜잭션 롤백
```sql
-- InnoDB
START TRANSACTION;
INSERT INTO parent VALUES (100);
ROLLBACK;  

SELECT * FROM parent;  -- 결과 없음 (롤백됨)
```

```sql
-- MyISAM
START TRANSACTION;
INSERT INTO parent VALUES (200);
ROLLBACK;

SELECT * FROM parent;  -- 값이 그대로 남음 (롤백 안됨)
```
