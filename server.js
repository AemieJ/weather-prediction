const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');
const app = express();

const apiKey = require("./api-key.json").key;

app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true})); // * Use of middleware 


app.get('/' , (req , res)=>{
  res.render('index', {weather: null, error: null});
});
app.post('/' , (req , res)=>{
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url , (err , response , body)=>{
    if(err)
      res.render('index' , {weather: null , error: 'Please , try again.'});
    else
    {
      let weather = JSON.parse(body);
      if(weather.main == undefined)
        res.render('index' , {weather: null , error: 'Please , try again.'});
      else 
      {
        let weatherText = `It's ${weather.main.temp} °C in ${weather.name}.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(3000,()=>{
  console.log(`Server running on port 3000.`);
});