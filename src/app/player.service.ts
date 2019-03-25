import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Player } from './player';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl = 'api/players';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** GET players from the server */
    getPlayers(): Observable<Player[]> {
      return this.http.get<Player[]>(this.playersUrl)
        .pipe(
          tap(_ => this.log('fetched players')),
          catchError(this.handleError<Player[]>('getPlayers', []))
        );
    }

  /** GET hero by id. Return `undefined` when id not found */
  getPlayerNo404<Data>(id: number): Observable<Player> {
    const url = `${this.playersUrl}/?id=${id}`;
    return this.http.get<Player[]>(url)
      .pipe(
        map(players => players[0]), // returns a {0|1} element array
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} player id=${id}`);
        }),
        catchError(this.handleError<Player>(`getPlayer id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchPlayers(term: string): Observable<Player[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Player[]>(`${this.playersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Player[]>('searchPlayers', []))
    );
  }

  /** Save methods */

  /** POST: add a new player to the server */
  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, httpOptions).pipe(
      tap((newPlayer: Player) => this.log(`added player w/ id=${newPlayer.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  /** DELETE: delete the player from the server */
  deletePlayer(player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }

  /** PUT: update the hero on the server */
  updatePlayer(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a PlayerService message with the MessageService */
  private log(player: string) {
    this.messageService.add(`PlayerService: ${player}`);
  }
}
