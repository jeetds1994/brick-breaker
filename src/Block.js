import React from 'react'

const Block = ({id, top, left}) => {
  const style = {
    backgroundColor: 'red',
    height: "30px",
    width: "75px",
    position: "absolute",
    borderStyle: "solid",
    top: top,
    left: left
  }
  return(
    <div className="block" id={id} style={style}></div>
  )
}

export default Block
