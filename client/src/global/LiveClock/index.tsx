import { useEffect, useState } from "react"


const LiveClock = () => {
    const[time,setTime]=useState<number>(Date.now());
    useEffect(()=>{
       setInterval(() => {
          setTime(Date.now())
       }, 1000);
    },[])
  return (
    <div>{new Date(time).toLocaleTimeString()}</div>
  )
}

export default LiveClock