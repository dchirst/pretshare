import {redirect, useNavigate} from "react-router-dom";


export const LogOut = () => {
    const navigate = useNavigate()

    function handleLogOut () {
        console.log("here")
        localStorage.removeItem("roomId")
        return navigate("/")
    }
    return (
        <div className={"bottom-0 align-bottom"}>
            <button onClick={handleLogOut} className={"text-slate-300 underline"}>Log Out</button>
        </div>
    )
}