import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Player } from './player';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
               Accept: 'application/com.scoutsdk.graph+json; version=1.1.0; charset=utf8',
              'Scout-App': CLIENT_ID,
        }
      ),
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerUrl = 'https://api.scoutsdk.com/graph';  // URL to web api
  private playerId = 'AgUACAbNHryOsdXjS6jmtd3GQS22';

  constructor(
    private http: HttpClient) { }

  /** Post */

  getPlayer(playerId): Observable<Player> {
    const playerQuery = {query: `query { player(title: "fortnite", id: "${this.playerId}", segment: "*") `
        + `{id, metadata {key,name,value,displayValue}stats{metadata {key,name,isReversed}value,displayValue}segments`
        + `{metadata {key,name,value,displayValue}stats {metadata {key,name,isReversed}value,displayValue}}}}`};

    return this.http.post<Player>(this.playerUrl, playerQuery, httpOptions );
  }
}
