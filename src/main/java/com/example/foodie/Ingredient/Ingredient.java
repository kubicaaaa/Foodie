package com.example.foodie.Ingredient;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Ingredient {

    @Id
    private Integer id;
    private String name;
    private String quantity;

    public Ingredient() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
