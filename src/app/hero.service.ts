import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES} from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.showError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  private heroesUrl = 'api/heroes';
  /*getHeroes(): Observable<Hero[]> {
    this.messageService.add('Heróis encontrados!');
    return of(HEROES);
  }*/
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.showSuccess('Heróis encontrados')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
    tap(_ => this.showSuccess(`encontrado herói id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.showInfo(`herói atualizado id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.showInfo(`herói adicionado w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.showInfo(`herói deletado id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {

      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.showSuccess(`encontrado heróis correspondentes "${term}"`) :
         this.showError(`não encontrado heróis correspondentes "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }



  constructor(private messageService: MessageService, private http: HttpClient,private toastr: ToastrService) { }
/*
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);

  }
*/
  private showSuccess(message: string) {
    this.toastr.success( message,'HeroService', {
      timeOut: 2000
    });
  }

  private showInfo(message: string) {
    this.toastr.info(message, 'HeroService', {
      timeOut: 2000
    });
  }

  private showError(message: string) {
    this.toastr.error(message, 'HeroService', {
      timeOut: 2000
    });
  }

}
