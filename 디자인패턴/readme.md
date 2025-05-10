# 디자인 패턴
소프트웨어 설계 과정에서 반복적으로 마주치는 문제들을 효율적으로 해결하기 위함. <br>


1. 생성(Creational) 패턴 <br>
객체 생성 방식에 대한 패턴


| 패턴                  | 설명                        |
| ------------------- | ------------------------- |
| 🧱 [Singleton](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4/%EC%8B%B1%EA%B8%80%ED%86%A4%ED%8C%A8%ED%84%B4.md)        | 단 하나의 인스턴스만 생성            |
| 🏭 [Factory Method](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4/%ED%8C%A9%ED%86%A0%EB%A6%AC%ED%8C%A8%ED%84%B4.md)   | 객체 생성을 서브클래스에게 위임         |
| 🏗 Builder          | 복잡한 객체의 생성 과정을 분리         |
| 🌱 Prototype        | 객체를 복사(clone)하여 생성        |
| 🎛 Abstract Factory | 관련 객체들을 묶어서 생성 (팩토리의 팩토리) |


2. 구조(Structural) 패턴<br>
클래스나 객체를 조합해 더 큰 구조를 설계하는 방식

| 패턴           | 설명                       |
| ------------ | ------------------------ |
| 🔌 Adapter   | 인터페이스 호환이 안 되는 클래스들을 연결  |
| 🌉 Bridge    | 구현과 추상을 분리하여 독립적으로 확장 가능 |
| 🌳 Composite | 트리 구조로 복합 객체를 표현         |
| 🎨 Decorator | 기존 객체에 기능을 동적으로 추가       |
| 🏠 Facade    | 복잡한 시스템을 단순 인터페이스로 감싸기   |
| 🧬 Flyweight | 공유를 통해 객체 생성을 줄여 메모리 절약  |
| 🔗 [Proxy](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4/%ED%94%84%EB%A1%9D%EC%8B%9C%ED%8C%A8%ED%84%B4.md)     | 객체에 대한 접근을 제어하는 대리 객체 제공 |

3. 행동(Behavioral) 패턴<br>
객체 간의 책임 분배와 상호작용 방식

| 패턴                         | 설명                            |
| -------------------------- | ----------------------------- |
| 👀 [Observer](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4/%EC%98%B5%EC%A0%80%EB%B2%84%ED%8C%A8%ED%84%B4.md)                | 객체 상태 변화 감지 후 자동 알림 (이벤트 리스너) |
| 🧠 [Strategy](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4/%EC%A0%84%EB%9E%B5%ED%8C%A8%ED%84%B4.md)                | 알고리즘을 객체로 캡슐화, 런타임 교체 가능      |
| 🗃 Command                 | 요청을 객체로 캡슐화하여 실행 취소/저장 가능     |
| 🔄 State                   | 객체 상태에 따라 행동이 달라짐             |
| 📋 Memento                 | 객체의 이전 상태 저장 및 복원             |
| 📑 Template Method         | 알고리즘 구조 정의 후 세부 구현은 서브클래스가 담당 |
| 🧭 Chain of Responsibility | 요청을 처리할 객체를 체인으로 연결           |
| 🧩 Interpreter             | 언어 문법을 클래스로 표현하여 해석 가능        |
| 🤝 Mediator                | 객체 간의 복잡한 통신을 중앙에서 조율         |
| 🧍 Visitor                 | 구조는 그대로 두고 새로운 연산을 추가         |



