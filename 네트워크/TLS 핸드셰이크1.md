## TLS 핸드셰이크 과정
<img src="https://github.com/user-attachments/assets/c684a4e7-fe4a-4ddc-9402-d0a1e5111c2f" width="700" height="800"/><br>
>https://jjaewonn.tistory.com/90 <br>

## 1. ClientHello
- 클라이언트는 서버에게 먼저 ClientHello 메시지를 보낸다. <br>
- 다음 정보가 담겨 있다. <br>
```txt
- 클라이언트가 지원하는 TLS 버전 목록(1.2 , 1.3 , ...)
- 클라이언트가 지원하는 사이퍼슈트(Cipher Suites) 목록
- 클라이언트 랜덤값 (난수로 세션키 생성에 사용됨)
- 클라이언트 측 ECDHE 공개키
``` 

<br> 

## 2. ServerHello
- 서버는 클라이언트의 메시지를 분석한 후 다음과 같은 과정을 진행한다. <br>
```txt
1. 클라이언트와 공통으로 지원하는 TLS 버전 중 가장 높은 버전을 선택한다.
2. 클라이언트가 제안한 사이퍼슈트 중에서 서버가 지원하는 사이퍼슈트를 선택한다.
3. ServerHello 메시지를 보내면서 다음을 포함한다.
(선택된 TLS 버전, 선택된 사이퍼슈트, 서버 랜덤값, 서버 측 ECDHE 공개키)
```
<br>

## 3. 그 후 메시지들이 이어진다.
| 단계                   | 역할            | 쉬운 설명                     |
| -------------------- | ------------- | ------------------------- |
| Encrypted Extensions | 추가 정보 암호화     | "나머지 정보들도 암호화해서 줄게"       |
| Certificate          | 서버 인증서 제공     | "이거 내 신분증이야"              |
| CertificateVerify    | 서버의 진짜 소유자 증명 | "이 신분증은 내 거 맞아" (비밀키로 서명) |
| 세션키 생성               | 암호화 통신 준비 완료  | "이제 이 비밀키로 대화하자!"         |

## 4. Finished
- 클라이언트와 서버는 각각 Finished 메시지를 교환한다. <br>
이후 통신은 세션키로 암호화되며, 이후 모든 통신은 AES 같은 대칭 암호화 방식으로 보호된다. <br>

## 타원 곡선 암호화(ECDHE)
- 우선, ECDHE에서 DH는 Deffie-Hellman을 의미한다.
- DH는 서로 공개값 공유, 비밀값과 혼합, 혼합값과 공유, 각자의 비밀값과 혼합해서 공통의 암호키를
만드는 알고리즘이다. <br>
<img src="https://github.com/user-attachments/assets/77b27514-d842-4684-8feb-c52631eae602" width="400" height="300"/><br>
>https://jjaewonn.tistory.com/90 <br>

## DH 키 교환
- 서로의 비밀값은 숨긴 채, 공개된 값을 주고받아 같은 비밀 키(공유 키)를 만들어내는 암호 프로토콜이다.
- 계산은 쉽지만, 거꾸로 풀기는 어려운 이산로그문제의 원리를 이용한 알고리즘이다.

### 이산 로그 문제
A=g**a mod p일 때, A,g,p를 알아도 a를 계산하기 어려운 문제이다.

### 공개값 공유 단계 Common Paint
- p=23, g=5, a=6(클라이언트의 개인키), b=15(서버의 개인키)일 때 <br>
```txt
A = g**a mod p = 5**6 mod 23 = 8
B = g**b mod p = 5**15 mod 23 = 2
```

### 혼합값 계산 단계 
```txt
B**a mod p =2**6 mod 23 = 18
A**b mod p =8**15 mod 23 = 18
```

## 타원곡선 암호화(ECDHE, Elliptic Curve Diffie-Hellman Ephemeral)
- 이산로그문제(DLP)의 확장형인 타원곡선 이산 로그문제(ECDLP)
<img width="679" alt="ECDHE" src="https://github.com/user-attachments/assets/ff94d085-4acd-4fa5-aa8a-1601735cb2e0" />






