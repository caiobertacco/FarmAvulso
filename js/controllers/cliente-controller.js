angular.module('socialRemedy')
    .controller('ClienteController', function($rootScope, $scope, $location){

        $scope.medicamento = {};
        $scope.retiradas = [];
        $scope.pedidos = [];

        $rootScope.user = {
            nome:"João da Silva",
            tpCli: 0,
            pontos: 100
        };
        $scope.tpCliente = [{
                code: 0,
                desc: 'Pessoa Física',
                tpDoc: 'CPF'
            },{
                code: 1,
                desc: 'Pessoa Jurídica',
                tpDoc: 'CNPJ'
            }];
        
        $scope.medicamentos = [
            {
                id:0,
                nome: "Selecione o medicamento"
            },
            {
                id: 1,
                nome: "Aspirina",
                valor: 5.00
            },
            {
                id:2,
                nome: "Amoxicilina",
                valor: 5.00
            },
            {
                id: 3,
                nome: "Clordiazepóxido",
                valor: 9.00
            },
            {
                id: 4,
                nome: "Clonazepam",
                valor: 8.00
            }];

        $scope.adicionar = function(){
            if($rootScope.user.tpCli == 0) {
                $scope.retiradas.push(angular.copy($scope.retirada));
                $scope.retirada = {};
            }

            if($rootScope.user.tpCli == 1) {
                $scope.pedido.medicamento = angular.copy($scope.medicamento);
                $scope.pedidos.push($scope.pedido);
                resetFormPedido();
            }
        };

        $scope.goHome = function(){
            $location.path("#/home");
        }

        function resetFormPedido(){
            $scope.medicamento = $scope.medicamentos[0];
            $scope.pedido = {};
        }
        
});