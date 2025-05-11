# Container & Docker

---

## Container

- 애플리케이션이 하나의 컴퓨터 환경에서 다른 환경으로 빠르고 안정적으로 실행되도록  
  코드와 모든 종속성을 하나로 패키징한 소프트웨어의 표준 단위  
- 호스트 운영체제를 공유하므로 빠르고 경량화되어 있음  
- 뛰어난 격리성을 제공  
- 단점: OS에 문제가 생기면 다른 컨테이너에도 영향을 줄 수 있음  

<img src="https://github.com/user-attachments/assets/b0421d67-8502-4f9a-8495-2371008dea66" width="600" />

---

## Docker

- 컨테이너의 생성, 배포, 실행, 관리를 위한 플랫폼  
- 애플리케이션 실행에 필요한 환경설정을 Dockerfile에 작성하고  
  이를 빌드하여 Docker Image를 생성  
- 생성된 이미지를 실행하면 Docker Container가 만들어짐  

---

## 주요 구성 요소

### Dockerfile  
- 애플리케이션 실행을 위한 설정 정보 (패키지 설치, 환경변수 등)를 기록한 텍스트 파일  

### Docker Image  
- 컨테이너 실행에 필요한 파일, 설정값, 데이터 등을 포함한 불변 상태의 이미지  
- 하나의 이미지로 여러 개의 컨테이너를 생성 가능  
- 이미지 자체는 컨테이너 상태와 무관하게 유지됨  

### Docker Container  
- Docker Image를 실행하여 실제 컴퓨팅 자원과 연결된 실행 단위  
- 애플리케이션이 실제로 동작하는 환경  

---

## 예시: Jenkins에서 Docker로 컨테이너 실행

<img src="https://github.com/user-attachments/assets/79a87e0d-e649-467b-9f48-06f7e926d268" width="600" />

1. Dockerfile 작성 (환경 설정)  
2. Docker Image 생성 (빌드)  
3. Docker Container 실행 (이미지를 기반으로 실행)

---

# 대표 사례: Netflix의 Docker 기반 서비스 운영
<image src="https://github.com/user-attachments/assets/1d805733-2d4a-49cf-8f40-df702cc5e0e5"  width="600"/>

## 개요
Netflix는 하루에도 수천만 명이 접속하는 세계 최대의 스트리밍 플랫폼이다.  
이처럼 수많은 사용자에게 안정적으로 서비스를 제공하려면,  
시스템 구성 요소를 독립적이고 유연하게 관리할 수 있어야 한다.

## Docker를 사용하는 이유
Netflix는 수백 개의 마이크로서비스를 Docker 컨테이너로 구동하여 다음과 같은 장점을 얻는다:

- **서비스 간 완전한 격리**: 한 기능의 문제로 전체 서비스가 중단되지 않음  
- **빠른 배포 및 롤백**: 문제가 생기면 바로 이전 버전으로 되돌릴 수 있음  
- **개발-운영 환경 통일**: 개발자가 로컬에서 테스트한 Docker 이미지를 그대로 운영 서버에 올림  
- **자원 효율성**: 물리 서버 하나에 여러 컨테이너를 올려 자원을 효율적으로 사용  

## 예시 구성
Netflix의 마이크로서비스는 다음과 같이 컨테이너로 구성된다:

- `recommendation-service`: 사용자 취향 기반 추천 기능  
- `streaming-service`: 동영상 스트리밍 처리  
- `user-service`: 사용자 정보 및 로그인 관리  

이 모든 서비스는 각각의 Docker 컨테이너로 독립적으로 실행된다.

## 왜 중요한가?
Netflix처럼 사용자 수가 많고 기능이 복잡한 서비스일수록  
Docker를 활용한 컨테이너 기반 구조는 **서비스의 안정성과 확장성**을 확보하는 핵심 기술이다.


