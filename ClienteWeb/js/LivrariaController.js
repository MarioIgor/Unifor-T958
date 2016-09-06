app.controller('LivrariaController', function ($scope, $http) {

    $scope.livro = {};
    $scope.listaLivros = [];

    $scope.adiciona = function (form) {
        if(!form.$valid) {
            return;
        }

        $scope.livro.id = $scope.listaLivros.lenght+1;

        $http.post('http://localhost:3000/livros', $scope.livro).success(
            function (dados) {
                $scope.listaLivros.push($scope.livro);
                $scope.livro = {};
                $scope.lista();
            }
        );
    };

    $scope.lista = function () {
        $http.get('http://localhost:3000/livros').success(
            function (dados) {
                $scope.listaLivros = dados;
            }
        );
    };

    $scope.atualiza = function (livro) {  
        if (!$scope.formEdicao.$valid) return;

        $http.put('http://localhost:3000/livros/'+livro.id, livro).success(
            function (dados) {
                $scope.editando = false;   
            }
        );                          
    };

    $scope.apaga = function (livro) {        
        $http.delete('http://localhost:3000/livros/'+livro.id).success(
            function (dados) {
                $scope.lista();
            }
        );                 
    };

    $scope.edita = function (livro) {
        $scope.editando = true;  
        $scope.idEdicao = livro.id; 
    };

    $scope.lista();
    $scope.editando = false;    

});