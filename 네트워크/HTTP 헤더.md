#  HTTP 서버에서 헤더 처리
- HTTP 통신에서 헤더는 클라이언트와 서버 간에  <br>
메시지 본문 외의 메타데이터를 전달하는 중요한 역할을 한다. <br>

- 본 서버 코드에서는 클라이언트로부터 요청 헤더를 수신하고, <br>
클라이언트에 응답 헤더를 전송하는 과정을 볼 수 있다. <br>
```python
from http.server import BaseHTTPRequestHandler, HTTPServer

hostname = '127.0.0.1'
port = 3000

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 1. 요청 헤더 (서버가 클라이언트로부터 수신)
        # 클라이언트가 보낸 요청 헤더들을 self.headers 속성에서 확인할 수 있습니다.
        # 예를 들어, 클라이언트의 User-Agent를 출력해 볼 수 있습니다.
        print(f"클라이언트의 User-Agent: {self.headers.get('User-Agent')}")
        print(f"클라이언트가 Accept하는 타입: {self.headers.get('Accept')}")
        print("--- 수신된 요청 헤더 ---")
        for header, value in self.headers.items():
            print(f"{header}: {value}")
        print("---------------------\n")


        self.send_response(200) # 응답 상태 코드 (200 OK)

        # 2. 응답 헤더 (서버가 클라이언트에게 전송)
        # 서버가 클라이언트에게 보낼 응답 헤더를 send_header() 메서드를 통해 설정합니다.
        # 이들은 클라이언트(웹 브라우저)에게 응답 본문에 대한 정보나 추가적인 메타데이터를 제공합니다.
        self.send_header('Content-Type', 'text/plain; charset=utf-8')
        self.send_header('sungw00ng', "Hello")
        # 일반 헤더의 예시 (Connection 헤더는 기본적으로 처리될 수 있음)
        # self.send_header('Connection', 'Keep-Alive') # Keep-Alive 연결 유지 지시

        self.end_headers() # 모든 응답 헤더의 설정을 마쳤음을 알립니다.

        # 응답 본문 전송
        self.wfile.write('서버열기:)\n'.encode('utf-8'))

def run_server():
    web_server = HTTPServer((hostname, port), MyHandler)
    print(f"Server running at http://{hostname}:{port}/")
    try:
        web_server.serve_forever()
    except KeyboardInterrupt:
        pass
    web_server.server_close()
    print("서버 중지")

if __name__ == "__main__":
    run_server()
```

## 요청 헤더 (Request Headers)
- 역할: 클라이언트가 서버에게 보내는 정보이다. <br>
- "내가 누구고(브라우저 정보), 뭘 원하는지(선호하는 형식)" 알려준다. <br>
- 코드에서: self.headers를 통해 클라이언트가 보낸 헤더들을 읽을 수 있다. <br>

## 응답 헤더 (Response Headers) 
- 역할: 서버가 클라이언트에게 보내는 정보이다. <br>
- "이게 네가 요청한 데이터고, 어떤 종류의 데이터(Content-Type)" 라고 알려주는 것이다. <br>
- 코드에서: self.send_header()로 헤더를 설정하고,  <br>
- 설정이 끝나면 self.end_headers()를 호출해야한다. <br>
Content-Type 같은 기본 헤더는 물론,  <br>
sungw00ng처럼 개발자가 만든 헤더도 보낼 수 있다. <br>

## 일반 헤더 (General Headers)
- 역할: 요청이든 응답이든 모든 HTTP 메시지에 공통으로 들어갈 수 있는 정보이다. <br>
- 주로 메시지 자체나 연결에 대한 내용을 담고 있다. <br>
- 코드에서: http.server 모듈이 Date나 Connection 같은 일부 일반 헤더는 자동으로 처리해준다. <br>
필요하면 self.send_header()로 직접 추가할 수 있다. <br>
 
