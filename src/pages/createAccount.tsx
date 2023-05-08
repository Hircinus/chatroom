import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const getData = () =>{
    const item1 = form.name;
    const item2 = form.user;
    var item3ish = form.pass
    console.log(item1)
    if(item1 === '' || item2 === '' || item3ish === ''){
        window.alert("Missing account details");
        return;
    }
    var md5 = require('md5');
    const item3 = md5(item3ish);
    addItem({"name": item1, "user": item2, "pass": item3});
  }

  const addItem = (item)=>{
    axios.post('http://localhost:8000/api/ext/setUser',{
        name: item.name,
        username: item.user,
        password: item.pass
      })
      .then((response)=>{
        if(response === 200){
          window.alert("Missing account details");
        }
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  const [form, setForm] = useState({
    name: '',
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
        Create an account
      </h1>
      <div className={`text-center p-3 bg-blue-300`}>
        <h1>Name:</h1>
        <input type="text" id="name" onChange={changeHandler}></input>
      </div>
      <div className={`text-center p-3 bg-blue-300`}>
        <h1>Username:</h1>
        <input type="text" id="user"  onChange={changeHandler}></input>
      </div>
      <div className={`text-center p-3 bg-blue-300`}>
        <h1>Password:</h1>
        <input type="text" id="pass" onChange={changeHandler}></input>
      </div>
      <div className={`text-center p-3 bg-blue-300`}>
        <button onClick={getData}>Create Account</button>
      </div>
      <div className={`text-center p-3 bg-blue-300`}>
      <Link href="login">
          Login
        </Link>
      </div>
    </main>
  )
}
