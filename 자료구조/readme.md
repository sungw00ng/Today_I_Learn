# Python 주요 자료구조 시간복잡도 정리

자료구조를 상황에 맞게 선택하려면, 시간복잡도를 알고 있으면 편함. <br>
Python 기준으로 자주 쓰는 자료구조들의 평균 및 최악 시간복잡도를 아래와 같이 정리. <br>

---

## 리스트 (`list`)

| 연산             | 시간복잡도 |
|------------------|------------|
| 인덱스 접근       | O(1)       |
| 탐색 (search)     | O(n)       |
| 맨 끝 삽입        | O(1)*      |
| 맨 끝 삭제        | O(1)       |
| 중간 삽입/삭제    | O(n)       |

* `*`: 평균적으로는 O(1)이지만, 내부 배열 크기 재할당이 발생할 경우 O(n)
https://github.com/sungw00ng/Today_I_Learn/blob/main/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0/list%EC%9D%98%20Amortized%20%EB%B3%B5%EC%9E%A1%EB%8F%84.md
 ```python
# 리스트 예제
arr = [1, 2, 3, 4]
arr.append(5)       # 맨 끝에 삽입
print(arr[2])       # 인덱스로 접근
arr.remove(3)       # 값으로 삭제 (중간 삭제)
```
---

## 덱 (`collections.deque`)

| 연산             | 시간복잡도 |
|------------------|------------|
| 양쪽 끝 삽입/삭제 | O(1)       |
| 인덱스로 접근     | O(n)       |
| 탐색              | O(n)       |

덱은 큐나 양방향 삽입/삭제가 필요한 경우 `list`보다 성능이 우수함

---
```python
from collections import deque

# 덱 예제
dq = deque([1, 2, 3])
dq.append(4)         # 오른쪽 끝 삽입
dq.appendleft(0)     # 왼쪽 끝 삽입
dq.pop()             # 오른쪽 끝 삭제
dq.popleft()         # 왼쪽 끝 삭제
```

## 딕셔너리 (`dict`) 및 셋 (`set`)

| 연산             | 평균 시간복잡도 | 최악 시간복잡도 |
|------------------|------------------|------------------|
| 참조 (lookup)     | O(1)              | O(n)              |
| 탐색 (in 연산 등) | O(1)              | O(n)              |
| 삽입/삭제         | O(1)              | O(n)              |

Python의 `dict`와 `set`은 해시테이블 기반 자료구조이며, 해시 충돌 발생 시 최악의 경우 O(n)

```python
# 딕셔너리 예제
d = {'apple': 2, 'banana': 5}
d['orange'] = 3       # 삽입
print(d['banana'])    # 참조
del d['apple']        # 삭제
```

```python
# 셋 예제
s = {1, 2, 3}
s.add(4)        # 삽입
s.remove(2)     # 삭제
print(3 in s)   # 탐색
```
---

## 힙 (`heapq`)

| 연산                 | 시간복잡도 |
|----------------------|------------|
| 최소값 참조 (peek)    | O(1)       |
| 삽입 (`heappush`)     | O(log n)   |
| 삭제 (`heappop`)     | O(log n)   |
| 탐색                  | O(n)       |

Python의 `heapq`는 최소 힙(min-heap)만 지원하며, 최대 힙은 음수 값을 사용하는 방식으로 구현 가능
```python
import heapq

# 힙 예제 (min-heap)
heap = [3, 1, 4]
heapq.heapify(heap)           # 리스트를 힙으로 변환
heapq.heappush(heap, 2)       # 삽입
min_val = heapq.heappop(heap) # 최소값 삭제
```
---

## 스택 & 큐 구현 요약

| 자료구조 | 구현 방식 추천 | 삽입/삭제 | 앞/뒤 참조 | 인덱스 접근 |
|----------|----------------|------------|-------------|-------------|
| 스택     | list           | O(1)       | O(1)         | O(n)        |
| 큐       | deque          | O(1)       | O(1)         | O(n)        |

---

## 요약 정리

- 빠른 인덱스 접근이 필요할 경우: `list`
- 양쪽 삽입/삭제가 많을 경우: `deque`
- 키 기반 탐색 및 저장이 많을 경우: `dict`, `set`
- 우선순위 큐가 필요할 경우: `heapq`
