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
        Login
      </h1>
      <div className={`text-center p-3 bg-blue-300`}>
        <div className={`text-center p-3 bg-blue-300`}>
        <h1>Username:</h1>
        <input type="text"></input>
      </div>
      <h1>Password:</h1>
        <input type="text"></input>
    </div>
<div className={`text-center p-3 bg-blue-300`}>

          <Link href="message">
            Login
          </Link>
        </div>
      
      
    </main>
  )
}
