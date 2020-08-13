import pageViewerTemplate from "../../templates/pages/myFilmLibraryPage.hbs";
import
fetchMovies
from "../services/servicesApi.js";

const refs = {
  postersViewer: document.querySelector('#postersViewer')
}

function getDataObject(data) {

  const newData = data.map((el) => {
    return {
      poster_path: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
      title: el.title,
      release_year: el.release_date,
      vote_average: el.vote_average,
    };
  });
  return newData;
};


const selectFetch = fetchMovies.fetchPopularMovies()
  .then(data =>
    getDataObject(data)
  )
  .catch(e => console.log(e));


function passPageNum() {
  selectFetch.then((movies) => {
    refs.postersViewer.innerHTML = pageViewerTemplate(movies);
  });
}

passPageNum();
