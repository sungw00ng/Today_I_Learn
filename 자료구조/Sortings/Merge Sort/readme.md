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

## Merge Sort
```python
#합병 정렬(Merge) => 재귀함수
#합치기 정렬(왼쪽,오른쪽 배열)
def mergeLR(L,R): 
    re=[]
    i,j=0,0
    
    while i<len(L) and j<len(R):
        if L[i] < R[j]:
            re.append(L[i])
            i+=1
        else:
            re.append(R[j])
            j+=1
            
    if i==len(L):
        while j < len(R):
            re.append(R[j])
            j+=1
    elif j==len(R):
        while i<len(L):
            re.append(L[i])
            i+=1
    
    return re
    
def mergeSort(arr):
    if len(arr) <= 1:
        return x
    
    # 나누기
    div=len(arr)//2
    left=mergeSort(arr[:div])
    right=mergeSort(arr[div:])
    
    # 합치기
    arr = mergeLR(left,right)
    return arr
```
