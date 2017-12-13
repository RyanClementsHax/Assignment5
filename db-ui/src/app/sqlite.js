'use strict';
const sqlite3 = require('sqlite3').verbose();
angular.module('db-ui.app')
.controller('queryCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
// open the database
let db = new sqlite3.Database('./db-ui/db/flowers.db');


$scope.selectFlower = function (flower_coname){

    let sql ='SELECT * FROM  SIGHTINGS WHERE NAME = ? ORDER BY SIGHTED DESC LIMIT 10'

    db.all(sql, ['flower_coname'], (err, rows) => {
        if (err) {
        throw err;
        }
        rows.forEach((row) => {
        console.log(row.name);
        });
    });
}
$scope.updateFlower = function (flower_coname){
        let sql1 = 'UPDATE FLOWERS SET COMNAME = ? WHERE COMNAME = ?';
        let sql2 = 'UPDATE FLOWERS SET GENUS = ? WHERE COMNAME = ?';
        let sql3 = 'UPDATE FLOWERS SET SPECIES = ? WHERE COMNAME = ?';
    
        db.run(sql1, ['$scope.coname',flower_coname], (err, rows) => {
            if (err) {
            throw err;
            }
            rows.forEach((row) => {
            console.log(row.name);
            });
        });
        db.run(sql2, ['$scope.genus',flower_coname], (err, rows) => {
            if (err) {
            throw err;
            }
            rows.forEach((row) => {
            console.log(row.name);
            });
        });
        db.run(sql3, ['$scope.species',flower_coname], (err, rows) => {
            if (err) {
            throw err;
            }
            rows.forEach((row) => {
            console.log(row.name);
            });
        });
    }
$scope.addSighting = function (flower_coname){
    
        db.run(`INSERT INTO SIGHTINGS VALUES(?,?,?,?)`, ['flower_coname','$scope.inputSighting.person','$scope.inputSighting.location','$scope.inputSighting.sighted'], function(err) {
            if (err) {
              return console.log(err.message);
            }
          });
    } 

db.close();
}]);