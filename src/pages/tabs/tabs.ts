import { Component } from '@angular/core';

import { MoviesPage } from '../movies/movies';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  moviesRoot = MoviesPage;

  constructor() {

  }
}
