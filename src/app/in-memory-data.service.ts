import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Player } from './player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [
      { id: 11, name: 'Berserker' },
      { id: 12, name: 'Bullet Storm' },
      { id: 13, name: 'Centurion' },
      { id: 14, name: 'Cobalt Commando' },
      { id: 15, name: 'Commando' },
      { id: 16, name: 'Demolisher' },
      { id: 17, name: 'Double Agent' },
      { id: 18, name: 'First Shot' },
      { id: 19, name: 'Master Grenadier' },
      { id: 20, name: 'Nevermore' }
    ];
    return {players};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(players: Player[]): number {
    return players.length > 0 ? Math.max(...players.map(player => player.id)) + 1 : 11;
  }
}
