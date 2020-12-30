import React from 'react'

const TypedLetter = ({typed}) => {
  const arr = Array.from(typed)
  const temp = arr.join(" ")

  return(
    <i>{temp}</i>
  )
}

export default TypedLetter;