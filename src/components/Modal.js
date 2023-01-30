import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase-config";

const Modal = ({ seconds, minutes }) => {
    const location = useLocation();
    let map = '';
    const [name, setName] = useState("");

    const leaderboardCollection = collection(db, "leaderboard");


    const sendToLeaderboard = async () => {
        const selectInput = document.getElementById('myName');
        console.log(selectInput);
        console.log(name);
        switch (location.pathname) {
            case "/mapone":
                map = "Where's Waldo At The Beach"
                break;
            case "/maptwo":
                map = "Where's Waldo In Outer Space"
                break;
            case "/mapthree":
                map = "Where's Waldo Ski Slopes"
                break;
            case "/mapfour":
                map = "Where's Waldo At A Track Meet"
                break;
            default:
                break;
        }
        await addDoc(leaderboardCollection, { name: name, minutes: minutes, seconds: seconds, mapName: map })
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Game Clear!</h1>
                </div>
                <div className="body">
                    <p>You found all characters in the map in
                        <h1>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h1>
                    </p>
                    <input onChange={(event) => { setName(event.target.value) }} id="myName" type="text" placeholder="Name (optional)" />
                    <div className="myButtons">
                        <Link to={'/'}>
                            <button id="selectMapButton" >Select Map</button>
                        </Link>
                        <Link onClick={() => sendToLeaderboard()} state={{ seconds, minutes }} to={'/leaderboard'}>
                            <button id="selectSubmitButton">Submit</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;