# ☀️ 서울 기온 시각화 코드 구조 요약 ☀️

서울의 시간별 기온 데이터를 Open-Meteo API로 받아와 Chart.js를 통해 선형 차트로 시각화하는 과정을 담고 있습니다.

**전체 흐름:** `웹 페이지 로드 완료 → API 데이터 요청 → 데이터 가공 → 차트 출력`

---

### 1. ⚙️ 웹 페이지 로드 완료 (`window.onload`)

* 웹 페이지의 모든 리소스 (이미지, 스크립트 등)가 완전히 로드된 **직후**에 실행됩니다.
* **초기 진입 시점**에서 서울의 기온 데이터를 비동기적으로 요청하고, 받아온 데이터를 기반으로 차트를 그리는 역할을 합니다.
* **예시:**
    ```javascript
    window.onload = async () => {
        // API 요청 및 차트 출력 로직
    };
    ```

---

### 2. 📡 Open-Meteo API 요청 (`fetch()`)

* JavaScript의 `fetch()` 함수를 사용하여 **Open-Meteo API**로부터 서울의 시간별 기온 데이터를 가져옵니다.
* API 응답은 `.json()` 메서드를 통해 JavaScript **객체** 형태로 변환하여 подальшее (추가적인) 처리에 사용됩니다.
* **응답 데이터 구조 예시:**
    ```json
    {
      "hourly": {
        "time": ["2025-04-24T00:00", "2025-04-24T01:00", ...],
        "temperature_2m": [13.5, 13.1, ...]
      }
    }
    ```

---

### 3. ⏳ 시간 데이터 가공 (`Intl.DateTimeFormat`)

* API로부터 받은 ISO 형식의 시간 문자열 (예: `"2025-04-24T01:00"`)을 **한국 시간 형식**으로 변환합니다.
* `Intl.DateTimeFormat` 객체를 활용하여 날짜 및 시간 포맷 옵션을 설정하고, 가독성이 높은 형태 (예: `"2025. 4. 24. 오전 1시"`)로 변환합니다.
* **코드 스니펫:**
    ```javascript
    res.hourly.time = res.hourly.time.map(e => {
        const opt = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat("ko-KR", opt).format(new Date(e));
    });
    ```

---

### 4. 📊 Chart.js 데이터 구성 (`labels`, `datasets`)

* Chart.js 라이브러리가 인식할 수 있는 **`labels`** 와 **`datasets`** 구조로 데이터를 준비합니다.
    * `labels`: 차트의 X축에 표시될 시간 데이터를 배열 형태로 담습니다.
    * `datasets`: 차트에 그려질 데이터셋 (여기서는 기온)과 관련된 정보를 담습니다. 데이터 값 (`data`), 선 색상, 점 스타일 등을 설정할 수 있습니다.

---

### 5. 📈 차트 출력 (`Chart` 인스턴스 생성)

* HTML 문서 내의 `<canvas>` 요소를 JavaScript를 사용하여 선택합니다. 이 캔버스 요소 위에 차트가 그려집니다.
* `Chart` 클래스의 **인스턴스**를 생성하면서 차트의 타입 (`'line'` - 선형 차트), 데이터 (`data`), 그리고 다양한 옵션들을 설정하여 화면에 차트를 표시합니다.
* **기본 구조:**
    ```javascript
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: 시간배열,
            datasets: [{
                label: '서울 기온',
                data: 온도배열,
                // 기타 스타일 옵션 (선 색상, 점 스타일 등)
            }]
        }
    });
    ```

---

### 📌 추가 참고 사항

* **시간 형식 사용자 정의:** `Intl.DateTimeFormat` 객체의 `opt` 옵션을 조절하여 원하는 시간 형식을 세밀하게 설정할 수 있습니다.
* **시각화 요소 커스터마이징:** `pointStyle`, `pointRadius` 등의 Chart.js 옵션을 사용하여 차트의 점 모양이나 크기 등을 다양하게 변경할 수 있습니다.
* **데이터 슬라이싱:** 표시해야 할 데이터가 너무 많은 경우, `slice()` 메서드 등을 활용하여 적절한 범위로 데이터를 잘라서 차트에 표시하는 것이 성능 및 가독성 측면에서 좋습니다.
