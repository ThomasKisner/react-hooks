// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
  const [state, setState] = useLocalStorageState('ttt', Array(9).fill(null))
  const nextValue = calculateNextValue(state)
  const winner = calculateWinner(state)
  const status = calculateStatus(winner, state, nextValue)

  function selectSquare(square) {
    if (state[square] != null || winner != null) {
      console.log('Selected an unavailable square')
      return
    } else {
      let stateCopy = [...state]

      stateCopy[square] = nextValue
      setState(stateCopy)
    }
  }

  function restart() {
    setState(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {state[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, state, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : state.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(state) {
  const xSquaresCount = state.filter(r => r === 'X').length
  const oSquaresCount = state.filter(r => r === 'O').length

  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(state) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
