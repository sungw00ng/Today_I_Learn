## MTU(Maximum Transmission Unit)
- 데이터를 송수신하는 상황에서 패킷이 쪼개질 때 MTU를 기반으로 쪼개진다.
- MTU는 네트워크 통신할 때 할 수 있는 가장 큰 PDU의 크기를 말한다.
- 터널의 높이 제한이 그 예시다.

## 패킷이 분할되지 않는 경우
- MTU를 초과하면 전달을 아예 하지 않을 수도 있다.
- 예를 들어, IPv6은 분할을 허용하지 않는다.
- IPv4의 헤더에는 floags라는 필드가 있는데 여기서 bit가 1이 되면 <br>
Don't Fragment 플래그가 활성화된다 라는 의미로, 이 때 분할은 불가능하다. <br>


## MTU와 MSS의 차이
<img src="https://github.com/user-attachments/assets/b9760544-9091-4112-b784-20817a24e86c" width="500" height="200" /><br>
- MTU는 IP헤더와 TCP헤더의 크기까지 합친다.
- MSS(Maximum Segment Size)는 데이터의 크기(payload의 크기)만을 가리킨다. <br>


## ping 
MTU 확인은 `netsh interface ipv4 show interfaces` 에서 하고,<br>
핑 테스트는 `ping www,google.com -f -l [입력(보통1500정도)]` .
MTU보다 낮게 보내면 Don't Fragment로 손실률 100% <br>


## PMTUD(Path MTU Discovery)
- 수신자와 송신자의 경로 상에서 장치가 패킷을 누락한 경우,
테스트 패킷의 크기를 낮추면서 MTU에 맞게끔 반복해서 보내는 과정이다. <br>
