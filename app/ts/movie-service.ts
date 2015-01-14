module TMDB{
    export interface IMovieService{
        getMovie: (id: number) => ng.IPromise<IMovie>;
    }
    export interface IMovie{
        adult: boolean;
        backdrop_path: string;
        belongs_to_collection: boolean;
        budget: number;
        homepage: string;
        id: number;
        imdb_id: string;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        revenue: number;
        runtime: number;
        status: string;
        tagline: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }

    export class MovieService implements IMovieService{
        static $inject = ['$http'];

        constructor($http: ng.IHttpService) {
            this.$http = $http;
        }

        private $http: ng.IHttpService;
        private urlRoot = 'http://api.themoviedb.org/3/';

        public getMovie(id: number){
            var url = this.urlRoot + 'movie/' + id;
            var qsParams:any = {
                api_key: tmdb.apiKey
            };

            return this.$http.get(url, {params: qsParams})
                .then(function(response){
                    return response.data;
                });
        }
    }
}