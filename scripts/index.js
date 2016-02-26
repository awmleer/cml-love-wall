var app = angular.module("index", []);
app.controller("ctrlindex", function ($scope,$http) {
    $scope.genderfilter = 'boy';
    $scope.items = [
        {
            number:"54546",
            content:"eljfewafll  dfaiej",
            gender:"boy"
        },
        {
            number:"1586",
            content:"hhhh3qpfj",
            gender:"girl"
        }
    ];
    $scope.filter = function (gender) {
        $scope.genderfilter = gender;
    };
})