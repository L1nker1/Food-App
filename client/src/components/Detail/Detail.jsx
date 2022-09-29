import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDetail,ClearDetail } from "../../Redux/actions";
import { useParams, Link } from "react-router-dom";
import style from "./Detail.module.css"


export default function CardDetail(){
    const {id} = useParams()
    console.log(id)
    let Detail = useSelector(state=>state.detail)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(GetDetail(id))
        //console.log(Detail[0].diets.name)
    },[])



    return(
        <div className={style.prevorder}>
            <div className={style.border}>
            {Detail.length > 0 ?
                <div>
                    <Link to="/home" ><button className={style.button}>Home</button></Link>
                    <div className={style.posInfoA}>
                        <button className={style.buttonHealth}>HealthScore:</button>
                        <h2 className={style.p}>{Detail[0].healthScore}</h2>
                    </div>
                    <h1 className={style.title}>{Detail[0].title}</h1>
                    <div className={style.posimagen}>
                        <img className={style.imagen} src={Detail[0].image} alt="no img" width="556px" height="400px" />
                    </div>
                    <br></br>
                    <br></br>
                    <hr />
                    <div className={style.scores}>
                        <button className={style.buttondiet}>Diet Types:</button>
                        {  typeof Detail[0].diets[0] === "string"
                        ? Detail[0].diets.map((e, index) => <ul className={style.scores} key={index}>{e}</ul>)
                        : Detail[0].diets.map((e, index) => <ul className={style.scores} key={index}>{e.name}</ul>)
                        }   
                    </div>
                    <div className={style.flex}>
                    {Detail[0].dishTypes?
                        <div className={style.scores}>
                        <button className={style.buttondiet}>Dish Types:</button>
                        {Detail[0].dishTypes ? Detail.map((e,pos)=> <ul className={style.scores} key={pos}>{e.dishTypes}</ul>): null}
                        </div>
                    :null}
                        
                    </div>
                    <div className={style.secondPart}>
                        <hr />
                        <h3 className={style.font}>Summary:</h3>
                        <p dangerouslySetInnerHTML={{ __html: Detail[0].summary}}/>
                        { Detail[0].steps.length > 0 ?                              //steps
                        <div>
                        <h3>How to prepare:</h3>
                        <p dangerouslySetInnerHTML={{ __html: Detail[0].steps }}/>  
                        </div>:
                        null
                        }
                    </div>
                </div>:
                <div /* className="aling center" */>
                    <h2 className={style.loading}>Loading..</h2>
                </div>}
            </div>
        </div>
    )
};
