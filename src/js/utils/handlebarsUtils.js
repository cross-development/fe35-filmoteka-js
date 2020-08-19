import default_poster from '../../images/unnamed.png';

Handlebars.registerHelper('formatReleaseDate', release_date => {
    return release_date ? release_date.split('-').reverse()[2] : '';
});

Handlebars.registerHelper('formatFilmPoster', poster_path => {
    return !poster_path
        ? default_poster
        : `https://image.tmdb.org/t/p/w500${poster_path}`;
});
