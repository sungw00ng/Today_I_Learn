## www.naver.com 을 쳤을 때 생기는 과정,그리고 DNS까지 설명해주세요.
<img width="900" height="700" src="https://github.com/user-attachments/assets/14da882d-02bc-40b2-99b1-3dd477c041b9"/><br>
>[사진 출처](https://velog.io/@leesfact/%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%84%A4%EC%9E%84%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%96%88%EC%9D%84-%EB%95%8C-%EC%83%9D%EA%B8%B0%EB%8A%94-%EA%B3%BC%EC%A0%95-%EA%B7%B8%EB%A6%AC%EA%B3%A0-DNS-m77wrs9m)
- 리다이렉트, 캐싱, DNS, IP 라우팅 & ARP, TCP 연결 구축을 거친다.
- 이후, 요청, 응답이 일어나는 TTFB(Time to First Byte)가 시작된다.
- 다음, 컨텐츠를 다운받게 되고 브라우저렌더링 과정을 거쳐 네이버라는 화면이 나타난다.
<br>

### 리다이렉트
- 사용자가 로그인하지 않은 상태로 네이버의 마이페이지와 같은 인증이 필요한 페이지에 접근할 경우,
- 네이버는 자동으로 /login 페이지로 리다이렉트합니다.
- 반면,  
- 로그인 여부와 관계없이 접근 가능한 페이지(예: 메인 페이지 www.naver.com ) 라면
- 리다이렉트 없이 요청한 페이지가 그대로 표시됩니다.
<br>

### 캐싱
- 요청 결과를 저장해두고, 동일 요청 시 저장된 값을 재사용하는 기술.
- 캐싱 가능한지 확인하고, 이미 캐싱된 경우 캐시된 값을 반환한다.
- 캐싱되지 않은 경우 다음 단계로 요청을 넘긴다.
<br>

#### 캐시의 종류
1. 브라우저 캐시 (Private Cache) <br>
- 사용자 개인의 브라우저에 저장됨.
- 쿠키, 로컬스토리지 등 포함.
- 사용자가 사이트 재방문 시 빠르게 로딩되는 이유.
 <br>
 
2. 공유 캐시 (Shared Cache) <br>
- 클라이언트와 서버 사이에서 여러 사용자가 공유.
- 프록시 서버(Nginx 등)를 통해 구현 가능.
- Node.js 서버 앞단에 리버스 프록시로 두어 캐싱 서버로 활용 가능.

### DNS
- 브라우저가 요청한 FQDN(Fully Qualified Domain Name)인
- www.naver.com 등의 이름을 DNS로 실제 IP 주소 확인.
>*FQDN: Host+Domain = www+naver.com

#### DNS 구조
- 계층적인 도메인 구조와 분산된 데이터베이스를 이용한 시스템으로,
- FQDN을 인터넷 프로토콜인 IP로 바꿔주는 시스템이다.
- *리졸버와 *네임서버 등으로 이루어져 있다. <br>
>*리졸버: DNS관련 요청을 네임서버로 전달하고 해당 응답값을 클라이언트에게 전달. <br>
>*네임서버: 도메인을 IP로 변환. <br>

<img width="600" height="700" src="https://github.com/user-attachments/assets/34739367-4488-42ab-91d2-5f002321ad9d" /><br>
>[사진 출처](https://www.computerhope.com/jargon/d/domaname.htm) <br>
- 예를 들어, www.naver.com 에 DNS 쿼리가 오면,
- [Root Dns] [.com DNS] [.naver DNS] [.www DNS] 역순 과정을 거쳐,
- 완벽한 주소를 찾아 IP 주소를 매핑한다.

#### DNS 캐싱
- 만약 미리 해당 도메인이름을 요청했다면 로컬 PC에 자동으로 저장된다.
- 브라우저캐싱과 OS캐싱으로 구분할 수 있다.

### IP 라우팅 & ARP
- 해당 IP를 기반으로 IP 라우팅이 일어나고 ARP 과정을 거쳐 실제 서버를 찾는다.

### TCP 연결 구축
- TCP 3 way handshake 및 SSL 연결 등을 통해 브라우저가 연결을 설정한다.
- 요청을 보낸 후 네이버로부터 응답을 받는다. <br>
>*TCP는 HTTP/2까지, HTTP/3는 QUIC를 통해 연결하고 데이터를 주고 받음. <br>

### 콘텐츠 다운로드
- 사용자가 요청한 컨텐츠를 네이버로부터 다운받는다.

### 브라우저렌더링
- 받은 데이터를 바탕으로 브라우저 엔진이 브라우저렌더링 과정을 거쳐 화면을 만든다.

