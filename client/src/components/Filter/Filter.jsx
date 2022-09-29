import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterDiet, Orderby, GetRecipesByName } from "../../Redux/actions";
import style from "./Filter.module.css";

export default function Sortby(){
    const dispatch = useDispatch()
    const [SearchInput, setSearchInput] = useState("");
    const {diets, BackupRecipes} = useSelector(store=>{
        return{
            diets: store.diets,
            BackupRecipes: store.BackupRecipes
        }
    })

    //search input
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(SearchInput){
            //dispatch(ClearRecipes())
            dispatch(GetRecipesByName(SearchInput));
            setSearchInput("")
        }
    };
    //orden select
    let handlerChange = (e)=>{
        switch(e.target.value){
            case  "A-Z":
                dispatch(Orderby((a, b) => { return a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1 })); break //si es menor -1
            case "Z-A":
                dispatch(Orderby((a, b) => { return b.title.toUpperCase() < a.title.toUpperCase() ? -1 : 1 })); break
            case "higher":
                dispatch(Orderby((a,b)=>{return b.healthScore - a.healthScore })); break //si el puntaje es menor lo mueve al fondo
            case "lower":
                dispatch(Orderby((a,b)=>{return a.healthScore - b.healthScore })); break
            default: break;
        };
    };
    
    //diet select
    let handlerChangeDiet = (e)=>{
        e.preventDefault();
        let diet = e.target.value
        dispatch(FilterDiet(diet, BackupRecipes));
    };



    return(
        <div className={style.header}>
            <div className={style.search}>
                <input type= "text" placeholder="Search..." value={SearchInput} onChange={(e)=>setSearchInput(e.target.value)}></input>
                <button type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
            </div>
            <div className={style.option}>
                <select className={style.option} onChange={handlerChange}>
                    <option value="select">Select an Order:</option>
                    <option value="A-Z">Alphabetical A-Z</option>
                    <option value="Z-A">Alphabetical Z-A</option>
                    <option value="higher">Higher HealtyScore</option>
                    <option value="lower">Lower HealtyScore</option>
                </select>
                <select onChange={handlerChangeDiet}>
                    <option value="all">All</option>
                    {diets && diets.map(e=>{return <option value={e.name} key={e.id}>{e.name}</option>})}
                </select>
                <div className={style.test}>
                </div>
            </div>
        </div>
    )
};