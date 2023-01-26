import { useEffect, useState } from "react";

const Timer = ({ gameClearCheck }) => {
    console.log(gameClearCheck);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    let timer;

    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1);
            if (seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0);
            }
        }, 1000)
        if (gameClearCheck) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    })


    return (
        <div>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</div>
    )
}

export default Timer;