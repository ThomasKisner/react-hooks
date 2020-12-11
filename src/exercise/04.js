// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null))
  const [nextValue, setNextValue] = React.useState('X')
  const [winner, setWinner] = React.useState(null)
  const [status, setStatus] = React.useState(`Next player: ${nextValue}`)

  function selectSquare(square) {
    if (squares[square] != null || winner != null) {
      console.log('Selected an unavailable square')
      return
    } else {
      let squaresCopy = [...squares]

      squaresCopy[square] = nextValue
      setSquares(squaresCopy)
      console.log()
      setNextValue(calculateNextValue(squaresCopy))
      let gameWinner = calculateWinner(squaresCopy)

      if (gameWinner != null) {
        setWinner(gameWinner)
      }

      setStatus(
        calculateStatus(
          gameWinner,
          squaresCopy,
          calculateNextValue(squaresCopy),
        ),
      )
    }
  }

  function restart() {
    setSquares(Array(9).fill(null))
    setWinner(null)
    setStatus(`Next player: X`)
    setNextValue('X')
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
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
function calculateStatus(winner, squares, nextValue) {
  console.log('passed Next Value: ', nextValue)
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  console.log(squares)
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  console.log('xSquareCount', xSquaresCount)
  console.log('oSquareCount', oSquaresCount)
  console.log(
    'Calculated nextValue',
    oSquaresCount === xSquaresCount ? 'X' : 'O',
  )
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
