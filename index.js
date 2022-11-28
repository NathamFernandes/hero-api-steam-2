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
    let url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=0D372211EAD5CDB42F5A686BF51766CC&steamid=${req.params.idusuario}`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'api.steampowered.com',
            'X-RapidAPI-Key': '0D372211EAD5CDB42F5A686BF51766CC'
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