import React, { useEffect, useState } from 'react'

const Bar = ({ barH, color, isSingle, isFinish, setisFinish }) => {
    const [randColor, setrandColor] = useState("")

    useEffect(() => {
        setrandColor(ongenerateRandomColor)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setisFinish(false);
          }, 1500);
    }, [isFinish])

    const ongenerateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div className={isFinish ? "animate" : ""} style={{ height: `${barH}%`, width: '100%', background: `${isSingle ? color : randColor}`, transition: ".5s ease-in-out" }}></div>
    )
}

export default Bar