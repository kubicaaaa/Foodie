package com.example.foodie.Ingredient;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class IngredientService {

    private final IngredientRepository repository;

    public IngredientService(IngredientRepository repository) {
        this.repository = repository;
    }

    public List<Ingredient> findAll() {
        return repository.findAll();
    }

    public void add(Ingredient ingredient) {
        repository.save(ingredient);
    }

    public boolean existsById(Integer id) {
        return repository.existsById(id);
    }

    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }

}
