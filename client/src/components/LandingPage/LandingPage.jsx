import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage (){
    return(

        <div className={style.Background_Start}>
            <div className={style.start__right}>
                <div className={style.start__title}>
                    <h1 className={style.start__title__title}>Henry Recipes!</h1>
            </div>
            <div className={style.start__start}>
                <Link to="/Home" >
                    <button className={style.start__start__butom}>Click Here To Enter!
                    </button>
                </Link>
            </div>
            </div>
        </div>
    );
};
