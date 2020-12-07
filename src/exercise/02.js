// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

////////EXTRA CREDIT 3 DECLARATION/////////////////////////////
const useLocalStorageState = (key, defaultValue = '') => {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  /////////SOLUTION 1////////////////

  //const [name, setName] = React.useState(window.localStorage.getItem("name") || initialName)

  ////////EXTRA CREDIT 1 AND 2/////////////////////////////
  ////////EXTRA CREDIT 1 LAZY LOADING INITIAL STATE////////
  ////////EXTRA CREDIT 2 useEffect DEPENDENCIES////////////

  // const [name, setName] = React.useState(()=> {
  //   const initialState = window.localStorage.getItem("name") || initialName )

  // React.useEffect(()=> {
  //   window.localStorage.setItem("name", name)
  //     }, [name])

  ////////EXTRA CREDIT 1 AND 2/////////////////////////////
  ////////EXTRA CREDIT 1 LAZY LOADING INITIAL STATE////////
  ////////EXTRA CREDIT 2 useEffect DEPENDENCIES////////////

  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') || initialName,
  // )

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  ////////EXTRA CREDIT 3 CUSTOM HOOK IMPLEMENTATION////////////
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
