import React from "react";
import "./page.css";
import { useState, useEffect } from "react";
import css from "../../assets/css.png";
import flask from "../../assets/flask.png";
import html from "../../assets/html.png";
import js from "../../assets/js.png";
import node from "../../assets/node.png";
import opencv from "../../assets/opencv.png";
import python from "../../assets/python.png";
import react from "../../assets/react.png";
import sklearn from "../../assets/sklearn.png";
import tensorflow from "../../assets/tensorflow.png";
import figure1 from "../../assets/figure1.png";
import figure2 from "../../assets/figure2.png";
import workflow from "../../assets/workflow.png";
import Zoom from "react-reveal/Zoom";

function Development() {
    const [offsetsTop, setOffsetsTop] = useState([false, false]);
    const showThreshold = 0.1;

    useEffect(() => {
        const handleScroll = () => {
            const h1s = Object.entries(document.getElementsByTagName("h1"));
            const mapped = h1s.map(
                (tag) =>
                    (tag[1].offsetTop - window.scrollY) / window.innerHeight <
                    showThreshold
            );
            console.log("hello");
            setOffsetsTop(mapped);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [offsetsTop]);

    return (
        <div className="development">
            <Zoom when={true} duration={500}>
                <h1>
                    <span className="highlight color"> How we built it</span>
                    <div className="stacks">
                        <div className="stacks__container">
                            <div className="stacks__images">
                                <img src={html} alt="html" />
                                <img src={css} alt="css" />
                                <img src={js} alt="js" />
                                <img src={react} alt="react" />
                                <img src={node} alt="node" />
                            </div>
                            <h3>Frontend</h3>
                            <div className="stacks__images">
                                <img src={python} alt="python" />
                                <img src={tensorflow} alt="tensorflow" />
                                <img src={flask} alt="flask" />
                                <img src={sklearn} alt="sklearn" />
                                <img src={opencv} alt="opencv" />
                            </div>
                            <h3>Backend</h3>
                        </div>
                    </div>
                </h1>
            </Zoom>

            <div className="development__graphsDiv">
                <Zoom when={offsetsTop[1]} duration={500}>
                    <h1>
                        <span className="highlight color graphs">
                            Training Graphs
                        </span>
                        <div className="development__graphs">
                            <img src={figure1} alt="figure1" />
                            <img src={figure2} alt="figure2" />
                        </div>
                    </h1>
                </Zoom>
            </div>

            <div className="development__flowchart">
                <h1>
                    <span className="highlight color chart">Flowchart</span>
                    <div className="">
                        <img src={workflow} alt="workflow" />
                    </div>
                </h1>
            </div>
        </div>
    );
}

export default Development;
