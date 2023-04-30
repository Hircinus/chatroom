import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className={`text-xl`}>
        Feel free to Chat!
      </h1>
      <div className={`text-center p-3 bg-blue-300`}>
        <input type="text"></input>
      </div>
    </main>
  )
}
