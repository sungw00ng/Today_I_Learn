### 네트워크 Network <br>
node와 link가 서로 연결되어 있으며 리소스를 공유하는 집합이다. <br>
- 노드: 서버, 라우터, 스위치 등 네트워크 장치
- 링크(엣지): 유선 또는 무선과 같은 연결매체(WIFI or LAN)
<br><br><br>
### 트래픽 Traffic <br>
일정 시간 동안 네트워크를 통해 전달되는 데이터의 총량이다. <br>
- 단위는 bps(bits per second) 또는 용량 기준으로 KB, MB, GB 등을 사용한다. <br>
> 트래픽이 많다 = 전송되거나 요청된 데이터의 양이 많다. <br>
> 처리량이 많다 = 시스템이 실제로 처리한 데이터의 양이 많다. <br>

따라서, 트래픽은 "요청된 데이터의 양", 처리량은 "처리된 양"<br>

Q. 100KB 이미지를 1,000명이 다운로드할 경우 트래픽은?<br>
- 100MB의 데이터가 서버에서 사용자들에게 전송됨.<br>

Q. 10MB 크기의 동영상을 10명이 시청하면?<br>
- 100MB<br>
<br><br><br>
### 처리량 Throughput <br>
실제로 네트워크를 통해 전송이 완료된 데이터의 양을 의미한다.<br>
단순히 얼마나 요청했느냐(트래픽)가 아니라, 그중에서 실제로 성공적으로 처리된 양에 해당한다.<br>
- 단위: bps<br>

여러 요소에 영향을 받는데, 다음과 같다.<br>
- 사용자 접속량이 갑자기 많아질 경우
- 장비 간의 연결 속도(대역폭)
- 네트워크 오류 발생 여부
- 서버나 장치의 성능
<br>
결론적으로, 처리량은 "시스템이 얼마나 빠르고 안정적으로 데이터를 실어나를 수 있는가"를 보여주는 지표이다.<br>
<br><br>
### 대역폭 Bandwidth)  <br>
일정 시간 안에 전송 가능한 데이터의 최대치이다.<br>
트래픽이 많아도 처리량이 충분하려면 대역폭이 넓어야한다.<br>
2차선 도로보다 8차선 도로가 훨씬 많은 차를 동시에 수용할 수 있듯,<br>
대역폭이 넓을수록 동시에 더 많은 데이터를 빠르게 보낼 수 있다.<br>
- 단위: bps<br>

Q. 100Mbps의 대역폭을 가진 서버에서, 각 사용자당 100kbps 속도로 <br>
영상을 본다면 최대 몇 명이 동시에 접속 가능한가?<br>
- 이 서버는 최대 약 1,000명의 동시 사용자가 영상을 끊김 없이 시청할 수 있는 환경이다.<br>

<br><br>
### RTT (Round Trip Time: 왕복 지연 시간)<br>
<img width="494" alt="Image" src="https://github.com/user-attachments/assets/2fd9b7b8-7b9b-4d20-a17b-eb615f0b9f58" /><br>
신호를 전송하고 해당 신호의 수신확인에 걸린 시간을 더한 값이자<br>
어떤 메시지가 두 장치 사이를 왕복하는데 걸린 시간이다.<br>
<br><br><br>
예를 들어, ping google.com 을 터미널 창에서 실행하면,<br><br>
<img width="494" alt="Image" src="https://github.com/user-attachments/assets/72e2ef4c-7b9c-40c9-a3f1-8fd5e7affc77" /><br>
약 30~60ms 정도의 RTT인 점을 확인할 수 있다.<br>





