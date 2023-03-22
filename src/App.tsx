import {useEffect, useState} from 'react'

import './App.css'

import Increment from "./components/Increment";
import {doc, onSnapshot} from "firebase/firestore";
import db from "./Firebase";
import Counter from "./components/Counter";

import Timer from "./components/Timer";

function App() {
  const [count, setCount] = useState(0)
    const [lastPret, setLastPret] = useState(new Date())
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "prets", "pret1"), { includeMetadataChanges: false }, (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        // @ts-ignore
        const np: number = doc.data().numPrets;setCount(np)
        if (!doc.metadata.hasPendingWrites) {
            // @ts-ignore
            const lastPretTimeStamp = doc.data().lastPret;
            setLastPret(lastPretTimeStamp.toDate())

        }

    })
    },[])

    let reachedLimit = count >= 5

  return (
      <div>
          <Timer lastPret={lastPret} reachedLimit={reachedLimit}/>
          <Counter numPrets={count}/>

          <Increment reachedLimit={reachedLimit}/>
      </div>

  )
}

export default App
