import React from 'react'

const Menu = ({ triggerStartGame }) => {
  return(
    <div>
      <img id="logo" src="https://fontmeme.com/permalink/171026/a00ccff7d2633323118592cb5dd7401f.png" alt="logo"/>

      <img onClick={triggerStartGame} id="startButton" src="http://pixelartmaker.com/art/37227cb13801b11.png" alt="start" />
    </div>
  )
}

export default Menu
