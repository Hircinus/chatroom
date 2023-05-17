import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSessionStorage from '@/hooks/useSessionStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const router = useRouter();

  const auth = useSessionStorage("auth")
  const [userData, setUserData] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/api/ext/getUsers")
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])
      const makeNewGroup = (selectedID) => {
        axios.post('http://localhost:8000/api/ext/setGroup',{
                  user_1_id: (router.query.id ? router.query.id : 0),
                  user_2_id: (selectedID ? selectedID : 0)
                })
                .then((response)=>{
                  console.log(response)
                    if(response.status == 201){
                      window.location.href = "http://localhost:3000/chat/"+router.query.id+"/"+response.data.id;
                    } else {
                        window.alert("It seems we encountered an error creating a new group with that user. Please try again later.");
                    }
                })
                .catch((error)=>{
                    console.log(error);
                });
      }
      const message = (selectedID) => {
        if(selectedID != 0 || selectedID != undefined) {
          axios.get("http://localhost:8000/api/ext/getGroup/"+router.query.id+"/"+selectedID)
          .then(response => {
            if(response.data.length == 0) {
              axios.get("http://localhost:8000/api/ext/getGroup/"+selectedID+"/"+router.query.id)
              .then(response => {
                if(response.data.length == 0) {
                  makeNewGroup(selectedID)
                }
                else {
                  window.location.href = "http://localhost:3000/chat/"+router.query.id+"/"+response.data[0].id;
                }
                })
                .catch(error => {
                      console.log(error)
                })
            }
            else {
              window.location.href = "http://localhost:3000/chat/"+router.query.id+"/"+response.data[0].id;
            }
            })
            .catch(error => {
                  console.log(error)
            })
        } else {
          return;
        }
      }
    const logout = () => {
      sessionStorage.setItem("auth", "false")
      window.location.href = "http://localhost:3000/login"
    }
  if(auth == "true") {
    return (
        <main
          className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
          <div className='p-5 bg-blue-300'>
            <button className='bg-white rounded text-sm p-1 hover:cursor-pointer hover:text-blue-800' onClick={()=>{logout()}}><FontAwesomeIcon icon={faRightFromBracket} /> Log out</button>
            <h1 className={`text-xl text-center m-2`}>
              Feel free to Chat!
            </h1>
            <h2 className='m-2 font-bold'>Users registered:</h2>
            <ul>
            {userData && userData.map((user) => {
              if(user.id == router.query.id) {
                return
              } else {
                return <li className='ml-2 mb-1' key={user.id}><button className='bg-white p-1 rounded hover:cursor-pointer hover:text-blue-800' onClick={() => {message(user.id)}}>{user.name} ({user.username})</button></li>
              }
            })}
            </ul>
          </div>
        </main>
      )
  } else {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>Sorry, you are not authorized to access this page.</main>
    )
  }
}