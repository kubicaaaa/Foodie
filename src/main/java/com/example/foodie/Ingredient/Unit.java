package com.example.foodie.Ingredient;

public enum Unit {
    g(0),
    kg(1),
    ml(2),
    l(3),
    pcs(4);

    private final int value;

    Unit(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
