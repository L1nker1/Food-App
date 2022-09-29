import React from "react";
import style from "./Paginado.module.css"

export default function Paginado ({NumRecetas, RecipesPerPage, PageChange}){
    let PageNumber = [];
    let Pages = Math.ceil(NumRecetas / RecipesPerPage);
    for (let i = 0; i < Pages; i++ ){
        PageNumber.push(i+1)
    };

    return(
            <div className={style.Pagination__ul}>
                {PageNumber && PageNumber.map(num=>(
                        <button onClick={()=>PageChange(num)} key={num} className={style.Pagination__Button}>{num}</button>
                    ))}
            </div>
    )
}