wtfTodo.controller('mainController', function($scope, $firebase, $routeParams, $location){
  $scope.message = 'WTF to do today?';
  $scope.welcome = 'My name is';
  var ref = new Firebase('https://wtf-todo.firebaseio.com/data/');
  var sync = $firebase(ref);

  $scope.todos = sync.$asArray();
  $scope.newTodo = function(firstName){
    if(firstName !== undefined) {
      $scope.todos.$add({todo: '', participants: [firstName], chosen: ''}).then(function(ref){
        var id = ref.key();
        console.log('added record with id' + id, 'first participant is', firstName, 'database object:', $scope.todos);
        $location.url('/'+id);
        $scope.error = '';
      });
    } else {
      $scope.error = 'Please fill in your name!';
    }
  }

});
wtfTodo.controller('aboutController', function($scope){
  $scope.message = 'WTF todo is developed by stromworks.com';
});

wtfTodo.controller('todoController', function($scope, $firebase, $routeParams){
  $scope.welcome = 'We are ';
  $scope.todoMessage = 'One of us is ';
  $scope.model = {
    id: $routeParams.id
  }
  var ref = new Firebase('https://wtf-todo.firebaseio.com/data/'+$routeParams.id);
  var sync = $firebase(ref);
  $scope.todos = sync.$asObject();
  $scope.newParticipant = function(participant) {
    if(participant !== undefined) {
      part = $scope.todos.participants;
      if(angular.isArray(part)) {
        var length = part.length;
        part[length] = participant;
        console.log('isArray true', length);
      } else {
        part = [$scope.todos.participants];
        var length = part.length;
        part[length] = participant;
        console.log('isArray false', length);
      }
      $scope.todos.participants = part;
      $scope.todos.$save().then(function(ref){
        console.log('saved', $scope.todos);
        $scope.newPart = '';
      });
    } else {
      $scope.error = 'Please fill in the participant name'
    }
  };

  $scope.removeParticipant = function(participant, key) {
    console.log('participant', participant, 'todos', $scope.todos, 'key', key);
    part = $scope.todos.participants;
    if(angular.isArray(part)) {
      part.splice([key], 1);
      console.log('part er spliced', part);
    } else {
      part = '';
    }
    $scope.todos.participants = part;
    $scope.todos.$save().then(function(ref){
      console.log('removed and saved', $scope.todos);
    });
  }

  $scope.isLast = function(check) {
    var cssClass = check ? 'last' : null;
    return cssClass;
  };

  $scope.result = function(todoAction) {
    console.log('todo action:', todoAction);
    $scope.todos.todo = todoAction;
    $scope.todos.$save().then(function(ref){
      console.log('action saved', $scope.todos, ' calculating result');
      var length = $scope.todos.participants.length;
      participants = $scope.todos.participants;
      $scope.chosen = participants[Math.floor(Math.random()*length)];
      $scope.todos.chosen = $scope.chosen;
      $scope.action = $scope.todos.todo;
      $scope.todos.$save().then(function(ref){
        console.log('result calculated and saved, the chosen was');
        //$scope.todoAction = '';
      });
    });
  }

});
