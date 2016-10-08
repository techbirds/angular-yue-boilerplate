/**
 * Created by TechBirds on 16/7/11.
 *
 * 工具类
 * 1. LocalStorage
 * 2. uuid
 * 3. lodash
 * 4. moment.js
 * 5. CryptoJS
 */

(function () {

    angular.module('utils', ['LocalStorageModule'])
        .factory('uuid', function () {
            function getRandom(max) {
                return Math.random() * max;
            }

            // rfc4122
            return {
                v4: function () {
                    var id = '', i;

                    for (i = 0; i < 36; i++) {
                        if (i === 14) {
                            id += '4';
                        }
                        else if (i === 19) {
                            id += '89ab'.charAt(getRandom(4));
                        }
                        else if (i === 8 || i === 13 || i === 18 || i === 23) {
                            id += '-';
                        }
                        else {
                            id += '0123456789abcdef'.charAt(getRandom(16));
                        }
                    }
                    return id;
                }
            };
        })
        .factory('_', function () {
            return _;
        })
        .factory('moment', function () {
            return moment;
        })
        .factory('CryptoJS',function(){
            return CryptoJS;
        })
})();