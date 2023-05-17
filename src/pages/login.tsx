import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import useSessionStorage from '../hooks/useSessionStorage'

    const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [userData, setUserData] = useState([])
  const getData = () =>{
    const item1 = form.user;
    var item2ish = form.pass
    console.log(item1)
    if(item1 === ''|| item2ish === ''){
        window.alert("Missing account details");
        return;
    }
    var md5 = require('md5');
    const item3 = md5(item2ish);
    getItem({"user": item1, "pass": item3});
  }

  const getItem = (item)=>{
    console.log(item.user)
    console.log(item.pass)
    console.log(form)

    axios.get('http://localhost:8000/api/ext/getUser/'+item.user + "/" + item.pass,{
            })
      .then((response)=>{
        setUserData(response.data);
        const userId = response.data[0].id;
        sessionStorage.setItem("auth", "true")
        window.location.href="message/"+userId
          
      })
      .catch((error)=>{
        if(error.response.status == 429) {
          window.alert("The server is overloaded. Please try again later.")
        }
        console.log(error);
      });
  }
  const [form, setForm] = useState({
    user: '',
    pass: ''
  })

  const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

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
        <input type="text" id="user" onChange={changeHandler}></input>
        <h1>Password:</h1>
        <input type="text" id="pass" onChange={changeHandler}></input>
      </div>
      
        <button className='p-1 bg-white rounded hover:cursor-pointer hover:text-blue-800' onClick={getData}>Login</button>
    </div>
    <div className={`text-center p-3 bg-blue-300`}>
    <Link className='p-1 bg-white rounded hover:cursor-pointer hover:text-blue-800' href="createAccount">
          Create account
        </Link>
      
    </div>
      
      
    </main>
  )
}

