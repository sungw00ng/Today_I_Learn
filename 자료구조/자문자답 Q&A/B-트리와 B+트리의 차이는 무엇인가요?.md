## B-트리와 B+트리의 차이는 무엇인가요?
```txt
B-트리와 B+트리의 가장 큰 차이는 데이터 저장 위치와 탐색 방식에 있습니다.

B-트리는 내부 노드와 리프 노드 모두에 데이터를 저장해
중간 노드에서도 탐색이 가능해 경우에 따라 빠른 접근이 가능하지만,
구조가 복잡하고 범위 쿼리 처리에 비효율적일 수 있습니다.

반면,
B+트리는 오직 리프 노드에만 데이터를 저장하며,
모든 탐색이 리프 노드까지 내려가야 완료되기 때문에
탐색 속도가 일정하고 예측 가능합니다.
또한 리프 노드들이 연결되어 있어 범위 검색이나 순차 탐색이
훨씬 효율적이라는 장점이 있습니다.
```

<br>

## B- 트리와 B+트리 차이점
| 구분                     | B-트리                                    | B+트리                                |
| ---------------------- | --------------------------------------- | ----------------------------------- |
| **데이터 저장 위치**          | 내부 노드와 리프 노드 모두에 데이터 저장                 | 오직 리프 노드에만 데이터 저장                   |
| **탐색 속도**              | 중간 노드에서도 데이터를 찾을 수 있어 경우에 따라 빠를 수 있음    | 항상 리프 노드까지 내려가야 하므로 일정한 탐색 속도 보장    |
| **범위 쿼리(range query)** | 내부 노드에 데이터가 분산되어 있어 범위 검색이 복잡하고 느릴 수 있음 | 리프 노드들이 포인터로 연결되어 있어 범위 검색이 빠르고 효율적 |

<br>

## B-Tree Code
```python
class BTreeNode:
    def __init__(self, t, leaf=False):
        self.t = t  # 최소 차수
        self.leaf = leaf
        self.keys = []
        self.children = []

    def insert_non_full(self, key):
        i = len(self.keys) - 1
        if self.leaf:
            # 리프 노드이면 키를 알맞은 위치에 삽입
            self.keys.append(None)
            while i >= 0 and key < self.keys[i]:
                self.keys[i + 1] = self.keys[i]
                i -= 1
            self.keys[i + 1] = key
        else:
            # 내부 노드일 때, 적절한 자식으로 내려가 삽입
            while i >= 0 and key < self.keys[i]:
                i -= 1
            i += 1
            if len(self.children[i].keys) == 2 * self.t - 1:
                self.split_child(i)
                if key > self.keys[i]:
                    i += 1
            self.children[i].insert_non_full(key)

    def split_child(self, i):
        t = self.t
        y = self.children[i]
        z = BTreeNode(t, y.leaf)
        z.keys = y.keys[t:]
        y.keys = y.keys[:t - 1]

        if not y.leaf:
            z.children = y.children[t:]
            y.children = y.children[:t]

        self.children.insert(i + 1, z)
        self.keys.insert(i, y.keys.pop(-1))


class BTree:
    def __init__(self, t):
        self.root = BTreeNode(t, True)
        self.t = t

    def insert(self, key):
        r = self.root
        if len(r.keys) == 2 * self.t - 1:
            s = BTreeNode(self.t, False)
            s.children.append(r)
            s.split_child(0)
            self.root = s
            s.insert_non_full(key)
        else:
            r.insert_non_full(key)

# 사용 예시
btree = BTree(2)
for key in [10, 20, 5, 6, 12, 30, 7, 17]:
    btree.insert(key)
print("B-Tree Root Keys:", btree.root.keys)
```

<br>

## B+Tree Code
```python
class BPlusTreeNode:
    def __init__(self, t, leaf=False):
        self.t = t
        self.leaf = leaf
        self.keys = []
        self.children = []
        self.next = None  # 리프 노드끼리 연결하기 위한 포인터

    def insert_non_full(self, key):
        i = len(self.keys) - 1
        if self.leaf:
            # 리프 노드에 키 삽입
            self.keys.append(None)
            while i >= 0 and key < self.keys[i]:
                self.keys[i + 1] = self.keys[i]
                i -= 1
            self.keys[i + 1] = key
        else:
            while i >= 0 and key < self.keys[i]:
                i -= 1
            i += 1
            if len(self.children[i].keys) == 2 * self.t - 1:
                self.split_child(i)
                if key > self.keys[i]:
                    i += 1
            self.children[i].insert_non_full(key)

    def split_child(self, i):
        t = self.t
        y = self.children[i]
        z = BPlusTreeNode(t, y.leaf)
        z.keys = y.keys[t:]
        y.keys = y.keys[:t]

        if not y.leaf:
            z.children = y.children[t:]
            y.children = y.children[:t]

        if y.leaf:
            # 리프 노드 연결 유지
            z.next = y.next
            y.next = z

        self.children.insert(i + 1, z)
        self.keys.insert(i, z.keys[0])  # 내부 노드에는 자식 첫 키만 저장


class BPlusTree:
    def __init__(self, t):
        self.root = BPlusTreeNode(t, True)
        self.t = t

    def insert(self, key):
        r = self.root
        if len(r.keys) == 2 * self.t - 1:
            s = BPlusTreeNode(self.t, False)
            s.children.append(r)
            s.split_child(0)
            self.root = s
            s.insert_non_full(key)
        else:
            r.insert_non_full(key)

# 사용 예시
bptree = BPlusTree(2)
for key in [10, 20, 5, 6, 12, 30, 7, 17]:
    bptree.insert(key)

print("B+Tree Root Keys:", bptree.root.keys)

# 리프 노드 키들 출력 (순차 탐색용)
node = bptree.root
while not node.leaf:
    node = node.children[0]
print("B+Tree Leaf Keys in order:")
while node:
    print(node.keys, end=' -> ')
    node = node.next
```
