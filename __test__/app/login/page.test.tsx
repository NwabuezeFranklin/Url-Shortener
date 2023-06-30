import { render, screen, fireEvent } from '@testing-library/react'
import LoginForm from '@/app/login/page'

describe('LoginForm component', () => {
  it('renders the login form without errors', () => {
    render(<LoginForm />)
  })

  it('allows users to fill in email and password fields', () => {
    render(<LoginForm />)

    const emailInput = screen.getByPlaceholderText(
      'Email address'
    ) as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'test123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('test123')
  })
})
