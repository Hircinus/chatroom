import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import axios from 'axios';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

// export async function getMessages() {
//   const axios_ = require('axios');

//       const res = await axios.get("http://localhost:8000/api/ext/getMessages", {
//       //We can add more configurations in this object
//          params: {
//         //This is one of the many options we can configure
//          }
//       });
//       console.log(res.data)
//       return {
//           props: {
//               data: res.data
//           }
//       }
//   };
export default function Home() {
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className={`text-xl`}>
        Welcome to Our Chatroom
      </h1>
      <div className={`text-center p-3 bg-blue-300`}>
        <Link className='p-1 bg-white rounded hover:cursor-pointer hover:text-blue-800' href="createAccount">
          Create an Account
        </Link>
      </div>
      <div className={`text-center p-3 bg-blue-300`}>
      <Link className='p-1 bg-white rounded hover:cursor-pointer hover:text-blue-800' href="login">
          Login
        </Link>
      </div>
      
      
    </main>
  )
}
