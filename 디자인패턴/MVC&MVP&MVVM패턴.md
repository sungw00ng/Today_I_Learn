## MVC패턴
[MVC패턴 자세히 보기](https://github.com/sungw00ng/springboot3_CRUD/blob/main/%EB%B7%B0%ED%85%9C%ED%94%8C%EB%A6%BF%EA%B3%BCMVC%ED%8C%A8%ED%84%B4.md)<br> 
### MVC 장점
- 애플리케이션의 구성 요소를 세 가지 역할로 구분하여 <br>
개발 프로세스에서 각각의 구성 요소에만 집중해서 개발 할 수 있다.
- 재사용성과 확장성이 용이하다.

### MVC 단점
- 복잡해질수록 모델과 뷰의 관계가 복잡해진다.

## MVP
<img src="https://github.com/user-attachments/assets/28146719-4e27-4a84-b7a4-4e9f54fb3d3b" width="500" /> <br>
- C가 P(Presenter)로 교체된 패턴이다. <br>
- V와 P는 1:1 관계이므로 MVC보다 더 강한 결합을 지닌 디자인 패턴이다.

### MVP 장점
- View와 Model 사이의 의존성을 제거하여 결합도를 낮출 수 있다.
- 코드 재사용성과 확장성이 증가한다.

## MVP 단점
- 복잡해질수록 View와 Presenter 사이의 의존성이 증가한다.
## MVVM
<img width="500" alt="Image" src="https://github.com/user-attachments/assets/3b319dab-5fb1-4646-94f4-344740bef19a" /> <br>
- MVC의 C가 VM(View Model)로 바뀐 패턴이다. <br>
- VM은 뷰를 추상화한 계층이며 VM : V = 1 : N이라는 관계를 갖는다. <br>
- 대표적으로 Vue.js 등이 있다.

### MVVM 장점
- View와 Model의 독립성을 유지하므로 효율적인 유닛 테스트 가능
- View와 View Model을 바인딩하므로 코드 비용이 줄어든다.

## MVVM 단점
- 데이터 바인딩이 필수적으로 요구된다.
- 복잡해질수록 Controller처럼 ViewlModel이 빠르게 비대해진다.
