import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className={`text-xl`}>
        Welcome to our chatroom
      </h1>
      <div className={`text-center mx-auto p-3 m-3 bg-green-100`}>
        <p>
          Login box
        </p>
      </div>
    </main>
  )
}
