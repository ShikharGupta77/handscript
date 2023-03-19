/* eslint-disable react/jsx-no-target-blank */
import "./page.css"

import { useState, useEffect } from "react";



const backend_domain = "https://10.232.32.49:8765";

const States = {
    BEFORE_CAMERA_ACQUIRE: 0,
    SETTING_UP: 1,
    READY: 2,
    ERROR_SERVER_NOT_UP: -1,
    ERROR_SERVER_OTHER: -2,
    ERROR_NO_CAMERA: -3,
};

let frame, ctx, canvas, video;

// let lastData = null;

function Translate () {

    const [translate_state, set_aquired_stat] = useState(States.SETTING_UP);
    const [transcript, set_transcript] = useState([]);
    const [lastData, setLastData] = useState(null);

    function set_aquired_state(a) {
        console.log(a);
        return set_aquired_stat(a);
    }


    // console.log(videoElementReference)
    const update = () => {
        console.log("hello?");
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            const data = new FormData();
            data.append("file", blob, "file");
            fetch(backend_domain+"/senddata", {
                method: "POST", 
                body: data
            }).then(res => {
                console.log(res);
                if(res.ok) {
                    set_aquired_state(States.READY);

                }else {
                    throw new Error(`Status ${res.status} - ${res.statusText}`);
                }
                return res.json()
            }).then((res) => {

                console.log(res);
                // transcript.push(res);
                setLastData(res);
                document.getElementById("img-element").src = backend_domain+"/outimage?" + new Date().getTime();
                frame = requestAnimationFrame(update);
            }).catch(error => {
                cancelAnimationFrame(frame);
                frame = null

                console.error("Network error!", error);
                set_aquired_state(States.ERROR_SERVER_NOT_UP);
            });
        });

    }

    const start = () => {
        if(!frame) {
            console.log("Starting up animation loop!");
            frame = requestAnimationFrame(update);
            // frame = null;
        }
    }

    useEffect(()=>{console.log("UPDAITNG transiltion state is now ", translate_state);})

    useEffect(() => {
        // return;
        canvas = document.getElementById("video-canvas");
        video = document.getElementById("video-element");
        ctx = canvas.getContext("2d");
        
        set_aquired_state(States.BEFORE_CAMERA_ACQUIRE);

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        }).then((stream) => {
            set_aquired_state(States.SETTING_UP);
            video.srcObject = stream;
            
            start();
        }).catch((error) => {
            // Failed to access camera
            set_aquired_state(States.ERROR_NO_CAMERA);
            console.error(error);
            console.log(error);
        });
    }, [])


    function generateTokens(tokens) {
        return tokens.map((data, i) => {
            return <span className="token" key={i}>
                    {data.result}
                    <div className="label">
                        <ul>Conf:{data.topcandidates.map(
                            (candidate, i) => 
                                <li key={i}>
                                    <div>"{candidate[0]}"</div>
                                    <div></div>
                                    <div>{candidate[1]}%</div>
                                </li>
                        )}
                        </ul>
                    </div>
                </span>
            });
    }

    // const test = "The quick brown fox jumped over the lazy dog over taken by hubris the dead of midnight how time marches on how life marches by "
    // const elements = test.split(" ").map((word) => 
    //         ({
    //         token:word, 
    //         topcandidates: 
    //             [
    //                 ["A", 99.91],
    //                 ["B", 88.11],
    //                 ["C", 77.33],
    //                 ["D", 32.22],
    //                 ["E", 0.00]
    //             ]
    //         })).map((data, i) => {
    //                 return <span className="token" key={i}>
    //                         {data.token}
    //                         <div className="label">
    //                             <ul>Conf:{data.topcandidates.map(
    //                                 (candidate, i) => 
    //                                     <li key={i}>"{candidate[0]}" - {candidate[1]}%</li>
    //                             )}
    //                             </ul>
    //                         </div>
    //                     </span>
    // });

    function getContent(state) {
        switch(state) {
        case States.BEFORE_CAMERA_ACQUIRE:
            return <h2>We need camera permissions to use this function!</h2>;
        case States.SETTING_UP:
            return <h2>Setting up...</h2>;
        case States.ERROR_NO_CAMERA:
            return <h2>We need camera permissions to use this function!</h2>;
        case States.READY:
            return <></>;
        case States.ERROR_SERVER_NOT_UP:
            return <h2>The backend server has not been started at <a target="_blank" href={backend_domain} style={{color: "#8655ff"}}>{backend_domain}</a>.
                <br/>
                <button onClick={()=>{set_aquired_state(States.SETTING_UP); start();}}>Reconnect</button>
            </h2>
        case States.ERROR_SERVER_OTHER:
        default:
        }
        return <><h2>Other error</h2></>
    }

    function createConfidenceGraphs(candidates) {
        return candidates.map((a, i) => {
            return <li key={i}>
                <div style={{verticalAlign: "middle"}}>"{a[0]}"</div>
                <div style={{position: "relative", display: "flex",  alignItems: "center", verticalAlign: "middle"}}><div className="bar" style={{width: `${a[1]}%`}}></div></div>
                <div>{a[1].toFixed(0)}%</div>
            </li>
        });
    }

    return <>
        <div className="translate-container">
            <div>

            </div>
            <div className="main">
                <div className="video-container">
                    {/* <button>Access webcam</button> */}

                    {/* {getContent(translate_state)} */}
                    {getContent(translate_state)}
                    {/* <button onClick={start}>Reconnect</button> */}
                    
                    <img hidden={States.READY !== translate_state} id="img-element" alt="output"/>
                    <video hidden autoPlay id="video-element"></video>
                </div>
                
                <div className="transcript-container">
                    {(lastData ? 
                    <>
                        <div className="big">{lastData.result}</div>
                        <div>
                            <ul>
                                {
                                    createConfidenceGraphs(lastData.topcandidates)
                                }
                            </ul>
                        </div>
                    </> 
                    : 
                    <></>)}
                </div>
                
                <canvas width="400" height="350" hidden id="video-canvas"></canvas>
            </div>
            {/* <img ref={imageReference}/> */}
        </div>
    </>
}

export default Translate;