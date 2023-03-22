import { doc, onSnapshot } from "firebase/firestore";
import db from "../Firebase";
import {useEffect, useRef, useState} from "react";
// import firebase from "firebase/compat";

interface TimerProps {
    lastPret: Date
    reachedLimit: boolean
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

function getTimeLeft(lastPret: Date): number {
    return (1_800_000) - (Date.now() - lastPret.getTime())
}



const Timer = ({lastPret, reachedLimit}: TimerProps) => {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        updateTimer(reachedLimit)
        let interval = setInterval(() => updateTimer(reachedLimit), 1000)
    })

    function updateTimer(reachedLimit: boolean) {
        let timeLeft = reachedLimit ? getTimeLeftTomorrow() :  getTimeLeft(lastPret)
        setHours(Math.max(0,Math.floor((timeLeft / 1000 / 60 / 60) % 60)));
        setMinutes(Math.max(0, Math.floor((timeLeft / 1000 / 60) % 60)));
        setSeconds(Math.max(0, Math.floor((timeLeft / 1000) % 60)));

    }



    return (
        <div>
            <h3>Time to next Pret:</h3>
            <h2>{formatTime(hours,minutes, seconds)}</h2>
        </div>
    )

}

//   const getTime = () => {
//       if (!lastPretRef.current) {
//           return
//       }
//
//       let timeLeft;
//       if (!reachedLimit.current) {
//           // 1.8 million = 30 mins in milliseconds
//           setShowHours(false)
//           setHours(0)
//           timeLeft = (1_800_000) - (Date.now() - lastPretRef.current?.getTime())
//       } else {
//           timeLeft = new Date().setHours(24,0,0,0) - Date.now()
//
//           setHours(Math.floor((timeLeft / 1000 / 60 / 60) % 60));
//           setShowHours(true)
//       }
//
//       // 1.8 million = 30 mins in milliseconds
//       if (timeLeft < 0) {
//           setMinutes(0)
//           setSeconds(0)
//           setShowResults(true)
//
//
//       }
//       console.log(timeLeft)
//
//     setMinutes(Math.floor((timeLeft / 1000 / 60) % 60));
//     setSeconds(Math.floor((timeLeft / 1000) % 60));
//   };
//
//
//
//
//     // @ts-ignore
//     // let lastPret = ref.current.toDate()
//     return (
//         <div>
//             <h2>{ showHours ? `${hours.toLocaleString('en-US', {
//     minimumIntegerDigits: 2,
//     useGrouping: false
//   })}:` : null }{minutes.toLocaleString('en-US', {
//     minimumIntegerDigits: 2,
//     useGrouping: false
//   })}:{seconds.toLocaleString('en-US', {
//     minimumIntegerDigits: 2,
//     useGrouping: false
//             })}</h2>
//         </div>)
// }

export default Timer