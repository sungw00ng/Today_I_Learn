## 개념
1. 어떤 종류의 상태, 환경을 캡슐화한 것.
2. 작업이 중단되고 나중에 같은 지점에서 계속될 수 있도록 <br> 저장하는 최소 데이터 집합. <br>(Context Switching)

## 구분
Context는 사실, Contextual Information, Context로 나눠진다. <br>
1. 병원에서 ` 이름 `과 ` 주민등록번호 앞자리 `를 말할 때, <br>
   "병원에 방문" 하는 Context에서 <br>
   이름은 Contextual Information. <br><br>

2. HTTP 요청을 하는 Context에서 <br> HTTP Header는 Contextual Information. <br>

# 예시
<img src="https://github.com/user-attachments/assets/0c99536f-4a99-4698-8f84-edf14cdf68e8" width="400"/><br>
- 대표적인 예시로, React.js에서는 <br>
전역적으로 `상태 값을 넘길 수 있는 Context API`  가 있다. <br>
Context API를 사용하면 컴포넌트 트리 전체에서<br>
전역적으로 상태(state)나 데이터를 공유할 수 있다. <br>
이는 Props Drilling(컴포넌트를 여러 단계 거쳐 데이터를 넘기는 것)을 <br>
피할 수 있게 해준다. <br>

