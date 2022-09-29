const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {GetDiets} = require("./src/Controllers/Controller_Diets") 

// Syncing all the models at once.aa
//en true se vacia y recontruye la db cada vez que se modifica, false mantiene la info
conn.sync({ force: false }).then(async () => {
  await GetDiets(); 
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
