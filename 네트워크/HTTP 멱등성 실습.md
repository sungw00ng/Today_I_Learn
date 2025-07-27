### 개념
- 멱등성이란 같은 요청을 여러 번 보내도 결과가 한 번만 처리된 것과 동일한 상태가 되는 특성이다.
- 주로 POST 메서드는 기본적으로 멱등하지 않기 때문에, Idempotency-Key를 이용해 중복 요청을 방지하는 식으로 멱등성을 구현한다.
- 결제 API나 주문 API처럼 중복 처리가 위험한 상황에서 자주 사용된다.

### 장점
- 일관성 유지: 네트워크 문제로 요청을 여러 번 보냈을 때도, 결과는 항상 한 번 처리한 것과 같다.
- 유지보수성 향상: 복잡한 재시도 로직 없이 안전하게 클라이언트 재전송 처리 가능하다.

### 컨트롤러
```java
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final Map<String, Order> idempotencyKeyStore = new ConcurrentHashMap<>();

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyKey,
            @RequestBody OrderRequest request) {

        if (idempotencyKey == null || idempotencyKey.isEmpty()) {
            return ResponseEntity.badRequest().body("Idempotency-Key 헤더가 필요합니다.");
        }

        // 이미 처리된 요청인지 확인
        if (idempotencyKeyStore.containsKey(idempotencyKey)) {
            return ResponseEntity.ok().body(
                Map.of("message", "이미 처리된 요청입니다.", "result", idempotencyKeyStore.get(idempotencyKey))
            );
        }

        // 주문 생성 로직 (예: 랜덤 주문 ID 생성)
        Order newOrder = new Order(UUID.randomUUID().toString(), request.getItems(), request.getTotal());

        // 저장
        idempotencyKeyStore.put(idempotencyKey, newOrder);

        return ResponseEntity.status(HttpStatus.CREATED).body(newOrder);
    }
}
```

### Order 클래스
```Java
public class Order {
    private String id;
    private List<String> items;
    private int total;

    public Order(String id, List<String> items, int total) {
        this.id = id;
        this.items = items;
        this.total = total;
    }

    // getter 생략
}
```

### OrderRequest DTO
```java
public class OrderRequest {
    private List<String> items;
    private int total;

    // getter, setter 생략
}
```

