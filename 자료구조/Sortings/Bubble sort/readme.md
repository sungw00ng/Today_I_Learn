# Bubble sort
<img src="https://github.com/user-attachments/assets/cc3f15b9-625e-4ae7-9aab-80746d8158ac" width="600" height="200"/> <br>
>버블정렬 문제 모음집(Baekjoon B1~D2) <br>
[이동](https://www.acmicpc.net/workbook/view/19101)<br>

>Solved <br>
[B1_23968 : 알고리즘 수업 - 버블 정렬 1](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/B1_23968.md)<br>
[B1_23969 : 알고리즘 수업 - 버블 정렬 2](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/B1_23969.md)<br>
[S5_30010 : 잘못된 버블정렬](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/S5_30010.md)<br>
[G4 23970 : 알고리즘 수업 - 버블 정렬 3](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/G4_23970.md)<br>
## 파이썬 버블 정렬의 시간 복잡도 및 안정성
파이썬에서 구현하는 일반적인 버블 정렬은 **안정적인(stable) 정렬 알고리즘**이다. <br>
안정적인 정렬이란, 정렬 후에도 값이 같은 요소들의 상대적인 순서가 유지되는 것을 의미한다. <br>
버블 정렬이 안정적인 이유는 값이 같은 요소끼리는 교환하지 않기 때문이다.

다음은 버블 정렬의 시간 복잡도이다.

| 경우             | 시간 복잡도 | 안정성 |
| ---------------- | ----------- | ------ |
| 최선의 경우 (정렬됨) | O(n)        | 안정적이다. |
| 평균적인 경우 (무작위) | O(n^2)      | 안정적이다. |
| 최악의 경우 (역순)   | O(n^2)      | 안정적이다. |

**요약하자면,** 버블 정렬은 데이터의 양이 많아질수록, <br>
성능이 급격하게 저하되는 비효율적인 정렬 알고리즘이다. <br>
하지만 일반적인 파이썬 구현은 Stable한 정렬 방식이다. <br>
<br>

## Bubble sort
```python
import sys
input=sys.stdin.readline
N,K=map(int,input().split())
a=list(map(int,input().split()))
cnt=0
result=-1
#multiple cycle
for cycle in range(len(a)-1):
    flag=False
    #1cycle
    for i in range(len(a)-1-cycle): #가장 큰 값 1개는 맨 뒤로. (-cycle)
        if(a[i]>a[i+1]):
            cnt+=1
            #swap
            a[i],a[i+1]=a[i+1],a[i]
            if(cnt==K):
                flag=True
                result=f"{a[i]} {a[i+1]}"
                break
    if flag:
        break
print(result)
```
