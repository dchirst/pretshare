import {useEffect, useState} from 'react'

import '../App.css'

import Increment from "../components/Increment";
import {doc, increment, onSnapshot, serverTimestamp, setDoc, getDoc} from "firebase/firestore";
import db from "../Firebase";
import Counter from "../components/Counter";

import Timer from "../components/Timer";
import {useParams} from "react-router-dom";
import {LastPret} from "../components/LastPret";
import {RoomName} from "../components/RoomName";
import {Reserve} from "../components/Reserve";
import {LogOut} from "../components/LogOut";


interface Params {
    roomId: string
}


// export async function action() {
//   const contact = await createRoom(roomId);
//   return { contact };
// }
//


async function getRoom(roomId: string) {
    const room = await getDoc(doc(db, "prets", roomId))
    if ( room.exists()) {
        return room
    } else {
        throw new Response("", {
              status: 404,
              statusText: "Not Found",
            });
    }
    return
}

// @ts-ignore
export async function loader(request) {
  const contacts = await getRoom(request.params.roomId);
  return { contacts };
}

function Room() {
    const params = useParams()

    const [count, setCount] = useState<number>(0)
    const [lastPret, setLastPret] = useState<Date|undefined>(undefined)
    // @ts-ignore
    const [roomId, setRoomId] = useState<string>(params.roomId)
    const [disabled, setDisabled] = useState(false)
    const [reserved, setReserved] = useState(false)
    useEffect(() => {
        console.log("Saving roomID")
        localStorage.setItem("roomId", JSON.stringify(roomId));
        const unsub = onSnapshot(doc(db, "prets", roomId), { includeMetadataChanges: false }, (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const data = doc.data();
        console.log(data)
        let np: number
        if (data === undefined) {
            np = 0;
        } else {
             np = data.numPrets;
        }
        setCount(np);
        if (!doc.metadata.hasPendingWrites && data !== undefined && data.lastPret) {
            setLastPret(data.lastPret.toDate())
        }
        let res: boolean
        if (data === undefined) {
            res = false
        } else {
            res = data.reserved
        }
        setReserved(res)


    })
    },[])

    let reachedLimit = count >= 5

  return (
      <div>
          <div>
              <RoomName roomId={roomId}/>
              <Timer lastPret={lastPret} reachedLimit={reachedLimit} setDisabled={setDisabled}/>
              <Counter numPrets={count}/>
              <LastPret lastPret={lastPret} reachedLimit={reachedLimit}/>
              <Increment disabled={disabled} roomId={roomId}/>
              <Reserve roomId={roomId} reserved={reserved}/>
          </div>

          <LogOut/>
      </div>

  )
}

export default Room
