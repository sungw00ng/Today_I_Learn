### XSS 개념
<img width="600" src="https://github.com/user-attachments/assets/4d5b976c-1a89-430c-b387-33e574b5fb4f" /><br>
<img width="600" src="https://github.com/user-attachments/assets/e4da84d3-293e-43d3-8882-bfd23836be2b" /><br>
[사진출처](https://www.fis.kr/ko/major_biz/cyber_safety_oper/attack_info/security_news?articleSeq=3408)<br>
- XSS는 공격자가 악의적인 스크립트를 웹사이트에 삽입하여,
- 해당 사이트를 방문한 다른 사용자의 브라우저에서 스크립트가 실행되도록 하는 공격이다.

### XSS 공격 흐름
- 1. 공격자가 게시판, 댓글 등의 입력 필드에 악성 스크립트를 삽입
- 2. 웹 애플리케이션이 이를 검증 없이 저장 또는 출력
- 3. 다른 사용자가 해당 페이지에 접속하면 스크립트가 실행된다. <br>
>쿠키/세션 탈취 <br>
>피싱 사이트로 이동 <br>
>악성파일 다운로드  <br>

<br><br>

### XSS 방어 기술
#### 1. 입력값 검증 (Input Validation)
- 사용자가 입력한 데이터에 스크립트로 해석될 수 있는 특수 문자(<, >, ", ' 등)가 포함되어 있는지 확인한다.
- 허용된 형식과 길이의 데이터만 받아들인다. 
- 화이트리스트(허용 목록) 기반 검증이 효과적이다.

<br>

#### 2. 출력값 처리 (Escaping)
- 사용자에게 글을 표시하기 전에, HTML 특수 문자를 특정 형식으로 변환한다.
- 브라우저가 스크립트로 해석하지 않고 일반 텍스트로 인식하도록 한다 ( < 를 &lt;, > 를 &gt; 로 변환 )

<br>

#### 3. 콘텐츠 보안 정책 (CSP - Content Security Policy)
- 리소스(스크립트, 스타일시트 등)의 출처를 명시적으로 제어하는 HTTP 헤더이다. 
- 신뢰할 수 없는 출처의 스크립트 실행을 차단한다.

<br>

#### 4. HttpOnly 쿠키 사용
- 쿠키에 HttpOnly 속성을 설정하면 JavaScript를 통해 
- 쿠키 값에 접근하는 것을 막아, XSS 공격으로 인한 쿠키 탈취를 방지할 수 있다.
