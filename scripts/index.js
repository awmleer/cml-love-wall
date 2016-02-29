var app = angular.module("index", []);
app.controller("ctrlindex", function ($scope,$http) {
    $scope.genderfilter = 'girl';
    //TODO http获取items
    $http({
        url: 'http://120.27.121.63:3000/items',
        method: 'get',
    }).success(function (data) {
        $scope.items = data;
    }).error(function () {
        alert("获取信息失败，请稍后再试");
    });
    $scope.filter = function (gender) {
        $scope.genderfilter = gender;
    };
})