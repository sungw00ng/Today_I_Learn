abstract class Coffee {
    public abstract void brew(); // 추출 방식

    public void addIngredients() {
        System.out.println("컵에 커피를 붓고 기본 재료를 추가합니다.");
    }
}

class Americano extends Coffee {
    @Override
    public void brew() {
        System.out.println("에스프레소를 추출한 후 물을 추가합니다.");
    }
}

class Latte extends Coffee {
    @Override
    public void brew() {
        System.out.println("에스프레소를 추출한 후 우유를 추가합니다.");
    }
}

class CoffeeMachine {
    public void makeCoffee(Coffee coffee) {
        coffee.brew();
        coffee.addIngredients();
        System.out.println("커피 완성!\n");
    }
}

public class Main {
    public static void main(String[] args) {
        CoffeeMachine machine = new CoffeeMachine();

        Coffee americano = new Americano();
        Coffee latte = new Latte();

        machine.makeCoffee(americano);
        machine.makeCoffee(latte);
    }
}
