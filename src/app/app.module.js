/**
 * Created by TechBirds on 16/7/11.
 */

(function(){

    angular.module('app',[
        'core',
        'common',
        'home',
        'app.templates',
        'utils'
    ]).controller('HelloWorldController',function(_,uuid,moment,$log,localStorageService,CryptoJS){
        var vm = this;
        vm.msg = 'Hello Angular-Yue Boilerplate!';

        moment.locale('zh-cn');

        // utils test
        $log.info(uuid.v4());
        $log.info(_.VERSION);
        $log.info(moment().format('llll'));
        $log.info(localStorageService.isSupported);
        $log.info(CryptoJS.MD5('Message').toString(CryptoJS.enc.Hex));
        $log.info(CryptoJS.SHA1("Message").toString(CryptoJS.enc.Hex));
        $log.info(CryptoJS.SHA256("Message").toString(CryptoJS.enc.Hex));

    });
})();