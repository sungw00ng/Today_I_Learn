# 📗자료구조
[자료구조 이동](https://github.com/sungw00ng/Today_I_Learn/blob/main/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0/%EC%A3%BC%EC%9A%94%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%8B%9C%EA%B0%84%EB%B3%B5%EC%9E%A1%EB%8F%84%EC%A0%95%EB%A6%AC.md) <br>
# 📙알고리즘
✅ 1. 기본 알고리즘 (이미 알고 있는 분류)  
`그리디 (Greedy)`  
시간 복잡도: 문제마다 다름 (보통 O(N), O(N log N))

`구현 (Implementation)` <br>
시간 복잡도: 문제마다 다름 (보통 O(N)~O(N²))

`DFS / BFS (탐색)` 
시간 복잡도: O(N + M) (N: 노드 수, M: 간선 수)

`정렬 (Sorting)`  
시간 복잡도: O(N log N)

`이진 탐색 (Binary Search)`  
시간 복잡도: O(log N)

`다이나믹 프로그래밍 (DP)`  
시간 복잡도: O(N), O(N²), O(N*M) 등 문제 유형에 따라 다름

`최단 경로 (Shortest Path)`  
시간 복잡도:  
- 다익스트라: O((V + E) log V)  
- 플로이드-워셜: O(N³)  
- 벨만-포드: O(VE)

`그래프 이론 (Graph Theory)`  
시간 복잡도: 알고리즘마다 상이 (DFS, BFS: O(N + M), MST: O(E log E) 등)

---

✅ 2. 누적합/구간 합 (Prefix Sum 계열)  
구간의 합을 빠르게 계산할 수 있는 테크닉  

`누적합 (Prefix Sum)`  
시간 복잡도:  
- 초기 구간합 계산: O(N)  
- 질의 처리: O(1)

`2차원 누적합`  
시간 복잡도:  
- 초기 계산: O(N*M)  
- 질의 처리: O(1)

`차이 배열 (Difference Array)`  
시간 복잡도:  
- 업데이트: O(1)  
- 누적합 계산: O(N)

---

✅ 3. 완전 탐색 & 백트래킹  
모든 경우의 수를 따지되, 가지치기를 통해 탐색 효율을 높임  

`완전 탐색 (Brute-force)`  
시간 복잡도: O(N!), O(2^N), O(N^2) 등

`백트래킹 (Backtracking)`  
시간 복잡도: O(지수적), 최악 O(N!), 하지만 가지치기로 효율 개선

---

✅ 4. 트리 관련 테크닉  
그래프 중 트리 구조에만 적용되는 기법  

`트리 순회 (전위/중위/후위 순회)`  
시간 복잡도: O(N)

`DFS를 활용한 서브트리 계산`  
시간 복잡도: O(N)

`LCA (최소 공통 조상)`  
시간 복잡도:  
- 전처리: O(N log N)  
- 질의: O(log N)

`펜윅 트리 (Fenwick Tree / Binary Indexed Tree)`  
시간 복잡도:  
- 업데이트/질의: O(log N)

`세그먼트 트리 (Segment Tree)`  
시간 복잡도:  
- 빌드: O(N)  
- 질의/업데이트: O(log N)

---

✅ 5. 비트마스킹  
집합이나 상태를 효율적으로 표현할 때 사용  

`부분집합 생성`  
시간 복잡도: O(2^N)

`방문 상태 저장`  
시간 복잡도: O(1)

`비트 연산으로 조합 구성`  
시간 복잡도: O(2^N) or O(N)

---

✅ 6. 스위핑 & 투 포인터  
정렬된 구조에서 선형적으로 탐색하며 문제 해결  

`라인 스위핑 (Line Sweeping): 좌표 정렬 후 이벤트 순회`  
시간 복잡도: O(N log N)

`투 포인터 (Two Pointers): 정렬된 배열에서 구간 문제 해결`  
시간 복잡도: O(N)

---

✅ 7. LIS & 이분 탐색 응용  
수열 문제나 최적값을 찾을 때 자주 사용  

`LIS (Longest Increasing Subsequence)`  
시간 복잡도:  
- 기본 DP: O(N²)  
- 이분 탐색 이용: O(N log N)

`이분 탐색 응용 (Parametric Search)`  
시간 복잡도: O(log(max−min) * check 함수 시간)
