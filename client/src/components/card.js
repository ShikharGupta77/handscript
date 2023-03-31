import React from "react";
import "./card.css";
import Zoom from "react-reveal/Zoom";

function Card(props) {
    return (
        <Zoom duration={750}>
            <div className="card__background">
                <div className="card">
                    <div className="card__text">
                        <h1 className="card__textHeader">{props.header}</h1>
                        <p>{props.content}</p>
                    </div>
                    <div className="card__image">
                        <img
                            className="card__actualImg"
                            src={props.imageUrl}
                            alt="img_desc"
                        />
                    </div>
                </div>
            </div>
        </Zoom>
    );
}

export default Card;
