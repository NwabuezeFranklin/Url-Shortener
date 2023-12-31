'use client'
import React, { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import AuthContext from '@/AuthContext/authContext'
import { revealPassword } from '@/utils/revealPassword'
import eye from '@/public/registration/eye.svg'

const SignupForm = () => {
  const UserNameRef = useRef<HTMLInputElement>(null)
  const EmailRef = useRef<HTMLInputElement>(null)
  const PasswordRef = useRef<HTMLInputElement>(null)
  const PasswordConfirmRef = useRef<HTMLInputElement>(null)

  const { registerUser } = useContext(AuthContext)
  const [error, setError] = useState<string>('')
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if EmailRef, PasswordRef, PasswordConfirmRef, and UserNameRef are not null or undefined
    if (
      !EmailRef.current ||
      !PasswordRef.current ||
      !PasswordConfirmRef.current ||
      !UserNameRef.current
    ) {
      setError('Invalid form data')
      return
    }
    const username = UserNameRef.current?.value
    if (!username) {
      setError('Please provide a username')
      return
    }

    const password = PasswordRef.current?.value
    const confirmPassword = PasswordConfirmRef.current?.value

    // Check if passwords match and have at least 8 characters
    if (password.length < 8) {
      setError('Passwords must contain 8 characters or more')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      // Clear the error state
      setError('')

      // Send registration request to the server
      const response = await registerUser(
        EmailRef.current?.value ?? '',
        PasswordRef.current?.value ?? '',
        PasswordConfirmRef.current?.value ?? '',
        UserNameRef.current?.value ?? ''
      )

      // Handle successful registration
      console.log('Registration successful:', response)
    } catch (error) {
      // Handle registration error
      setError('Registration failed. Please try again.')
      console.error('Registration error:', error)
    }
  }

  return (
    <section className="flex flex-col justify-center items-center w-full min-h-screen px-8 lg:px-[93px] ">
      {/* Display error message if present */}
      {error && <div className="text-red-500">{error}</div>}
      <p className="mb-4 text-sm text-[#5C6F7F]">Log in with:</p>
      <div className="flex gap-x-6 mb-4">
        <button className="w-[109px] h-10 flex justify-center items-center gap-x-[3px] text-sm text-white bg-primaryColor rounded">
          <Image
            src="/registration/google.svg"
            alt="google"
            width={20}
            height={20}
          />
          Google
        </button>
        <button className="w-[109px] h-10 flex justify-center items-center gap-x-[3px] text-sm text-white bg-primaryColor rounded">
          <Image
            src="/registration/apple.svg"
            alt="google"
            width={13}
            height={18}
          />
          Apple
        </button>
      </div>
      <div className="text-[#5C6F7F] relative mb-8 before:absolute before:bottom-[10px] before:bg-[#A0B1C0] before:right-[20px] before:w-[200px] before:h-[1px] after:absolute after:bottom-[10px] after:left-[20px] after:w-[200px] after:h-[1px] after:bg-[#A0B1C0]">
        Or
      </div>
      <form
        autoComplete="true"
        onSubmit={handleSignUp}
        className="w-full max-w-sm flex flex-col gap-y-8"
      >
        <div className="relative w-full">
          <input
            ref={UserNameRef}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border bg-transparent border-primaryColor rounded outline-none focus-within:outline-primaryColor"
          />
        </div>
        <div className="relative w-full">
          <input
            ref={EmailRef}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border bg-transparent border-primaryColor rounded outline-none focus-within:outline-primaryColor"
          />
        </div>
        <div className="relative w-full">
          <input
            ref={PasswordRef}
            type="password"
            placeholder="Password must contain 8 characters"
            className="w-full px-4 py-3 border bg-transparent border-primaryColor rounded outline-none focus-within:outline-primaryColor"
          />
          <Image
            src={eye}
            alt="Eye Hide Icon"
            className="absolute right-2 top-4 cursor-pointer"
            onClick={() => revealPassword(PasswordRef)}
            width={20}
            height={20}
          />
        </div>
        <div className="relative w-full">
          <input
            ref={PasswordConfirmRef}
            type="password"
            placeholder="Passwords must match"
            className="w-full px-4 py-3 border bg-transparent border-primaryColor rounded outline-none focus-within:outline-primaryColor"
          />
          <Image
            src={eye}
            alt="Eye Hide Icon"
            className="absolute right-2 top-4 cursor-pointer"
            onClick={() => revealPassword(PasswordConfirmRef)}
            width={20}
            height={20}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primaryColor mt-4 text-sm text-white rounded-full hover:bg-blue-600"
        >
          Sign up with Email
        </button>
      </form>
      <div className="w-full text-center mt-6">
        <div className="text-sm text-[#5C6F7F] mb-2">
          Already have an account?{' '}
          <Link href="/login" className="text-primaryColor">
            Log In
          </Link>
        </div>
        <div className="text-xs text-[#5C6F7F]">
          <p>
            By signing in with an account, you agree to Scissor&lsquo;s &lsquo;
            <span className="text-[#5C6F7F]">
              Terms of Service, Privacy Policy
            </span>
            &rsquo; and &lsquo;
            <span className="text-[#5C6F7F]">Acceptable Use Policy</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignupForm
