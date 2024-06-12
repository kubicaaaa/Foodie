package com.example.foodie.Ingredient;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class IngredientController {

    @Autowired
    private IngredientService service;

    @GetMapping("")
    public List<Ingredient> getAll(){
        return service.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@Valid @RequestBody Ingredient ingredient) {
        service.add(ingredient);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{id}")
    public void update(@RequestBody Ingredient ingredient, @PathVariable Integer id) {
        if (!service.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ingredient not found");
        }
        service.add(ingredient);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
