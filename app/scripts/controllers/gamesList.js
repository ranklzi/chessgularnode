angular.module('appApp').controller('GamesListCtrl', 
  ['$location', '$state', '$scope', '$rootScope', '$http',  'socket', 'gamesService',
  function($location, $state, $scope, $rootScope, $http, socket, gamesService){
	
  //console.log('gamesgamesgamesgamesgamesgamesgamesgamesgamesgames');  
  var games = gamesService.get(function() {
    console.log(games);
  });
  // socket.on('init', function (data) {
  //   $scope.socketData = data;
  // });

  // $scope.makeMove = function (from, to) {
  // 	var message = {};
  // 	message.from = from;
  // 	message.to = to;
  // 	message.type = 'move';


  //   socket.emit('gameMessage', message);
  //   };
  console.log($rootScope.currentUser);


}]);