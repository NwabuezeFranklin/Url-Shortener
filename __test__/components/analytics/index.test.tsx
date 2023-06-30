import { render, screen } from '@testing-library/react'
import Analytics from '@/components/analytics'

describe('Analytics component', () => {
  it('renders the analytics data correctly', () => {
    render(<Analytics />)

    const activeUsersElement = screen.getByText('3M')
    const linksQrGeneratedElement = screen.getByText('60M')
    const clickedOrScannedElement = screen.getByText('1M')
    const appIntegrationElement = screen.getByText('300M')

    expect(activeUsersElement).toBeInTheDocument()
    expect(linksQrGeneratedElement).toBeInTheDocument()
    expect(clickedOrScannedElement).toBeInTheDocument()
    expect(appIntegrationElement).toBeInTheDocument()
  })
})
