/**
 * Created by TechBirds on 16/7/20.
 */

describe('Hello World example', function() {

    beforeEach(module('app'));

    var HelloWorldController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        HelloWorldController = $controller('HelloWorldController', {
            $scope: scope
        });
    }));
    it('says hello world!', function () {
        expect(scope.msg).toEqual("Hello World!");
    });

});
