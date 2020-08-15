'use strict';

import { Router } from './js/router/router';
import './sass/base.scss';

import initialHomePage from './js/pages/initialHomePage';
// import libraryPage from './js/pages/libraryPage';
import filmDetailsPage from './js/pages/filmDetailsPage';
<<<<<<< HEAD
// console.log(initialHomePage);
=======
import './sass/base.scss'

>>>>>>> 29684b85fcbcfe1ffe332cafe147d460bf80536d
window['router'] = new Router({
  root: '/',
  routes: [
    {
      path: /movies\/(.*)/,
      callback: id => {
        filmDetailsPage(id);
      },
    },
    {
      path: 'library',
      callback: id => {
        console.log(`library`);
      },
    },
    {
      path: 'movies',
      callback: () => {
        console.log('movies');
      },
    },
    {
      path: '',
      callback: () => initialHomePage(),
    },
  ],
});

// window['router'].navigate('movies/2');
