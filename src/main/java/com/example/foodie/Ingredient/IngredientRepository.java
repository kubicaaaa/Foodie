package com.example.foodie.Ingredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    @Query("SELECT i FROM Ingredient i WHERE i.name LIKE %:name%")
    List<Ingredient> listByName(@Param("name") String name);
}
