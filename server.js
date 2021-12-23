// DEPENDENCIES
const express = require('express');
const app = express();
const pokemon = require('./models/pokemon');
const methodOverride = require('method-override');
const port = 3000

// MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// INDEX
app.get('/pokemon', (req, res) => {
res.render('index.ejs', { 
  allPokemon: pokemon
  });
});

// NEW
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs')
})

// DELETE
app.delete('/pokemon/:indexOfPokemonArray', (req, res) => {
  pokemon.splice(req.params.indexOfPokemonArray, 1)
  res.redirect('/pokemon')
})

// UPDATE
app.put('/pokemon/:indexOfPokemonArray', (req, res) => {
  pokemon[req.params.indexOfPokemonArray] = req.body
  res.redirect('/pokemon')
})

// CREATE/POST
app.post('/pokemon', (req, res) => {
  res.redirect('/pokemon')
  pokemon.push(req.body)
})


// EDIT
app.get('/pokemon/:indexOfPokemonArray/edit', (req, res) => {
  res.render('edit.ejs', {
    singlePokemon: pokemon[req.params.indexOfPokemonArray],
    index: req.params.indexOfPokemonArray
  })
})

// SHOW
app.get('/pokemon/:indexOfPokemonArray', (req, res) => {
  res.render('show.ejs', { 
    singlePokemon: pokemon[req.params.indexOfPokemonArray], 
    name: `${pokemon[req.params.indexOfPokemonArray].name}`
  });
});


// LISTEN FOR REQUESTS
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})