## HTTP 메서드
- GET
- POST
- PUT
- HEAD
- DELETE
- PATCH
- OPTIONS
- CONNECT
- TRACE

## GET : 데이터를 읽다
<img src="https://github.com/user-attachments/assets/ca961796-3a1b-432a-930b-b967b84528c2" width="600"/><br>

- url 기반 데이터 요구 방법이다.
- url 기반이므로 길이 제한(2000자 미만)이 있다.
- 성공 시 HTTP status code 200을 반환한다.
- 캐싱이 가능하다.
- url 기반 요청으로 해당 요청의 파라미터가 브라우저 기록에 남는다.
- url 기반 요청할 때 ASCII 문자열만을 보낼 수 있다.
- 사용자 이름, 비밀번호 등 민감 정보 전달 시 사용하지 않는다.

## POST : 데이터를 생성하다
<img src="https://github.com/user-attachments/assets/46d32a85-717a-4d92-a17f-fde1be7f253d" width="600"/><br>

- HTTP message body를 통해 데이터를 전달한다.
- 길이 제한이 없다.
- 성공 시 HTTP stactus code 201을 반환한다. (생성 O 200 , 생성 X 201)
- 캐싱이 불가능하다,
- HTTP message body 기반 요청 시 모든 유형의 데이터를 요청 가능하다.
- 사용자 이름,  비밀번호 등 민감 정보 전달 시 사용한다.

## 실습
https://resttesttest.com/
<br>

<img width="600" alt="스크린샷 2025-07-08 오후 10 31 54" src="https://github.com/user-attachments/assets/b01f4fa1-f3b7-4be1-84b3-db8dee847844" /><br>
<img width="600" alt="스크린샷 2025-07-08 오후 10 32 40" src="https://github.com/user-attachments/assets/27637026-5879-4922-b5b7-612f381594c4" /><br>

- 패킷 분석을 하면 body에 있는 내용도 결국에는 탐색할 수 있지만, <br>
- 그럼에도 불구하고 POST로 회원가입이나 로그인 같은 민감한 정보를 1차적으로 보호해준다. <br>


