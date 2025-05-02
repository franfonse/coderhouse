#!/usr/local/bin/node

var request = require('request');
var colors = require("colors");
var geoip = require('geoip-lite');

var APPID = require("./serviceAccount.json").APPID;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function processResponse(error, response, body) {
  if (!error && response.statusCode == 200) {
    var bodyObj = JSON.parse(body);
    console.log("Temperatura en "+bodyObj.name+": "+bodyObj.main.temp.toString().red+' ºC');
    console.log("Min/Max: "+bodyObj.main.temp_min+'/'+bodyObj.main.temp_max);
    console.log("Humedad: "+bodyObj.main.humidity.toString().green+'%');
    console.log(capitalizeFirstLetter(bodyObj.weather[0].description));
  }else{
    console.log(error);
  }
}

function getMyIp(cb){
  function rqCB(err, response, body){
    var ip=JSON.parse(body).ip;
    cb(ip);
  }
  request('https://api.ipify.org/?format=json', rqCB);
}


function giveCity(ciudad){
  var url='http://api.openweathermap.org/data/2.5/weather?q='+ciudad+'&APPID='+APPID+"&units=metric&lang=es";
    request(url, processResponse);
}

function init(){
  var ciudad=process.argv[2];

  if(!ciudad) {
    getMyIp(function(miip){
      var geo = geoip.lookup(miip);
      ciudad = geo.city || "Buenos Aires";
      giveCity(ciudad);
    });
  } else {
    giveCity(ciudad);
    }
    
}



init();

