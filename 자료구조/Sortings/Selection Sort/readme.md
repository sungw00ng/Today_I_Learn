>삽입정렬 문제 모음집(Baekjoon B1~G3) <br>
[B1_23881](https://www.acmicpc.net/problem/23881) [B1_23882](https://www.acmicpc.net/problem/23882) [G4_23883](https://www.acmicpc.net/problem/23883) [G4_23884](https://www.acmicpc.net/problem/23884) [B1_23899](https://www.acmicpc.net/problem/23899) [G3_23900](https://www.acmicpc.net/problem/23900)<br><br>
>Solved <br> 
[B1_238811](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/B1_23881.md) <br>


## 파이썬 선택 정렬의 시간 복잡도 및 안정성
선택 정렬(Selection Sort)은 배열에서 가장 작은(또는 큰) 요소를 찾아 <br>
순서대로 배열의 앞부분으로 옮기는 방식으로 정렬을 수행합니다. <br>
**선택 정렬은 일반적인 파이썬 구현에서 불안정한(unstable) 정렬 알고리즘입니다.** <br><br>
→ 값이 같은 요소들의 순서가 유지되지 않을 수 있기 때문입니다. <br>
→ 자리를 바꿀 때, 가장 작은 값을 찾아 통째로 현재 위치와 교환하기 때문에, <br>
같은 값을 가진 요소들의 상대적인 순서가 변경될 수 있습니다.

## 선택 정렬의 시간 복잡도
| 경우          | 시간 복잡도 | 안정성       |
| ----------- | ------ | --------- |
| 최선 (정렬된 경우) | O(n²)  | 불안정할 수 있음 |
| 평균 (무작위)    | O(n²)  | 불안정할 수 있음 |
| 최악 (역순)     | O(n²)  | 불안정할 수 있음 |

## Selection Sort(내림차순 같은 오름차순)
```python
import sys
input=sys.stdin.readline
N,K=map(int, input().split())
arr=list(map(int,input().split()))
def Selection_Sort(arr):
    cnt=0
    for idx in range(N-1,0,-1):
        max_idx=0
        for i in range(1,idx+1):
            if arr[i]>arr[max_idx]:
                max_idx=i
        if max_idx!=idx:
            arr[max_idx],arr[idx]=arr[idx],arr[max_idx]
            cnt+=1
            if cnt==K:
                return print(f"{arr[max_idx]} {arr[idx]}")
                break

    if cnt<K:
        return print(-1)
        
Selection_Sort(arr)
```
