## IP(Internet Protocol Address)
- 컴퓨터 네트워크에서 장치들 간의 통신을 위해 사용되는 논리적인 주소로, <br> 라우팅을 통해 패킷을 목적지까지 전달하기 위해 사용한다. <br>
`ipconfig getifaddr en0`<br>
## MAC(Media Access Control Address)
- 네트워크 인터페이스 카드 (NIC)에 할당된 고유한 식별자이며, <br> 네트워크 장비들이 로컬 네트워크 내에서 통신할 때 사용한다.
- 48비트로 이루어져있으며 24비트의 OU와 24비트의 UAA로 이루어져있다.
- OUI: IEEE에서 할당한 제조사 코드
- UAA: 제조사에서 구별되는 코드 <br>
`ìfconfig en0 | grep ether`<br>
```txt
예를 들어서, 04-42-1A-0E-17-85가 물리적 주소라면,
04-42-1A는 OUI / 0E-17-85는 UAA가 된다.
```

## ARP와 RARP (Address Resolution Protocol, Reverse ARP)
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/8bffbdb8-d043-4a86-8dc9-225ec9d00877" /><br>

## ARP 과정
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/21dece72-d6ab-47b8-8099-0b7a61fccd2a" /><br>
1. IP주소에 맞는 MAC 주소를 찾기 위해
2. 어떤 데이터를 브로드캐스팅하여,
3. 맞는 장치가 있다면 유니캐스트로 데이터 전달
