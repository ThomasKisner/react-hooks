// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'


//////////SOLUTION 1//////////////
// function Greeting() {
//   const [name, setName] = React.useState("")

//   function handleChange(event) {
//     setName(event.target.value)
//   }

/////////SOLUTION 2///////////////

//Set default value so if initialName === undefined, input won't switch from uncontrolled to controlled with user input
function Greeting({initialName = ""}) {
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }


  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name}/>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Hans Gruber"/>
}

export default App
