wtfTodo.controller('mainController', function($scope, $firebase){
  $scope.message = 'WTF to do today?';

  var ref = new Firebase('https://wtf-todo.firebaseio.com/data/');
  var sync = $firebase(ref);

  $scope.todos = $firebase(ref).$asArray();
  $scope.newTodo = function(firstName){
    if(firstName != '') {
      $scope.todos.$add({todo: '', participants: firstName, chosen: ''}).then(function(ref){
        var id = ref.key();
        console.log('added record with id' + id, 'first participant is', firstName, 'database object:', $scope.todos);
        location.hash = id;
      });
    }
  }

});
wtfTodo.controller('aboutController', function($scope){
  $scope.message = 'WTF todo is developed by stromworks.com';
});
