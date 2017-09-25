
app.controller('engPreLea2',['$http',function($http){
var main = this;

  this.datass = [];
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

  this.eplDatas = function(){
  	$http({
  		method: 'GET',
  		url: main.baseUrl+'/2016-17/en.1.json'
  	}).then(function successCallback(response){

          main.datass = response.data.rounds;
          console.log(main.datass);

          for(i in response.data.rounds){
            for(j in response.data.rounds[i].matches){
              main.date= response.data.rounds[i].matches[j];
              main.sCode = response.data.rounds[i].matches[j].team1.code;
              main.sCode2 = response.data.rounds[i].matches[j].team2.code;
            }
          }

      },function errorCallback(response){
  		alert("Not Found");
 	})//End of http
  };//End of eplData

}]); //End of controller


app.controller('secondController',['$http','$routeParams',function($http,$routeParams){

var main = this;
this.datass = [];
this.date = $routeParams.date;
//console.log(this.date);
this.t1Code = $routeParams.sCode;
//console.log(this.t1Code);
this.t2Code = $routeParams.sCode2;
//console.log(this.t2Code);
this.t1;  //team 1 
this.t2;  //team 2
this.s1;  //score 1
this.s2;  //score 2
this.winner;  //declare winner by judging 

this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

this.winTeams = function(){
  $http({
    method:'GET',
    url: main.baseUrl+'/2016-17/en.1.json'

  }).then(function successCallback(response){
    main.datass = response.data.rounds;
    console.log(main.datass);
    for(var i in main.datass){
      //console.log(i);
      for(var j in main.datass[i].matches){

        if(main.datass[i].matches[j].team1.code == main.t1Code && main.datass[i].matches[j].team2.code == main.t2Code && main.datass[i].matches[j].date == main.date){
          main.s1 = main.datass[i].matches[j].score1;
          //console.log(main.s1);
          main.s2 = main.datass[i].matches[j].score2;
          //console.log(main.s1);
          main.t1 = main.datass[i].matches[j].team1.name;
          main.t2 = main.datass[i].matches[j].team2.name;
          
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
    .when('/firsts/:date/:sCode/:sCode2',{
      templateUrl: 'pages/third-view.html',
      controller: 'secondController',
      controllerAs: 'secondCtrl'
    })
     .when('/third',{
      templateUrl: 'Pages/third.html',
      controller: 'engPreLea2',
      controllerAs: 'EPL2'   
     })
    .otherwise({redirectTo: '/index.html'});
}]);