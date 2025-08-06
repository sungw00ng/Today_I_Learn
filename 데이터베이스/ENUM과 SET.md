### ENUM
- key는 표현 값, value는 숫자로 저장된다.
- 예를 들어, ÈNUM('red,'green','blue')는 red:0,green:1,blue:2로 매핑된다.
- 최대 65,535 개의 요소들을 넣을 수 있다.

```sql
-- 데이터 베이스 선택(USE 데이터베이스이름)
USE a; 

CREATE TABLE drinks (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO drinks (name, size) VALUES 
('Lemonade', 'small'),
('Iced Coffee', 'medium'),
('Smoothie', 'large');

SELECT * FROM drinks;
```

<br>

### ENUM 결과표

| id | name        | size   |
| -- | ----------- | ------ |
| 1  | Lemonade    | small  |
| 2  | Iced Coffee | medium |
| 3  | Smoothie    | large  |

<br>

### SET
- 한 번에 여러 개의 조합으로 선택이 가능하다.
- 64개의 요소를 넣을 수 있다.
```sql
USE a;

CREATE TABLE pizza_orders (
    id INT NOT NULL AUTO_INCREMENT,
    toppings SET('cheese', 'pepperoni', 'mushroom', 'olive', 'onion') NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO pizza_orders (toppings) VALUES 
('cheese'),
('cheese,pepperoni'),
('mushroom,olive'),
('cheese,onion,mushroom'),
('cheese,pepperoni,olive,onion');

SELECT * FROM pizza_orders;
```

<br>

### SET 결과표

| id | toppings                     |
| -- | ---------------------------- |
| 1  | cheese                       |
| 2  | cheese,pepperoni             |
| 3  | mushroom,olive               |
| 4  | cheese,onion,mushroom        |
| 5  | cheese,pepperoni,olive,onion |
