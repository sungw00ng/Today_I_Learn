# TLS 1.3 핵심 요약
## 1. 과거 RSA 키 교환 방식 (TLS 1.2 이하)
### 흐름
1. 서버 → 클라이언트: 공개키 전달
2. 클라이언트: 세션키 생성 → 서버 공개키로 암호화 후 전송
3. 서버: 개인키로 복호화 → 세션키 획득
4. 이후 세션키로 대칭키 통신
### 문제점
- 암호화된 세션키가 도청당하면, 훗날 서버 개인키 유출 시 과거 통신 복호화 가능
- Perfect Forward Secrecy 미지원

<br><br>

## ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)
<br><img src="https://github.com/user-attachments/assets/24229a92-dd72-4a0c-89da-845b04ce925d" width="600"/><br>
>https://www.oreilly.com/library/view/ssl-complete-guide/9781839211508/video5_19.html
- 서버와 클라이언트는 서로 비밀값을 만들고, 공개키만 교환
- 둘은 상대 공개키 + 자기 비밀키로 같은 공통 세션키 계산
- 세션키는 직접 주고받지 않음 → 도청당해도 안전
- Perfect Forward Secrecy 보장

<br>[DH 부분 다루기](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/TLS%20%ED%95%B8%EB%93%9C%EC%85%B0%EC%9D%B4%ED%81%AC1.md)<br>

### ECDHE의 세션키 파생
- ECDHE로 공유 비밀 → HKDF(해시 기반 키 도출 함수)로 세션키 생성

<br><br>

## 인증서와 전자서명 (서버 신뢰 확인)
<br><img src="https://github.com/user-attachments/assets/ea4b7783-40c7-40aa-89fc-bc5ebe66dd78" width="600"/><br>
>https://developer.okta.com/books/api-security/tls/certificate-verification/
### 서버
- 클라이언트에 디지털 인증서 전송(도메인, 서버 공개키, 서명(CA가 발급))
### 클라이언트
- 인증서 핵심 내용을 해싱 → 해시값 A 생성
- CA의 공개키로 인증서 서명 복호화 → 해시값 B 복원
### 클라이언트의 A와 B 비교
- 같으면: 인증서 위조 없음 → 서버 신뢰
- 다르면: 위조 가능성 있음 → 경고

<br><br>

## 0-RTT (Zero Round Trip Time Resumption)
- TLS 1.3의 빠른 재접속 기능
- 이전 세션 정보를 클라이언트가 기억하여 핸드셰이크 없이 바로 데이터 전송
- 장점: 빠름 (지연 최소화)
- 단점: 재전송 공격 (Replay Attack) 가능성 있음 → 민감 정보 전송에는 사용 자제

## 핸드셰이크 요약 (TLS 1.3 기준)
- 클라이언트: ClientHello 전송
- 지원 사이퍼슈트, 랜덤값, ECDHE 공개키 등 포함
- 서버: ServerHello + ECDHE 공개키, 인증서 전송
- 클라이언트: 인증서의 전자서명 검증
- ECDHE로 공통 비밀 생성 → HKDF로 세션키 도출
- Finished 메시지 교환 후 → 세션키로 대칭 암호화 통신 시작

## TLS 1.3 사이퍼슈트 예시
- 프로토콜(TLS)+AEAD 사이퍼모드(AES_128_GCM)+해싱 알고리즘(SHA256)으로 구성
- TLS_AES_128_GCM_SHA256: AES 128비트 대칭 암호 (GCM 모드)
- SHA256 해시 사용
- AEAD (인증된 암호화) 방식
```txt
TLS_AES_128_GCM_SHA256
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_128_CCM_SHA256
TLS_AES_128_CCM_8_SHA256
```

