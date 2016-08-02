/**
 * Created by TechBirds on 16/7/11.
 */

(function(){

    angular.module('app',[
        'core',
        'common',
        'home',
        'app.templates'
    ]).controller('HelloWorldController',function(){
        var vm = this;
        vm.msg = 'Hello Angular-Yue Boilerplate!';
    });
})();