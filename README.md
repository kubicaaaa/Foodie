# Foodie 🍳

A web application that helps you discover what you can cook with the ingredients you have at home. Foodie uses AI to generate personalized recipes based on your available ingredients and automatically tracks your ingredient inventory.

## Features

- **Ingredient Management**: Add, view, and track your ingredients with quantities and units
- **AI-Powered Recipe Generation**: Get personalized recipe suggestions based on your available ingredients
- **Automatic Inventory Updates**: When you use a recipe, your ingredient quantities are automatically updated
- **Smart Recipe Matching**: Only suggests recipes using ingredients you actually have
- **Detailed Recipe Information**: View cooking time, ingredients list, and step-by-step instructions

## Tech Stack

### Backend

- **Spring Boot 3.3.0** - Java framework for building the REST API
- **Spring Data JPA** - Data persistence layer
- **MySQL** - Database for storing ingredients
- **OkHttp** - HTTP client for API calls
- **Corcel AI API** - AI service for recipe generation

### Frontend

- **React** - UI framework
- **Material-UI (MUI)** - Component library for polished UI
- **JavaScript** - Frontend logic

## Usage

### Adding Ingredients

1. Fill in the ingredient form with:
   - **What?** - Ingredient name (e.g., "flour", "eggs")
   - **How much/many?** - Quantity (numeric value)
   - **Unit?** - Unit of measurement (g, kg, ml, l, pcs)
2. Click the **Add** button
3. Your ingredient will appear in the "Your ingredients" section

### Generating Recipes

1. Click the **Show me a recipe** button
2. Wait while the AI generates a recipe using your available ingredients
3. Review the recipe details:
   - Title and cooking time
   - Required ingredients with amounts
   - Step-by-step instructions

### Using a Recipe

1. After generating a recipe, if you decide to cook it, click the **Yes** button in the "Did you use that recipe?" section
2. Your ingredient quantities will be automatically updated based on what was used in the recipe

## API Endpoints

### Ingredients

- `GET /app` - Get all ingredients
- `POST /app` - Add a new ingredient
- `PUT /app/{id}` - Update an ingredient
- `DELETE /app/{id}` - Delete an ingredient
- `GET /app/find/{name}` - Find ingredients by name

### Recipes

- `GET /app/recipes` - Generate a recipe based on available ingredients

## Project Structure

```
foodie/
├── src/
│   ├── main/
│   │   ├── java/com/example/foodie/
│   │   │   ├── Application.java
│   │   │   └── Ingredient/
│   │   │       ├── Ingredient.java
│   │   │       ├── IngredientController.java
│   │   │       ├── IngredientRepository.java
│   │   │       ├── IngredientService.java
│   │   │       └── Unit.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── gui/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Appbar.js
│   │   │   └── Ingredient.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── pom.xml
```

## Data Model

### Ingredient Entity

- `id` (Integer) - Auto-generated primary key
- `name` (String) - Ingredient name
- `quantity` (String) - Amount available
- `unit` (Unit enum) - Unit of measurement (g, kg, ml, l, pcs)

## Configuration Notes

- The application uses the Corcel AI API for recipe generation
- API timeout is set to 30 seconds for all operations
- CORS is enabled for cross-origin requests from the React frontend
