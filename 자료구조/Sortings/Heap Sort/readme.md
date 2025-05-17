# Heap Sort
<img src="https://github.com/user-attachments/assets/80368541-8024-4727-96fd-0bc1d9e537d1" width="500" height="600"/> <br>

>퀵정렬 문제 모음집(Baekjoon S4~S4) <br>
[S4_24173](https://www.acmicpc.net/problem/24173) [S4_24174](https://www.acmicpc.net/problem/24174)
<br><br>
>Solved <br>
[S4_24173](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/S4_24173.md)<br>
[S2_24174](https://github.com/sungw00ng/solved/blob/main/%EB%B0%B1%EC%A4%80/S4_24174.md)<br>
<br>

## 파이썬 힙 정렬의 시간 복잡도 및 안정성
Heap Sort는 **완전 이진 트리 구조인 힙**을 활용하여 정렬하는 알고리즘이다.<br>
배열을 **최대 힙Max Heap 또는 최소 힙Min Heap**으로 변환한 후, <br>
루트 노드(최대/최소 값)를 꺼내 정렬한다. <br>

힙은 부모 노드가 자식 노드보다 크거나(최대 힙) 작다는 성질을 이용한다. <br>
파이썬 표준 라이브러리에서는 heapq 모듈을 통해 최소 힙을 지원하지만, <br>
힙 정렬 자체는 직접 구현해야한다.

| 경우 | 시간 복잡도     | 공간 복잡도 | 안정성 |
| -- | ---------- | ------ | --- |
| 최선 | O(n log n) | O(1)   | 불안정 |
| 평균 | O(n log n) | O(1)   | 불안정 |
| 최악 | O(n log n) | O(1)   | 불안정 |

- 모든 경우에 O(n log n)의 시간 복잡도를 보장 (정렬된/무작위 배열 여부와 무관)
- in-place 정렬이 가능하므로 추가 메모리 사용이 거의 없음 (O(1))
- 힙에서 원소가 꺼내지는 과정에서 동일한 값의 상대 순서가 유지되지 않음 → 불안정 정렬(Unstable)

## 핵심 요약
- Heapify: 배열을 힙 구조(보통 최대 힙)로 만드는 과정. 시간 복잡도는 O(n)
- Extract Max/Min: 루트 노드를 꺼내고 나머지를 재정렬
- in-place 정렬: 별도 배열 없이 배열 자체를 정렬한다.
- 퀵 정렬보다 최악의 경우 시간 복잡도가 더 안정적이지만, 실행 시간 자체는 조금 느릴 수 있음

## 시나리오
- 상황: 수백만 개의 상품 재고 데이터를 정렬해야 하는 전자상거래 플랫폼. <br>
빠르고 일관된 정렬이 필요하고, <br>
최악의 경우에도 안정된 성능이 중요함.<br>
- 요구사항: 정렬 대상이 메모리에 모두 올라갈 수 있으며, <br>
어떤 입력이 들어와도 일정한 성능을 보장해야 함.
- 적용 이유: 힙 정렬은 입력 분포와 관계없이 항상 O(n log n)의 시간 복잡도를 유지하므로, <br>
데이터가 정렬되어 있거나 역순이더라도 성능 저하가 없다. 특히 최악의 경우 퀵 정렬보다 유리하다.

## Python
```python
def heap_sort(arr):
    n=len(arr)
    arr=[None]+arr
    
    #힙 만들기
    for i in range(n//2,0,-1):
        heapify(arr,i,n)
        
    #정렬
    for i in range(n,1,-1):
        arr[1],arr[i]=arr[i],arr[1]
        heapify(arr,1,i-1)
    return arr[1:]

def heapify(arr,k,n):
    left=2*k
    right=2*k+1
    
    #자식 노드 2개
    if right<=n:
        smaller=left if arr[left]>arr[right] else right
        
    #자식 노드 1개
    elif left<=n:
        smaller=left
    #자식 노드 0개
    else:
        return
    
    if arr[smaller]>arr[k]:
        arr[k],arr[smaller]=arr[smaller],arr[k]
        heapify(arr,smaller,n)
        
arr=[3,4,5,2,3]
print(heap_sort(arr))
```
- 내림차순 정렬은 heapify의 일부 >를 <로 바꾸면 된다.


