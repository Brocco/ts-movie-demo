module TMDB{
    export class SearchController{
        static $inject = ['$location', 'searchService'];
        constructor ($location: ng.ILocationService,
                     searchService: ISearchService){
            this.$location = $location;
            this.searchService = searchService;
            this.query = '';
        }

        private $location: ng.ILocationService;
        private searchService: ISearchService;

        public query: string;
        public results: IMovieSearchResult[];

        doSearch(){
            this.$location.path('/search/' + this.query);
            this.query = '';
        }
    }
}