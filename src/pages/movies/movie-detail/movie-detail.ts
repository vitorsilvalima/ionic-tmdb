import { MovieProvider } from './../../../providers/movie/movie';
import { Movie } from './../../../interface/movie';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'movie-detail',
  templateUrl: 'movie-detail.html'
})
export class MovieDetailPage implements OnDestroy{

  movie:Movie;
  private movieSub: Subscription;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private movieProvider:MovieProvider
  ) {
  }

  ionViewDidLoad() {
    const id = this.navParams.get('id');
    this.movieSub = this.movieProvider.getMovieDetails(id)
    .subscribe(movie => this.movie = movie);
  }

  public ngOnDestroy(): void {
      if(this.movieSub){
        this.movieSub.unsubscribe();
      }
  }
}
