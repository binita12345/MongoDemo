'use strict';

/**
 * @ngdoc service
 * @name crudAppApp.books
 * @description
 * # books
 * Service in the crudAppApp.
 */
var app = angular.module('crudAppApp');
app.service('booksService', function ($q, $http, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var apiBaseURL = 'http://localhost:3000/api/book/';
    var loadedData = null;

    /* get initial books and create cache*/
    this.getAllBooksForTable = function (param, reloaded) {
      if (reloaded) {
        loadedData = null;
      }
      if (!loadedData) {
        return $http.post(apiBaseURL + 'getAllForTable', param).then(function (result) {
          loadedData = result;
          return result;
        }).catch(function (error) {
          return $q.reject(error);
        });
      } else {
        return $q.resolve(loadedData);
      }
    };

    /* get categories of books*/
    this.getAllCategories = function () {
        return $http.post(apiBaseURL + 'getAllCat').then(function (result) {
          return result;
        }).catch(function (error) {
          return $q.reject(error);
        });
    };

    /* add books */
    this.addBooks = function (params) {
      return $http.post(apiBaseURL + 'addbook', params).then(function (result) {
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*show all books*/
    this.showBooks = function () {
      return $http.post(apiBaseURL + 'getAll').then(function (result) {
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*show book by book id*/
    this.showBookById = function (params) {
      return $http.post(apiBaseURL + 'getById', params).then(function (result) {
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book name*/
    this.findBookByName = function (params) {
      return $http.post(apiBaseURL + 'findBy', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book page no more than 100*/
    this.findBookByPage = function () {
      return $http.post(apiBaseURL + 'findByPageNo').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book page no more than 100*/
    this.findBookBWPage = function () {
      return $http.post(apiBaseURL + 'findBWPages').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book page no more than 100*/
    this.findBookNEPage = function () {
      return $http.post(apiBaseURL + 'findByNEPages').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book zero pages*/
    this.findZeroPage = function () {
      return $http.post(apiBaseURL + 'findByZero').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book Release*/
    this.findBookByRelease = function () {
      return $http.post(apiBaseURL + 'findByYear').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book between Release*/
    this.shownBWRelease = function () {
      return $http.post(apiBaseURL + 'findWithOR').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book language search*/
    this.searhByExists = function () {
      return $http.post(apiBaseURL + 'findBy').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book Highest price*/
    this.highPrice = function () {
      console.log("show high price");
      return $http.post(apiBaseURL + 'nameByPrice').then(function (result) {
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*find book by book highest price low page*/
    this.highPriceLowPage = function () {
      return $http.post(apiBaseURL + 'nameByHL').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*show book by book author and name*/
    this.shownByAuthNName = function (params) {
      return $http.post(apiBaseURL + 'findBy', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*update book by book id*/
    this.updateBookById = function (params) {
      return $http.post(apiBaseURL + 'updateById', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*update book by book name*/
    this.updatedByName = function (params) {
      return $http.post(apiBaseURL + 'updateByName', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

     /*update book by book name and author*/
     this.updatedByNameAuth = function (params) {
      return $http.post(apiBaseURL + 'updateByNameNAuth', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*update book by book search language*/
    this.updatedBySearch = function (params) {
      return $http.post(apiBaseURL + 'updateBySearch', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*delete book by book id*/
    this.deleteBookById = function (params) {
      return $http.post(apiBaseURL + 'deleteByID', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*delete book by book id search language*/
    this.deleteBookBySearch = function (params) {
      return $http.post(apiBaseURL + 'delete', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*delete book by book name*/
    this.deleteBookByName = function (params) {
      return $http.post(apiBaseURL + 'delete', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*delete book by book author and desc*/
    this.deletedByAuthNDesc = function (params) {
      return $http.post(apiBaseURL + 'delete', params).then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*delete book by book author and desc*/
    this.deletedByNameNCat = function (params) {
      return $http.post(apiBaseURL + 'delete', params).then(function (result) {
        console.log('delete cat name', result);
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*sort books by book name*/
    this.sortedName = function () {
      // console.log("show params");
      return $http.post(apiBaseURL + 'sortName').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*sort books by book name*/
    this.sortedPrice = function () {
      // console.log("show params");
      return $http.post(apiBaseURL + 'sortPrice').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*sort books by book name*/
    this.sortedAuthor = function () {
      // console.log("show params");
      return $http.post(apiBaseURL + 'sortAuthor').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*sort books by book name*/
    this.sortedPages = function () {
      // console.log("show params");
      return $http.post(apiBaseURL + 'sortPagesNo').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*sort books by book name*/
    this.sortedCat = function () {
      // console.log("show params");
      return $http.post(apiBaseURL + 'sortCategory').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*sort books by book name*/
    this.sortedRelease = function () {
      // console.log("show params");
      return $http.post(apiBaseURL + 'sortRelease').then(function (result) {
        
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    };

    /*distinct book category names*/
    this.distinctBook = function () {
      console.log("distinctBook");
      return $http.post(apiBaseURL + 'getAllCat').then(function (result) {
        return result;
      }).catch(function (error) {
        return $q.reject(error);
      });
    }
});
