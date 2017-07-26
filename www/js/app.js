// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('mainController', function($scope, $ionicPopup){

  var itens = [];
  //pegando a lista salva no localStorage
  var lista = localStorage.getItem("tasklist");

  //se a lista nn tiver vazia pega do json
  if(lista !== null){
    itens = angular.fromJson(lista);
  }

  $scope.lista = itens;
  $scope.showMarked = false;
  $scope.removeStatus = false;

  function getItem(item, novo){
    $scope.data = {};
    $scope.data.newTask = item.nome;

    $ionicPopup.show({
      //coisas do modal
      title: "Nova tarefa",
      scope: $scope,
      template:"<input type='text' placeholder='Tarefa' autofocus='true' ng-model='data.newTask'>",
      buttons:[
        {text: "Okay",
          onTap: function(e){
            item.nome = $scope.data.newTask;
            if(novo){
              //se for novo ele da o push
              itens.push(item);
            }
              //salvando na lista
              var lista = angular.toJson(itens);
              localStorage.setItem("tasklist", lista);
          }
        },
        {text: "Cancel"}
      ]
    });
  };

  //marcando pra finalizar
  $scope.onMarkTask = function(item){
    console.log("Okay");
    item.finalizada = !item.finalizada;
  };

  //escodendo
  $scope.onHideItem = function(item){
    return item.finalizada && !$scope.showMarked;
  }

  //removendo item
  $scope.onItemRemove = function(item){
    var pos = itens.indexOf(item);
    itens.splice(pos, 1);

    var lista = angular.toJson(itens);
    localStorage.setItem("tasklist", lista);
  }

  //para aparecer botão do remove
  $scope.onClickRemove = function(){
    $scope.removeStatus = !$scope.removeStatus;
  };

  //adicionando item
  $scope.onItemAdd = function(){
    var item = {nome: " ", finalizada: false};

    getItem(item, true);
  };

  //editando item
  $scope.onItemEdit = function(item){
    getItem(item, false);

    var lista = angular.toJson(itens);
    localStorage.setItem("tasklist", lista);
  };
});
