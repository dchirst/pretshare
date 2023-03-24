// @ts-ignore
import {CopyToClipboard} from "react-copy-to-clipboard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {useState} from "react";
import room from "../routes/Room";

interface RoomNameProps {
    roomId: string
}


export const RoomName = ({roomId}: RoomNameProps) => {
    const [copied, setCopied] = useState(false)
    return (
        <div className="">
            <div className="m-3 md:flex md:flex-row md:text-3xl justify-center text-2xl">
            <h2 className="">Room ID:</h2>
            <h2 className={"mx-3 font-semibold text-primary"}>{roomId}</h2>
            <CopyToClipboard text={roomId}
              onCopy={() => setCopied(true)}>
              <button><ContentCopyIcon/></button>
        </CopyToClipboard>

        {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        </div>
        </div>


    )
}