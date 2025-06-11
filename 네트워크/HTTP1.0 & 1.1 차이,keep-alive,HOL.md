## HTTP 1.0 vs HTTP 1.1
<img src="https://github.com/user-attachments/assets/6b0d3e0c-0e8b-4ae3-9dd0-d914a06a6ffd" width="600"/><br>

## HTTP/1.0
- 수명이 짧은 연결이다.
- HTTP요청은 자체 요청에서 완료가 된다.
- 각 HTTP 요청당 TCP 핸드셰이크가 발생되며
한 연결당 하나의 요청을 처리하도록 설계되었다.
- 한번 연결할 때마다 TCP연결을 계속해야하니 RTT가 늘어나는 문제점이 있었다. 

## RTT(Round Trip Time)
- 신호를 전송하고 해당 신호의 수신확인에 걸린 시간을 더한 값이자 <br>
어떤 메시지가 두 장치 사이를 왕복하는 데 걸린 시간이다. <br>

## HTTP/1.1
- HTTP/1.0의 단점을 보완한 프로토콜이다.

### keep-alive default
- 매번 데이터를 요청할 때마다 TCP연결을 하는게 아닌 계속해서  <br>
데이터를 받을 수 있게 만들었다. <br>
- 이는 keep-alive옵션을 기본옵션으로 하면서 가능해졌다.<br>

## 실습
```python
# app.py
from flask import Flask, jsonify

# Flask 애플리케이션 인스턴스를 생성합니다.
# __name__은 현재 모듈의 이름을 의미하며, Flask가 리소스를 찾는 데 사용한다.
app = Flask(__name__)

# '/' 경로에 대한 GET 요청을 처리하는 라우트를 정의한다.
# @app.route('/') 데코레이터는 이 함수가 특정 URL 경로에 대한 요청을 처리함을 나타낸다.
@app.route('/', methods=['GET'])
def home():
    """
    루트 경로 ('/')에 대한 GET 요청을 처리한다.
    "a": 1 이라는 JSON 응답을 반환한다.
    jsonify 함수는 Python 딕셔너리를 JSON 응답으로 변환한다.
    """
    return jsonify({"a": 1})

# 애플리케이션을 실행한다.
if __name__ == '__main__':
    # Node.js의 server.keepAliveTimeout=30*1000 설정에 대한 참고:
    # Flask의 기본 개발 서버(Werkzeug)는 Node.js Express처럼 keep-alive timeout을 직접적으로
    # 설정하는 옵션을 제공하지 않는다. 이 설정은 주로 프로덕션 환경에서 사용되는
    # WSGI 서버 (예: Gunicorn, uWSGI)에서 관리된다.
    # 만약 이 서버를 프로덕션에 배포할 경우, 사용하는 WSGI 서버의 설정을 통해
    # keep-alive timeout을 구성해야 한다.
    # 예: Gunicorn 사용 시 `--keep-alive 30` 옵션
    app.run(debug=True, host='0.0.0.0', port=12010)
```
<img width="600" alt="a1" src="https://github.com/user-attachments/assets/cc5411d6-c7de-4edd-b852-b70e9ec987d1" /><br>
<img width="600" alt="pidInfo" src="https://github.com/user-attachments/assets/385c33a2-dd4a-49b0-b9c9-3acba6d94f91" /><br>
<img width="600" alt="responseHeader" src="https://github.com/user-attachments/assets/e0faf532-e44c-46c8-800f-998be87196ab"/><br>

## 호스트 헤더 (HTTP/1.1 개선점)
- HTTP/1.0: 호스트 정보를 헤더에 포함하지 않음 → 하나의 IP에 하나의 호스트만 가능 <br>
- HTTP/1.1: Host 헤더 필수 → 하나의 서버(IP)에서 여러 도메인 운영 가능 <br>

## 대역폭 최적화 (Range 요청 지원) <br>
- HTTP/1.0: 파일 일부만 받은 경우, 재다운로드 불가 <br>
- HTTP/1.1: Range 헤더(Range: bytes=5000-)로 중단된 위치부터 다운로드 재개 가능 <br>

## 요청을 줄이기 위한 기술
- HTTP/1.1로 발전했음에도 불구하고 서버 요청 시 RTT는 계속 증가하므로, <br>
요청을 줄이기 위한 여러 기술들이 있었다. <br>
(이미지 스프라이트,  코드압축, Base64) <br>

### 이미지 스프라이트
- 수많은 이미지를 하나의 이미지로 만들어 하나의 이미지만 받아놓고 <br>
이를 통해 수많은 이미지를 다운받는 듯한 효과를 내는 것이다. <br>

### 이미지 Base64 인코딩
- 이미지 서버에 대한 HTTP 요청을 할 필요가 없이 만드는 것이다. <br>
https://www.base64-image.de/ <br>

## HTTP/1.1의 HOL 문제(Head Of Line Blocking)
- HOL란 같은 큐에 있는 패킷이 그 첫번째 패킷에 의해 <br>
지연될 때 발생하는 성능저하현상이다. <br>
- 이외에도 무거운 헤더를 가지고 있다는 단점이 있다. <br>




