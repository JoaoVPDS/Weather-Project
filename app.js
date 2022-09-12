const express = require('express');
const https = require('https');

const app = express();

app.get('/', function(req, res){
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Maceio&units=metric&appid=e67c14044a19a7fe7a30cf094555a532'

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const city = weatherData.name
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write(`<h1>The temperature in ${city} is ` + temp + ` degrees Celsius</h1>`)
            res.write('<p>The weather is currently ' + weatherDescription + '</p>');
            res.write('<img src=' + imageURL + '>');
            res.send()
        })
    })

});

app.listen(8080, function(){
    console.log("Server is running on port 8080.")
});