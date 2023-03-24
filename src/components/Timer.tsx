import { doc, onSnapshot } from "firebase/firestore";
import db from "../Firebase";
import {useEffect, useRef, useState} from "react";
// import firebase from "firebase/compat";

interface TimerProps {
    lastPret: Date | undefined
    reachedLimit: boolean
    setDisabled: any
}

function getTimeLeftTomorrow(): number {

    return new Date().setHours(24,0,0,0) - Date.now()
}

function formatTime(hours: number, minutes: number, seconds: number): string {

    let arr = []
    if (hours > 0) {
        arr.push(hours)
    }
    arr.push(minutes, seconds)
    return arr.map(el => {
        return el.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
                    })
    }).join(":")

}

function getTimeLeft(lastPret: Date | undefined): number {
    if (lastPret === undefined) {
        return 0
    } else {
        return (1_800_000) - (Date.now() - lastPret.getTime())
    }
}



const Timer = ({lastPret, reachedLimit, setDisabled}: TimerProps) => {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        updateTimer(reachedLimit)
        let interval = setInterval(() => updateTimer(reachedLimit), 1000)
    })

    function updateTimer(reachedLimit: boolean) {
        let timeLeft = reachedLimit ? getTimeLeftTomorrow() :  getTimeLeft(lastPret)
        const newHours = Math.max(0,Math.floor((timeLeft / 1000 / 60 / 60) % 60));
        const newMinutes = Math.max(0, Math.floor((timeLeft / 1000 / 60) % 60));
        const newSeconds = Math.max(0, Math.floor((timeLeft / 1000) % 60));

        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        if (newHours == 0 && newMinutes == 0 && newSeconds == 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }



    return (
        <div>
            <h3>Time to next Pret:</h3>
            <h2 className="font-bold text-5xl m-3"
            >{formatTime(hours,minutes, seconds)}</h2>
        </div>
    )

}

export default Timer