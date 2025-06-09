## IP 주소의 부족 문제 해결
- IP주소의 부족을 공인과 사설로 나누고 중간에 NAT 기술로 해결한다. <br>
- NAT을 통해 내부 네트워크 IP가 노출되지 않는다는 점 등이 장점이다.
<img src="https://github.com/user-attachments/assets/85ac8cad-43e2-4fec-9644-d7f92e85abb1" width="600"/><br>
>https://aws-hyoh.tistory.com/145 
- NAT(Network Address Translation)은 패킷이 <br>
트래픽 라우팅 장치를 통해 전송되는 동안 <br>
패킷의 IP 주소를 변경하고, IP 주소를 다른 IP 주소로 매핑하는 방법이다. <br>

## 공유기와 NAT
<img src="https://github.com/user-attachments/assets/fecf1b40-fe2f-421f-9ba2-974e21e47b2c" width="600"/><br>
> https://techblog-history-younghunjo1.tistory.com/567

<img src="https://github.com/user-attachments/assets/7fd3017a-fadb-4c83-af61-d4cf0a6412bb" width="600"/><br>
> https://techblog-history-younghunjo1.tistory.com/567

- 실생활에서 인터넷 회선 하나를 개통하고 <br>
공유기를 사용하여 wifi를 만들곤 하는데 이 때 여러 대의 호스트가 <br>
하나의 공인 IP 주소를 사용하여 인터넷에 접속하게 된다. <br>
공유기의 상세 설명을 보면 'NAT 기능을 제공한다'라고 나와있다.<br>

