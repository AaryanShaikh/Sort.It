"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react'
import Bar from './Bar'
import { Button, ColorPicker, Slider, Space, Spin, Switch, Typography, message, theme } from 'antd';

const Main = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500
    const [bars, setbars] = useState([])
    const { token } = theme.useToken();
    const [barColor, setbarColor] = useState(token.colorPrimary);
    const bgColor = useMemo(() => (typeof barColor === 'string' ? barColor : barColor.toHexString()), [barColor]);
    const [isSingleBarColor, setisSingleBarColor] = useState(true)
    const [noOfBars, setnoOfBars] = useState(18)
    const [isSorting, setisSorting] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [isFinish, setisFinish] = useState(false)

    console.log("isSorting", isSorting);

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])

    useEffect(() => {
        setisLoading(false)
        let numbers = []
        while (numbers.length < noOfBars) {
            const randomNumber = Math.floor(Math.random() * (100 - 4 + 1)) + 4;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        setbars(numbers)
    }, [])

    const onNoOfBarsChange = (e) => {
        let numbers = []
        while (numbers.length < e) {
            const randomNumber = Math.floor(Math.random() * (100 - 4 + 1)) + 4;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        setbars(numbers)
        setnoOfBars(e)
    }

    const onSort = async () => {
        setisSorting(true); // Sort started, update loading state
        let isSorted = false;
        let lastUnsorted = bars.length - 1;

        while (!isSorted) {
            isSorted = true;

            for (let i = 0; i < lastUnsorted; i++) {
                // Delay for 500ms
                await new Promise((resolve) => setTimeout(resolve, 50));

                if (bars[i] > bars[i + 1]) {
                    const temp = bars[i];
                    bars[i] = bars[i + 1];
                    bars[i + 1] = temp;
                    isSorted = false;
                    setbars([...bars]);
                }
            }

            lastUnsorted--;
        }
        setisSorting(false);
        setisFinish(true)
    }

    const onRandomize = () => {
        let numbers = []
        while (numbers.length < noOfBars) {
            const randomNumber = Math.floor(Math.random() * (100 - 4 + 1)) + 4;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        setbars(numbers)
    }
    return (
        <div style={{ display: "flex", height: "95vh", width: "95vw", justifyContent: "center", alignItems: range ? "flex-start" : "center", position: "relative" }}>
            <div ref={widthRef} style={{ position: "absolute", height: "100%", width: "100%" }}></div>
            <div style={{ height: "100%", width: "100%", position: "absolute", zIndex: "1", backdropFilter: "blur(2px)", borderRadius: "25px", pointerEvents: isLoading ? "all" : "none", opacity: isLoading ? "1" : "0", transition: ".5s ease-in-out" }}>
                <div class="banter-loader">
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                </div>
            </div>
            <div style={{ height: range ? "85vh" : "70vh", width: range ? "90vw" : "50vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", boxShadow: "0px 0px 12px 1px #5451514f", borderRadius: "25px", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", columnGap: "10px", width: "97%", height: "100%", padding: "10px 0px" }}>
                    {
                        bars.map((ele, ind) => {
                            return <Bar isFinish={isFinish} setisFinish={setisFinish} key={ind} barH={ele} color={bgColor} isSingle={isSingleBarColor} />
                        })
                    }
                </div>
                {
                    range ? <div style={{ display: "grid", width: "100%", gridTemplateColumns: "repeat(2,auto)", gap: "10px", padding: "10px 0px", position: "relative" }}>
                        <div style={{ height: "100%", width: "100%", position: "absolute", zIndex: "1", backdropFilter: "blur(2px)", borderRadius: "25px", pointerEvents: isSorting ? "all" : "none", opacity: isSorting ? "1" : "0", transition: ".5s ease-in-out" }}>
                            <div class="banter-loader">
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                                <div class="banter-loader__box"></div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography.Text>Number of Bars</Typography.Text>
                            <Slider value={noOfBars} onChange={(e) => onNoOfBarsChange(e)} max={range ? 18 : 38} min={2} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                            {isSingleBarColor ? <ColorPicker defaultValue="#389DEF" value={barColor} onChange={setbarColor} /> : ""}
                            <Switch checkedChildren="Random Bar Color" unCheckedChildren="Single Bar Color" onChange={(e) => { setisSingleBarColor(!e) }} />
                        </div>
                        <Button onClick={onRandomize}>Randomize</Button>
                        <Button onClick={onSort} type="primary">Sort</Button>
                    </div>
                        :
                        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-around", padding: "10px 0px", position: "relative" }}>
                            <div style={{ height: "100%", width: "100%", position: "absolute", zIndex: "1", backdropFilter: "blur(2px)", borderRadius: "25px", pointerEvents: isSorting ? "all" : "none", opacity: isSorting ? "1" : "0", transition: ".5s ease-in-out" }}>
                                <div class="banter-loader">
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                    <div class="banter-loader__box"></div>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <Typography.Text>Number of Bars</Typography.Text>
                                <Slider value={noOfBars} onChange={(e) => onNoOfBarsChange(e)} max={range ? 18 : 38} min={2} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                {isSingleBarColor ? <ColorPicker defaultValue="#389DEF" value={barColor} onChange={setbarColor} /> : ""}
                                <Switch checkedChildren="Random Bar Color" unCheckedChildren="Single Bar Color" onChange={(e) => { setisSingleBarColor(!e) }} />
                            </div>
                            <Button onClick={onRandomize}>Randomize</Button>
                            <Button onClick={onSort} type="primary">Sort</Button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Main