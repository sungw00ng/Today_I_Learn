## 1XX(정보)
##### 서버가 요청을 잘 받았고 해당 프로세스를 계속 이어가며 처리함을 의미한다. <br>
- 100: 계속함을 의미한다.

<br>

## 2xx(성공)
##### 서버가 요청을 잘 받았고 클라이언트에게 성공적으로 데이터를 보냈음을 의미한다. <br>
- 200 OK : 요청이 성공적이다.
- 201 Created : 요청이 성공적이며, 그 결과로 새로운 리소스가 생성되었다.

<br>

## 3xx(리다이렉션)
##### 서버가 클라이언트의 요청에 대해 완료를 위해 추가 작업 조치가 필요함을 의미한다. <br>
- 301 Moved Peermanently : 요청한 리소스의 URL가 변경되었다. <br>
변경된 새로운 URL을 301 상태코드와 함께 주어야 한다.<br>

<br>

## 4xx(클라이언트 오류)
##### 클라이언트가 요청한 페이지를 제공할 수 없거나  <br>
##### 클라이언트의 요청이 잘못되어 결과적으로 요청을 처리할 수 없음을 의미한다.<br> 
- 400 Bad Request : 서버가 클라이언트 요청을 이해할 수 없다.<br> 
- 401 Unauthorized : 클라이언트의 인증이 되지 않는다. <br>
- 404 Not Found : 요청받은 컨텐츠를 찾을 수 없다. <br>

<br>

## 5xx(서버 오류)
##### 서버가 클라이언트의 요청을 처리하지 못하는 상태임을 의미한다. <br>
- 500 Internal Server Error : 서버에 오류가 있다. <br>
- 502 Bad Gateway : 게이트 웨이 또는 프록시서버가 오류가 생겼다. <br>
- 504 Gateway Timeout : 게이트웨이 또는 프록시서버가 정해진 <br>
Timeout 시간동안 클라이언트의 요청을 처리하지 못했다. <br>

<br>

## 실습
```node.js
const express = require('express');
const app = express();
const port = 3000;

// 1XX - 정보 (클라이언트가 보통 무시, 여기선 테스트용으로 메시지만 보냄)
app.get('/1xx', (req, res) => {
  res.status(100).send('100 Continue - 정보 응답입니다. (실제로는 클라이언트가 처리하지 않을 수 있음)');
});

// 2XX - 성공
app.get('/2xx', (req, res) => {
  res.status(200).send('200 OK - 요청이 성공적으로 처리되었습니다.');
});

// 3XX - 리다이렉션
app.get('/3xx', (req, res) => {
  res.redirect(301, 'https://www.example.com'); // 301 영구 이동
});

// 4XX - 클라이언트 오류
app.get('/4xx', (req, res) => {
  res.status(404).send('404 Not Found - 요청한 자원을 찾을 수 없습니다.');
});

// 5XX - 서버 오류
app.get('/5xx', (req, res) => {
  res.status(500).send('500 Internal Server Error - 서버 오류입니다.');
});

app.listen(port, () => {
  console.log(`📡 서버 실행 중: http://localhost:${port}`);
});
```

