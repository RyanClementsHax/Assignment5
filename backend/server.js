const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let db = new sqlite3.Database('./flowers.db');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

var selectFlower = function (flower_coname) {

    let sql ='SELECT * FROM  SIGHTINGS WHERE NAME = ? ORDER BY SIGHTED DESC LIMIT 10'

    db.all(sql, ['flower_coname'], (err, rows) => {
        if (err) {
        throw err;
        }
        rows.forEach((row) => {
        console.log(row.name);
        });
    });
};

app.post('/flowers', (req, res) => {
    var flower = req.body.newFlower;
    var oldName = req.body.oldName;
    let sql1 = 'UPDATE FLOWERS SET COMNAME = ?, GENUS = ?, SPECIES = ? WHERE COMNAME = ?';
    let sql2 = 'UPDATE SIGHTINGS SET NAME = ? WHERE NAME = ?'

    db.run(sql1, [flower.COMNAME, flower.GENUS, flower.SPECIES, oldName], (err) => {
        db.run(sql2, [flower.COMNAME, oldName], (err) => {
            res.send();
        });
    });
});

app.post('/sightings', (req, res) => {
    var sighting = req.body;
    db.run(`INSERT INTO SIGHTINGS VALUES(?,?,?,?)`, [sighting.NAME, sighting.PERSON,sighting.LOCATION, sighting.SIGHTED], function(err) {
        res.send();
    });
});

app.get('/', (req, res) => {
    let flowers;
    let sql1 = 'SELECT * FROM FLOWERS';
    let sql2 = 'SELECT * FROM SIGHTINGS WHERE NAME = ? ORDER BY SIGHTED DESC LIMIT 10';

    db.all(sql1, [], (err, rows) => {
        flowers = rows;
        
        flowers.forEach((flower) => {
            db.all(sql2, [flower.COMNAME], (err, rows) => {
                flower.SIGHTINGS = rows;

                if(flower.COMNAME == flowers[flowers.length - 1].COMNAME) {
                    res.send(flowers);
                }
            });
        });
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))