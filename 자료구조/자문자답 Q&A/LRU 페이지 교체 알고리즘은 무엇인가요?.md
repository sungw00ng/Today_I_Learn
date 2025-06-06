## LRU 페이지 교체 알고리즘은 무엇인가요?
```txt
LRU 알고리즘은 빠른 페이지 접근과 순서 관리를 위해
해시 테이블과 이중 연결 리스트를 조합해 구현하며,
보통 조회와 삽입, 삭제 모두 평균 O(1) 시간복잡도를 가집니다.
다만, 해시 테이블은 최악의 경우 충돌로 인해 O(n) 탐색이 발생할 수 있으므로,
최악 시간복잡도가 문제될 때는 O(log n) 탐색이 보장되는
트리 기반 Map 자료구조를 사용하는 대안도 고려할 수 있습니다.
```

<br><br><br>

## 시간복잡도 분석
| 작업            | 최선 시간복잡도 | 평균 시간복잡도 | 최악 시간복잡도 | 설명                                  |
| ------------- | -------- | -------- | -------- | ----------------------------------- |
| 페이지 조회        | O(1)     | O(1)     | O(n)     | 해시 테이블이 보통 O(1), 충돌 많으면 O(n) 가능성 있음 |
| 노드 이동 (삭제/삽입) | O(1)     | O(1)     | O(1)     | 이중 연결 리스트는 항상 O(1)                  |
| 전체 작업 (조회+이동) | O(1)     | O(1)     | O(n)     | 해시 탐색이 최악 O(n)일 경우 발생 가능            |

<br><br><br>

## Code
```python
class Node:
    def __init__(self,key,value):
        self.key=key
        self.value=value
        self.prev=None
        self.next=None

class LRUCache:
    def __init__(self,capacity):
        self.capacity=capacity
        self.cache = {} # key -> Node (해시 테이블)
        # 더미 헤드/테일 노드 (연결 리스트)
        self.head=Node(0, 0)
        self.tail=Node(0, 0)
        self.head.next=self.tail
        self.tail.prev=self.head

    def _remove(self,node):
        # 연결 리스트에서 노드 제거
        prev_node=node.prev
        next_node=node.next
        prev_node.next=next_node
        next_node.prev=prev_node

    def _add_to_front(self,node):
        # 노드를 연결 리스트 맨 앞으로 추가
        node.next=self.head.next
        node.prev=self.head
        self.head.next.prev=node
        self.head.next=node

    def get(self,key):
        if key in self.cache:
            node=self.cache[key]
            self._remove(node)
            self._add_to_front(node)
            return node.value
        else:
            return -1  # 캐시에 없으면 -1 반환

    def put(self,key,value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key,value)
        self._add_to_front(node)
        self.cache[key]=node

        if len(self.cache) > self.capacity:
            # 가장 오래된 노드 삭제 (tail.prev)
            lru_node=self.tail.prev
            self._remove(lru_node)
            del self.cache[lru_node.key]

# 사용 예시
if __name__ == "__main__":
    cache=LRUCache(3)
    cache.put(1,'A')
    cache.put(2,'B')
    cache.put(3,'C')
    print(cache.get(1))  # A, 1번 노드가 최근 사용
    cache.put(4,'D')    # 2번 노드 삭제 (가장 오래된)
    print(cache.get(2))  # -1 (없음)
    print(cache.get(3))  # C

```
