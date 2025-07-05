## Two Pointers
<img src="https://github.com/user-attachments/assets/871f8599-3dc1-414c-8b97-0cbbf6ce8745" width="600"/><br>
>https://daegudeveloper.tistory.com/6
- 1차원 배열에서 각자 다른 원소를 가리키는 2개의 포인터를 사용하여 목표값을 구한다.
- 연속된 구간의 원소들을 처리하기를 원하거나, 정렬된 배열에서 무언가를 구할 때 사용하는 기법이다.
- 완전 탐색 O(2n)에서 O(n)으로 선형 시간복잡도로 줄여준다.

## 핵심 로직
```python
while left<n:
    sum < x:
        right++
    sum > x:
        left++
    sum == x:
        count++
```

