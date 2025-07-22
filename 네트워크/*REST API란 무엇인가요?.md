## RESTAPI 주요 특징 5가지
### 1. Uniform-Interface
- API에서 자원들은 각각의 독립적인 인터페이스를 가진다. (서로 종속X) <br>
- 웹 페이지를 변경했다고 해서 웹 브라우저를 업데이트하는 일은 없어야함을 의미한다. <br>

#### 1.1 url 자원 식별
- 자원은 url로 식별되어야 한다. <br>

#### 1.2 표현을 통한 자원조작
- HTTP 표준 메서드인 GET, DELETE 등을 통해 <br>
자원을 조회, 삭제 등 작업을 설명할 수 있는 정보가 담겨야 한다. <br>

#### 1.3 Self-descriptive messages
- HTTP Header에 타입을 명시하고 각 메시지(자원)들은 MIME types에 <br>
맞춰 표현되어야한다. <br>
- 'font/ttf', 'text/plain', 'text/csv' 처럼 `/` 구분자가 있다. <br>

```Java
 // 메시지 형식을 명확히 표현
conn.setRequestMethod("POST");
conn.setRequestProperty("Content-Type", "application/json");
```
#### 1-4 HATEOAS 구조
- 하이퍼링크에 따라 다른 페이지를 보여주어야 하며, 어떤 URL에서 원했는지 명시한다.<br>
- href, links, link, url 속성 중 하나를 보통 예시로 사용한다. <br>

#### HATEOAS 예시
```Java
@RestController
@RequestMapping("/books")
public class BookController {

    private List<Book> books = List.of(
        new Book(1, "Clean Code"),
        new Book(2, "Effective Java")
    );

    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<Book>> getBook(@PathVariable int id) {
        Optional<Book> bookOpt = books.stream()
                                      .filter(book -> book.getId() == id)
                                      .findFirst();

        if (bookOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Book book = bookOpt.get();

        // self-descriptive message with hypermedia (HATEOAS)
        EntityModel<Book> resource = EntityModel.of(book);
        resource.add(Link.of("/books/" + book.getId()).withSelfRel());

        return ResponseEntity.ok(resource);
    }
}
```

#### Book 클래스
```Java
public class Book {
    private int id;
    private String title;

    // 생성자, getter, setter 생략 가능 (Lombok 써도 됨)

    public Book(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
}

```

#### 출력값
```text
{
  "id": 1,
  "title": "Clean Code",
  "_links": {
    "self": {
      "href": "/books/1"
    }
  }
}
```
<br><br>

### 2. Stateless
- 편의점에서 매번 새로 계산할 때마다… <br>
- 점원이 "저번에 뭐 샀는지" 기억 하지 않는다. <br>
- 손님이 직접 말해야 한다: <br>
- "쿠폰 있어요!", "멤버십 할인 가능!" <br>
- 서버(점원)는 손님(클라이언트)의 상태를 기억하지 않는다. <br>
- 클라이언트는 요청할 때마다 자기 정보를 함께 보내야 한다. <br>
- 책임은 클라이언트에게 있다. <br>

<br><br>
### 3. Cacheable

- 🍜 편의점 컵라면 가격 물어볼 때: <br>
- 손님: "컵라면 얼마예요?" <br>
- 점원: "1,000원입니다." <br>
- 그리고 다음 날 또 물어보고, <br>
- 똑같은 대답이 나오면 이 정보는<br>
- 캐시 가능한 정보니까, 그냥 전에 들은 가격을 기억해서 <br>
- 다시 안 물어봐도 된다. → 성능도 좋고, 시간도 절약 <br>

<br><br>

### 4. Client-Server 구조
- 클라이언트와 서버가 서로 독립적인 구조를 가져야 한다. <br>
- 서버는 "데이터만 주면 끝", 클라이언트는 "그걸 예쁘게 보여주면 끝" <br>

<br><br>

### 5. Layered System
<img width="600" src="https://github.com/user-attachments/assets/231b55c4-6e03-4176-8ef4-fee3d9a99423" /><br>
>https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf
- 시스템이 계층으로 나뉘어 있고, 각 계층은 바로 옆 계층하고만 통신할 수 있어야 한다. <br>
- 그러면 시스템 전체가 더 단순해지고, 구성 요소도 서로 독립적으로 유지할 수 있다. <br>
> 1. 클라이언트가 서버에 직접 접근하는 게 아니라, <br>
> 2. 중간 계층(예: 프록시, 캐시, 로드밸런서)를 거쳐서 요청한다. <br>
> 3. 클라이언트는 그게 진짜 서버인지, 캐시 서버인지 모른다. <br>
> 4. 마찬가지로, 서버도 요청이 진짜 클라이언트인지, 중간 서버인지 모른다. <br>
  
#### 이렇게 계층을 나누면,
- 🔸 보안 정책 적용,
- 🔸 레거시 시스템 감싸기,
- 🔸 로드 밸런싱 등 다양한 기능을 중간에 쉽게 넣을 수 있다.

<br><br>

## REST API의 URI 규칙
RESTful API를 설계할 때는 다음과 같은 6가지 규칙을 따라야 한다.
```JAVA
1
동작은 반드시 HTTP 메소드(GET, POST, PUT, DELETE 등)로 표현해야 하며,
URL에 동작을 나타내는 단어를 넣지 말아야 한다. (예: /books/delete/1 X)

2
.jpg, .png 등 확장자는 표시 하지 말아야 한다.
3

URL에는 동사 대신 명사를 사용해야 한다.
예를 들어, 유저가 소유한 아파트를 조회할 경우 /getAllUsers 대신
/users/{userid}/aparts처럼 명사형으로 표현해야한다.

4
URL은 /집/아파트/전세처럼 계층 구조를 반영해야 합니다.

5
소문자로 구성하고, 길어서 바를 써야 할 경우,
언더바(_)가 아닌 하이픈(-)을 쓴다.

6
클라이언트 요청에 대한 응답은 HTTP 상태 코드를 적절히 활용해
성공 시 200, 생성 시 201, 잘못된 요청 시 400, 리다이렉트는 301 등
상황에 맞는 코드를 반환한다.
```

<br><br>

## 쿼리스트링과 함께 쓰는 경우
- 검색, 페이지네이션, 정렬 등 매개변수가 많거나 복잡할 때,
- 쿼리스트링을 쓰는 것이 좋다.


#### 검색
`/api/v1/workouts?equipment=barbell`

#### 페이지네이션 (게시판의 2번째 결과물)
`/wp/v2/posts?page=2`

#### 내림차순
`/api/v1/workouts?sort=-createdAt`

#### KAKAO API
`/oauth/token?grant_type=refresh_token&client_id=${REST_API_KEY}`

