### text
- 최대 65,535 길이의 텍스트 데이터를 저장할 수 있다. <br>

<br>

### text와 varchar의 차이
#### varchar
- 행 내부(메모리)에 데이터를 직접 저장한다. <br>
- varchar(100)을 선언하면 해당 칼럼을 위한 공간 400바이트가 필요하다. <br>
- 65535까지 max size limit를 걸 수 있다. <br>
- 인덱스를 걸 수 있다. <br>

<br>

#### text
- 행 외부(디스크)에 저장되며, 행 내부에는 포인터가 저장된다. <br>
- 해당 필드타입을 text라고 설정하면 포인트 공간 8바이트만 사용한다. <br>
- max size limit를 걸 수 없다. 무조건 최대 65535 길이의 데이터를 저장한다. <br>
- 인덱스를 걸 때 크기제한을 걸지 않으면 에러가 발생한다. <br>
>column ' 이름 ' used in key specification without a key lingth <br>

<br>

### 정리
- varchar: 중간 정도의 문자열, 메모리에서 읽으므로 읽기 성능이 text보다 좋다. <br>
- text: 매우 큰 문자열, 디스크에서 읽기 때문에 읽기 성능이 좋지 않으므로
검색과 수정이 빈번하지 않은 데이터를 저장할 때 사용한다. <br>

<br>

### BLOB(이진데이터)
- Binary Object를 저장할 때 사용하는 데이터 타입이다.
- 주로 이미지, 비디오 등을 저장한다.
```sql
insert into 'sungw00ng'
  ('img')
values
  (load_file('~~~~.png'))
```

<br>

### index를 응용한 article 테이블(chatgpt)
```sql
create table article (
  article_id  int not null auto_increment,
  title  varchar(200)  not null,
  body  text  not null,
  author_email  varchar(100) not null,
  status  char(1) not null default -- 'P'('P':Published, 'D':Draft),
  created_at  datetime default  current_timestamp,
  primary  key (article_id)
);
```

<br>

### index 문제 만들기(chatgpt)
- 생성한 article 테이블에는 게시글 본문, 작성자 이메일, 게시 상태 등을 담고 있다. <br>
>1. **body 컬럼**은 TEXT 타입이며, 검색 성능 향상을 위해 앞의 30자만 인덱싱하려한다. <br>
>2. **author_email 컬럼**은 작성자 이메일로 빠르게 검색할 수 있도록 인덱스를 걸고자한다. <br>
>3. **status 컬럼**은 'P', 'D' 등의 상태값으로 게시글을 자주 필터링하기 때문에 인덱스가 필요하다. <br>

- 위 조건을 만족하는 CREATE INDEX 문을 작성하세요. <br>

<br>

### index code
```sql
create index idx_body_prefix on article (body(30));
create index idx_author_email on article (author_email);
create index idx_status on article (status)
```

