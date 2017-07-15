import { Movie } from '../../interface/movie';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailPage } from './movie-detail/movie-detail';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
  movies$:Observable<Movie[]>;
  movieSearch$: Subject<string> = new Subject<string>();

  movieSelection='popular';

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider:MovieProvider,
        ) {
  }
  //this.navCtrl.push(MovieDetailPage);

  getSelection(selection:string){
    this.movieSearch$.next(selection);
  }

  searchMovie(search:string){
    this.movieSearch$.next(search);
  }

  ionViewDidLoad() {
    this.movies$ = this.movieSearch$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((search:string)=>{
        search = (!!!search) ? this.movieSelection : search;

        const searchOpt: boolean = (
            search==='now_playing' ||
            search==='popular' ||
            search==='top_rated' ||
            search==='upcoming' ||
            !!!search
        ) ? true: false;

        if(searchOpt){
          return this.movieProvider.getList(search);
        }
        else{
          return this.movieProvider.searchMovie(search);
        }
      })

      setTimeout(()=>this.movieSearch$.next(""), 1000);
  }


}
