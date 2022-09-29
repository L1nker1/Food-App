import React,{ useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { GetRecipes } from "../../Redux/actions";
import Cards from "../Cards/Cards";
import Sortby from "../Filter/Filter"; //
import NavBar from "../NavBar/Navbar";
import { GetDiets } from "../../Redux/actions";
import style from "./Home.module.css"


export default function Home(){
    const Recetas = useSelector((state)=>state.recipes)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetDiets()) //componentdidmount
    },[]);

    useEffect(()=>{
        if(Recetas.length === 0){
            console.log("se cargo recetas")
            dispatch(GetRecipes())
        }
    },[]);;


    function handler (e){
        e.preventDefault();
        dispatch(GetRecipes());
    };

    return(
        <div className={style.HomeContainer}>
            <div>
                <NavBar/>
            </div>
                <div className={style.Home_Right}>
                    <div className={style.Home_Right__Top}>
                        <Sortby/>
                        <div className={style.buttonR} >
                            <button  className={style.restartButton} onClick={(e)=>handler(e)} >restart</button>
                        </div>
                    </div>
                </div>
                <div>
                    {
                    Recetas.length > 0 ? 
                    <Cards className={style.cartahome} recetas={Recetas}/> :
                    <div> <h2>No Recipes Found</h2> </div>
                    }
                </div>
        </div>
    )
}