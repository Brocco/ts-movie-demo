/// <reference path="typings/angularjs/angular.d.ts"/>
/// <reference path="typings/angularjs/angular-route.d.ts"/>
/// <reference path="search-service.ts"/>
/// <reference path="search-component.ts"/>
/// <reference path="search-controller.ts"/>
/// <reference path="search-results-controller.ts"/>
/// <reference path="movie-controller.ts"/>
/// <reference path="movie-service.ts"/>


angular.module('app', ['ngRoute']);

angular.module('app').service('searchService', TMDB.SearchService);
angular.module('app').directive('search', TMDB.SearchComponent);
angular.module('app').controller('searchCtrl', TMDB.SearchController);
angular.module('app').controller('searchResultsCtrl', TMDB.SearchResultsController);
angular.module('app').controller('movieCtrl', TMDB.MovieController);
angular.module('app').service('movieService', TMDB.MovieService);

angular.module('app').config([
    '$routeProvider',
    function ($routeProvider:ng.route.IRouteProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/default.html'
            })
            .when('/search/:query', {
                templateUrl: 'views/search-results.html',
                controller: 'searchResultsCtrl',
                controllerAs: 'search'
            })
            .when('/movie/:id', {
                templateUrl: 'views/movie.html',
                controller: 'movieCtrl',
                controllerAs: 'movie'
            })
            .otherwise({redirectTo: '/'});
    }
]);