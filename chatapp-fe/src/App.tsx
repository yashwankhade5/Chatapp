import { ReactElement, useRef, useState,useEffect } from 'react'

function App() {

  const [websock,setwebsock]=useState<WebSocket>()
  const [roomjoin,setroomjoin]=useState()
  const inref=useRef<HTMLInputElement>(null)
  const roomref=useRef<HTMLInputElement>(null)
 function join() {
  //@ts-ignore
      websock?.send(`{"type":"join","payload":{"roomid":"${roomref.current?.value}"}}`)
  }
  function send() {
    if (!(typeof inref.current?.value == "string") ) {
      return
    }
    websock?.send(`{"type":"chat","payload":{"message":"${inref.current?.value}"}}`)
    inref.current.value = '';
  }



  useEffect(()=>{
   
    
      const ws = new WebSocket('ws://localhost:8080');
     ws.onopen=()=>{
      setwebsock(ws)
     }
      
    
    
   
  },[])

  return (
    <div>
      <div><input ref={roomref}  type='text'/><button onClick={()=>{
        join()
      }}>join</button></div>
    <input ref={inref} type='text'/>
    <button onClick={()=>{
send()
    }}>send</button>
    </div>
  )
}

export default App

