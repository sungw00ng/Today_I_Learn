1️⃣ del stack[-4:] (슬라이싱 삭제)
del stack[-4:]는 리스트의 슬라이싱을 활용하여 여러 개의 요소를 한 번에 삭제.

Python 내부적으로 리스트를 복사하고 메모리를 재할당해야 함.

연산량이 많아질 경우 속도 저하 발생 가능.

2️⃣ pop() (개별 삭제)
stack.pop()은 리스트의 맨 끝 요소를 O(1)로 즉시 삭제.

한 번에 하나씩 삭제하므로 Python이 불필요한 메모리 복사를 하지 않음.

반복적으로 pop()을 수행해도 슬라이싱보다 빠른 경우가 많음.
