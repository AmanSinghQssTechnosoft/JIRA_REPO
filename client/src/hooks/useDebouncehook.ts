import { useEffect, useState } from "react"


export const useDebouncehook = (value: string, time: number) => {
    const [collectedData, setCollectedData] = useState<string>("")
    useEffect(() => {
        const delaydata = setTimeout(() => {
            setCollectedData(value)
        }, time)
        return () => {
            clearTimeout(delaydata);
        };
    }, [value, time])
    return collectedData;
}