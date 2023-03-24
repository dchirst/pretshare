import {doc, increment, serverTimestamp, setDoc} from "firebase/firestore";
import db from "../Firebase";
import {useState} from "react";

interface ReserveProps {
    roomId: string
    reserved: boolean
}

export const Reserve = ({roomId, reserved}: ReserveProps) => {

    async function reserveNextPret() {
        setDoc(doc(db, "prets", roomId), {
            reserved: true
        }, {merge: true});
    }

    return (
        <div>
            <p hidden={!reserved}>✋ Someone has reserved the next Pret!</p>
            <button disabled={reserved}
                    className={"btn-primary"}
                    onClick={reserveNextPret}
            >Reserve Next Pret</button>
        </div>
    )
}