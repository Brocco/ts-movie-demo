/// <reference path="search-service"/>

module TMDB {
    export function SearchComponent () : ng.IDirective{
        var component: ng.IDirective = <ng.IDirective>{};

        component.restrict = 'E';
        component.scope = {};
        component.controller = 'searchCtrl';
        component.controllerAs = 'search';
        component.templateUrl = 'views/search.html';
        component.bindToController = true;

        return component;
    }
}