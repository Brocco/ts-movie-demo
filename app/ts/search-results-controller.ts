module TMDB{
    interface ISearchParams {
        query: string;
    }

    export class SearchResultsController{
        static $inject = ['$routeParams', 'searchService'];
        constructor ($routeParams: ISearchParams,
                     searchService: ISearchService) {
            this.searchService = searchService;
            this.query = $routeParams.query;
            this.doSearch();
        }

        private searchService: ISearchService;
        private query: string;
        private currentPage: number = 1;

        public results: IMovieSearchResult[];

        public nextPage (){
            this.currentPage++;
            this.doSearch();
        }

        public previousPage(){
            this.currentPage--;
            this.doSearch();
        }

        public pageCount: number = null;
        public resultCount: number = null;

        private doSearch(){
            var self = this;
            var searchParams: IMovieSearchParams = {query: self.query};

            self.searchService.searchMovies(searchParams)
                .then(function(movieResults){
                    self.pageCount = movieResults.total_pages;
                    self.resultCount = movieResults.total_results;
                    self.results = movieResults.results;
                });
        }
    }
}
