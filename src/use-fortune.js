import { useEffect, useState } from "react"

function getRandomFortuneKey(){
    const fortuneLen = 15;
    const randomNum = Math.floor(Math.random() * fortuneLen) + 1;
    
    return `cookie_${randomNum}`;
}

export const useFortune = () => {
    const [fortuneKey, setFortuneKey] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setFortuneKey(getRandomFortuneKey());
        }, 2000);
    }, [])

    return{
        fortuneKey,
        setFortuneKey,
        getRandomFortuneKey,
    }
}