import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {  
  const { total,good,neutral,bad } = props.stats

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <tr><td>Good</td><td>{good}</td></tr>
        <tr><td>Neutral</td><td>{neutral}</td></tr>
        <tr><td>Bad</td><td>{bad}</td></tr>
        <tr><td>All</td><td>{total}</td></tr>
        <tr><td>Average</td><td>{(good+(-1*bad))/total}</td></tr>
        <tr><td>Positive</td><td>{good/total*100} %</td></tr>
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total+1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total+1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics stats={{total,good,neutral,bad}}/>
    </div>
  )
}

// ----------------------
export default App