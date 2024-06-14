package com.example.foodie.Ingredient;

import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

    public String generateRecipes() {

        List<Ingredient> ingredients = findAll();
        StringBuilder ingredientsString = new StringBuilder();
        for (Ingredient ingredient : ingredients) {
            ingredientsString.append(ingredient.getName()).append(", ");
        }

        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS) // Set connection timeout
                .readTimeout(30, TimeUnit.SECONDS)    // Set read timeout
                .writeTimeout(30, TimeUnit.SECONDS)   // Set write timeout
                .build();

        MediaType mediaType = MediaType.parse("application/json");
        String requestBody = "{\"model\":\"cortext-ultra\",\"stream\":false,\"top_p\":1,\"temperature\":0.0001,\"max_tokens\":4096,\"messages\":[{\"role\":\"user\",\"content\":\"one meal recipe but your only ingredients are: " + ingredientsString + "\"}]}";
        RequestBody body = RequestBody.create(mediaType, requestBody);
        Request request = new Request.Builder()
                .url("https://api.corcel.io/v1/text/cortext/chat")
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("content-type", "application/json")
                .addHeader("Authorization", "57fbd5da-a1eb-4b0c-8e73-83088e05a3a4")
                .build();

        try {
            Response response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                String responseBody = response.body().string();
                System.out.println("Response: " + responseBody);

                JSONArray jsonArray = new JSONArray(responseBody);

                if (jsonArray.length() > 0) {
                    JSONObject firstObject = jsonArray.getJSONObject(0);
                    JSONArray choicesArray = firstObject.getJSONArray("choices");

                    if (choicesArray.length() > 0) {
                        JSONObject firstChoice = choicesArray.getJSONObject(0);
                        JSONObject deltaObject = firstChoice.getJSONObject("delta");

                        String content = deltaObject.getString("content");

                        return content;
                    } else {
                        System.err.println("Choices array is empty.");
                    }
                } else {
                    System.err.println("Response JSON array is empty.");
                }
            } else {
                System.err.println("Request failed: " + response.code() + " " + response.message());
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        return "";
    }

}
