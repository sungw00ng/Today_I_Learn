# 서울 기온 시각화 코드 구조 요약<br>

서울의 시간별 기온 데이터를 Open-Meteo API로 받아와 Chart.js를 통해 선형 차트로 시각화하는 구조.<br>
전체 흐름: `window.onload → API 요청 → 데이터 가공 → 차트 출력`<br>

---

## 1. window.onload<br>
웹 페이지의 모든 리소스가 로드된 이후 실행된다.<br>
초기 진입 시점에서 비동기 요청을 수행하고, 차트를 출력한다.<br>
예: `window.onload = async () => { ... }`<br>

---

## 2. API 요청<br>
`fetch()`를 이용해 Open-Meteo API에서 서울의 시간별 기온 데이터를 받아온다.<br>
응답은 `.json()`으로 파싱하여 객체 형태로 사용.<br>

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
시간 문자열을 한국 시간 포맷으로 변환.<br>
`Intl.DateTimeFormat`을 사용하여 `"2025-04-24T01:00"` 같은 ISO 포맷을 `"2025. 4. 24. 오전 1시"` 형태로 가독성 높임.<br>

```js
res.hourly.time = res.hourly.time.map(e => {
    return new Intl.DateTimeFormat("ko-KR", opt).format(new Date(e));
});
```<br>

---

## 4. 차트 데이터 구성<br>
Chart.js에 맞춰 `labels`와 `datasets` 구조로 데이터를 준비한다.<br>
`labels`는 시간, `data`는 온도값을 사용하며, 스타일도 이 시점에서 지정 가능.<br>

---

## 5. 차트 출력<br>
`<canvas>` 요소를 선택하고, `Chart` 인스턴스를 생성하여 선형 차트를 출력한다.<br>
기본 형식:<br>

```js
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: data
});
```<br>

---

## 참고<br>
- 시간 형식은 `Intl.DateTimeFormat` 옵션으로 세부 조정 가능<br>
- `pointStyle`, `pointRadius` 등은 시각화 커스터마이징 요소<br>
- 데이터가 많을 경우 `slice()` 등으로 적절히 잘라서 출력하는 것이 좋음<br>
