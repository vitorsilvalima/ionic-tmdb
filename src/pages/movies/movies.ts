import { Movie } from '../../interface/movie';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailPage } from './movie-detail/movie-detail';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
  movies$:Observable<Movie[]>;
  movieSelection='popular';

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider:MovieProvider,
        ) {
  }
  //this.navCtrl.push(MovieDetailPage);


  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviesPage');
    this.movies$ = this.movieProvider.searchMovie("Harry Potter");


  }


}
