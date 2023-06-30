import { render, screen } from '@testing-library/react'
import FAQ from '@/components/faq'

describe('FAQ component', () => {
  it('renders the FAQ component without errors', () => {
    render(<FAQ />)
  })

  it('displays the FAQ section heading', () => {
    render(<FAQ />)
    const heading = screen.getByText('FAQ')
    expect(heading).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<FAQ />)
    expect(container).toMatchSnapshot()
  })
})
