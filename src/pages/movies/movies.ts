import { Movie } from '../../interface/movie';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailPage } from './movie-detail/movie-detail';
import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

/**
 * Add this in order to enable lazy loading
 */
@IonicPage(
)
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
  movies$:Observable<Movie[]>;
  movieSearch$: Subject<string> = new Subject<string>();

  movieSelection='popular';

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider:MovieProvider
        ) {
  }

  getSelection(selection:string){
    this.movieSearch$.next(selection);
    this.content.scrollToTop(200);
  }

  searchMovie(search:string){
    this.movieSearch$.next(search);
    this.content.scrollToTop(200);
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

  goToDetails(id: string){
    this.navCtrl.push(MovieDetailPage, {id: id});
  }


}
