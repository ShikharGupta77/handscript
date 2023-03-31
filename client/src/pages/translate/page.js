import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
//import socket from "./socket";
import dotenv from "dotenv";
import socketIOClient from "socket.io-client";
import "./page.css";

dotenv.config();

function App() {
    const [imgData, setImgData] = useState(null);
    const [predictions, setPredictions] = useState(["?", "?", "?", "?", "?"]);
    const [confidences, setConfidences] = useState([0, 0, 0, 0, 0]);

    const [showLetters, setShowLetters] = useState(false);
    const webcam = useRef("null");

    const ENDPOINT = "http://3.101.42.87:5000";
    const pngHeader = "data:image/png;base64,";

    const imageUrls = [];
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        imageUrls.push({
            imageUrl: `https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/${letter}.gif`,
            letter: letter.toUpperCase(),
        });
    }

    function arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return binary;
    }

    // use effect runs on every render
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        const interval = setInterval(() => {
            const frame = webcam.current.getScreenshot();
            socket.emit("frameSend", frame);
            console.log("Sending image!");
        }, 10000);

        socket.on("connect", (data) => {
            console.log("Connected socket!");
        });

        socket.on("frameReceive", ({ image, predictions, confidences }) => {
            setImgData(pngHeader + arrayBufferToBase64(image));
            setPredictions(predictions);
            setConfidences(confidences);
            console.log("Received image!");
        });

        return () => {
            console.log("resetting connection");
            clearInterval(interval);
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <div className="main__container">
                <div className="title">
                    <h1 className="header">Try it out!</h1>
                    <p>
                        Note: Since this is deployed on the AWS free tier,
                        you'll have to wait ~10 seconds between frames. Anything
                        faster crashes :(
                    </p>
                </div>
                <div className="vidAndStats">
                    {imgData ? (
                        <img
                            src={imgData}
                            className="videoFeed"
                            alt="videoFeed"
                        />
                    ) : (
                        <div className="connecting">
                            <Webcam audio={false} className="view" />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <h2>Connecting to AWS</h2>
                                <div className="spinner-box">
                                    <div className="three-quarter-spinner"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="stats">
                        <h1 className="predLetter">{predictions[0]}</h1>
                        <div className="graphs">
                            <div className="elements bars">
                                {confidences.map((confidence) => (
                                    <div
                                        className="vl"
                                        style={{
                                            borderLeft: "1em solid #8655ff",
                                            height: `${confidence / 7}em`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                            <div className="elements">
                                {confidences.map((confidence) => (
                                    <p>{confidence}%</p>
                                ))}
                            </div>
                            <div className="elements">
                                {predictions.map((prediction) => (
                                    <p>{prediction}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => setShowLetters(!showLetters)}>
                    {`${showLetters ? "Hide" : "Show"} ASL Letters`}
                </button>
                {showLetters ? (
                    <div
                        className={`letterImages ${showLetters ? "show" : ""}`}
                    >
                        {imageUrls.map((info) => (
                            <div>
                                <img src={info.imageUrl} alt={info.letter} />
                                <p>{info.letter}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ height: "3em" }}></div>
                )}
            </div>
            <Webcam
                audio={false}
                screenshotFormat="image/png"
                ref={webcam}
                className="webcam"
            />
        </div>
    );
}

export default App;
