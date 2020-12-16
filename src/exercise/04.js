// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('ttt:history', [
    Array(9).fill(null),
  ])
  const [currentStep, setCurrentStep] = useLocalStorageState('ttt:step', 0)

  const currentSquares = history[currentStep]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (currentSquares[square] || winner) {
      console.log('Selected an unavailable square')
      return
    } else {
      let historyCopy = history.slice(0, currentStep + 1)

      let currentSquaresCopy = [...currentSquares]

      currentSquaresCopy[square] = nextValue

      setHistory([...historyCopy, currentSquaresCopy])

      setCurrentStep(historyCopy.length)
    }
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = () => {
    return (
      <>
        {history.map((move, i) => {
          return (
            <li key={i}>
              {i + 1}{' '}
              <button
                disabled={i === currentStep}
                onClick={() => {
                  setCurrentStep(i)
                  // setHistory(history.splice(0, i))
                }}
              >
                Go to {i === 0 ? 'game start' : `move #${i}`}
              </button>
            </li>
          )
        })}
      </>
    )
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves()}</ol>
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
