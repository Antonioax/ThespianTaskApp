import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit, OnDestroy {
  public currentVideo!: string;
  private videoSub!: Subscription;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoSub = this.videoService.currentVideo.subscribe({
      next: (video) => (this.currentVideo = video),
    });
  }

  ngOnDestroy(){
    this.videoSub.unsubscribe();
  }
}
