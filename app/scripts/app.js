'use strict';

/**
 * @ngdoc overview
 * @name crudAppApp
 * @description
 * # crudAppApp
 *
 * Main module of the application.
 */

var app = angular.module('crudAppApp', ['ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'datatables',
  'datatables.bootstrap',
  'isteven-multi-select'
])

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('books', {
      url: '/books',
      templateUrl: 'views/books.html',
      ncyBreadcrumb: {
        label: 'Books'
      },
      controller: 'booksCtrl',
      resolve: {
        // bookStore: function ($q, booksService) {
        //   return booksService.showBooks().then(function (result) {
        //     console.log('resolve bookstore', result);
        //     return result.data;
        //   }).catch(function (error) {
        //     // notifications.error(error.data.error.message);
        //     return $q.reject(error);
        //   });
        // }
        // bookStore: function ($q, booksService, $stateParams) {
        //   var $postData = {};
        //   var data = localStorage.getItem('DataTables_bookstoreTable_/');
        //   if (data != null) {
        //     data = JSON.parse(data);
        //     $postData.limit = data.length;
        //     $postData.offset = data.start;
        //     $postData.search = data.search.search;
        //     $postData.order = {column: data.order[0][0], dir: data.order[0][1]};
        //   }

        //   return booksService.getAllBooksForTable($postData, $stateParams.reload).then(function (result) {
        //     return result.data;
        //   }).catch(function (error) {
        //     // notifications.error(error.data.error.message);
        //     return $q.reject(error);
        //   });
        // }
      },
      params: {reload: false}
    });
    $urlRouterProvider.otherwise('/books');
});





