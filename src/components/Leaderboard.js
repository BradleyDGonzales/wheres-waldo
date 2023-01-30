import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import uniqid from 'uniqid'

const Leaderboard = () => {
    const leaderboardCollection = collection(db, "leaderboard");
    const [leaderboard, setLeaderboard] = useState([])
    useEffect(() => {
        const getLeaderboard = async () => {
            const q = await query(leaderboardCollection, orderBy('minutes'), orderBy('seconds'))
            const data = await getDocs(q);
            setLeaderboard(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getLeaderboard()
    }, [])
    let count = 1;
    return (
        <div className="leaderboardContainer">

            <div className="leaderboard">
                <div className="properties">
                    <h3 className="playerPlacement">#</h3>
                    <h3 className="playerName">Name</h3>
                    <h3 className="playerTime">Time</h3>
                    <h3 className="playerMap">Map</h3>
                </div>
                {leaderboard.map((data) => {
                    return (
                        <div key={uniqid()} className="stats">
                            <div className="placement">
                                {count++}
                            </div>
                            <div className="playerName">
                                <h3>{data.name}</h3>
                            </div>
                            <div className="playerTime">
                                <h3>{data.minutes}:{data.seconds < 10 ? "0" + data.seconds : data.seconds}</h3>
                            </div>
                            <div className="playerMap">
                                <h3>{data.mapName}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Leaderboard;