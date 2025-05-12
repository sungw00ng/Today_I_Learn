# Insertion Sort
<img src="https://github.com/user-attachments/assets/cf1766bf-532a-438e-abe8-384f00401027" width="500" /> <br>
>삽입정렬 문제 모음집(Baekjoon B1~P4) <br>
[B1_24051](https://www.acmicpc.net/problem/24051) [B1_24052](https://www.acmicpc.net/problem/24052) [G5_24053](https://www.acmicpc.net/problem/24053) [P4_24054](https://www.acmicpc.net/problem/24054) [P4_24055](https://www.acmicpc.net/problem/24055) [G2_24056](https://www.acmicpc.net/problem/24056)<br><br>
>Solved <br> 
[B1_24051](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/B1_24051.md) <br>
[B1_24052](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/B1_24052.md)<br>
[G5_24053](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/G5_24053.md)<br>

# 파이썬 삽입 정렬의 시간 복잡도 및 안정성
삽입 정렬(Insertion Sort) 은 배열을 왼쪽에서부터 하나씩 정렬해나가는 방식으로, <br>
**리스트의 앞부분은 항상 정렬되어 있다고 가정**하면서 진행된다.<br>
**삽입 정렬은 일반적인 파이썬 구현에서 안정적인(stable) 정렬 알고리즘이다.**<br>
→ 값이 같은 요소들의 순서가 유지되기 때문.<br>
→ 자리를 바꿀 때, 큰 값만 이동시키고 같은 값은 그대로 둔다.<br>
# 삽입 정렬의 시간 복잡도
| 경우          | 시간 복잡도 | 안정성   |
| ----------- | ------ | ----- |
| 최선 (정렬된 경우) | O(n)   | 안정적이다 |
| 평균 (무작위)    | O(n²)  | 안정적이다 |
| 최악 (역순)     | O(n²)  | 안정적이다 | 

# 요약 
삽입 정렬은 작은 데이터나 거의 정렬된 데이터에 적합.<br>
데이터가 많아질수록 비효율적이지만, <br>
구현이 간단하고 메모리를 거의 사용하지 않음. <br>
Stable 하다는 점에서 특정 비즈니스 문제에 유리함 <br>
(예: 고객 등급은 유지하되 정렬 등).<br>

# Insertion_Sort (shift기반)
```python
import sys
input=sys.stdin.readline
N,K=map(int,input().strip().split())
arr=list(map(int,input().strip().split()))
def insertion_Sort(arr):
    cnt=0
    result=-1
    for idx in range(1,len(arr)):
        to_insert=arr[idx] #value
        i=idx #idx

        #shift
        while(i>0 and arr[i-1]>to_insert):
            arr[i]=arr[i-1]
            cnt+=1
            if(cnt==K):
                result=arr[i]
                return result
            i-=1
        arr[i]=to_insert

        #insert
        if idx != i: 
            cnt += 1
            if(cnt==K):
                result=arr[i]
                return result
    return result

print(insertion_Sort(arr))
```
