# Bit Mask
- 정수의 이진수 표현을 이용해 상태를 압축하고, <br>
논리 연산을 통해 상태의 변화나 체크를 효율적으로 처리하는 방식

## 비트 연산자
- a&b ==AND== ex) a=4=100(2), b=7=111(2) => a&b=100(2)=4
- a|b ==OR== ex) a=2=010(2), b=5=101(2) => a|b=111(2)=7
- a^b ==XOR== ex) a=3=011(2), b=5=101(2) => a^b=110(2)=6
- ~a ==NOT== ex) a=3=011(2), ~a=100(2)=4
- a& ~b 차집합
- a<<b ==LEFT SHIFT== ex) a=1=001(2), a<<2=100(2)=4
- a>>b ==RIGHT SHIFT== ex) a=4=100(2), a>>2=001(2)=1
    

## 원소 추가
- current = current | (1<<p) : p번 원소 추가

## 원소 삭제
- current = current & ~(1<<p) : p번 원소 삭제

## 원소 토글
- current = current ^ (1<<p) : p번 원소 토글(있으면 삭제, 없으면 추가)

## 집합의 크기 구하기
```python
def bitCount(x):
  if(x==0) return 0
  return x%2+bitCount(x/2)
```

## 모든 부분 집합 순회하기
<img width="900" alt="Image" src="https://github.com/user-attachments/assets/a1beea10-aa2e-4db2-a7a2-5811c841842d" />
https://travelbeeee.tistory.com/451 <br>

<br><br>

## 비트 연산 예제 
- 한 숫자를 제외하고 모든 숫자들이 두개씩 들어있다면 하나만 들어있는 숫자 찾기 <br>
- ex) nums=[5,1,3,1,3,2,2] <br>

### 136. Single Number
https://leetcode.com/problems/single-number/description/
```python
from typing import list
#hashMap Approach O(N)
def singleNumberHash(nums: List[int]) -> int:
    num_set=set()
    for num in nums:
        if num in num_set:
            num_set.remove(num)
        
        else:
            num_set.add(num)
        
    single_num=num_set.pop()
    return single_num

    singleNumberHash(nums=[5,1,3,1,3,2,2])
    
#Bit Manipulation O(1)
ef singleNumber(nums):
    single_num=0
    for num in nums:
        single_num ^=num
    return single_num

singleNumber(nums=[5,1,3,1,3,2,2])
```

## 다양한 문제 풀이 
[S2_기차가 어둠을 헤치고 은하수를](https://www.acmicpc.net/problem/15787)


