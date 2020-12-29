import React from 'react';
import { FaHeart} from 'react-icons/fa'

const Life = ({ life }) => {
  let l = new Array(life)
  l.fill(true)

  return (
    <div className="life">
      {l.map((li,index) => {
        return <div key={index} > <FaHeart/> </div>
      })}
    </div>
  )
}

export default Life;