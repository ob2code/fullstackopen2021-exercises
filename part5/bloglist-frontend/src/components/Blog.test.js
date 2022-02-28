import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    title: 'This is a sample title',
    author: 'author',
    likes: 99,
    url: 'www.blog.org',
    user: { username: 'tester' }
  }

  let container
  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} increaseLike={mockHandler} />).container
  })
  // 5.13: Blog list tests, step1
  test('renders content', () => {

    const blogdiv = container.querySelector('.blog')
    expect(blogdiv).toHaveTextContent('This is a sample title author')

    const detaildiv = container.querySelector('.blogdetails')
    expect(detaildiv).toHaveStyle('display: none')

  })

  // 5.14*: Blog list tests, step2
  test('click button to show details', () => {

    const button = screen.getByText('view')
    userEvent.click(button)

    const detaildiv = screen.getByTestId('blogdetail')
    expect(detaildiv).not.toHaveStyle('display: none')
  })

  // 5.15: Blog list tests, step3
  test('the like button is clicked twice', () => {
    const button = screen.getByText('like')
    userEvent.click(button)
    userEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})