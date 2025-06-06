# Quick Sort
<img src="https://github.com/user-attachments/assets/1c00177c-316c-49f3-b4fe-9ed051e048a4" width="750" height="250"/> <br>

>퀵정렬 문제 모음집(Baekjoon S5~S1) <br>
[S5_24090](https://www.acmicpc.net/problem/24090) [S5_24091](https://www.acmicpc.net/problem/24091) [S1_24092](https://www.acmicpc.net/problem/24092)
<br><br>
>Solved <br> 
[S5_24090](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/S5_24090.md)<br>

## 파이썬 퀵 정렬의 시간 복잡도 및 안정성
**Quick Sort**은 배열에서 하나의 요소를 **pivot**으로 삼아, <br>
작은 값은 왼쪽, 큰 값은 오른쪽에 배치하며, <br>
그 이후 재귀적으로 각 부분 배열을 정렬하는 분할 정복(Divide and Conquer) 알고리즘이다. <br><br>
일반적인 파이썬 구현에서 퀵 정렬은 불안정한(unstable) 정렬이다.<br>
즉, 동일한 값을 가진 요소들의 상대적인 순서가 바뀔 수 있다. <br>

## 퀵 정렬의 시간 복잡도
| 경우          | 시간 복잡도     | 공간 복잡도   | 안정성 |
| ----------- | ---------- | -------- | --- |
| 최선 (균등 분할)  | O(n log n) | O(log n) | 불안정 |
| 평균 (무작위)    | O(n log n) | O(log n) | 불안정 |
| 최악 (정렬된 경우) | O(n²)      | O(log n) | 불안정 |

- 최악의 경우는 항상 한 쪽만 분할되는 경우 (예: 오름차순 배열에서 항상 마지막 요소를 pivot으로 선택한 경우)
- 공간 복잡도는 재귀 호출의 깊이에 해당하며, in-place 정렬이므로 추가 배열은 사용하지 않음

## 핵심 요약
- pivot: 기준 값으로, 일반적으로 배열의 첫, 마지막, 중간, 랜덤 등에서 선택
- 분할 과정 (Partition): pivot보다 작은 값은 왼쪽, 큰 값은 오른쪽에 위치하도록 정렬
- 재귀 호출: 분할된 좌우 배열을 재귀적으로 정렬

## 시나리오
- 상황: 웹 서버에서 하루 수천만 건의 로그 데이터를 수집. 로그를 시간순으로 정렬하여 이상 탐지나 사용자 흐름 분석을 진행해야 할 때
- 요구사항: 메모리를 아껴야 하고, 시간 효율도 중요하다.
- 적용 이유: 퀵 정렬은 in-place 정렬이 가능하여 메모리 사용이 적고, 대부분의 실전 상황에서 매우 빠르게 작동한다.

## PyPy3
```Python
import sys
sys.setrecursionlimit(int(1e4)) 
input=sys.stdin.readline
n,k=map(int,input().split())
arr=list(map(int,input().split()))
cnt=0

def Part(arr,start,end):
    global cnt
    pivot=arr[end]
    i=start-1
    for j in range(start,end): 
        if arr[j]<=pivot: 
            i+=1
            arr[i],arr[j]=arr[j],arr[i]
            cnt+=1
            if cnt==k:
                print(arr[i],arr[j])
    if i+1!=end:
        arr[i+1],arr[end]=arr[end],arr[i+1]
        cnt+=1
        if cnt==k:
            print(arr[i+1],arr[end])
    return i+1

def QuickSort(arr,start,end):
    if start>=end:
        return
    q=Part(arr,start,end)
    QuickSort(arr,start,q-1)
    QuickSort(arr,q+1,end)

QuickSort(arr,0,n-1)
if cnt<k:
    print(-1)
```



