import axios from "axios"
export const receta = "receta"
const recipes = "http://localhost:3001/recipes/";


export const GetRecipes =  () =>{
    return async function(dispatch){
        let json = await axios(recipes) 
        return dispatch({
            type:receta,
            payload:json.data
        })
    }
};

export const GetRecipesByName = (name)=>{
    return async function(dispatch){
        try{
            let json = await axios(`http://localhost:3001/recipes?name=`+ name)
            return dispatch({
                type:"recipeByname",
                payload:json.data
            });
        }catch(e){
            console.error(e)
        }
    };
};

export const  Post_Recipe = (payload)=>{
    return async function (dispatch){
        try{
            let json = await axios.post("http://localhost:3001/recipes/", payload);
            console.log(json);
            alert('Recipe created successfully!')
            return json;
        }catch(e){
            console.error(e);
            alert(e.message)
        };
    };
};

export const GetDiets = ()=>{
    return async function(dispatch){
        try{
            let json = await axios("http://localhost:3001/diet/");
            return dispatch({
                type:"GetDiets",
                payload:json.data
            })

        }catch(e){
            console.error(e);
        };
    };
};

export const GetDetail = (id)=>{
    return async function(dispatch){
        try{

            let json = await axios("http://localhost:3001/recipes/" + id)
            return dispatch({
                type:"GetDetail",
                payload: json.data
            });
        }catch(e){
            console.error(e)
        }
    };
};

export function ClearRecipes() {
    return {
        type: "CLEAR_RECIPES",
        payload:[],
    };
}

export const FilterDiet = (payload, BackupRecipes)=>{ //meter dietas en el arreglo
    let BackupRecipe =[...BackupRecipes];
    let SortedRecipes=[];
    BackupRecipe.forEach((recipe)=>{
        if(typeof recipe.diets[0] ==="string"){
            if(recipe.diets.includes(payload)){
                SortedRecipes.push(recipe);
            }
        }else{
            if(recipe.diets.find(recipe=>recipe.name === payload)){
                SortedRecipes.push(recipe)
            }
        }
    })
    return {
        type:"filterbydiet",
        payload: payload ==="all" ? BackupRecipes : SortedRecipes,
    }
};


export const FilterScore = (payload)=>{
    return (dispatch)=>{
        dispatch({
            type:"score",
            payload
        })
    };
};

export const ClearDetail = ()=>{
    return(dispatch)=>{
        dispatch({
            type:"ClearDetail",
            payload:{}
        });
    };
};

export const Orderby = (payload)=>{ //filter
    return(dispatch)=>{
        dispatch({
            type:"Orderby",
            payload
        })
    }
}



