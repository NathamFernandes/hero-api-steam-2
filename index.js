const SteamAPI = require('steamapi');
const steam = new SteamAPI('0D372211EAD5CDB42F5A686BF51766CC');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("Tudo normal!")
})

app.get('/teste1', (req, res) => {
    steam.resolve('https://steamcommunity.com/profiles/76561198148730868').then(id => { console.log(id); })
})

app.get('/teste2', (req, res) => {
    steam.resolve('https://steamcommunity.com/profiles/76561198248619940').then(id => { console.log(id); })
})

app.get('/teste3', (req, res) => {
    steam.getUserSummary('76561198148730868').then(summary => { console.log(summary); })
})

app.get('/teste4', (req, res) => {
    steam.getUserSummary('76561198248619940').then(summary => { console.log(summary); })
})

app.get('/teste5', (req, res) => {
    steam.getUserStats('76561198148730868', 730).then(stats => { console.log(stats); })
})

app.get('/teste6', (req, res) => {
    steam.getUserStats('76561198248619940', 730).then(stats => { console.log(stats); })
})

app.get('/teste7', (req, res) => {
    steam.getUserStats('76561198148730868', 730).then(stats => { res.json(stats); })
})

app.get('/teste8', (req, res) => {
    steam.getUserStats('76561198248619940', 730).then(stats => { res.json(stats); })
})

app.get('/usuarios/:idusuario', (req, res) => {
    steam.getUserStats(req.params.idusuario, 730).then(stats => { res.json(stats); })
});

app.listen(port, () => {
    console.log('Servidor operacional...')
})