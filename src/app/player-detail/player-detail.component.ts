import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const playerId = +this.route.snapshot.paramMap.get('playerId');
    // @ts-ignore
    this.playerService.getPlayer(playerId)
      .subscribe(response => {
        const player = response;
        console.log('response', response);
        return player;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
