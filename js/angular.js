var app = angular.module('football',['ngRoute']);

app.controller('engPreLea',['$http',function($http){
var main = this;

  
  this.datas = [];
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

  this.eplData = function(date,tName){
  	$http({
  		method: 'GET',
  		url: main.baseUrl+'/2015-16/en.1.json'
  	}).then(function successCallback(response){

          main.datas = response.data.rounds;
          console.log(main.datas);

          for(i in response.data.rounds){
            for(j in response.data.rounds[i].matches){
              main.date= response.data.rounds[i].matches[j];
              main.tCode = response.data.rounds[i].matches[j].team1.code;
              main.tCode2 = response.data.rounds[i].matches[j].team2.code;
            }
          }

      },function errorCallback(response){
  		alert("Not Found");
 	})//End of http
  };//End of eplData

}]); //End of controller


app.controller('firstController',['$http','$routeParams',function($http,$routeParams){

var main = this;
this.datas = [];
this.date = $routeParams.date;
//console.log(this.date);
this.t1Code = $routeParams.tCode;
//console.log(this.t1Code);
this.t2Code = $routeParams.tCode2;
//console.log(this.t2Code);
this.t1;  //team 1 
this.t2;  //team 2
this.s1;  //score 1
this.s2;  //score 2
this.winner;

this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

this.winTeam = function(){
  $http({
    method:'GET',
    url: main.baseUrl+'/2015-16/en.1.json'

  }).then(function successCallback(response){
    main.datas = response.data.rounds;
    //console.log(main.datas);
    for(var i in main.datas){
      //console.log(i);
      for(var j in main.datas[i].matches){

        if(main.datas[i].matches[j].team1.code == main.t1Code && main.datas[i].matches[j].team2.code == main.t2Code && main.datas[i].matches[j].date == main.date){
          main.s1 = main.datas[i].matches[j].score1;
          //console.log(main.s1);
          main.s2 = main.datas[i].matches[j].score2;
          //console.log(main.s1);
          main.t1 = main.datas[i].matches[j].team1.name;
          main.t2 = main.datas[i].matches[j].team2.name;
          
          if(main.s1 < main.s2){
            main.winner = main.t2;
          }
          else if(main.s2 < main.s1){
            main.winner = main.t1;
          }
          else{
            main.winner = "Match Draw";
          }
        }
        else{
          console.log("Please Enter Correct Input");
        }
      }
    }
  },function errorCallback(response){
      console.log("Not Found");
  })
};
//Trying to show date @Ganapathy
}]);

app.config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/first/:date/:tCode/:tCode2',{
      templateUrl: 'pages/first-view.html',
      controller: 'firstController',
      controllerAs: 'firstCtrl'
    })
     .when('/second',{
      templateUrl: 'pages/second.html',
      controller: 'engPreLea',
      controllerAs: 'EPL'   
     })
    .otherwise({redirectTo: '/index.html'});
}]);