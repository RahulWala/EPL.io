var app = angular.module('football',['ngRoute']);

app.controller('engPreLea',['$http',function($http){
  
  this.names = [];
  var main = this;
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

  this.eplData = function(){
  	$http({
  		method: 'GET',
  		url: main.baseUrl+'/2015-16/en.1.json'
  	}).then(function successCallback(response){
  		console.log(response.data);

    //   for(i in response.data){
    //     console.log(response.data);
  	   	 // main.names = dats.name;
    // }
  	},function errorCallback(response){
  		alert("Not Found");
 	})//End of http


  };//End of eplData
}]); //End of controller