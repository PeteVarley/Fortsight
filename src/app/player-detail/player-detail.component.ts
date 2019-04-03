import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  player: Player;

  constructor(
    private playerService: PlayerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    // @ts-ignore
    this.playerService.getPlayer(playerId)
      .subscribe(response => {
        const player = response;
        console.log('response', response);
        return player;
      });
  }
}
