angular.module('appApp').controller('MainCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket){
	

	socket.on('init', function (data) {
    $scope.socketData = data;
  });

  $scope.makeMove = function (from, to) {
  	var message = {};
  	message.from = from;
  	message.to = to;
  	message.type = 'move';


    socket.emit('gameMessage', message);
    };


}]);