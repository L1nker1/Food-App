const { DataTypes , UUIDV4} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      primaryKey:true,
      allowNull:false,
    },
    title: { //name
      type: DataTypes.STRING,
      allowNull: false,
    },
    score:{
      type:DataTypes.INTEGER,
      validate:{
        min:0,
        max:100
      }
    },
    healthScore:{
      type:DataTypes.INTEGER,
      validate:{
        min:0,
        max:100
      }
    },
    image:{
      type:DataTypes.STRING,
      //allowNull:false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    steps:{
      type: DataTypes.TEXT
    },
    CreatedInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    
  },
  {
    timestamps: false
  });
}; 
