import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostVote = ({maxVote,mostVote}) => {
  if (maxVote < 0) {
    return (
      <div>
        <i>Not available!</i>
      </div>
    )
  }

  return (
    <div>
      <blockquote>"{mostVote}"</blockquote> has {maxVote} votes
    </div>
  )
}

const App = () => {

  const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min) ) + min
      
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))
  const [maxVote, setMaxVote] = useState(-1)
  const [mostVote, setMostVote] = useState('')

  const handleClick = () => {
    setSelected(getRndInteger(0, anecdotes.length))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1    
    setVote(copy)
    
    if (copy[selected] > maxVote){
      setMaxVote(copy[selected])
      setMostVote(anecdotes[selected])
    }
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVote} text={'vote'} />
      <Button handleClick={handleClick} text={'next anecdotes'} />      
      <h1>Anecdote with most votes</h1>
      <MostVote maxVote={maxVote} mostVote={mostVote}/>
    </div>
  )
}

export default App