const { Router } = require('express');
const { GetDiets } = require('../Controllers/Controller_Diets');
const Diets = Router();

Diets.get("/", async (req,res)=>{
    let pedido = await GetDiets();
    res.send(pedido);
});


module.exports={Diets}