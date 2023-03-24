import {addDoc, collection, doc, getDoc, setDoc} from "firebase/firestore";
import db from "../Firebase";
import room from "./Room";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {HomeTitle} from "../components/HomeTitle";

export default function Home() {

    const navigate = useNavigate()
    const [enterError, setEnterError] = useState(false)
    const [roomId, setRoomId] = useState(() => {
      // getting stored value
      const saved = localStorage.getItem("roomId");
      // @ts-ignore
        const initialValue = JSON.parse(saved);
      return initialValue || undefined;
    });

    async function goToRoom(roomId: string) {
        const docSnap = await getDoc(doc(db, "prets", roomId));
      if (docSnap.exists()) {
          setEnterError(false)
          navigate(`/rooms/${roomId}`)
      } else {
          setEnterError(true)
          console.log("Room does not exist")
      }
    }

    async function handleSubmit(event: any) {
      event.preventDefault();
      const roomId = event.target.roomId.value
        goToRoom(roomId)
  }

 async function makeNewRoom() {
        return await addDoc(collection(db, "prets"), {
            numPrets: 0,
            lastPret: null,
            reserved: false
        }).then(res => navigate(`/rooms/${res.id}`))
  }

  if (roomId) {
      console.log("Got saved roomId", roomId)
      goToRoom(roomId)
  }

  return (

      <div className="m-auto">
          <HomeTitle/>
           <form onSubmit={handleSubmit}>
              <input name="roomId"
                     className={"placeholder:italic mx-auto my-3 placeholder:text-slate-400 block bg-white border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-50 focus:ring-sky-500 focus:ring-1 sm:text-sm " + (enterError ? "border-red-500": "border-slate-300")}
                        placeholder="Room ID"></input>
              {enterError && <p className="text-red-500 italic">Room ID not valid</p>}
              <button type={"submit"} className="btn-primary">Enter Room</button>

          </form>
          <p>or</p>
          <button className="btn-primary" onClick={makeNewRoom}>Create New Room</button>
      </div>
  );
}