# array to pointer decay
배열이 포인터로 부식(decay)되는 현상. <br>
배열의 이름을 T* 포인터에 할당하면, 배열의 크기 정보 N이 사라지고, <br>
배열의 첫 번째 요소의 주소만 포인터에 바인딩된다. <br>


즉, 배열의 크기 정보는 없어지고, <br>
포인터는 배열의 첫 번째 요소를 가리키게 됩니다. <br>
배열의 이름을 배열의 첫번째 주소로써 쓸 수 있다. <br>
array는 가능하지만, 이외에 vector는 사용할 수 없다. <br>
```cpp
#include<bits/stdc++.h>
using namespace std;

int arr[] = {10, 20, 30, 40};

int main() {
    // 배열 이름을 포인터로 사용
    int* ptr = arr;
    
    // 배열 이름이 첫 번째 요소의 주소로 부식되는 예시
    cout << "배열 이름이 첫 번째 요소의 주소: " << ptr << endl; // arr == &arr[0]
    cout << "Address of arr[0]: " << &arr[0] << endl; // arr == &arr[0]
    
    // 포인터 연산을 통한 배열 접근
    cout << "두번째 원소 계산: " << *(ptr + 1) << endl;  // 20
    cout << "Address of arr[1]: " << &arr[1] << endl; // 주소 출력: arr[1]
    
    // 포인터 연산을 통한 배열의 마지막 요소 접근
    cout << "마지막 원소 계산: " << *(ptr + 3) << endl; // 40
    cout << "Address of arr[3]: " << &arr[3] << endl; // arr[3]의 주소 출력
    
    return 0;
}


/*
포인터로 만들 배열 이름: 0x7ffeeff3a5d0
Address of arr[0]: 0x7ffeeff3a5d0
두번째 원소 계산: 20
Address of arr[1]: 0x7ffeeff3a5d4
마지막 원소 계산: 40
Address of arr[3]: 0x7ffeeff3a5e0
*/
```
