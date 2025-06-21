import { Socket } from 'socket.io';
import { v4 as UUIDv4 } from 'uuid';

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4(); // this will be our uique room id in which multiple connection will exchange data
        socket.join(roomId); // we will make the socket connection enter a new room
        socket.emit("room-created", { roomId }); // we willemit an event from server side that socket connection has been added to a room 
        console.log("Room created with id", roomId);
    }

    const joinedRoom = ({ roomId } : { roomId: string}) => {
        console.log("New user has joined room", roomId);
    }

    // when to call the above function ?

    // we will call the above two function when the client will emit events top create rooom and join room 
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
}

export default roomHandler;