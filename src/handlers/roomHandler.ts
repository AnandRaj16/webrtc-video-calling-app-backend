import { Socket } from 'socket.io';
import { v4 as UUIDv4 } from 'uuid';
import IRoomParams from '../interfaces/IRoomParams';

/**
* {1: [ul, u2, u3], 2: [u4, u5, u6]}
*/

const rooms : Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {
    
    const createRoom = () => {

        // this will be our uique room id in which multiple
        // connection will exchange data
        const roomId = UUIDv4();

        // we will make the socket connection enter a new room
        socket.join(roomId);

        rooms[roomId] = []; // create a new entry in the room

        // we willemit an event from server side that 
        // socket connection has been added to a room 
        socket.emit("room-created", { roomId }); 
        console.log("Room created with id", roomId);
    };

    /**
     * 
     * The below function is excecuted everytime a user (a creator or joinee) joins a new room.
     */

    const joinedRoom = ({ roomId, peerId } : IRoomParams ) => {
        console.log("Joinded room called", rooms);
        if(rooms[roomId]) {
            // If the given roomId exists in the memory db
            console.log("New user has joined room", roomId, "with peer id as", peerId);
            rooms[roomId].push(peerId);
            console.log("added peer to room", rooms);
            socket.join(roomId); // make the user join the socket room

            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            })
        }
    };

    // when to call the above function ?

    // we will call the above two function when the client will emit events top create rooom and join room 
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;