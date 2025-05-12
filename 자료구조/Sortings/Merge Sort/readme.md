# Merge Sort
<img src="https://github.com/user-attachments/assets/0ad0ef70-0e2c-44be-a414-117ecbb68631" width="500" height="500"/> <br>

>삽입정렬 문제 모음집(Baekjoon S3~G5) <br>
[S3_24060](https://www.acmicpc.net/problem/24060) [S4_24061](https://www.acmicpc.net/problem/24061) [G5_24062](https://www.acmicpc.net/problem/24062)
<br><br>
>Solved <br> 

## 파이썬 병합 정렬의 시간 복잡도 및 안정성
병합 정렬(Merge Sort)은 배열을 반으로 분할하고, <br>
각 부분을 재귀적으로 정렬한 뒤, <br>
**두 정렬된 부분을 Merge**하여 <br>
전체 배열을 정렬하는 분할 정복(Divide and Conquer) 방식이다. <br> 
<br>
병합 정렬은 일반적인 파이썬 구현에서 <br>
안정적인(stable) 정렬 알고리즘이다. <br><br>
값이 같은 요소들의 순서가 유지됩니다. <br>
병합 과정에서 왼쪽 배열의 요소를 먼저 선택하는 방식이므로, <br>
같은 값을 가진 경우에도 입력 순서가 보존된다. <br>

## 합병 정렬의 시간 복잡도
| 경우          | 시간 복잡도     | 공간 복잡도 | 안정성   |
| ----------- | ---------- | ------ | ----- |
| 최선 (정렬된 경우) | O(n log n) | O(n)   | 안정적 |
| 평균 (무작위)    | O(n log n) | O(n)   | 안정적 |
| 최악 (역순)     | O(n log n) | O(n)   | 안정적 |


## 합병 정렬의 비교 요소
| 비교 요소    | 슬라이싱 방식(현재 코드)                         | 인덱스 기반 (문제 요구 방식)       |
| -------- | -------------------------------------- | ----------------------- |
| 메모리 사용   | 슬라이스마다 새 리스트 생성                        | 동일 배열 사용                |
| 성능       | 상대적으로 느림 (`O(N log N)`이지만, 슬라이스 비용 있음) | 빠름                      |
| 저장 위치    | 새로운 배열                                 | 원본 배열 A를 직접 수정          |
| 저장 횟수 추적 | 추적 불명확                                 | 추적 가능 <br>(`arr[L+idx] = temp[idx]`) |


## Merge Sort (슬라이싱 방식)
```python 
N,K=map(int,input().split())
arr=list(map(int,input().split()))
cnt=0
def mergeLR(L,R):
    global cnt
    ar=[]
    i,j=0,0
    while i < len(L) and j < len(R):
        if L[i]<R[j]:
            ar.append(L[i]) 
            cnt+=1
            if(cnt==K):
                print(L[i])
                exit()
            i+=1
        else:
            ar.append(R[j])
            cnt+=1
            if(cnt==K):
                print(R[j])
                exit()
            j+=1
    
    while i < len(L):
        ar.append(L[i])
        cnt+=1
        if cnt==K:
            print(L[i])
            exit()
        i+=1
    
    while j < len(R):
        ar.append(R[j])
        cnt+=1
        if cnt==K:
            print(R[j])
            exit()
        j+=1
        
    return ar
    
def mergeSort(arr):
    if len(arr)==1:
        return arr
        
    #나누기    
    div=len(arr)//2
    left=mergeSort(arr[:div])
    right=mergeSort(arr[div:])
    
    #합치기
    arr=mergeLR(left,right)
    return arr

mergeSort(arr)

if cnt < K:
    print(-1)
```

## Merge Sort (인덱스 기반)
```python
import sys
sys.setrecursionlimit(10**6) 
input=sys.stdin.readline
N,K=map(int,input().split())
arr=list(map(int,input().split()))

#index-based 
tmp=[0]*N
cnt=0
result=-1

def Merge_Sort(L,R):
    global cnt,result
    if L<R:
        M=(L+R)//2
        Merge_Sort(L,M)
        Merge_Sort(M+1,R)
        merge(L,M,R)

def merge(L,M,R):
    global cnt,result
    temp=[]
    i=L
    j=M+1
    
    while i<=M and j<=R:
        if arr[i] <= arr[j]:
            temp.append(arr[i])
            i+=1
        else:
            temp.append(arr[j])
            j+=1
    
    while i<=M:
        temp.append(arr[i])
        i+=1
    
    while j<=R:
        temp.append(arr[j])
        j+=1
    
    for idx in range(len(temp)):
        arr[L+idx]=temp[idx]
        cnt+=1
        if cnt==K:
            result=temp[idx]

Merge_Sort(0,N-1)
print(result)
```
