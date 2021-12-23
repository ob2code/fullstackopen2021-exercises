import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Input name here')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(false)

  // get data from JSON server  
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const found = persons.find(person => person.name === newName)

    if (found === undefined) {
      const personObj = { name: newName, number: newNum }
      personService.add(personObj)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName('')
          setNewNum('')
        })
      setMessage(`Added ${newName}`)
      setTimeout(() => { setMessage(null) }, 3000)
      setError(false)

    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...found, number: newNum }
        personService
          .update(found.id, changedPerson)
          .then(returnPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnPerson))
            setMessage(`Updated ${newName} with the new number`)
            setTimeout(() => { setMessage(null) }, 3000)
            setError(false)
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already removed from server`)
            setTimeout(() => { setMessage(null) }, 3000)
            setError(true)
          })

      }
    }
  }


  const foundPersons = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} />
      <Filter filter={filter} handle={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={{ value: newName, onChange: handleNameChange }}
        num={{ value: newNum, onChange: handleNumChange }}
      />

      <h2>Numbers</h2>
      <Persons persons={foundPersons} setPersons={setPersons} />
    </div>
  )
}

export default App