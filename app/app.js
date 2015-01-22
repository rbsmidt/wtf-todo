var wtfTodo = angular.module("wtfTodo", [
  'ngRoute',
  'firebase'
]);

wtfTodo.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'app/templates/home.html',
      controller: 'mainController'
    })
    .when('/about', {
      templateUrl: 'app/templates/about.html',
      controller: 'aboutController'
    })
    .when('/:id', {
      templateUrl: 'app/templates/todo.html',
      controller: 'todoController'
    })
    .when('/:id/action', {
      templateUrl: 'app/templates/action.html',
      controller: 'actionController'
    })
    .when('/:id/result', {
      templateUrl: 'app/templates/result.html',
      controller: 'resultController'
    })
    .otherwise({
      templateUrl: 'app/templates/home.html',
      controller: 'mainController'
    });

    //$locationProvider.html5Mode(true);
});
