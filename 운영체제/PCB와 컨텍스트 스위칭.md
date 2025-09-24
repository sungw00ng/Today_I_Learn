# PCB와 컨텍스트 스위칭
- PCB(Process Control Block)는 프로세스 메타 데이터를 저장한 데이터 블록이다.
- 커널 스택에 저장되며 각 프로세스 생성 시 PCB가 생성된다.
- 프로세스가 종료되면 PCB는 제거된다.

## PCB의 구조
![a1](https://github.com/user-attachments/assets/fb0ce309-ed80-40a2-a229-ce49920b7c0d)<br>

[이미지 출처](https://junhyunny.github.io/information/operating-system/process-control-block-and-context-switching/) <br>
- 프로세스 상태: 대기중, 실행 중 프로세스의 상태
- 프로세스 번호(PID): 각 프로세스 고유 식별 번호
- 프로그램 카운터(PC): 다음 명령의 주소에 대한  포인터
- 레지스터: 레지스터 관련 정보
- 메모리 제한: 프로세스의 메모리 관련 정보
- 열린 파일 정보: 프로세스를 위해 열린 파일 목록들

<br>

## 컨텍스트 스위칭
<img width="800" height="600" src="https://github.com/user-attachments/assets/39b995f6-7355-478f-9c6b-8ccbc9fe82c2" /><br>
[이미지 출처](https://kyu9341.github.io/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C/2020/10/04/OS_Process_Context_Switching/) <br>
- PCB를 기반으로 프로세스의 상태를 저장하고 다시 복원시키는 과정이다.
- 프로세스가 종료되거나 인터럽트에 의해 발생한다.

<br>


## 컨텍스트 스위칭의 비용
- 유효시간의 발생: 프로세스 당 유효시간이 발생한다.<br>
- 캐시미스: 프로세스가 가지고 있는 메모리 주소가 그대로 있으면 <br> 
잘못된 주소 변환이 생기므로 캐시클리어 과정으로 인한 캐시미스가 발생한다. <br>
- 오버헤드: 오버헤드가 자주 발생하면 시스템 성능이 저하될 수 있으며, <br>
CPU의 유효 가동 시간에 영향을 미칠 수 있다. <br>

<br>

## 스레드에서의 컨텍스트 스위칭
- 스레드는 스택 영역을 제외한 모든 메모리를 공유하기 때문에 <br>
비용이 더 적고 시간도 더 적게 걸린다는 장점이 있다. <br> 
  
