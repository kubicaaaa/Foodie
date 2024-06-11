package com.example.foodie.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public record Ingredient(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Integer id,
        @NotBlank
        String name,
        @NotBlank
        String quantity
) {
}
