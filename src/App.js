import React, { useState, useEffect } from 'react';


import words from './words'
import ShowError from './ShowError'
import Life from './Life'
import TypedLetter from './TypedLetter'

const App = () => {
  const [word, setword] = useState(words)
  const [value, setValue] = useState(Math.floor(Math.random() * words.length))
  const [letter, setLetter] = useState('')
  const [error, setError] = useState({ err: false, msg: '' })
  const [dashline, setDashline] = useState('')
  const [completed, setCompleted] = useState({ status: false, msg: '', life: word[value].length })
  const [typed, setTyped] = useState(new Set())
  const [start, setStart] = useState(false)
  const [won, setWon] = useState(false)

  const newArray = () => {
    const dashes = new Array(word[value].length)
    dashes.fill("-")
    return dashes
  }

  const dashlineCheck = () => {
    let count = 0
    let i
    for (i = 0; i < dashline.length; i++) {
      if (dashline[i] === "-") {
        count = count + 1
      }
    }
    if (count === 1) {
      return true
    }
    else {
      return false
    }
  }

  const display = () => {
    const n = newArray()
    const join_dashes = n.join(" ")
    setDashline(join_dashes)
  }

  const assciiValue = (l) => {
    const inputl = l.charCodeAt(0)
    if (inputl < 65 || inputl > 90) return false
    else return true
  }

  const inputValidation = (e) => {
    setLetter(e.target.value.toUpperCase())
    if (letter.length >= 1) {
      setError({ err: true, msg: 'letter must be single length' })
    }
  }

  const [str, setStr] = useState([newArray()])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!assciiValue(letter)) {
      setError({ err: true, msg: 'letter must be A to Z' })
    }
    else {
      let list = [...str]
      let not = false
      if (letter) {
        const mainWord = word[value].toUpperCase()
        let i
        for (i = 0; i < mainWord.length; i++) {
          if (mainWord[i] === letter) {
            setStart(true)
            list[0][i] = letter
            not = true
          }
        }
      }
      if (!not) {
        setError({ err: true, msg: 'Try next word' })
        if (start) {
          setCompleted({ life: completed.life - 1 })
          if (completed.life === 1) {
            setCompleted({ status: true, msg: 'YOU LOSE' })
          }
        }
      }

      setStr(list)
      const temp = list[0]
      const join_dashes = temp.join(" ")
      setDashline(join_dashes)
      if (dashlineCheck()) {
        setWon(true)
      }
    }
    const tempset = new Set(typed)
    tempset.add(letter)
    setTyped(tempset)
    setLetter('')
  }

  useEffect(() => {
    display()
  }, [])

  useEffect(() => {

  }, [won])

  const newWords = () => {
    window.location.reload()
  }

  return (
    <div className="section">
      {won ? <div><h1 className="won">You won!</h1> </div> : <div className="game-container">
        {!completed.status && <div>
          <Life life={completed.life} />
          <h2 className="dashline">{dashline}</h2>
          <h4 className="typed">Typed Letter : <TypedLetter typed={typed} /> </h4>
          <form onSubmit={handleSubmit}>
            <label >Enter A Letter :</label>
            <input type="text" placeholder="Enter a Letter" value={letter} onChange={(e) => inputValidation(e)} />
            <button>submit</button>
          </form>
          {error.err && <ShowError error={error} setError={setError} />}
        </div>
        }
        {completed.status && <div>
          <h1 className="word">{word[value]}!!</h1>
          <h1 className="finish">{completed.msg}!</h1>
        </div>
        }
      </div>}
      <button className="next-word" onClick={() => newWords()} >try new word</button>
    </div>
  )
}

export default App;