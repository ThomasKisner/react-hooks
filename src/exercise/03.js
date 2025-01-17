// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

///////////MAIN EXERCISE/////////////////////////
// function Name({name, onNameChange}) {
//   return (
//     <div>
//       <label htmlFor="name">Name: </label>
//       <input id="name" value={name} onChange={onNameChange} />
//     </div>
//   )
// }

// // 🐨 accept `animal` and `onAnimalChange` props to this component
// function FavoriteAnimal({animal, setAnimal}) {
//   // 💣 delete this, it's now managed by the App

//   return (
//     <div>
//       <label htmlFor="animal">Favorite Animal: </label>
//       <input
//         id="animal"
//         value={animal}
//         onChange={event => setAnimal(event.target.value)}
//       />
//     </div>
//   )
// }

// // 🐨 uncomment this
// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }

// // 💣 remove this component in favor of the new one
// // function Display({name}) {
// //   return <div>{`Hey ${name}, you are great!`}</div>
// // }

// function App() {
//   // 🐨 add a useState for the animal
//   const [name, setName] = React.useState('')
//   const [animal, setAnimal] = React.useState('')
//   return (
//     <form>
//       <Name name={name} onNameChange={event => setName(event.target.value)} />
//       {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
//       <FavoriteAnimal animal={animal} setAnimal={setAnimal}/>
//       {/* 🐨 pass the animal prop here */}
//       <Display name={name} animal={animal} />
//     </form>
//   )
// }


////////////////EXTRA CREDIT 1//////////////////////////////
function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(e)=> setName(e.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, setAnimal}) {


  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => setAnimal(event.target.value)}
      />
    </div>
  )
}

// 🐨 uncomment this
function Display({ animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

// 💣 remove this component in favor of the new one
// function Display({name}) {
//   return <div>{`Hey ${name}, you are great!`}</div>
// }

function App() {
  // 🐨 add a useState for the animal

  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name  />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} setAnimal={setAnimal}/>
      {/* 🐨 pass the animal prop here */}
      <Display  animal={animal} />
    </form>
  )
}




export default App
