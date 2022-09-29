const { GetApi } = require("./Controller_Recipes")
const {Diet} = require("../db");

const axios = require("axios")

const GetDiets = async ()=>{
    let checkDB = await Diet.findAll();
    
    if(checkDB.length){ //si tiene en db
        console.log(checkDB.length)
        console.log("db")
        return checkDB;
    }else{
        let pedido = await GetApi();
        console.log("api")
        let diet = pedido.map(e=> e.diets)
        let alltypes = diet.flat()
        console.log(alltypes)

        await alltypes.forEach(e => {
            Diet.findOrCreate({
                where: {name: e}
            })
        }); 
        let dietas = await Diet.findAll()
        return dietas
    }
}; 

module.exports={GetDiets}