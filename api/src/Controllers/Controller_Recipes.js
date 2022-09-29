const axios = require("axios");
const {Recipe, Diet} = require("../db")
const {api, api2, api3,api4,api5, api6,api7, api8,api9,api10} = process.env; //1,5,2,3,4
const apikey = api8


const GetApi = async ()=>{
    //console.log(`https://api.spoonacular.com/recipes/complexSearch${apikey}&addRecipeInformation=true&number=100`)
    try{
        const request = await axios(`https://api.spoonacular.com/recipes/complexSearch${apikey}&addRecipeInformation=true&number=100`)
    
        const map =  request.data.results.map(e=>{
            if (e.vegetarian  && !e.diets.includes("vegetarian")) 
                e.diets.push("vegetarian");
            if(e.vegan && !e.diets.includes("vegan")) 
                e.diets.push("vegan");
            if(e.glutenFree && !e.diets.includes("gluten free"))
                e.diets.push("gluten free");
                return ({
                    id: e.id,
                    title:e.title,
                    image: e.image,
                    summary: e.summary,
                    score: e.spoonacularScore,
                    healthScore: e.healthScore,
                    diets: e.diets,
                    dishTypes: e.dishTypes,
                    steps: e.analyzedInstructions.map(el=>{
                        return el.steps.map(e=>{
                                return e.step
                            })             
                    })
                })
        })
        return map;
    }catch(e){
        console.error(e)
    }
};

const GetDB = async ()=>{
    try{
        let data = await Recipe.findAll({
            include : [
                {
                    model: Diet,
                    attributes:["name"],
                    through:{
                        attributes:[]
                    }
                }
            ]
            
        });
        return data
    }catch(e){
        console.error(e)
    }
};

const GetAll = async ()=>{
    const api = await GetApi();
    const db = await GetDB();
    const all = api.concat(db);
    return all;
};




module.exports={GetApi,GetDB,GetAll}