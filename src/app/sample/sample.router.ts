import { Router } from 'express';
import axios from 'axios';

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/", (req, res) => {
  res.status(200).send({
    message: "GET request from sample router"
  });
});

//Solo se obtiene la información del verificentro se Agua Santa 
router.get("/recomendaciones", async (req, res, next) => {

  var found:any = [],
  rxp = /(?<=series:\s).*?(?=\s*}])/gs,
  curMatch;

  try{
    const response = await axios.get("http://calidaddelaire.puebla.gob.mx/models/grafico_ICA_SANTA.php");
    while(curMatch = rxp.exec(response.data)) {
      found.push(curMatch[0]);
    }

    //reemplaza las comillas simples con comillas dobles
    var doubleQuotes = found.toString().replace(/'/g, '"')

    //extrae los espacios /t /r  /n etc
    let data = doubleQuotes.replace(/(\r\n|\n|\r|\t)/gm, "");
    res.status(200).json({
      success: true,
      data
    });
  }catch(e){
    console.log('error --->', e);
    next(e);
  }
});