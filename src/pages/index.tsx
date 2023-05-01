import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className={`text-xl`}>
        Welcome to Our Chatroom
      </h1>
      <div className={`text-center p-3 bg-blue-300`}>
        <Link href="createAccount">
          Create an Account
        </Link>
      </div>
      <div className={`text-center p-3 bg-blue-300`}>
      <Link href="login">
          Login
        </Link>
      </div>
    </main>
  )
}
