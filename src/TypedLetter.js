import React from 'react'

const TypedLetter = ({typed}) => {
  const arr = Array.from(typed)
  const temp = arr.join(" ")

  return(
    <div>{temp}</div>
  )
}

export default TypedLetter;