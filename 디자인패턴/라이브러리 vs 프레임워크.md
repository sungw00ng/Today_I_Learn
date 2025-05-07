# 📚 라이브러리 vs 프레임워크

| 항목 | 라이브러리 | 프레임워크 |
|------|------------|-------------|
| 제어 흐름 | 내가 주도한다 | 프레임워크가 주도한다 |
| 사용 방식 | 필요한 기능만 호출 | 정해진 구조에 맞춰 작성 |
| 구조 자유도 | 높다 | 낮다 |
| 폴더명/파일명 규칙 | 자유롭다 | 정해진 규칙이 있다 |
| 진입점 | 내가 정한다 | 프레임워크가 정해둔다 |

---

## 💡 예시

- **라이브러리**: Pandas, NumPy, axios, Lodash  
- **프레임워크**: Django, Vue.js, React, Angular

# ✅ 라이브러리 vs 프레임워크 코드 예시

## 📌 라이브러리: axios  
내가 원하는 곳에서 직접 호출한다.

```javascript
import axios from 'axios';

axios.get('https://api.example.com/user')
  .then(res => console.log(res.data));
```

## 📌 라이브러리: vue.js
정해진 구조(created) 안에서 동작한다.
```javascript
<script>
import axios from 'axios';

export default {
  data() { return { user: {} }; },
  created() {
    axios.get('https://api.example.com/user')
      .then(res => this.user = res.data);
  }
};
</script>
```
