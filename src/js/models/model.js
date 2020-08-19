import filmAPI from '../services/filmAPI';

export default {
    pageNumber: 1,
    query: '',

    async getFetchPopularFilms() {
        try {
            return await filmAPI.fetchPopularFilms();
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async getFetchFilms() {
        try {
            return await filmAPI.fetchFilms(this.query, this.pageNumber);
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async getFetchFilmDetails(movieId) {
        try {
            return await filmAPI.fetchFilmDetails(movieId);
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async getFetchGenres() {
        return await filmAPI.fetchGenres();
    },

    async getFetchUpcomingFilms() {
        try {
            return await filmAPI.fetchUpcomingFilms();
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    get searchQueryMovies() {
        return this.query;
    },

    set searchQueryMovies(string) {
        this.query = string;
    },

    get currentPageNumber() {
        return this.pageNumber;
    },

    set currentPageNumber(number) {
        this.pageNumber = number;
    },
};
