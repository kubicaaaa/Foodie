import * as React from 'react';
import { Paper, Button, Box, TextField, } from '@mui/material';

export default function Ingredient() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [ingredient, setIngredients] = React.useState([]);


  const addIngredient = (e) => {
    e.preventDefault();
    const ingredient = { name, quantity, unit };
    console.log(ingredient);
    fetch("http://localhost:8080/app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient)
    }).then(() => {
      console.log("New ingredient added.");
      window.location.reload();
    });
  };

  function showRecipe() {

    var textField = document.getElementById("recipes");
    var title = document.getElementById("title");
    var time = document.getElementById("time");
    var ingredients = document.getElementById("ingredients");
    var instructions = document.getElementById("instructions");
    var usedIngredients = document.getElementById("used-ingredients");
    var usageField = document.getElementById("usage");
    var showButton = document.getElementById("showButton");

    title.innerHTML = "Generating recipe ...";
    textField.classList.add("show");
    fetch("http://localhost:8080/app/recipes")
      .then((response) => response.text())
      .then((responseText) => {
        const jsonString = responseText.substring(8, responseText.length - 3);
        const recipeData = JSON.parse(jsonString);

        title.innerHTML = recipeData.title;
        time.innerHTML = recipeData.time;
        ingredients.innerHTML = '<h2>Ingredients:</h2>' + recipeData.ingredients;
        instructions.innerHTML = '<h2>Instructions:</h2>' + recipeData.instructions;
        var used = recipeData.usage;
        for (const ingredient in used) {
          usedIngredients.innerHTML += (`${ingredient} ${used[ingredient]}, `);
        }
        showButton.innerText = `Show another recipe`; 
        usageField.classList.add("show");
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        textField.innerHTML = 'Error fetching recipes. Please try again later.';
      });
  }

  function updateIngredients() {
    const usedIngredients = document.getElementById('used-ingredients');
    const ingredientsArray = usedIngredients.textContent.split(',').map(item => item.trim());
  
    for (const ingredient of ingredientsArray) {
      if (ingredient === '') continue;

      const [name, quantity, unit] = ingredient.split(' ');
  
      console.log(`Ingredient: ${name}, Quantity: ${quantity}, Unit: ${unit}`);
  
      fetch(`http://localhost:8080/app/find/${name}`)
        .then(res => res.json())
        .then((result) => {
          if (result.length > 0) {
            console.log(result[0].id);
            console.log(result[0].quantity);
            const updatedQuantity = result[0].quantity - quantity;
            const updatedIngredient = {name, quantity: updatedQuantity, unit};
            console.log(updatedIngredient);
            fetch(`http://localhost:8080/app/${result[0].id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedIngredient)
            }).then(() => {
              console.log("Ingredients balance recalculated and updated.");
              window.location.reload();
            });
          } else {
            console.log(`No data found for ${name}`);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
    
  React.useEffect(() => {
    fetch("http://localhost:8080/app")
      .then(res => res.json())
      .then((result) => {
        setIngredients(result);
      });
  }, []);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >

      <Paper elevation={3} style={paperStyle}>
        <h1>New ingredient</h1>
        <TextField id="outlined-basic" label="What?" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '40%' }} />
        <TextField id="outlined-basic" label="How much/many?" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ width: '40%' }} />
        <TextField id="outlined-basic" label="Unit?" variant="outlined" value={unit} onChange={(e) => setUnit(e.target.value)} style={{ width: '20%' }} />
        <Button variant="contained" style={{ margin: '20px', width: '20%' }} onClick={addIngredient}>Add</Button>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1>What you can eat today?</h1>
        <Button variant="contained" id="showButton" style={{ margin: '20px', width: '50%' }} onClick={showRecipe}>Show me a recipe</Button>
        <Paper elevation={6} id="recipes" style={{ margin: "10px", padding: "15px", textAlign: "left" }} className="recipe-container">
          <h2 id="title"></h2>
          <p id="time"></p>
          <p id="ingredients"></p>
          <p id="instructions"></p>
          <p id="used-ingredients" hidden></p>
        </Paper>
        <Paper elevation={6} id="usage" style={{ margin: "10px", padding: "15px", textAlign: "left" }} className="recipe-usage">
          <h3>Did you use that recipe?</h3>
          <Button variant="contained" style={{ margin: '5px , 5px', width: '100%' }} onClick={updateIngredients}>Yes</Button>
        </Paper>      
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1>Your ingredients</h1>
        {ingredient.map(ingredient => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={ingredient.id}>
            <b>{ingredient.name} </b> 
            ({ingredient.quantity + ingredient.unit})
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
