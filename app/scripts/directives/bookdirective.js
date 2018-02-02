var app = angular.module('crudAppApp');
app.directive('booksDirective', function ($scope) {
    $scope.$on('Reset', function () {
        angular.forEach($scope.filteredModel, function (value, key) {
            console.log('value', value);
            if (typeof value[attrs.groupProperty] === 'undefined' && typeof value !== 'undefined' && value[attrs.disableProperty] !== true) {
                var temp = value[$scope.indexProperty];
                value[$scope.tickProperty] = $scope.backUp[temp][$scope.tickProperty];
            }
        });
        $scope.refreshOutputModel();
        $scope.refreshButton();
        $scope.onReset();
    });
        
        
});