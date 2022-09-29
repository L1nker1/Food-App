import React from "react";
import style from "./Card.module.css"

export default function Card(props){
    //console.log(props)

    return(
        <div>
            <a className={style.card} href={`home/details/${props.id}`}>
            <h2 className={style.title2}>{props.title}</h2>
            <img src={props.image} alt="" height="300px" width="300px" />
            <p>{props.healthScore}</p>
            <div className={style.info}>
                <ul>
                    {typeof props.diets[0] === "string"
                    ? props.diets.map((diet, index) => <li key={index}>{diet}</li>)
                    : props.diets.map((diet, index) => <li key={index}>{diet.name}</li>)
                }
                </ul>
            </div>
            </a>
        </div>
    )
};


