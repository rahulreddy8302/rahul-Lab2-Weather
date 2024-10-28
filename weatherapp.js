const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", async function(request, response) {
    let city = request.body.city;
    const apiKey = '9a8954cd29486d05803dd532df86deb2';

    try {
       
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);

        
        const temperature = res.data.main.temp; // Temperature
        const humidity = res.data.main.humidity; // Humidity
        const windSpeed = res.data.wind.speed; // Wind Speed

      
        response.json({
            temperature: temperature,
            humidity: humidity,
            windSpeed: windSpeed
        });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error fetching weather data.");
    }
});

let port = process.env.PORT || 8002;
app.listen(port, function() {
    console.log("Server running on port 8002");
});
