## FLUX 패턴
<img src="https://github.com/user-attachments/assets/cb03a217-185c-44e9-abb3-f81e2aae123f" width="600" /><br>
- Flux는 사용자 입력을 기반으로 Action을 만들고, <br>
- Action을 Dispatcher에 전달하여 Store(Model)의 데이터를 변경한 뒤,<br>
- View에 반영하는 단방향의 흐름으로 애플리케이션을 만드는 아키텍처이다.

### FLUX 패턴 장점
- 단방향이므로 데이터를 일관성있게 공유하기 편하다. <br>
- 뷰와 모델의 관계가 복잡해지면, <br>동작이 제대로 이루어지지 않았던 <br>
MVC패턴을 보완하기 위해 만들었다. <br>


### Action – "이건 무언가 바꾸고 싶다는 신호다"
Action은 데이터를 변경하고 싶을 때 사용하는 ‘지시서’ 같은 것이다. <br>
예를 들어 사용자 정보를 설정하고 싶다면,
```js
{
  type: 'SET_USER',
  payload: {
    name: 'Jane',
    age: 30
  }
}
```

- Action Creator 함수가 <br>
- 이런 Action 객체를 만들어서 <br>
- Dispatcher에게 넘겨주는 역할을 가진다. <br>

### Dispatcher - 누가 뭘 바꾸라고 하네? 알겠어, Store한테 전달할게
- Action이 오면, 그 type에 따라 <br>
- 어떤 Store에서 어떤 CallBack 함수를 실행할지를 정해준다. <br>
- 중요한 점은 데이터 변경은 무조건 <br>
- Dispatcher를 통해서만 가능하다는 점이다.
```js
Dispatcher.dispatch({
  type: 'SET_USER',
  payload: {
    name: 'Jane',
    age: 30
  }
});
```

### Store – "내가 그 데이터 가지고 있어, 바꿔줄게"
- Store는 실제 데이터를 들고 있는 저장소이다. <br>
- Dispatcher에서 Action을 전달받으면, <br>
- type에 따라 데이터를 변경한다. <br>
- 그리고 나서 View에게 "데이터 바뀜!"이라고 알려준다. <br>
```js
const UserStore = {
  user: { name: '', age: 0 },

  callback(action) {
    if (action.type === 'SET_USER') {
      this.user = action.payload;
      this.emitChange();  // View에 알려주는 역할
    }
  },

  getUser() {
    return this.user;
  }
};
```

### View – "데이터 바뀌었네? 화면 다시 그려야겠다"
Store에서 변경 신호를 받으면, <br>
데이터를 다시 가져와서 렌더링한다.<br>
그리고 사용자가 어떤 조작(예: 버튼 클릭)을 하면 <br>
다시 Action을 생성해서 전체 흐름이 시작된다. <br>
```js
function UserProfile() {
  const user = UserStore.getUser();

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.age}살</p>
    </div>
  );
}
```




