import { Movie } from '../../interface/movie';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailPage } from './movie-detail/movie-detail';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';

/**
 * Generated class for the MoviesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
  movies$:Observable<Movie[]>;

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider:MovieProvider ) {
  }
  //this.navCtrl.push(MovieDetailPage);


  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviesPage');
    this.movies$ = this.movieProvider.searchMovie("Harry Potter");
  }

}
