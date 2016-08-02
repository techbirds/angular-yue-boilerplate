/**
 * Created by TechBirds on 16/7/11.
 */

(function () {

    angular.module('home', [])
        .controller('HomeController', function () {
            var vm = this;
            vm.msg = 'hello world!';
        });

})();