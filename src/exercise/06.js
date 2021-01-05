// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm} from '../pokemon'
import {fetchPokemon} from '../pokemon'
import {PokemonInfoFallback} from '../pokemon'
import {PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  // const [status, setStatus] = React.useState('idle')
  // const [pokemonData, setPokemonData] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (pokemonName) {
      setState({...state, status: 'pending'})
      fetchPokemon(pokemonName)
        .then(response => {
          setState({status: 'resolved', pokemon: response})
        })
        .catch(error => {
          setState({...state, error: error, status: 'rejected'})
        })
    }
  }, [pokemonName])
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  if (state.status === 'idle') {
    return 'Submit a pokemon'
  } else if (state.status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  } else if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
