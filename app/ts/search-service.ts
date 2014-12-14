/// <reference path="tmdb-api-key.ts"/>


module TMDB {
    export interface ISearchService {
        searchMovies:(params: IMovieSearchParams) => ng.IPromise<IMovieSearchResponse>;
        searchPeople:(params: IPersonSearchParams) => ng.IPromise<IPersonSearchResponse>;
    }
    export interface ISearchResponse {
        page: number;
        total_pages: number;
        total_results: number;
    }
    export interface IMovieSearchParams {
        query: string;
        page?: number;
        year?: number;
    }
    export interface IMovieSearchResponse extends ISearchResponse {
        results: IMovieSearchResult[];
    }
    export interface IMovieSearchResult {
        adult: boolean;
        backdrop_path: string;
        id: number;
        original_title: string;
        release_date: string;
        poster_path: string;
        popularity: number;
        title: string;
        vote_average: number;
        vote_count: number;
    }
    export interface IPersonSearchParams {
        query: string;
        page?: number;
    }
    export interface IPersonSearchResponse extends ISearchResponse{
        results: IPersonSearchResult[];
    }
    export interface IPersonSearchResult{
        adult: boolean;
        id: number;
        known_for: IMovieSearchResult[];
        name: string;
        popularity: number;
        profile_path: string;
    }

    export class SearchService implements ISearchService {

        static $inject = ['$http'];

        constructor($http:ng.IHttpService) {
            this.$http = $http;
        }

        private $http:ng.IHttpService;
        private urlRoot = 'http://api.themoviedb.org/3/';
        private movieSearch = 'search/movie';
        private personSearch = 'search/person';

        searchMovies(params) {
            var url = this.urlRoot + this.movieSearch;

            var qsParams:any = {
                api_key: tmdb.apiKey,
                query: params.query
            };

            if (params.page) {
                qsParams.page = params.page;
            }

            if (params.year) {
                qsParams.primary_release_year = params.year;
            }

            return this.$http.get(url, {params: qsParams})
                .then(function(response){
                    return response.data;
                });
        }

        searchPeople (params) {
            var url = this.urlRoot + this.personSearch;

            var qsParams:any = {
                api_key: tmdb.apiKey,
                query: params.query
            };

            if (params.page) {
                qsParams.page = params.page;
            }

            return this.$http.get(url, {params: qsParams})
                .then(function(response){
                    return response.data;
                });
        }
    }
}