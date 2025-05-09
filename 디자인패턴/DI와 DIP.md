# 의존성 주입(Dependency Injection)
<img src="https://github.com/user-attachments/assets/6133ba73-bdec-492d-8995-a492f6776119" width="400"/> <br>
- 필요한 것을 직접 만들지 않고, <br>
  밖에서 넣어주는 방식이다. <br>
- 객체는 자신이 쓸 걸 스스로 만들지 않고, <br>
  누군가가 대신 만들어서 넘겨준다. <br>
- 덕분에 교체하기 쉽고, <br>
  테스트도 편하다. <br>

# 시나리오
- 나는 장난감을 직접 사지 않는다.
- 장난감은 엄마가 골라서 내 손에 쥐어준다.
- 나는 그 장난감이 어디서 왔는지 몰라도 쓸 수 있다.
- 장난감을 바꾸고 싶으면 엄마가 다른 장난감을 주면 된다.
- 엄마가 바뀌는 게 아니라, 엄마가 주는 물건이 바뀐다.

# 코드 예시
```javascript
//의존성
class Toy {
    play() {
        console.log("브르릉~ 놀자!")
    }
}

//메인 모듈
class Child {
    constructor(toy) {
        this.toy = toy
    }

    playWithToy() {
        this.toy.play()
    }
}

// 엄마는 장난감을 만들어서 아이에게 준다.
const toy = new Toy()           // 장난감을 선택하고
const child = new Child(toy)    // 의존성 주입
child.playWithToy()             // 브르릉~ 놀자!
```
<br>

# 의존관계 역전 원칙(Dependency Inversion Principle, DIP) 
<img src="https://github.com/user-attachments/assets/be03c867-dcee-460b-ada2-adf0d30d49da" width="400"/>  <br>
- 상위 모듈은 하위 모듈에 의존하면 안 된다.
(둘 다 추상화에 의존해야 한다.)
- 추상화는 세부 구현에 의존하면 안 된다.
(반대로, 세부 구현은 추상화에 의존해야 한다.)

# 시나리오
- 상위 모듈(나)은 하위 모듈(장난감)에 의존하지 않는다.
- 나는 장난감의 구체적인 종류를 알지 못하고, 장난감을 다루는 규칙만 알고 있다.
- 장난감의 구체적인 종류는 하위 모듈(장난감 제조업체)에 의존한다. 
- 장난감 종류가 바뀌더라도 나는 규칙만 알고 있으니, 상위 모듈은 변경되지 않는다.

# 코드 예시
```javascript
// 추상화: 장난감의 규칙만 정의
class Toy {
    play() {
        throw new Error("play()는 구체적인 장난감에서 구현되어야 해요!")
    }
}

// 구체적인 장난감: 자동차
class CarToy extends Toy {
    play() {
        console.log("자동차 장난감을 가지고 놀아요!")
    }
}

// 구체적인 장난감: 로봇
class RobotToy extends Toy {
    play() {
        console.log("로봇 장난감을 가지고 놀아요!")
    }
}

// 장난감을 주는 사람(엄마) - 의존성 주입
class ToyProvider {
    constructor(toy) {
        this.toy = toy // 외부에서 주입된 장난감
    }

    giveToy() {
        this.toy.play() // 장난감을 가지고 노는 행동
    }
}

// 메인 코드
const carToy = new CarToy()   // 자동차 장난감 생성
const robotToy = new RobotToy() // 로봇 장난감 생성

// 장난감을 주는 사람(엄마)은 자동차와 로봇을 주입받아 장난감을 준다.
const toyProvider1 = new ToyProvider(carToy)  // 자동차 장난감을 받음
toyProvider1.giveToy()  // 자동차 장난감을 가지고 놀아요!

const toyProvider2 = new ToyProvider(robotToy)  // 로봇 장난감을 받음
toyProvider2.giveToy()  // 로봇 장난감을 가지고 놀아요!
```
