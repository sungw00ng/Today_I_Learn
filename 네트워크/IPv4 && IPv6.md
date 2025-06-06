## IPv4
- 8비트 단위로 점을 찍어  4개로 구분하며 보통 8비트를 10진수로 표현해서 말한다.
- 주소 체계 추가 확보를 위해 NAT, 서브네팅 여러개의 부수적인 기술을 포함하는 경우가 있다.

## IPv6
- Ipv4에서 쓰였던 NAT, 서브네팅이 필요하지 않다.
- 16비트씩 8개로 구분하고 16비트는 16진수로 변환되어 :(Column)으로 구분한다.
- 앞의 64비트는 네트워크 주소를, 뒤 64비트는 인터페이스 주소(호스트 주소)로 이루어져 있다.
- 데이터통신 암호화를 위한 IPSec가 내장되어있다.

## IPv4와 Ipv6 헤더
<img src="https://github.com/user-attachments/assets/dff3a9ae-79fa-4480-8216-876516355378" width="600"/><br>
> https://www.networkacademy.io/ccna/ipv6/ipv4-vs-ipv6 <br>

- IPv6은 IPv4 헤더의 불필요한 필드를 제거하여 보다 빠른 처리가 가능하다.

## 체크섬 유무
[Checksum 보충 설명](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/TCP%26IP__%EC%BA%A1%EC%8A%90%ED%99%94%2C%EB%B9%84%EC%BA%A1%EC%8A%90%ED%99%94%2CPDU%2COSI7%2C%EC%B2%B4%ED%81%AC%EC%84%AC%2CCRC.md)<br>
- Ipv4에는 체크섬이 있지만, Ipv6에는 체크섬이 없다.
- IPv4는 Header Checksum Field로, 헤더의 비트가 손상되었는지 여부를
1의 보수합 방식으로 검증하여 손상된 패킷을 확인하고 폐기한다.
- Ipv6가 Header Checksum Field를 가지지 않는 이유는,
이미 상위 프로토콜인 TCP와 UDP의 헤더에서 체크섬을 통해 패킷의 무결성을 보장하고 있기 때문이다. <br><br>
<img src="https://github.com/user-attachments/assets/130f5b8f-8d26-4594-9c30-68023a8e820f" width="600"/><br>
> https://www.networkacademy.io/ccna/ipv6/ipv4-vs-ipv6 <br>
- TCP Header, UDP Header 모두 Checksum Field가 들어가 있는 것을 확인할 수 있다.
- IPv4 + UDP를 할 경우, UDP의 체크섬값을 0으로 만들 수 있다.

## RFC 6935
- IPv6 + UDP에서 체크섬값이 0x0000(0)이면 잘못된 패킷으로 간주해서 수신 노드를 폐기한다.<br>
- 예외적으로 VXLAN, GENEVE, LISP 같은 캡슐화 터널의 외부-UDP 헤더에 한해서 <br>
'0 체크섬'을 허용할 수 있지만 일반 애플리케이션 트래픽에는 적용되지 않는다. <br>

## IPv4의 TTL
- TTL(Time To Live)필드는 네트워크에서 무한순환하지 않도록 하는 변수이다 <br>
- 패킷이 네트워크에서 라우터를 거칠 때마다 TTL 값이 1씩 감소하며, 0이 되면 패킷이 폐기된다. <br>

## 헤더의 길이
- IPv4는 헤더가 가변길이라 "헤더길이 필드"가 필요하지만, <br>
IPv6은 고정길이(40byte)로 설계되어 있어 "헤더길이 필드"가 존재하지 않는다. <br>
