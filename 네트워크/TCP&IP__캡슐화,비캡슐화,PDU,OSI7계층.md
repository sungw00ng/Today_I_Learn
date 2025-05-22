# TCP IP 4계층
### Application Layer
- 네트워크와 통신할 수 있도록 도와주는 프로토콜이 모여있는 기능적인 계층 <br>
- 사용자가 이메일을 작성하고 전송 버튼을 누른다. <br>
이 때, 데이터는 텍스트 또는 파일이다. <br>
- HTTP, SMTP, SSH, FTP, SSH <br>
- PDU: 메시지 <br>
- - OSI 7 : Application, Presentation, Session <br>

### Transport Layer
- 세그먼트(TCP) 또는 데이터그램(UDP)으로 데이터를 쪼개고 <br>
데이터가 오류없이 순서대로 전달되도록 도움을 주는 층 <br>
- 응용 계층에서 받은 데이터를 세그먼트로 만들고 ,TCP헤더로 붙인다. <br>
이 헤더에는 포트 번호, 순서 번호 등의 정보가 담긴다. <br>
- TCP, UDP <br> 
- PDU: 세그먼트(TCP, 연결형 데이터조각), 데이터그램(UDP, 비연결형 데이터조각) <br>
- - OSI 7 : 같음. <br>

### Internet Layer
- 한 노드에서 다른 노드로 전송 계층에서 받은 <br>
세그먼트 또는 데이터그램을 패킷화하여 목적지로 전송하는 역할 <br>
- TCP 세그먼트를 받아 IP 주소가 담긴 IP 헤더를 붙여 패킷을 만든다. <br>
- IP, ICMP, ARP <br>
- PDU: 패킷 <br>
- - OSI 7 : 같음. <br>

### Network Access Layer ( or Link Layer)
- 전선, 광섬유, 무선 등으로 데이터가 네트워크를 통해 <br>
물리적으로 전송되는 방식 (데이터링크계층과 물리계층을 합친 계층) <br>
- 데이터링크 계층(Ethernet)에서는 IP 패킷에 MAC 주소 등의 정보가 담긴 <br>
- 프레임 헤더와 트레일러(FCS)를 붙여 프레임을 만든다. <br>
-물리 계층에서는 프레임을 0과 1의 전기 신호나 광 신호로 변환하여 전송한다. <br>
- 데이터링크 계층 PDU: 프레임(링크 계층, FCS트레일러가 붙음.) <br>
- 물리 계층 PDU: 비트(링크 계층, 전기 신호 또는 광신호) <br>
- - OSI 7 : Data-Link, Physical <br>

# 캡슐화와 비캡슐화
### 캡슐화(capsulation)
- 송신자가 수신자에게 데이터를 보낼 때 상위 계층의 데이터를 <br>
하위 계층이 감싸면서 헤더(및 트레일러)를 붙이는 과정. <br>
- 상위 계층 데이터는 하위 계층으로 내려갈수록 점점 더 많은 껍데기(헤더)를 두른다. <br>
- 캡슐화 및 계층화 설계 덕분에, TCP는 신뢰성만 신경쓰면 되고 <br>
IP는 라우팅만 신경 쓰면 된다. 따라서, 모듈화된 네트워크 설계가 가능해진다. <br>

### 비캡슐화(decapsulation)
- 수신자 측에서 이렇게 캡슐화된 데이터를 역순으로 제거하면서 응용계층까지 도달한다. <br>

### PDU (Protocol Data Unit)
- 각 계층의 데이터 단위이다. <br>
- 위에서 함께 명시함. <br>

# 체크섬 
[checksum 코드 이동](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/checksum.py)
- "받은 데이터가 손상됐는지 아닌지" 판별하는 값 <br>
- IPv4 헤더: 1의 보수합 <br>
- TCP/UDP 헤더: 1의 보수합 <br>
- Ethernet 프레임(FCS): CRC-32 <br>

## 1의 보수합
- 모든 데이터를 16비트 단위로 더한 후, 그 합의 1의 보수를 취해 <br>
체크섬으로 사용한다는 것이다. <br>
- 데이터 + 체크섬의 합이 0xFFFF가 되는지 검사하여, <br>
데이터가 손상되었는지를 판별하는 알고리즘이다.  

### 1의보수
이진수의 모든 비트를 반전시킨 값 <br>

### 순환캐리
- 1의 보수합을 계산할 때 단순히 16비트 이상으로 넘치는 값을 <br>
잘라내는 것이 아니라 넘친 비트(carry)를 다시 아래쪽으로 더해준다. <br>
이를 순환 캐리(end-around carry)라고 한다. <br>

### CRC(Cyclic Redundancy Check, 순환 중복 검사)
[CRC 코드 이동](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/crc.py)
- 원본 데이터에 0을 (다항식 차수)만큼 덧붙이고 해당 비트를 <br>
왼쪽부터 차례대로 XOR 기반 이진 나눗셈을 수행한다. <br>
그리고 남은 나머지를 CRC 체크섬으로 만들고 이를 원래 <br>
데잍 뒤에 붙여서 수신측으로 전달한다. <br>
이후 수신 측이 데이터를 동일한 방식으로 나누고 나머지가 0이면 <br>
오류없음, 0이 아니면 오류발생으로 판단한다. <br>
