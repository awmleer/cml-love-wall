var app = angular.module("index", []);
app.controller("ctrlindex", function ($scope,$http) {
    $scope.genderfilter = '';
    //TODO http获取items
    $http({
        url: 'http://127.0.0.1:3000/items',
        method: 'get',
    }).success(function (data) {
        $scope.items = data;
    }).error(function () {
        alert("获取信息失败，请稍后再试");
    });
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