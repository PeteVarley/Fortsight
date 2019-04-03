import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Player } from './player';
import { MessageService } from './message.service';

import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
               Accept: 'application/com.scoutsdk.graph+json; version=1.1.0; charset=utf8',
              'Scout-App': environment.clientId,
        }
      ),
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl = 'https://api.scoutsdk.com/graph';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Post */

  getPlayers(): Observable<Player[]> {
    const playersQuery = {query: 'query { players(title: "fortnite", platform: "epic", identifier: "MXLS") ' +
        '{results{player{handle,playerId}}}}'};

    return this.http.post<Player[]>(this.playersUrl, playersQuery, httpOptions )
        .pipe(
          tap(_ => this.log('fetched players')),
          catchError(this.handleError<Player[]>('getPlayers', []))
        );
  };

  getPlayer(playerId: number): Observable<Player> {
    const playersQuery = {query: 'query { players(title: "fortnite", platform: "epic", identifier: "MXLS") ' +
        '{results{player{playerId}}}}'};

    return this.http.post<Player>(this.playersUrl, playersQuery, httpOptions )
      .pipe(
      tap(_ => this.log(`fetched hero id=${playerId}`)),
      catchError(this.handleError<Player>(`getHero id=${playerId}`))
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
