### HTTP 멱등성이란?
- 하나의 요청이 아닌 여러번 동일한 요청을 보냈을 때 서버가 같은 상태를 가지는 것이다. <br>
- 즉, 응답(Response)은 달라도 되고, 상태(State)만 같으면 멱등성입니다. <br>

### 멱등성을 가지는 메서드
> GET, HEAD, OPTIONS, PUT, DELETE <br>
 <br>
 
- GET: 서버에서 정보를 가져온다. <br>

- HEAD: GET 요청이 생성하는 응답 헤더를 검색한다. <br>
>curl -I https://example.com/image.png <br>

- OPTIONS: 대상 리소스의 통신 옵션을 가져올 때 사용된다. <br>
>curl -X OPTIONS http://localhost:3000/resource -i  <br>

- PUT: 리소스를 완전 다른 버전으로 대체한다. <br>

- DELETE: 리소스를 삭제한다. <br>

<br>

### 멱등성을 가지지 않는 메서드
- POST: 새로운 리소스를 생성한다 <br>

<br>

### 멱등성을 가질 수도 있고 가지지 않을수도 있는 메서드
- PATCH: 필드 특정 값 수정은 멱등성을 가지지만, <br>
필드값 증가나 요소 추가라면 멱등성을 가지지 않는다. <br>

```Javascript

PATCH /user/1 [멱등성O]
{
  "nickname": "sungw00ng"
}

PATCH /user/1 [멱등성X]
{
  "tags": ["열정"]
}

1회: ["열정"]
2회: ["열정", "열정"]
3회: ["열정", "열정", "열정"]
계속 바뀜 → 비멱등


```
