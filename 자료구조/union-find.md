# init_set 
최초에 하나의 정점 하나를 원소로 하는 집합을 만드는 연산
```python
# 초기화: 각 노드를 자기 자신으로 초기화
def init_set(n):
    return [i for i in range(n + 1)]
```
# find 
임의의 정점이 어느 집합의 원소인지를 알아내는 연산
```python
# 부모 노드를 찾고 경로 압축
def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])  # 경로 압축
    return parent[x]
```
# union 
두 집합을 하나로 합치는 연산
```python
# 두 집합을 합침
def union(parent, a, b):
    a_root = find(parent, a)
    b_root = find(parent, b)
    if a_root != b_root:
        parent[b_root] = a_root  # b 집합을 a 집합에 합침
        return True
    return False
```
