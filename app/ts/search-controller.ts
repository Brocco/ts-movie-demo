module TMDB{
    export class SearchController{
        static $inject = ['searchService'];
        constructor (searchService: ISearchService){
            this.searchService = searchService;
            this.query = 'Polar';
        }

        private searchService: ISearchService;
        public query: string;
        public results: any[];

        doSearch(){
            var self = this;
            this.searchService.searchMovies({query: self.query})
                .then(function(movieResults){
                    self.results = movieResults.results;
                })
        }
    }
}