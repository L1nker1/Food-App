import React from "react";
import { NavLink } from "react-router-dom";
import chefhat from "../../img/order-food-online-icon-20.jpg"
import style from "./Navbar.module.css"

export default function NavBar(){
    return(
        <div>
            <nav className={style.navigation}>
                <NavLink to="/home" className={style.logo}>
                    <img src={chefhat} alt="logo"/>
                    <h1>Recipes</h1>
                </NavLink>
                <div className={style.rutas}>
                    <NavLink to="/home" className={style.enlaces}>Home</NavLink>
                    <NavLink to="/create" className={style.enlaces}> Create Recipe!</NavLink>
                </div>
            </nav>
        </div>
    )
};