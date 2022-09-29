const { Router } = require('express');
const {Diets} = require("./Diets")
const {recipes} = require("./Recipes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/diet", Diets);
router.use("/recipes", recipes);


module.exports = router;
