import React,{useEffect, useState} from "react";
import Card from "../Card/Card";
import Paginado from "../Pagination/Paginado";
import style from "./Cards.module.css"

export default function Cards({recetas}){

    const [CurrentPage, setCurrentPage] = useState(1);

    const [RecipesPerPage] = useState(9);

    const LastIndex = CurrentPage * RecipesPerPage; 

    const FirstIndex = LastIndex - RecipesPerPage; /*9-9 0  18-9 9*/ 


    const CurrentCards = recetas.slice(FirstIndex, LastIndex)/*100-0-9z*/ 

    function sumPage(num){
        setCurrentPage(num)
    };

    useEffect(()=>{
        setCurrentPage(1)
        console.log("se modifico recipes, volvemos a pag 1") //component did update
    },[recetas])

    return(
        <div className="col-md-4">
            <Paginado NumRecetas={recetas.length} RecipesPerPage={RecipesPerPage} PageChange={sumPage} />
            <div>
                <div className={style.cards}>
                    {CurrentCards.length > 0 ? CurrentCards.map(e=>{
                        return <Card
                        button={e.id}
                        title={e.title}
                        image={e.image}
                        diets={e.diets}
                        /* healthScore={e.healthScore} */
                        key={e.id}
                        id={e.id}/>})
                        : <h1>Loading...</h1>}
                </div>
            </div>
        </div>
    )
};

