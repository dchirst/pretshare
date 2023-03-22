import db from "../Firebase";
import {useEffect, useState} from "react";
import { doc, collection, addDoc, setDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore";


interface IncrementProps {
    reachedLimit: boolean
}

const Increment = ({reachedLimit}: IncrementProps) => {
    function handleClick ()  {
        setDoc(doc(db, "prets", "pret1"), {
            lastPret: serverTimestamp(),
            numPrets: increment(1)
        }, {merge: true}).catch((e) => {console.log(`Error: ${e}`)});
    }

    return (
        <div>
            <button onClick={handleClick} disabled={reachedLimit}>I've had a Pret</button>
        </div>
        )
}


export default Increment
