import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCallback } from "react"
import useSessionStorage from '@/hooks/useSessionStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [currentMessages, setCurrentMessages] = useState([])
    const [content, setContent] = useState("Loading...")
    const auth = useSessionStorage("auth")
    useEffect(() => {
        if(router.query.id!=undefined){
            checkMessages()
         }
        }, [router.query.id]);

        const sendMessage = () => {
            console.log(content)
            axios.post('http://localhost:8000/api/ext/setMessage',{
                message: content,
                group_id: parseInt(router.query.id[1]),
                sender_id: parseInt(router.query.id[0])
            })
            .then((response)=>{
                if(response.status == 201){
                    window.alert("Message sent")
                    setContent("")
                    checkMessages()
                } else {
                    window.alert("It seems we couldn't deliver your message. Please try again later.");
                }
            })
            .catch((error)=>{
                console.log(error);
            });
        }

        const getOtherUsername = () => {
            axios.get("http://localhost:8000/api/ext/getGroup/"+router.query.id[1])
                .then(response => {
                    let other_id = (response.data[0].user_2_id == router.query.id[0]) ? response.data[0].user_1_id : response.data[0].user_2_id;
                    axios.get("http://localhost:8000/api/ext/getUser/"+other_id)
                    .then(response => {
                        console.log(response)
                        setUsername(response.data[0].name);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }

        const checkMessages = () => {
            axios.get("http://localhost:8000/api/ext/getMessages/"+router.query.id[1])
                    .then(response => {
                        console.log(response)
                        setCurrentMessages(response.data);
                        if(content == "Loading...") {
                            setContent("")
                        }
                        if(username == "") {
                            getOtherUsername()
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
        }
        setInterval(()=>{if(router.query.id!=undefined){
            checkMessages()
         }}, 15000);
    
        if(auth == "true") {
            return (
                <main
                className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
                >
                <div className={`p-5 bg-blue-300`}>
                    <button className='bg-white p-1 rounded text-left text-sm hover:cursor-pointer' onClick={()=>{window.location.href="http://localhost:3000/message/"+router.query.id[0]}}><FontAwesomeIcon icon={faArrowLeft} /> Go back</button>
                    <h1 className='text-xl text-center'>{username}</h1>
                    <ul id='messageHolder'>{currentMessages && currentMessages.map((message) => {
                    if(message.sender_id == router.query.id[0]) {
                        return <li key={message.id} className='border-b-blue-500 text-left'><strong>You:</strong> {message.message}</li>
                    } else {
                        return <li key={message.id} className='border-b-red-500 text-right'>{username}: {message.message}</li>
                    }
                })}</ul>
                    <input type="text" value={content} onChange={e => { setContent(e.currentTarget.value); }}></input>
                    <button className='bg-white p-1 m-1 rounded hover:cursor-pointer' onClick={() => {sendMessage()}}><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
                </main>
            )
        } else {
            return (
                <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>Sorry, you are not authorized to access this page.</main>
            )
        }
}