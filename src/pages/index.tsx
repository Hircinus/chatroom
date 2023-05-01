import Image from 'next/image'
import { Inter } from 'next/font/google'
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
        Welcome to Our Chatroom
      </h1>
      <div className={`text-center p-3 bg-blue-300`}>
        <button>
          Create an Account
        </button>
      </div>
      <div className={`text-center p-3 bg-blue-300`}>
        <button>
          Login
        </button>
      </div>
      {responseData && responseData.map(item => (
        <div key={item.id}>{item.message}</div>
      ))}
    </main>
  )
}
