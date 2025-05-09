# Bubble_sort_Optimization
#1. 최적화 전
```python
import sys
input=sys.stdin.readline

N=int(input())
A=list(map(int,input().strip().split()))
B=list(map(int,input().strip().split()))

def Bubble_sort_Optim(A, B):
    if A==B:
        print(1)
        return

    for cycle in range(N-1):
        for i in range(N-1-cycle):
            if A[i]>A[i+1]:
                A[i],A[i+1]=A[i+1],A[i]
                flag=True
                if A==B:
                    print(1)
                    return
    print(0)

Bubble_sort_Optim(A,B)
```
#2. 최적화 후
```python
import sys
input = sys.stdin.readline

N = int(input())
A = list(map(int, input().strip().split()))
B = list(map(int, input().strip().split()))

def is_same(a, b):
    for i in range(N):
        if a[i] != b[i]:
            return False
    return True

def Bubble_sort_Optim(A, B):
    if is_same(A, B):
        print(1)
        return

    for cycle in range(N - 1):
        swap_flag = False
        for i in range(N - 1 - cycle):
            if A[i] > A[i + 1]:
                A[i], A[i + 1] = A[i + 1], A[i]
                swap_flag = True
                if A[i] == B[i] and A[i + 1] == B[i + 1]:
                    if is_same(A, B):
                        print(1)
                        return
        if not swap_flag:
            break
    print(0)

Bubble_sort_Optim(A,B)
```

# 성능 비교 분석표
| 항목                  | #1 버전                   | #2 버전                            | 승자   |
| ------------------- | ----------------------- | -------------------------------- | ---- |
| **리스트 비교 방식**       | `A == B` <br>(매번 전체 비교)     | `is_same()` <br>(직접 구현, 불일치 시 조기 종료) | ✅ #2 |
| **정렬 중 불필요한 반복 방지** | 없음                      | `swap_flag`로 조기 종료               | ✅ #2 |
| **리스트 상태 비교 시점**    | swap 직후 항상 비교           | swap된 값이 B와 일치할 때만 비교            | ✅ #2 |
| **효율성 (시간복잡도 관점)**  | `O(N³)`에 가까움 <br>(비교 자주 발생) | `O(N²)`에 가까움 <br>(조건부 비교 + 조기 탈출)    | ✅ #2 |
| **실행 속도**           | 느림                      | 빠름                               | ✅ #2 |

# 결론
#2 버전이 훨씬 효율적이다.<br>
swap이 일어날 때만 필요 조건을 만족할 경우 비교하므로 연산량을 줄일 수 있다. <br>
swap_flag로 이미 정렬된 경우 조기 종료한다. <br>
is_same()은 전체 비교를 빠르게 중단할 수 있어 A == B보다 실제 속도에서 유리하다.<br>
