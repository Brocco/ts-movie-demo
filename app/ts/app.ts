/// <reference path="typings/angularjs/angular.d.ts"/>
/// <reference path="search-service.ts"/>
/// <reference path="search-component.ts"/>
/// <reference path="search-controller.ts"/>


angular.module('app', []);

angular.module('app').service('searchService', TMDB.SearchService);
angular.module('app').directive('search', TMDB.SearchComponent);
angular.module('app').controller('searchCtrl', TMDB.SearchController);