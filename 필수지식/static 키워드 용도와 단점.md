## static <br>
- 클래스의 인스턴스가 아닌, <br>
- 클래스에 속하는 변수나 메서드를 정의하는 데 사용된다. <br>
- 클래스의 모든 객체가 동일한 값을 공유하며, <br>
- 중복되는 속성이나 메서드를 효율적으로 관리할 수 있다. <br>


### 단점 <br>
- `  static  ` 키워드로 선언된 변수, 블록, 메서드 등은 <br>
선언과 동시에 미리 heap 영역이 아닌 **Method Area**에 할당된다.<br>
- 프로그램 종료 시까지 GC에 의해 메모리가 회수되지 않는다.  <br>
- 클래스가 객체로 사용되지 않으면 **메모리 낭비**를 초래할 수 있다. <br>

### Java
``` java
public class Person {
    static String nationality = "Korea"; // 모든 사람이 공유하는 국적
    String name;

    public Person(String name) {
        this.name = name;
    }

    public void printInfo() {
        System.out.println(name + " - " + nationality);
    }

    public static void main(String[] args) {
        // Person 객체 생성
        Person p1 = new Person("철수");
        Person p2 = new Person("영희");

        // 각 객체의 정보 출력
        p1.printInfo(); // 철수 - Korea
        p2.printInfo(); // 영희 - Korea

        // nationality 값을 변경
        Person.nationality = "USA"; // 국적을 전체 변경

        // 변경된 정보 출력
        p1.printInfo(); // 철수 - USA
        p2.printInfo(); // 영희 - USA
    }
}
```
