import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8080})
interface sock{
    type:string,
    payload:{
        roomid?:string,
        message?:string
    }
}
const allRoom = new Map<WebSocket,string>()
wss.on("connection",(socket:WebSocket)=>{
  socket.on("message",(wsss:string)=>{
    const wbs:sock= JSON.parse(wsss)
    console.log(wbs)
if (wbs.type === "join" && wbs.payload.roomid) {
   
allRoom.set(socket,wbs.payload.roomid)

socket.send("connected to the room") 
} else if (wbs.type === "chat" && wbs.payload.message) {
 
  wss.clients.forEach(client=>{
   
    if(client !== socket && allRoom.get(socket)===allRoom.get(client) && client.readyState === WebSocket.OPEN ){
    
      client.send(JSON.stringify(wbs.payload.message))
    }
  })
} 
  })
   
  socket.on("close",()=>{
   
    allRoom.delete(socket)
   
  })
})
