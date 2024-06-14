import * as React from 'react';
import { Paper, Button, Box, TextField, MenuItem } from '@mui/material';

export default function Ingredient() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [ingredient, setIngredients] = React.useState([]);

  const currencies = [
    {
      label: 'grams',
      value: 'g',
    },
    {
      label: 'pieces',
      value: 'pcs.',
    },
    {
      label: 'milliliters',
      value: 'ml',
    },
  ];


  const addIngredient = (e) => {
    e.preventDefault();
    const ingredient = { name, quantity };
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
        <Button variant="contained" style={{ margin: '20px', width: '20%' }} onClick={addIngredient}>+</Button>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1>Your ingredients</h1>
        {ingredient.map(ingredient => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={ingredient.id}>
            <b>{ingredient.name} </b> 
            ({ingredient.quantity})
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
