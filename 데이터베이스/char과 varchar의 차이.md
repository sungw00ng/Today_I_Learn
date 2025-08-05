### char
- 0~255의 길이를 지녔으며, 레코드에 저장할 때는 값을 '고정'한다.

<br>

### varchar 
- 0~65,535의 길이를 지녔으며, [문자길이+길이기록용 1바이트]해서 용량을 '가변적'으로 저장한다.
- 최대 길이가 255를 초과하는 경우, 데이터의 길이는 2바이트를 사용하여 저장한다.

<br>


### varchar를 최대길이로 설정할 때 주의할 점
- MySQL의 행의 최대 크기는 65,535 바이트이다.
- MySQL가 사용하는 문자 인코딩 방식은 5.5.3부터 UTF8을 지원하는 utf8mb4이다.
- 4바이트가 필요한 이모지와 3바이트가 필요한 한글을 모두 커버하는 인코딩 방식이다.
- 괄호 안에 들어가는 숫자는 바이트가 아니라 길이제한이다.

<br>

### [개인 실습] 개발자와 스킬 테이블 설계하기

#### skills table
```sql
create table skills (
  name  varchar(50) not null,
  category char(10) not null,
  code int unsigened not null primary key
) engine=InnoDB default charset=utf8mb4;
```

#### developers table
```sql
create table developers (
  id  char(4)  not null primary key,
  first_name  varchar(30)  not null,
  last_name  varchar(30)  not null,
  email  varchar(100)  not null unique,
  skill_code  int unsigned  not null
) engine=InnoDB default charset=utf8mb4;
```
