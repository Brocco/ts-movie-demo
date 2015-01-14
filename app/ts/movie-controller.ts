module TMDB{
    interface IMovieParams{
        id: number;
    }

    export class MovieController{
        static $inject = ['$routeParams', 'movieService'];
        constructor ($routeParams: IMovieParams,
                     movieService: IMovieService) {
            var self = this;
            movieService.getMovie($routeParams.id)
                .then(function(movie){
                    console.log(movie);
                    self.movie = movie;
                })
        }

        public movie: IMovie;
    }
}