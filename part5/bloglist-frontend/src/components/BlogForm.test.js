import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  const blog = {
    title: 'This is a sample title',
    author: 'malibu',
    likes: 99,
    url: 'www.blog.org',
    user: { username: 'tester' }
  }

  // 5.16: Blog list tests, step4
  test('the form calls the event handler', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getAllByRole('textbox')
    const createButton = screen.getByText('create')

    userEvent.type(titleInput[0], blog.title)
    userEvent.type(titleInput[1], blog.author)
    userEvent.type(titleInput[2], blog.url)

    userEvent.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0].title).toBe('This is a sample title')
    expect(createBlog.mock.calls[0][0].author).toBe('malibu')
    expect(createBlog.mock.calls[0][0].url).toBe('www.blog.org')

  })
})