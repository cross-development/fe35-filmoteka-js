//Core
const API_KEY = '9e07f05bee226a5aad11e2f836e260f9';
const baseURL = 'https://api.themoviedb.org/3';

export default {
    async fetchPopularFilms() {
        try {
            const response = await fetch(
                `${baseURL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
            );
            const data = await response.json();

            return data.results;
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async fetchFilms(query, page) {
        try {
            const response = await fetch(
                `${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
            );
            const data = await response.json();

            return data.results;
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async fetchFilmDetails(movieId) {
        try {
            const response = await fetch(
                `${baseURL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
            );

            return await (response.ok ? response.json() : null);
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async fetchGenres() {
        try {
            const response = await fetch(
                `${baseURL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
            );
            const data = await response.json();

            return data.results;
        } catch (error) {
            console.log('error:' + error.message);
        }
    },

    async fetchUpcomingFilms() {
        try {
            const response = await fetch(
                `${baseURL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
            );
            const data = await response.json();

            return data.results;
        } catch (error) {
            console.log('error:' + error.message);
        }
    },
};
