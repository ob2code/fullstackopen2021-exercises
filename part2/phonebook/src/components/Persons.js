import React from 'react'
import personService from '../services/persons'

const Persons = ({ persons, setPersons }) => {

    const removePerson = (id, name) => {

        if (window.confirm(`Delete ${name} ?`)) {
            personService.remove(id).then(
                () => setPersons(persons.filter(person => person.id !== id))
            )
        }
    }

    return (
        <ul>
            {persons.map(person =>
                <li key={person.id}>{person.name} {person.number} <button onClick={() => removePerson(person.id, person.name)}>delete</button></li>
            )}
        </ul>
    )
}



export default Persons