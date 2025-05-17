# Counting Sort
<img src="https://github.com/user-attachments/assets/36fda40b-1802-4006-86cd-28a807039e3a" width="600" height="400"/><br>

## 파이썬 계수 정렬의 시간 복잡도 및 안정성
Counting Sort는 정수 키가 가질 수 있는 <br>
값의 범위(0 ~ k) 를 카운트 배열에 저장한 뒤, <br>
누적 합을 이용해 제자리(또는 출력 배열)로 <br>
원소를 옮기는 비교 비사용 정렬이다. <br>
즉, 값들끼리 직접 비교하지 않고 정렬하는 알고리즘이다.

<br>
| 경우 | 시간 복잡도       | 공간 복잡도       | 안정성       |
| -- | ------------ | ------------ | --------- |
| 전체 | **O(n + k)** | **O(n + k)** | **안정적**\* |

- 두 번째 패스를 뒤에서 앞으로 (역순으로) 돌면 원래 같은 값의 순서가 보존 → Stable<br>

## 핵심 요약 <br>
전제: 키 범위 k가 작거나 k = O(n) 수준이어야 이득이다. <br>
1. 카운트 배열 C[0..k] 초기화<br>
2. 각 원소 카운트<br>
3. 누적 합 (= 해당 값이 끝나는 인덱스)<br>
4. 출력 배열에 역방향으로 채움 → 안정성 유지<br>
- 추가 배열 두 개가 필요하므로 공간은 O(n + k)이다.<br>
- n보다 k가 훨씬 크면 효율 급락 → 범용 정렬로는 적합 X.<br>

## 시나리오 
- 상황: 이커머스 플랫폼에서 상품 등급(1 ~ 5점) 또는 고객 연령(0 ~ 120세) 순으로 <br>
실시간 대시보드에 빠르게 정렬할 필요한 상황이라면 Counting Sort. <br>
- 이유: 값 범위가 좁아 k 가 작으므로 O(n + k) ≈ O(n) 성능 달성. <br>
- 주의: 새로운 카테고리 추가로 범위가 커지면 다른 정렬로 대안을 고려해야 한다.

## 배열을 이용한 Counting Sort
```python
# 정렬을 수행할 배열
arr = [4, 7, 9, 1, 3, 5, 2, 3, 4]
count = [0] * (max(arr) + 1)

for num in arr:
    count[num] += 1

for i in range(1, len(count)):
    count[i] += count[i-1]

result = [0] * (len(arr))

for num in arr:
    idx = count[num]
    result[idx - 1] = num
    count[num] -= 1

print(result)
# [1, 2, 3, 3, 4, 4, 5, 7, 9]
```

## 딕셔너리를 이용한 Counting Sort
```python
# 정렬을 수행할 배열
arr = [4, 7, 9, 1, 3, 5, 2, 3, 4]

count_dict = {}

for num in arr:
    if num in count_dict:
        count_dict[num] += 1
    
    else:
        count_dict[num] = 1

result = []

for num in range(max(arr) + 1):
    while num in count_dict and count_dict[num] != 0:
        result.append(num)
        count_dict[num] -= 1

print(result)
```
  <br><br>
  
  ---
  ---
  ---
  <br><br>
# Radix Sort
<img src="https://github.com/user-attachments/assets/3bd192ff-c843-440b-b105-d6680f2b3263" width="600" height="400"/><br>
## 파이썬 기수 정렬의 시간 복잡도 및 안정성
- Radix Sort는 자릿수(또는 문자 포지션)를 낮은 자리→높은 자리(LSD) 또는 <br>
높은 자리→낮은 자리(MSD) 순으로 차례로 정렬하는 기법이다.<br>
- 각 라운드에는 주로 Counting Sort(안정적 정렬) 같은 기초 정렬을 써서<br>
비교 없이 원소를 빠르게 분배한다.<br>

| 변수  | 의미                                         |
| --- | ------------------------------------------ |
| `d` | 정렬할 최대 자릿수 (예: 10진수 숫자면 자릿수, 문자열이면 문자 길이)  |
| `k` | 한 자릿수(또는 문자셋)의 값 범위 (10진수=10, 영문 대문자=26 등) |

- 하위 정렬(Counting Sort 등)이 안정적이면 Radix Sort도 안정적<br>

## 핵심 요약
- 정수 Radix (LSD): 가장 낮은 자리(Least Significant Digit)부터 <br>
Counting Sort 반복 → 정렬 완료<br>
> (d ≈ log_{base}(maxValue)) <br>
- 문자열/고정길이 코드(MSD): 왼쪽 자리부터 분할하고 재귀적으로 진행<br><br>
- 장점: d, k가 작고 상수로 묶이면 선형 시간 O(n) 에 가깝다.<br><br>
- 단점: 자릿수 많거나 문자셋 크면 (큰 d·k) 메모리·시간 증가.<br>

## 시나리오 
- 상황: 물류 시스템에서 8자리 숫자형 주문 ID 수백만 개를<br>
피킹. 패킹 순서대로 빠르게 정렬할 때 Radix Sort 사용.<br><br>
- 이유: 자릿수 d = 8, 각 자리 범위 k = 10 으로 작아<br>
d·(n + k) ≈ 8n 수준 → 거의 선형 성능.<br><br>
- 검토 포인트: ID 길이가 길어지거나 알파벳·특수문자 혼합되면<br>
k 증가로 메모리 부담↑ → 경로당 분할 전략(MSD) 또는 다른 방법 검토.<br>
<br>

## Radix Sort
```python
def countingSort(arr, digit):
    n = len(arr)
  
    # 배열의 크기에 맞는 output 배열을 생성하고 10개의 0을 가진 count란 배열을 생성한다. 
    output = [0] * (n)
    count = [0] * (10)
    
    #digit, 자릿수에 맞는 count에 += 1을 한다. 
    for i in range(0, n):
        index = int(arr[i]/digit) 
        count[ (index)%10 ] += 1
 
    # count 배열을 수정해 digit으로 잡은 포지션을 설정한다.  
    for i in range(1,10):
        count[i] += count[i-1]  
        print(i, count[i])
    # 결과 배열, output을 설정한다. 설정된 count 배열에 맞는 부분에 arr원소를 담는다.   
    i = n - 1
    while i >= 0:
        index = int(arr[i]/digit)
        output[ count[ (index)%10 ] - 1] = arr[i]
        count[ (index)%10 ] -= 1
        i -= 1

    #arr를 결과물에 다시 재할당한다.  
    for i in range(0,len(arr)): 
        arr[i] = output[i]
 
# Method to do Radix Sort
def radixSort(arr):
    # arr 배열중에서 maxValue를 잡아서 어느 digit, 자릿수까지 반복하면 될지를 정한다. 
    maxValue = max(arr)  
    #자릿수마다 countingSorting을 시작한다. 
    digit = 1
    while int(maxValue/digit) > 0: 
        countingSort(arr,digit)
        digit *= 10
 
arr = [ 170, 45, 75, 90, 802, 24, 2, 66]
radixSort(arr)
 
for i in range(len(arr)):
    print(arr[i], end=" ")
```
<br><br>
## Counting/Radix 비교
| 항목       | **Counting Sort**                    | **Radix Sort**                             |
| -------- | ------------------------------------ | ------------------------------------------ |
| 정렬 방식    | 직접 숫자 빈도(count)를 기반으로 정렬             | 자릿수별로 반복해서 Counting Sort 사용                |                               |
| 안정성      | ✅ 안정정렬 (역방향 채우기 시)                   | ✅ 하위 정렬이 안정정렬이면 전체도 안정정렬                   |
| 시간 복잡도   | **O(n + k)**<br>(n: 데이터 수, k: 값의 범위) | **O(d · (n + k))**<br>(d: 자릿수 수, k: 기수 크기) |
| 공간 복잡도   | O(n + k)                             | O(n + k) per digit                         |
| 입력 조건    | 정수/정수 변환 가능한 값, 값 범위 작아야 함           | 자릿수로 분리 가능한 값 (정수, 문자열 등)                  |
| 값 범위 제한  | **O(n) 정도의 k일 때만 빠름**                | k와 d가 작으면 좋지만 상대적으로 범위 자유로움                |
| 사용 예시    | 학생 점수(0\~100), 연령, 등급 정렬 등           | 전화번호, 주민등록번호, 큰 정수 리스트 정렬 등                |
| 실무 적용성   | 제한적 (k 작을 때만 유리)                     | 적절한 조건일 때 정수형 대량 정렬에 실용적                   |

