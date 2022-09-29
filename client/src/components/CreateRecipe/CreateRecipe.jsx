import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  GetDiets, GetRecipes, Post_Recipe } from "../../Redux/actions";
import {   useNavigate, NavLink } from "react-router-dom";
import style from "./CreateRecipe.module.css"

function validate(input){
    let errors = {};

    if(!input.title) errors.title = "A title is required"
    if(!input.image) errors.image = "An Image is required"
    if(!input.summary) errors.summary = "A short Summary is required"
    if(!input.steps) errors.steps ="Instructions are required"
    if (!input.healthScore || input.healthScore < 0 || input.healthScore > 100 || input.healthScore.includes(".")) {
        errors.healthScore = 'Type a number between 0 to 100, only exact numbers'
    }
    if(!input.diets.length) errors.diets = "Must select at least one diet-type" 
    return errors
};



export default function PostRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const diets = useSelector((state)=> state.diets);
    const [activeSubmit, SetactiveSubmit] = useState(true)
    const [errors, setErrors] = useState({});

    const [input, setInput] =useState({
        title:"",
        image:"",
        summary:"",
        steps:"",
        healthScore:0,
        diets:[]
    });

    useEffect(()=>{
        if(diets.length === 0 ){
            dispatch(GetDiets())
        }
        const llaves = Object.keys(input)
        for (const key of llaves) {
            if (input[key] && !errors[key]) { //si hay input y no hay errores --false
                SetactiveSubmit(false)
            }else {
                SetactiveSubmit(true)
                break;
            };
        };
    }, [input, errors])
    
    function handlerSubmit(e) {
        e.preventDefault();
        dispatch(Post_Recipe(input));
        dispatch(GetRecipes())
        navigate("/home");
    //    alert('Recipe created successfully!')
    }
    
    //select
    function handleSelectDiets(e) {
        if (!input.diets.includes(e.target.value)) //evitar repetidos
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            });
        setErrors(validate({
            ...input,
            diets: [...input.diets, e.target.value]
        }));
    }

    //inputs
    function handlerChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
        console.log(errors)
    };

    //delete
    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter( diet => diet !== e)
        })
    }



    return (
        <div className={style.prevorder}>
            <div className={style.nav}>
                <h1 className={style.title}>Create Recipe</h1>
            </div>
            <div className={style.border}>
                <div className={style.backhome}>
                    <div className={style.backhome}>
                        <NavLink to="/home"><button className={style.redbutton}>X</button></NavLink> 
                    </div>
                    {input.image ? <div>
                            <div>
                            <label className={style.name}>Image preview:</label>
                            </div>
                            <img src={input.image} name="image"  height="150px" width="150px" className={style.previmg}/>
                        </div> : null
                    }
                
                    <form onSubmit={(e)=>handlerSubmit(e)}>
                        <div className={style.data}>                          
                            <div className={style.casillas}>
                                <div>
                                <label className={style.name}>Name:</label>
                                </div>
                                <input  className={style.input} type="text"  name="title" value={input.title} onChange={(e)=>handlerChange(e)} /> 
                                { errors.title
                                ? <label className={style.labelError}>{errors.title}</label>
                                : null }
                            </div>
                            <div className={style.casillas}>
                                <div>
                                <label className={style.name}>Image:</label>
                                </div>
                                <input className={style.input} type="text" name="image" value={input.image} onChange={(e)=>handlerChange(e)} />
                                {errors.image ? <label className={style.labelError}>{errors.image}</label> : null}
                            </div>
                            <div className={style.casillas}>
                                <div>
                                <label className={style.name}>Summary:</label>
                                </div>
                                <input className={style.input} type="text" name="summary" value={input.summary} onChange={(e)=>handlerChange(e)} />
                                {errors.summary ? <label className={style.labelError}>{errors.summary}</label> : null}
                            </div>
                            <div className={style.casillas}>
                                <div>
                                <label className={style.name}>Instructions:</label>
                                </div>
                                <input className={style.input} type="text" name ="steps" value={input.steps} onChange={(e)=>handlerChange(e)} />
                                {errors.steps ? <label className={style.labelError}>{errors.steps}</label>: null}
                            </div>
                            <div className={style.casillas}>
                                <div>
                                <label className={style.name}>HealthScore:</label>
                                </div>
                                <input className={style.input} type="number" name="healthScore" value={input.healthScore}   onChange={(e)=>handlerChange(e)}/>
                                {errors.healthScore ? <label className={style.labelError}>{errors.healthScore}</label>: null}
                            </div>
                            {errors.diets && <p>{errors.diets}</p> } {/* acomodar */}
                            <div className={style.casillas}>
                                <div><label className={style.name}>Diet:</label></div>
                                <select  placeholder="Select at least one type of diets"   name="diets" value={input.diets} onChange={(e)=>handleSelectDiets(e)}>
                                    <option>Select Diet</option > 
                                    {diets && diets.map((e)=>{ return <option id={e.id} value={e.diets}>{e.name}</option>})}
                                </select>  
                                {errors.diets ? <label className={style.labelError}>Select at leats one diet</label> : null}
                            </div>
                            <div >
                                <button type="submit" disabled={activeSubmit}>Create!!</button> 
                            </div>
                        {input.diets.map((diet, pos)=>
                            <div>
                                <p id={pos}>{diet}</p>
                                <button onClick={()=>handleDelete(diet)}>X</button>
                            </div>
                        )}  
                    </div>
                    </form>
            </div>
        </div>
    </div>
    )
};
