import React from 'react'

const LostGame = ({ restartGame, score }) => {
  return(
    <div>
      <img onClick={restartGame} src="http://piq.codeus.net/static/media/userpics/piq_328844_400x400.png" alt="restart button"/>
      <h2>Your score was: </h2> <h1>{score}</h1>
    </div>
  )
}

export default LostGame
