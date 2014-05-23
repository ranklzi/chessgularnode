'use strict';

var app = angular.module('angular-chessboard', ['btford.socket-io'
  
    //'ngTouch'
]);

app.directive('angularChessboard', function() {
  return {
    restrict: 'A',

    scope: {
       pieces: '='
    },
    // controller: function($scope, $element){
    //   this.awesomeVariable = "Awesome Content lives here!"
    // },
    
    link: function(scope, element, attrs) {
      
      

      scope.board = {};
      scope.board.squares = [];
      scope.board.turn = 'w';
      scope.board.selectedFrom = null;
      scope.board.selectedTo = null;

      for (var row=0; row<8; row++){
        scope.board.squares.push([]);

        for (var col=0; col<8; col++){
          scope.board.squares[row].push(
            {'piece': ''});          
        }
      }

      //console.log(scope.board.squares);


      scope.$watch('pieces', function(oldVal, newVal) {
        if(newVal) {
          console.log(scope.pieces);
        }
      });

      scope.initBoardPieces = function initBoardPieces()
      {
          scope.board.squares[0][0].piece = 'rw';
          scope.board.squares[0][1].piece = 'kw';
          scope.board.squares[0][2].piece = 'bw';
          scope.board.squares[0][3].piece = 'qw';
          scope.board.squares[0][4].piece = 'gw';
          scope.board.squares[0][5].piece = 'bw';
          scope.board.squares[0][6].piece = 'kw';
          scope.board.squares[0][7].piece = 'rw';
          scope.board.squares[1][0].piece = 'pw';
          scope.board.squares[1][1].piece = 'pw';
          scope.board.squares[1][2].piece = 'pw';
          scope.board.squares[1][3].piece = 'pw';
          scope.board.squares[1][4].piece = 'pw';
          scope.board.squares[1][5].piece = 'pw';
          scope.board.squares[1][6].piece = 'pw';
          scope.board.squares[1][7].piece = 'pw';


          scope.board.squares[7][0].piece = 'rb';
          scope.board.squares[7][1].piece = 'kb';
          scope.board.squares[7][2].piece = 'bb';
          scope.board.squares[7][3].piece = 'qb';
          scope.board.squares[7][4].piece = 'gb';
          scope.board.squares[7][5].piece = 'bb';
          scope.board.squares[7][6].piece = 'kb';
          scope.board.squares[7][7].piece = 'rb';
          scope.board.squares[6][0].piece = 'pb';
          scope.board.squares[6][1].piece = 'pb';
          scope.board.squares[6][2].piece = 'pb';
          scope.board.squares[6][3].piece = 'pb';
          scope.board.squares[6][4].piece = 'pb';
          scope.board.squares[6][5].piece = 'pb';
          scope.board.squares[6][6].piece = 'pb';
          scope.board.squares[6][7].piece = 'pb';
      };
      scope.initBoardPieces();

      scope.isValidMove = function (xSource, ySource, xTarget, yTarget, error)
      {
        error = 'error!!!';

        return true;
      };
      scope.makeMove = function (xSource, ySource, xTarget, yTarget)
      {
        var piece = scope.board.squares[ySource][xSource].piece;

        scope.board.squares[yTarget][xTarget].piece = piece;

        scope.board.squares[ySource][xSource].piece = {};
      };
      scope.selectSquare = function(xSelected, ySelected){
        var square = { 'x' : xSelected, 'y' : ySelected};

        if (scope.board.selectedFrom === null)
        {
          scope.board.selectedFrom = square;

        }
        else if ((scope.board.selectedFrom.x === square.x) && (scope.board.selectedFrom.y === square.y))
        {
          scope.board.selectedFrom = null;
          scope.board.selectedTo = null;
        }
        else
        {
          //make move
          scope.makeMove(scope.board.selectedFrom.x, scope.board.selectedFrom.y, square.x, square.y);
          scope.board.selectedFrom = null;
          scope.board.selectedTo = null; 
        }
      };

      scope.isSelectedSquare = function(x, y){
        return scope.board.selectedFrom !== null && scope.board.selectedFrom.x === x && scope.board.selectedFrom.y === y;
      };



      scope.dropListener = function (eDraggable, eDroppable) {
                
                var eSrc = eDraggable.parent();
                
                if (eSrc !== eDroppable) {
                    
                    scope.$apply(function () {
                        var error;
                        var valid = scope.isValidMove(eSrc, eDroppable, error);
                        if (!valid) {
                            //onDropRejected(error);
                        } else {
                          scope.makeMove(eSrc[0].attributes.positionx.value, 
                                eSrc[0].attributes.positiony.value, 
                                eDroppable[0].attributes.positionx.value, 
                                eDroppable[0].attributes.positiony.value);
                            
                        }
                    });
                }
 
            };
    },
    templateUrl: '/directives/chessboard/_chessboard.html'

  };
});

app.directive('uiDraggable', function () {
            return {
                restrict:'A',
                link:function (scope, element, attrs) {
                    element.draggable({
                        revert:true
                    });
                }
            };
        });
 
app.directive('uiDropListener', function () {
    return {
        restrict:'A',
        link:function (scope, eDroppable, attrs) {
            eDroppable.droppable({
                drop:function (event, ui) {
                    var fnDropListener = scope.$eval(attrs.uiDropListener);
                    if (fnDropListener && angular.isFunction(fnDropListener)) {
                        var eDraggable = angular.element(ui.draggable);
                        fnDropListener(eDraggable, eDroppable, event, ui);
                    }
                }
            });
        }
    };
});    

app.filter('piecefilter', function() {
  return function(input) {
    if (input === 'pw'){
      return '♙';
    }
    if (input === 'kw'){
      return '♘';
    }
    if (input === 'bw'){
      return '♗';
    }
    if (input === 'rw'){
      return '♖';
    }
    if (input === 'qw'){
      return '♕';
    }
    if (input === 'gw'){
      return '♔';
    }
    if (input === 'pb'){
      return '♟';
    }
    if (input === 'kb'){
      return '♞';
    }
    if (input === 'bb'){
      return '♝';
    }
    if (input === 'rb'){
      return '♜';
    }
    if (input === 'qb'){
      return '♛';
    }
    if (input === 'gb'){
      return '♚';
    } 
  };
});
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});