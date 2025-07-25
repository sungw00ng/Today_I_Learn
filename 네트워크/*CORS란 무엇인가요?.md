CORS를 알아보기 앞서서... <br>

### 오리진과 SOP
<img width="600" src="https://github.com/user-attachments/assets/03904cf4-8dbb-44ed-aa8b-caa1cebe8e05" /><br>
>[사진 출처](https://opentutorials.org/course/5060/32185)<br>
- origin(출처)이란 URL에서 프로토콜(http, https 등), 도메인, 포트번호를 모두 합쳐 노드를 식별하는 개념이다.
- SOP(Same-Origin POlicy)는 브라우저 상에서 오로지 같은 오리진끼리만 요청을 허가하는 보안 정책이다.

### 이러한 SOP가 없다면 어떻게 될까?
- 은행 계좌서버에 로그인하고 악의적인 사이트를 방문하면,
- 내가 모르는 사이에 은행 서버에 요청을 할 수 있게 되어 내 계정 정보가 변경되거나 유출된다.
- 악성스크립트가 다른 오리진의 서버에 요청을 보내고 사용자의 리소스를 임의적으로 접근한 것이다.
- 이를 1차적으로 막아주는 것이 SOP 보안 정책이다.

### 하지만, 그럼에도 오리진끼리 요청해야하는 순간이 있다?
- 예를 들면 Open API가 있다.
- SOP를 브라우저 상에서 조금 더 유연하게 바꿔서 나온 개념이 CROS이다.

### CORS(Cross Origin Resource Sharing)
- HTTP 헤더를 기반으로 브라우저가 다른 오리진에 대한 리소스 로드를 허용할지 말지에 대한 메커니즘이다.
(리소스: 이미지, CSS, JS, 비디오 등)

### preflight request와 simple request
### Simple Request (간단한 요청)
- 아래 조건을 모두 만족하면 브라우저는 요청을 그대로 전송한다:
> #### 메서드: GET, HEAD, POST
> #### 헤더: 특정 표준 헤더만 포함 
> ### (Accpet, Accpet-Language, Content-Language, 
> #### Content-Type[application/x-www-form-urlencoded,multipart/form-data,text/plain],
> #### Range

### 🔹 Preflight Request (사전 요청)
아래 조건 중 하나라도 벗어나면 브라우저는 서버에 먼저 OPTIONS 요청을 보냄.
서버는 응답에 다음과 같은 CORS 관련 헤더를 포함해야 한다:
> #### Access-Control-Allow-Origin: 허용할 오리진
> #### Access-Control-Allow-Methods: 허용할 HTTP 메서드
> #### Access-Control-Allow-Headers: 허용할 커스텀 헤더
> #### Access-Control-Max-Age: 사전 요청 캐시 시간 (선택사항)

### 오리진이 허용되지 않으면?
- 서버가 응답에 허용하지 않은 오리진을 포함하면 브라우저는 CORS 에러를 발생시킨다. 
