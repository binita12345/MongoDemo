'use strict';

/**
 * @ngdoc function
 * @name crudAppApp.controller:BooksctrlCtrl
 * @description
 * # BooksctrlCtrl
 * Controller of the crudAppApp
 */
var app = angular.module('crudAppApp');
app.controller('booksCtrl', function ($scope, booksService, $rootScope, DTOptionsBuilder, DTColumnBuilder) {
  // console.log("app initialize");
  // $scope.bookStore = $scope.$resolve.bookStore;
  // console.log('all data.....', $scope.bookStore);
  $scope.bookstores = this;
  console.log("app initialize", $scope.bookstores);
  var $postData = {};
 
  $scope.bookCategories = [];
  $scope.selectedCategories = null;
  $scope.bookReleases = [];
  $scope.selectedReleases = null;
  $scope.bookstores.dtInstance = {};
  $scope.$broadcast('Reset');
  

  $scope.bookstores.dtOptions = DTOptionsBuilder.newOptions()
    
    .withOption('ajax', function (data, callback) {
      // console.log("ajax data", data);
      $postData = {
        limit: data.length,
        offset: data.start,
        search: data.search.value,
        order: data.order[0],
        filter: {
          bookReleasedYear: $scope.yearSelected,
          minPrice: $scope.minValue,
          maxPrice: $scope.maxValue,
          bookCategory: $scope.categorySelected
        }
      };
      
      booksService.getAllBooksForTable($postData, true).then(function (result) {
        // console.log('result table page reload..1', result.data.data);
        callback(result.data);
      });
      $scope.input = [];
      $scope.withCatSelected = function (categorySelected) {
        angular.forEach(categorySelected, function (catData) {
            $scope.input.push(catData.bookCategory);
        });
        $scope.categorySelected = categorySelected ? $scope.input : undefined;
        $scope.bookstores.dtInstance.reloadData(); 
      }
      $scope.withYearSelected = function (yearSelected) {
        console.log('withYearSelected', yearSelected);
        $scope.yearSelected = yearSelected ? yearSelected[0].bookReleasedYear : undefined;
        console.log('withYearSelected..1', $scope.yearSelected);
        $scope.bookstores.dtInstance.reloadData(); 
      }
      
    })  

    .withDataProp('data')
    .withOption('processing', true)
    .withOption('serverSide', true)
    .withOption('bLengthChange', true)
    .withPaginationType('full_numbers')
    .withOption('order', [1, 'desc'])
    .withDisplayLength(10)
    .withBootstrap();

        $scope.bookstores.dtColumns = [
          DTColumnBuilder.newColumn('bookId').withTitle('BookID').withClass('col-md-1'),
          DTColumnBuilder.newColumn('bookName').withTitle('BName').withClass('col-md-1'),
          DTColumnBuilder.newColumn('bookAuthor').withTitle('BAuthor').withClass('col-md-2'),
          DTColumnBuilder.newColumn('bookDescription').withTitle('BDescription').withClass('col-md-2'),
          DTColumnBuilder.newColumn('bookPageNo').withTitle('BPageNo').withClass('col-md-1'),
          DTColumnBuilder.newColumn('bookCategory').withTitle('BCategory').withClass('col-md-2'),
          DTColumnBuilder.newColumn('bookPrice').withTitle('BPrice').withClass('col-md-1'),
          DTColumnBuilder.newColumn('bookReleasedYear').withTitle('BookRelease').withClass('col-md-1'),
          DTColumnBuilder.newColumn(null).withTitle('BLanguage').withClass('col-md-1').renderWith(languageHtml),
        ]

        function languageHtml(data) {
          var html;
          // console.log('condition', data);
          if (data.bookLanguage == undefined) {
            html = '<div>-</div>';
          } else {
            // var Language = data.bookLanguage == undefined ? '' : data.bookLanguage;
            // var networkRevenue = data.bookLanguage == undefined ? '' : data.bookLanguage;
            html = '<div><span>' + data.bookLanguage + '</span><br />';
          }
          return html;
        }

        booksService.distinctBook().then(function (result) {
          var x = result.data;
          var myObj = {};
          for(var i = 0 ; i < x.length ; i++){
            myObj[i] = x[i];
            var myObj2 = {
              bookCategory: myObj[i], selected: false
            };
            $scope.bookCategories.push(myObj2);
          }
        });

        
        $scope.withCatSelectedResest = function(data) {
          console.log("withCatSelectedResest", data);
        }
       
        for (var i=2000; i<2050; i++) {
          var myObj = {
            bookReleasedYear: i, selected: false
          };
          $scope.bookReleases.push(myObj);
        } 
        

        $scope.ngChange = function() {
          $scope.minValue =  $scope.minValue ?  $scope.minValue : undefined;
          $scope.maxValue =  $scope.maxValue ?  $scope.maxValue : undefined;
          $scope.bookstores.dtInstance.reloadData();    
        }
        
        
  // $scope.tableee = true;
  $scope.bookdata = true;
  $scope.bookss = [];
  $scope.bookstore = [];
  
  $scope.shownameonly = function() {
    $rootScope.onlyName = true;
    $scope.bookdata = true;
    $scope.tableee = true;
    $scope.table1 = false;
    // console.log("app bookStore"); 
      booksService.getAllBooksForTable().then(function (response) {  
        // console.log("app bookStore..1", response);
          $scope.bookss = response.data.data;  
          console.log("$scope.bookss", $scope.bookss);
          
      },  
      function (error) {  
          console.log("Error: " + error);  
      });  
  }
  $scope.onNameClick = function(params) {
    $scope.bookdata = true;
    $scope.tableee = true;
    $scope.table1 = true;
    console.log("params: " ,params);  
    // var parseParam = JSON.parse(params);
    // console.log("parseParam: " ,parseParam); 
    // var arr = Object.values(params);
    var arr = [];

    arr.push(params)
    // var arr = Object.keys(params).map(function(k) { return params[k] });

    $scope.bookstore = arr;
    console.log("$scope.bookstore: " ,$scope.bookstore);  
  }  

  $scope.addBook = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    console.log("add book");
    // $scope.book = {};
    // console.log('$scope.book.name', $scope.books.name);
    var params = {
        bookId: $scope.books.id,
        bookName: $scope.books.name ,
        bookAuthor: $scope.books.author,
        bookDescription: $scope.books.desc,
        bookPageNo: $scope.books.pageno,
        bookCategory: $scope.books.cat,
        bookPrice: $scope.books.price,
        bookReleasedYear: $scope.books.release,
        bookLanguage: $scope.books.lang 
      }

    booksService.addBooks(params).then(function (response) {  
      // console.log("add bookStore..1", response);
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showAllBook = function() {
    $rootScope.allBook = true;
    $scope.bookdata = false;
    $scope.tableee = false;
    $scope.table1 = true;
    booksService.showBooks().then(function (response) {  
      console.log("show bookStore..1", response.data);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });
  }

  $scope.showById = function(params) {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getId = {
      bookId: params
    }
    // console.log("show book by id", getId);
    booksService.showBookById(getId).then(function (response) {  
      // console.log("add bookStore..1", response);
      $scope.bookstore = response;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showByName = function(params) {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getName = {
      bookName: params
    }
    // console.log("show book by id", getName);
    booksService.findBookByName(getName).then(function (response) {  
      // console.log("find name bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showByAuthNName = function(author, name) {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getData = {
      bookAuthor: author,
      bookName: name
    }
    console.log("show book by author n desc", getData);
    booksService.shownByAuthNName(getData).then(function (response) {  
      console.log("find release bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showByPage = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.findBookByPage().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showBookBWPages = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.findBookBWPage().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showBookNEPages = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.findBookNEPage().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showPageZero = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.findZeroPage().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showByRelease = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by release");
    booksService.findBookByRelease().then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.showBWRelease = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by release");
    booksService.shownBWRelease().then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.searchExists = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by release");
    booksService.searhByExists().then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.bookHighPrice = function() {
    $scope.bookdata = true;
    $scope.table1 = false;
    // console.log("show book by high price");
    booksService.highPrice().then(function (response) {  
    console.log("find high price bookStore..1", response);

      var array = [];

      if($rootScope.allBook) {
        $scope.table1 = true;
        $scope.bookstore = response;
      } else {
        array.push(response)
        // console.log("books arr", array);
        $scope.bookss = array[0];
      }
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.bookHPLowPage = function() {
    $scope.bookdata = true;
    $scope.table1 = false;
    console.log("show book by release");
    booksService.highPriceLowPage().then(function (response) {  
      console.log("find release bookStore..1", response);
      var array = [];

      if($rootScope.allBook) {
        $scope.table1 = true;
        $scope.bookstore = response;
      } else {
        
        array.push(response)
        // console.log("books arr", array);
        $scope.bookss = array[0];
      }
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.updateById = function(params) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("update by id", params);
    var getId = {
      bookId: params,
      bookName: $scope.books.name ,
      bookAuthor: $scope.books.author,
      bookDescription: $scope.books.desc,
      bookPageNo: $scope.books.pageno,
      bookCategory: $scope.books.cat,
      bookPrice: $scope.books.price,
      bookReleasedYear: $scope.books.release,
      bookLanguage: $scope.books.lang
    }
    // console.log("show book by id", getId);
    booksService.updateBookById(getId).then(function (response) {  
      console.log("update bookStore..1", response);
      $scope.bookstore = response;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.updateByName = function(name) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    console.log("update by name", name);
    var updateData = {
      bookId: $scope.books.id,
      bookName: name,
      bookAuthor: $scope.books.author,
      bookDescription: $scope.books.desc,
      bookPageNo: $scope.books.pageno,
      bookCategory: $scope.books.cat,
      bookPrice: $scope.books.price,
      bookReleasedYear: $scope.books.release,
    }
    console.log("update by name..1", updateData);
    booksService.updatedByName(updateData).then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.updateBookByNameNAuthor = function(name, author) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    console.log("update by name", name);
    console.log("update by author", author);
    var updatedData = {
      bookId: $scope.books.id,
      bookName: name,
      bookAuthor: author,
      bookDescription: $scope.books.desc,
      bookPageNo: $scope.books.pageno,
      bookCategory: $scope.books.cat,
      bookPrice: $scope.books.price,
      bookReleasedYear: $scope.books.release,
    }
    console.log("update by name..1", updatedData);
    booksService.updatedByNameAuth(updatedData).then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.updateBookBysearch = function(params) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    
    console.log("update by id", params);
    var getIdData = {
      bookId: params,
      bookName: $scope.books.name ,
      bookAuthor: $scope.books.author,
      bookDescription: $scope.books.desc,
      bookPageNo: $scope.books.pageno,
      bookCategory: $scope.books.cat,
      bookPrice: $scope.books.price,
      bookReleasedYear: $scope.books.release,
      bookLanguage: $scope.books.lang
    }
    console.log("show book by id", getIdData);
    booksService.updatedBySearch(getIdData).then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.deleteById = function(params) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getId = {
      bookId: params
    }
    console.log("show book by id", getId);
    booksService.deleteBookById(getId).then(function (response) {  
      console.log("delete bookStore..1", response);
      $scope.bookstore = response;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.deleteBookBysearch = function(params) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getId = {
      bookId: params
    }
    console.log("show book by id", getId);
    booksService.deleteBookBySearch(getId).then(function (response) {  
      console.log("delete bookStore..1", response);
      $scope.bookstore = response;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.deleteByName = function(params) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getName = {
      bookName: params
    }
    // console.log("show book by release");
    booksService.deleteBookByName(getName).then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.deleteByAuthorNDesc = function(author, desc) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getData = {
      bookAuthor: author,
      bookDescription: desc
    }
    console.log("show book by author n desc", getData);
    booksService.deletedByAuthNDesc(getData).then(function (response) {  
      // console.log("find release bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.deleteByNameNCat = function(name, cat) {
    $scope.bookdata = false;
    $scope.table1 = false;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    var getData = {
      bookName: name,
      bookCategory: cat
    }
    console.log("delete book by name n cat", getData);
    booksService.deletedByNameNCat(getData).then(function (response) {  
      console.log("find release bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.sortName = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.sortedName().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.sortPrice = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.sortedPrice().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }
  
  $scope.sortAuthor = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.sortedAuthor().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.sortPage = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.sortedPages().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.sortCat = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.sortedCat().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }

  $scope.sortRelease = function() {
    $scope.bookdata = false;
    $scope.table1 = true;
    if($rootScope.onlyName) {
      $scope.tableee = false;
    }
    // console.log("show book by page no");
    booksService.sortedRelease().then(function (response) {  
      // console.log("find page bookStore..1", response);
      $scope.bookstore = response.data;
      
    },  
    function (error) {  
        console.log("Error: " + error);  
    });  
  }
});
