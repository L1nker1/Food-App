const { Router } = require('express');
const axios = require("axios");
const {Recipe, Diet} = require("../db")
const {GetAll} = require("../Controllers/Controller_Recipes");
const recipes = Router();


//ruta info home + query
recipes.get("/", async (req,res)=>{
    const {name} = req.query
    let pedido = await GetAll()
    //console.log(pedido)
    let map = pedido.map(e=>{ //info mapeada a rutahome
        return{
            id:e.id,
            image:e.image,
            title:e.title,
            diets: e.diets,
            healthScore:e.healthScore,
            score:e.score,
        };
    });
    if(name){
        try{
            let filt = pedido.filter(e=>e.title.toLowerCase().includes(name.toLowerCase()))
            res.send(filt)
        }catch(e){
            console.error(e)
        }
    }else{
        res.send(map)
    };
}); //

//ruta paramas id
recipes.get("/:id", async (req,res)=>{
    const {id} = req.params;
    let pedido = await GetAll();
    if(id){
        try{
            let map = pedido.filter(e=>e.id == id)
            map.length ? res.send(map) : res.send("no hay resultados con esa id");
            
        }catch(e){
            console.error(e);
        };
    }
}); 


//ruta post
recipes.post("/", async (req,res)=>{
    const {title, diets, summary, healthScore, steps, image, /* CreatedInDb */} =req.body;
    if(title && diets && summary && healthScore && image ){
        try{
            let createR = await Recipe.create({
                title,
                summary,
                healthScore,
                image,
                healthScore,
                steps,
                /* CreatedInDb */
            });
            const findDiet = await Diet.findAll({
                where:{name: diets}
            });
            createR.addDiet(findDiet);
            res.send("Recipe Created!");
        }catch(e){
            console.error(e);
            res.status(401).send(e) //importante
        }
    }else{
        res.status(401).send("Complete the Missing fields!");
        
    };
});



module.exports={recipes}