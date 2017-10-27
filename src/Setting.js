import React from 'react'

const Setting = ({triggerGrayScale}) => {
  return(
    <div>
      <h1>Settings </h1>
      <h4>Accessibilty </h4>
      <h5>Grayscale</h5>
      <input id="checkBox" type="checkbox" onChange={triggerGrayScale}/>
    </div>
  )
}

export default Setting
