import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  player: Player;
  private playerId: string;
  segments: any;
  stats: any;
  value: any;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    this.playerService.getPlayer(this.playerId)
      .subscribe(response => {
        // @ts-ignore
        this.player = response.data.player;
        console.error('this.player', this.player);
        return this.player;
      });
  }
}
