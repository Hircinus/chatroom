import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/ext/getMessages")
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
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
      {responseData && responseData.map(item => (
        <div key={item.id}>{item.message}</div>
      ))}
    </main>
  )
}
