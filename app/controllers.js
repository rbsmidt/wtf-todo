wtfTodo.controller('mainController', function($scope, $firebase){
  $scope.message = 'WTF to do today?';

  var ref = new Firebase('https://wtf-todo.firebaseio.com/data/');
  var sync = $firebase(ref);

  $scope.todos = $firebase(ref).$asArray();
  $scope.newTodo = function(){
    $scope.todos.$add({todo: '', participants: '', chosen: ''}).then(function(ref){
      var id = ref.key();
      console.log('added record with id' + id);
      location.hash = id;
    });
    console.log('new new new', $scope.todos);
  }

});
wtfTodo.controller('aboutController', function($scope){
  $scope.message = 'WTF todo is developed by stromworks.com';
});
