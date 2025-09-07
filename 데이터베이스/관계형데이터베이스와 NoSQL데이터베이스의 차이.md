## 기능과 특징
| 항목     | 관계형 DB (Oracle, MySQL, PostgreSQL) | NoSQL DB (MongoDB, Redis, Neo4j) |
| ------ | ---------------------------------- | -------------------------------- |
| 데이터 모델 | 테이블 기반 (행과 열)                      | 문서, 키-값, 그래프 등 다양                |
| 확장성    | 수직 확장 (하드웨어 성능 향상)                 | 수평 확장 (서버 추가로 처리량 증가)            |
| 일관성    | 강한 일관성 (ACID 보장)                   | 최종 일관성 (Eventual Consistency)    |
| 사용 사례  | 금융, ERP, CRM 등                     | 소셜 네트워크, IoT, 추천 시스템 등           |

## 스키마
| 항목     | 관계형 DB (Oracle, MySQL, PostgreSQL) | NoSQL DB (MongoDB, Redis, Neo4j) |
| ------ | ---------------------------------- | -------------------------------- |
| 스키마 구조 | 고정 스키마 (스키마 정의 필요)                 | 유연한 스키마 (스키마리스 또는 동적)            |
| 데이터 모델 | 정규화된 테이블 구조                        | JSON/BSON 문서, 키-값 쌍, 그래프 등       |
| 변경 용이성 | 스키마 변경 시 데이터 마이그레이션 필요             | 스키마 변경이 자유로움                     |

## 쿼리 언어
| 항목     | 관계형 DB (Oracle, MySQL, PostgreSQL)    | NoSQL DB (MongoDB, Redis, Neo4j)                                                                                            |
| ------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 표준 언어  | SQL (Structured Query Language)       | 각 DBMS 전용 쿼리 언어                                                                                                             |
| 예시 쿼리  | `SELECT * FROM users WHERE age > 30;` | MongoDB: `db.users.find({age: {$gt: 30}});`<br>Redis: `GET user:1001`<br>Neo4j: `MATCH (u:User) WHERE u.age > 30 RETURN u;` |
| 복잡한 연산 | 조인, 집계 함수 등 지원                        | 제한적 지원 (특히 조인 연산)                                                                                                           |

## 트랜잭션
| 항목      | 관계형 DB (Oracle, MySQL, PostgreSQL)                                    | NoSQL DB (MongoDB, Redis, Neo4j)                              |
| ------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| 트랜잭션 지원 | ACID 트랜잭션 보장                                                          | 일부 DBMS에서 지원 (MongoDB 4.0 이상, Redis는 제한적)                     |
| 예시      | `BEGIN;`<br>`UPDATE users SET age = 31 WHERE id = 1001;`<br>`COMMIT;` | MongoDB: `session.startTransaction();`<br>Redis: 트랜잭션 지원이 제한적 |
| 사용 사례   | 은행 거래, 재고 관리 등                                                        | 세션 관리, 캐시, 그래프 탐색 등                                           |

## 격리성
| 항목    | 관계형 DB (Oracle, MySQL, PostgreSQL)                                             | NoSQL DB (MongoDB, Redis, Neo4j)                                                                  |
| ----- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| 격리 수준 | 다양한 격리 수준 지원 (Read Uncommitted, Read Committed, Repeatable Read, Serializable) | 제한적 지원 (일부 DBMS에서만 지원)                                                                            |
| 예시    | `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`                                | MongoDB: `session.startTransaction({readConcern: {level: "snapshot"}});`<br>Redis: 트랜잭션 격리 수준이 낮음 |
| 사용 사례 | 금융 거래, 예약 시스템 등                                                                | 실시간 데이터 처리, 캐시 등                                                                                  |
