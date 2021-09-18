import React, {useEffect, useState} from "react";

export const ToggleButton = (props) => {
    const [time, setTime] = useState(props.time)
    const [btn, setBtn] = useState(false)

    useEffect(() => {
        if (time >= 1) {
            setTime(time - 1)
        }
    }, [time])

    // const startTimer = () => {
    //     setBtn(true)
    //
    //     let _timer = time
    //     const intervalId = setInterval(() => {
    //         _timer--
    //         setTime(_timer)
    //     }, 1000)
    //     setTimeout(() => {
    //         clearInterval(intervalId)
    //         setTime(props.time)
    //         setBtn(false)
    //     }, props.time * 1000)
    // }

    return (
            <button disabled={btn} onClick={startTimer} value={time}>{
            btn ? `Time: ${time}` : props.text
        }</button>
    )
}