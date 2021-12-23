import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>{part} {exercises}</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )
      }
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
      <strong>Total of {total} exercises</strong>
    </>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course