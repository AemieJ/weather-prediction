const request = require('request');
const argv = require('yargs').argv;

let apiKey = 'fd2c32c62b490e956cde890b6acd7010';
let city = argv.c || 'Surat';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


request(url , (err , res , body)=>{
  if(err)
    console.log('Error : ' , err);
  else 
  {
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in ${weather.name}.`;
    console.log(message);
  }
});



