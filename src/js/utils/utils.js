import default_poster from '../../images/unnamed.png';

//Делает реверс даты и возвращает только год. Если дата не пришла, то возвращает пустую строку
Handlebars.registerHelper('formatReleaseDate', release_date => {
    return release_date ? release_date.split('-').reverse()[2] : '';
});

//Этот хелпер чего-то не работает
Handlebars.registerHelper('formatFilmPoster', poster_path => {
    return !poster_path
        ? default_poster
        : `https://image.tmdb.org/t/p/w500${poster_path}`;
});
