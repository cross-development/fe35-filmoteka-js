import filmAPI from '../services/filmAPI';

export default {
    pageNumber: 1,
    query: '',

    async getFetchPopularFilms() {
        try {
            const data = await filmAPI.fetchPopularFilms();

            return data;
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async getFetchFilms() {
        try {
            const data = await filmAPI.fetchFilms(this.query, this.pageNumber);

            return data;
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async getFetchFilmDetails(movieId) {
        try {
            const data = await filmAPI.fetchFilmDetails(movieId);

            return data;
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async getFetchGenres() {
        const data = await filmAPI.fetchGenres();

        return data;
    },

    async getFetchUpcomingFilms() {
        try {
            const data = await filmAPI.fetchUpcomingFilms();

            return data;
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
