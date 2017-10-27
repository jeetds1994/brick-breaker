import React from 'react'

const LostGame = ({ restartGame }) => {
  return(
    <div>
      <img onClick={restartGame} src="http://piq.codeus.net/static/media/userpics/piq_328844_400x400.png" alt="restart button"/>
    </div>
  )
}

export default LostGame
