## FIFO(First in First out)
- 가장 먼저 온 페이지부터 교체한다.

<img width="600" height="400" src="https://github.com/user-attachments/assets/aa55fd9e-fd7c-4ac9-ba52-fd00c01105a7" /> <br>
> [이미지 출처](https://strong-park.tistory.com/entry/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-Ch6-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B5%90%EC%B2%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-FIFO-LRU-NUR-LFU)<br>

```python3
from collections import deque

# deque 객체 생성
fifo_queue = deque()

print("큐에 요소 추가하기 (enqueue)")
fifo_queue.append('A')
fifo_queue.append('B')
fifo_queue.append('C')
print(f"현재 큐 상태: {fifo_queue}")

print("\n큐에서 요소 제거하기 (dequeue)")
first_item = fifo_queue.popleft()  # 가장 먼저 들어온 요소 제거
print(f"제거된 요소: {first_item}")
print(f"현재 큐 상태: {fifo_queue}")

second_item = fifo_queue.popleft()
print(f"제거된 요소: {second_item}")
print(f"현재 큐 상태: {fifo_queue}")
```

<br>

## LRU(Least Recently Used)
- 최근에 사용되지 않은 페이지를 바꾼다.
- 즉, 참조가 오래된 페이지를 바꾼다.

<img width="600" height="400" src="https://github.com/user-attachments/assets/067a36c6-5952-416c-aadd-c5324a19c0d7" /><br>
> [이미지 출처](https://strong-park.tistory.com/entry/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-Ch6-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B5%90%EC%B2%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-FIFO-LRU-NUR-LFU)<br>

- 프로그래머스 캐시 문제에서 푼 기억이 있다.
- 캐시 문제에 대한 LRU 풀이로 적을 것이다.
> https://school.programmers.co.kr/learn/courses/30/lessons/17680 <br>
```python3
#LRU(Least Recently Used)
#hit시 뒤로, miss시 가장 오래된 페이지 비우기
def solution(cacheSize, cities):
    cache=[]
    time=0
    
    for city in cities:
        city=city.lower()  

        if cacheSize==0:
            time+=5  
            continue

        if city in cache:
            cache.remove(city)
            cache.append(city)
            time+=1  #cache hit
        else:
            if len(cache) >= cacheSize:
                cache.pop(0)
            cache.append(city)
            time+=5  #cache miss

    return time

```
<br>

## NRU(Not Recently Used)
- 0과 1을 가진 비트를 두고, 1은 최근 참조, 0은 참조되지 않음을 의미한다.
- 만약 한 바퀴 도는 동안 사용되지 않으면 0, 찾으면 해당 부분을 1로 바꾼다.
- clock 알고리즘이라고도 한다.

<img width="400" height="400" src="https://github.com/user-attachments/assets/41ca45d2-e5bc-40d1-a8ee-e198bb22d461" /><br>
> [이미지 출처](https://strong-park.tistory.com/entry/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-Ch6-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B5%90%EC%B2%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-FIFO-LRU-NUR-LFU)<br>

```Python3
class NRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.page_frames = {}  # {페이지 번호: {'R': 0, 'M': 0}}

    def access_page(self, page_number, is_modified=False):
        if page_number in self.page_frames:
            self.page_frames[page_number]['R'] = 1
            if is_modified:
                self.page_frames[page_number]['M'] = 1
        else:
            self.add_page(page_number, is_modified)
            
    def add_page(self, page_number, is_modified):
        if len(self.page_frames) >= self.capacity:
            self.replace_page()

        self.page_frames[page_number] = {'R': 1, 'M': 1 if is_modified else 0}
        print(f"새 페이지 추가: {page_number}")

    def replace_page(self):
        """NRU 규칙에 따라 가장 낮은 클래스의 페이지를 교체합니다."""
        
        # 4가지 클래스에 해당하는 페이지 목록을 찾습니다.
        classes = {
            (0, 0): [],
            (0, 1): [],
            (1, 0): [],
            (1, 1): []
        }
        for page_num, bits in self.page_frames.items():
            classes[(bits['R'], bits['M'])].append(page_num)

        # 가장 낮은 클래스(0,0)부터 순서대로 페이지를 찾습니다.
        page_to_remove = None
        for r, m in [(0, 0), (0, 1), (1, 0), (1, 1)]:
            if classes[(r, m)]:
                page_to_remove = classes[(r, m)][0]
                break
        
        # 페이지를 제거합니다.
        if page_to_remove is not None:
            del self.page_frames[page_to_remove]
            print(f"페이지 교체: {page_to_remove} 페이지 제거")

    def reset_reference_bits(self):
        """모든 페이지의 R 비트를 0으로 초기화합니다."""
        for page_data in self.page_frames.values():
            page_data['R'] = 0
        print("모든 페이지의 R 비트가 초기화되었습니다.")

    def get_status(self):
        print("--- 현재 캐시 상태 ---")
        for page, bits in self.page_frames.items():
            print(f"페이지: {page}, R: {bits['R']}, M: {bits['M']}")
        print("--------------------")

# 예시 사용
cache = NRUCache(capacity=3)
cache.access_page(1)
cache.access_page(2)
cache.get_status()

cache.reset_reference_bits()
cache.access_page(3, is_modified=True) # R=1, M=1
cache.access_page(4) # R=1, M=0
cache.get_status()
```

<br>

## LFU(Least Frequently Used)
- 가장 참조 횟수가 적은 페이지를 교체한다.

```python3
```
<img width="600" height="400" src="https://github.com/user-attachments/assets/97c2e3ff-34a8-488a-a43f-f07bbd3cfcaf" /><br>
> [이미지 출처](https://strong-park.tistory.com/entry/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-Ch6-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B5%90%EC%B2%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-FIFO-LRU-NUR-LFU)<br>

```python3
from collections import defaultdict

class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.key_map = {}  # {key: (value, freq)}
        self.freq_map = defaultdict(list) # {freq: [key1, key2, ...]}

    def get(self, key: int) -> int:
        if key not in self.key_map:
            return -1

        value, freq = self.key_map[key]
        self._update_freq(key, value, freq)
        return value

    def put(self, key: int, value: int):
        if self.capacity == 0:
            return

        if key in self.key_map:
            # 키가 이미 존재하면 값과 참조 횟수 업데이트
            _, freq = self.key_map[key]
            self._update_freq(key, value, freq)
        else:
            # 키가 존재하지 않으면 새로운 항목 추가
            if len(self.key_map) >= self.capacity:
                self._evict_least_frequent()
            
            self.min_freq = 1
            self.key_map[key] = (value, 1)
            self.freq_map[1].append(key)
    
    def _update_freq(self, key, value, freq):
        """참조 횟수 업데이트"""
        # 기존 freq_map에서 해당 키 제거
        self.freq_map[freq].remove(key)
        
        # min_freq가 더 이상 존재하지 않는 freq_map의 key와 같다면 min_freq 업데이트
        if not self.freq_map[freq] and freq == self.min_freq:
            self.min_freq += 1
            
        # 새로운 freq_map에 키 추가
        new_freq = freq + 1
        self.key_map[key] = (value, new_freq)
        self.freq_map[new_freq].append(key)

    def _evict_least_frequent(self):
        """가장 적게 사용된 항목 제거"""
        # min_freq에 해당하는 리스트에서 가장 오래된(앞에 있는) 항목 제거
        key_to_evict = self.freq_map[self.min_freq].pop(0)
        del self.key_map[key_to_evict]
        
# 예시 사용
cache = LFUCache(capacity=2)
cache.put(1, 1) # 캐시: {1: 1}
cache.put(2, 2) # 캐시: {1: 1, 2: 2}
print(f"현재 캐시 상태: {cache.key_map}, 최소 빈도: {cache.min_freq}")

cache.get(1) # key 1의 참조 횟수 증가
print(f"get(1) 후: {cache.key_map}, 최소 빈도: {cache.min_freq}")

cache.put(3, 3) # 용량 초과. 참조 횟수 1인 항목(2) 제거 후 3 추가
print(f"put(3, 3) 후: {cache.key_map}, 최소 빈도: {cache.min_freq}")

cache.get(2) # -1 반환 (2는 캐시에 없음)
```
