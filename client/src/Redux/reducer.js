import {receta} from "./actions";

const initialState = {
    BackupRecipes: [],
    recipes:[],
    detail:[],
    filter:[],
    sort:[],
    diets:[],
};

export default function rootReducer(state= initialState, action){
    //console.log(action)
    //console.log(action.type)
    switch(action.type){
        case receta:
            return{
                ...state,
                BackupRecipes: action.payload,
                recipes: action.payload,
                sort:action.payload,
            };
            case "filterbydiet":
                return {
                    ...state,
                    recipes: action.payload
                };
            case "GetDiets":
                return{
                    ...state,
                    diets:action.payload,
                };
            case "Orderby":
                console.log(action.payload)
                return{
                    ...state,
                    recipes:[...state.recipes].sort(action.payload)
                };
            case "recipeByname":
                console.log(action.payload)
                return{
                    ...state,
                    recipes: action.payload 
                };
            case "Post_Character": //no hace nada
                return{
                    ...state
                };
            case "ClearDetail":
                    return{
                        ...state,
                        detail:action.payload
                    };
            case "GetDetail":
                return{
                    ...state,
                    detail:action.payload
                };
            case "CLEAR_RECIPES":
                return{
                    ...state,
                    recipes:action.payload
                };
        default: return state;
    };
};
