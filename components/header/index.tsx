'use client'
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthContext from '@/AuthContext/authContext'
import Logo from '../../public/header/Logo.svg'

interface NavLinksProps {
  title: string
  path: string
}

const navLinks: NavLinksProps[] = [
  { title: 'My URLs', path: '/myUrls' },
  { title: 'Features', path: '/#features' },
  { title: 'Pricing', path: '/#pricing' },
  { title: 'Analytics', path: '/#analytics' },
  { title: 'FAQs', path: '/#faq' },
]

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext)

  const pathname = usePathname()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    handleScroll()
    handleResize()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const headerStyle =
    scrollPosition > 100 ? 'bg-white shadow-md' : 'bg-transparent'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`${headerStyle} fixed left-0 top-0 z-[100] w-full flex py-3 justify-between items-center px-8 lg:px-[93px]`}
    >
      <Link href="/">
        <Image src={Logo} alt="Scissors App Logo" />
      </Link>
      {windowWidth < 768 ? (
        <div className="flex items-center">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isMenuOpen ? (
            <div className="absolute top-16 right-0 bg-white rounded-md shadow-md mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.path}
                  className={`block px-4 py-2 ${
                    pathname === link.path ? 'text-[#0065FE]' : ''
                  }`}
                  onClick={toggleMenu}
                >
                  {link.title}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-[#0065FE] font-semibold"
                    onClick={toggleMenu}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-[#0065FE] font-semibold"
                    onClick={toggleMenu}
                  >
                    Try for free
                  </Link>
                </>
              )}
              {user && (
                <button
                  onClick={() => {
                    logoutUser()
                    toggleMenu()
                  }}
                  className="block px-4 py-2 text-[#0065FE] font-semibold"
                >
                  Log out
                </button>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex justify-between gap-x-10 text-blackVariant">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className={pathname === link.path ? 'text-[#0065FE]' : ''}
            >
              {link.title}
            </Link>
          ))}
          {user ? (
            <button
              onClick={logoutUser}
              className="block px-4 py-2 text-[#0065FE] font-semibold"
            >
              Log out
            </button>
          ) : (
            <div className="flex items-center gap-x-9">
              <Link href="/login" className="text-[#0065FE] font-semibold">
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-[#005AE2] px-6 py-3 text-white rounded-[100px] ease-in-out duration-300 hover:bg-blue-600 hover:scale-95"
              >
                Try for free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
