# 서울 기온 시각화 코드 구조 요약<br>

서울의 시간별 기온 데이터를 외부 API에서 받아와, 이를 Chart.js를 통해 선 그래프로 시각화한다.<br>
전체 흐름은 `window.onload → API 요청 → 데이터 가공 → 차트 출력` 순으로 구성된다.<br>

---

## 1. window.onload<br>
페이지 내 모든 리소스가 로드된 이후 실행된다.<br>
초기 진입 시점을 제어하며, 데이터 요청 및 차트 생성을 이 타이밍에 수행한다.<br>

```js
window.onload = async () => { ... }
```<br>

---

## 2. API 요청<br>
Open-Meteo에서 제공하는 기온 데이터를 비동기 요청으로 받아온다.<br>
`fetch`로 HTTP 요청을 보내고, 응답을 JSON으로 변환한다.<br>

```js
const ret = await fetch(OPEN_API).then(res => res.json());
```<br>

응답 예시:<br>
```json
{
  "hourly": {
    "time": ["2025-04-24T00:00", "2025-04-24T01:00", ...],
    "temperature_2m": [13.5, 13.1, ...]
  }
}
```<br>

---

## 3. 데이터 가공<br>
`hourly.time`의 ISO 문자열을 `Intl.DateTimeFormat`으로 변환하여 가독성을 높인다.<br>
한국 로컬 형식으로 포맷하여 그래프에 표시할 라벨로 활용한다.<br>

```js
res.hourly.time = res.hourly.time.map(e => {
    return new Intl.DateTimeFormat("ko-KR", opt).format(new Date(e));
});
```<br>

---

## 4. 차트 데이터 구성<br>
Chart.js에서 사용하는 포맷으로 데이터를 구성한다.<br>
`labels`에는 시간 문자열을, `datasets`에는 온도 데이터를 입력한다.<br>

```js
const data = {
    labels: res.hourly.time,
    datasets: [{
        label: '서울의 온도차트',
        data: res.hourly.temperature_2m,
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgba(255,99,132,0.5)',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
    }]
}
```<br>

---

## 5. 차트 출력<br>
HTML의 `<canvas>` 요소를 선택하고, Chart.js를 사용해 선형 차트를 출력한다.<br>

```js
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: data
});
```<br>

---

## 참고<br>
- 차트 스타일은 `borderColor`, `pointStyle` 등으로 커스터마이징 가능<br>
- 데이터가 많은 경우 `slice`로 일부만 시각화하는 것도 고려<br>
- `window.onload` 외에 `DOMContentLoaded` 이벤트로 대체 가능<br>
