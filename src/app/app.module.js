/**
 * Created by TechBirds on 16/7/11.
 */

(function(){

    angular.module('app',[
        'core',
        'common',
        'home',
        'app.templates'
    ]).controller('HelloWorldController',function($scope){
        $scope.msg = 'Hello World!';
    });

    alert("hello angular-yue 222211212!");

})();