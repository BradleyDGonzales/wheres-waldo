import React from "react"
import { Link } from "react-router-dom";

const Modal = ({ seconds, minutes }) => {
    const length = 0;
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
                    <input type="text" placeholder="Name (optional)" />
                    <div className="myButtons">
                        <Link to={"/"}>
                            <button>Select Map</button>
                        </Link>
                        <Link>
                            <button>Submit</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;