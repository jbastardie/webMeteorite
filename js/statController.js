angular.module('meteoriteControllers').controller('statController',function ($scope) {

  $scope.meteorites=dataJsonBis;

  //Gestion nombre items par page
  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;

  //Gestion de la pagination
    $scope.viewby = 10;
    $scope.setItemsPerPage = function(num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1; //reset to first paghe
  }
   $scope.currentPage = 1,$scope.numPerPage = 10 ,$scope.maxSize = 5;
// Fin pagination


// On ne traite les données qu'une fois lors de la navigation
  if (uninitializedChart) {
    var counts = {};
    var countsYear= {};
    var tabMass=[];
    var tabYear=[];
    //initialisation des objets recevant les données traitées
    var tabData={dixG:0,centG:0,milleG:0,dixKG:0,centKG:0,mG:0,dixMG:0,centMG:0};
    var tabDataYear={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0};

    //Formatage des données
    for (var variable in $scope.meteorites) {
      if ($scope.meteorites.hasOwnProperty(variable)) {;
        $scope.meteorites[variable].year=parseFloat($scope.meteorites[variable].year);
        if(typeof $scope.meteorites[variable].mass!= "undefined"){
          $scope.meteorites[variable].mass=parseInt($scope.meteorites[variable].mass).toFixed(2);
        }
      }
    }

    //on compte le nombre d'occurence de chaque valeurs
    for(var i = 0; i< $scope.meteorites.length; i++) {
        var num = $scope.meteorites[i].mass;
        counts[num] = counts[num] ? counts[num]+1 : 1;
        var numYear = $scope.meteorites[i].year;
        countsYear[numYear] = countsYear[numYear] ? countsYear[numYear]+1 : 1;
    }
    //On regroupe les données par tranches de valeurs
    for(key in counts){
      if (key!="undefined") {
        if(parseFloat(key)<10){
          tabData.dixG+=counts[key];
        }else if(parseFloat(key)<100){
          tabData.centG+=counts[key];
        }else if(parseFloat(key)<1000){
          tabData.milleG+=counts[key];
        }else if(parseFloat(key)<10000){
          tabData.dixKG+=counts[key];
        }else if(parseFloat(key)<100000){
          tabData.centKG+=counts[key];
        }else if(parseFloat(key)<1000000){
          tabData.mG+=counts[key];
        }else if(parseFloat(key)<10000000){
          tabData.dixMG+=counts[key];
        }else{
          tabData.centMG+=counts[key];
        }
      }
    }

    for(key in countsYear){
      if (key!="undefined") {
        if(parseFloat(key)<1800){
          tabDataYear.a+=countsYear[key];
        }else if(parseFloat(key)<1850){
          tabDataYear.b+=countsYear[key];
        }else if(parseFloat(key)<1900){
          tabDataYear.c+=countsYear[key];
        }else if(parseFloat(key)<1910){
          tabDataYear.d+=countsYear[key];
        }else if(parseFloat(key)<1920){
          tabDataYear.e+=countsYear[key];
        }else if(parseFloat(key)<1930){
          tabDataYear.f+=countsYear[key];
        }else if(parseFloat(key)<1940){
          tabDataYear.g+=countsYear[key];
        }else if(parseFloat(key)<1950){
          tabDataYear.h+=countsYear[key];
        }else if(parseFloat(key)<1960){
          tabDataYear.i+=countsYear[key];
        }else if(parseFloat(key)<1970){
          tabDataYear.j+=countsYear[key];
        }else if(parseFloat(key)<1980){
          tabDataYear.k+=countsYear[key];
        }else if(parseFloat(key)<1990){
          tabDataYear.l+=countsYear[key];
        }else if(parseFloat(key)<2000){
          tabDataYear.m+=countsYear[key];
        }else{
          tabDataYear.n+=countsYear[key];
        }
      }
    }

    //Preparation des tableaux de données pour l'affichage
    tabMass.push(0);
    for (var key in tabData) {
      if (tabData.hasOwnProperty(key)) {
        tabMass.push(tabData[key]);
      }
    }
    tabYear.push(0);
    for (key in tabDataYear) {
      if (tabDataYear.hasOwnProperty(key)) {
        tabYear.push(tabDataYear[key]);
      }
    }
    uninitializedChart=false;
    chartData.tabMass=tabMass;
    chartData.tabYear=tabYear;
  }

  //Mise en place des données
  $scope.labelsMass = ["0","10","100","1000","10K","100k","1M","10M","100M"];
  $scope.labelsYear = ["800","1800","1850","1900","1910","1920","1930","1940","1950","1960","1970","1980","1990","2000","2013"];
  $scope.seriesMass = ['Repartition selon la masse'];
  $scope.seriesYear = ["Repartition selon l'année"];
  $scope.dataMass = [chartData.tabMass];
  $scope.dataYear = [chartData.tabYear];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});
