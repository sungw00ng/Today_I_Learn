# IPC(Inter-Process Communication)
- 프로세스 간 통신을 의미한다.
- 프로세스끼리 데이터를 주고받고 공유 데이터를 관리하는 메커니즘
- 공유메모리, 파일, 소켓, 파이프, 메시지 큐 등이 있다. 

<br>

## 공유메모리
![a1](https://github.com/user-attachments/assets/8da63c41-69af-4ba1-b5a6-9864e73295ff)<br>
##### 출처 : https://blog.naver.com/akj61300/80126200460
##### 그림 1 : 일반적인 메모리 사용과 공유메모리 사용의 차이
- IPC 중에서 가장 빠른 통신 방법이다.
- 불필요한 오버헤드가 발생하지 않아 IPC 중에서 가장 빠른 통신 방법이다.
- 같은 메모리 영역을 여러 프로세스가 공유하므로 동기화가 필요하다.

## 파일
- 디스크에 저장된 데이터를 기반을 통신하는 것을 의미한다.
> 예제 시나리오
> WriterProcess : Input , ReaderProcess : Output

```java
//WriterProcess
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class WriterProcess {
    public static void main(String[] args) {
        String filePath = "ipc_data.txt";
        String message = "Hello from WriterProcess!";

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write(message);
            System.out.println("Writer: 메시지를 파일에 성공적으로 썼습니다.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

```java
//ReaderProcess
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReaderProcess {
    public static void main(String[] args) {
        String filePath = "ipc_data.txt";

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            System.out.println("Reader: 파일에서 읽은 메시지:");
            while ((line = reader.readLine()) != null) {
                System.out.println(">> " + line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 소켓
- 네트워크 인터페이스(TCP, UDP, HTTP)를 기반으로 통신하는 것을 의미한다.

## 파이프
### 익명 파이프
<img width="1300" height="800" src="https://github.com/user-attachments/assets/f52eaa14-5c70-4581-afa0-38e32d788b1b" /><br>
##### 출처 : https://velog.io/@yesoryeseul/CHAPTER-3.-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-3.3-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%99%80-%EC%8A%A4%EB%A0%88%EB%93%9C-3.3.5-%EB%A9%80%ED%8B%B0%ED%94%84%EB%A1%9C%EC%84%B8%EC%8B%B1
##### 그림2 : 익명 파이프

- 프로세스 사이에 FIFO 기반의 통신 채널을 만들어 통신하는 것을 의미한다.
- 부모 자식 프로세스 간 사용 가능하지만, 네트워크 상에서는 사용이 불가능하다.
- 파이프의 데이터 용량은 제한되어 있다.
- Write Process가 Read Process보다 더 빠르게 데이터를 쓸 수 없다.(W<=R)

### 명명 파이프
<img width="2450" height="900" src="https://github.com/user-attachments/assets/b3fc722f-624d-429d-aa85-104db5d4503d" /><br>
##### 출처 : https://velog.io/@yesoryeseul/CHAPTER-3.-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-3.3-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%99%80-%EC%8A%A4%EB%A0%88%EB%93%9C-3.3.5-%EB%A9%80%ED%8B%B0%ED%94%84%EB%A1%9C%EC%84%B8%EC%8B%B1
##### 그림3 : 명명 파이프

- 익명 파이프의 확장된 개념이다.
- 부모, 자식, 다른 네트워크 상에서도 통신이 가능하다.
- 보통 서버나 클라이언트용 파이프를 구분해서 동작한다.

### 메시지 큐
<img width="1300" height="600" src="https://github.com/user-attachments/assets/af39ddc3-a4cf-4893-bf45-977f7c5bea48" /><br>
##### 출처 : https://velog.io/@yesoryeseul/CHAPTER-3.-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-3.3-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%99%80-%EC%8A%A4%EB%A0%88%EB%93%9C-3.3.5-%EB%A9%80%ED%8B%B0%ED%94%84%EB%A1%9C%EC%84%B8%EC%8B%B1
##### 그림4 : 메시지 큐

- 프로세스가 메시지를 보내거나 받기 전에 큐를 초기화한다.
- sender의 메시지는 큐에 복사되어 받는 receiver에 전달된다.
- queue 형태로 버퍼를 만들어 통신하는 것이다.
  



