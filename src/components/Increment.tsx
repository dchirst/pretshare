import db from "../Firebase";
import {useEffect, useState} from "react";
import { doc, collection, addDoc, setDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore";


interface IncrementProps {
    disabled: boolean
    roomId: string
}

const Increment = ({disabled, roomId}: IncrementProps) => {
    function handleClick ()  {
        setDoc(doc(db, "prets", roomId), {
            lastPret: serverTimestamp(),
            numPrets: increment(1),
            reserved: false
        }, {merge: true}).catch((e) => {console.log(`Error: ${e}`)});
    }

    return (
        <div>
            <button className={"btn-primary"} onClick={handleClick} disabled={disabled}>I've had a Pret</button>
        </div>
        )
}


export default Increment
