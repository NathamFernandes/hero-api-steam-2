const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', (req, res) => {
    res.send("Tudo normal!")
})

app.get('/usuarios/:idusuario', async (req, res) => {
    let url = 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=D01C2D2244E655C8B4BCBF3F43A38ED2&steamid=' + req.params.idusuario
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'api.steampowered.com',
            'X-RapidAPI-Key': 'D01C2D2244E655C8B4BCBF3F43A38ED2'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
    try {
        let response = await fetch(url, options);
        response = await response.json();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Internal Server Error.` });
    }
});

app.listen(port, () => {
    console.log('Servidor operacional...')
})