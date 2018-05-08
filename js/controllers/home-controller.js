angular.module('socialRemedy')
    .controller('HomeController', function($rootScope, $scope, $location){
        $scope.logIn = function(){
            if($scope.usuario === "doador"){
                $rootScope.user = {
                    nome:"João da Silva",
                    tpCli: 0
                };
            }

            if($scope.usuario === "hospital"){
                $rootScope.user = {
                    nome:"Hospital Saúde",
                    tpCli: 1
                };
            }
            $location.path('/cliente');
        }
    });