import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TitleSettings, VideoService } from '../../services/video.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit, OnDestroy {
  public currentVideo!: string;
  public currentText: string | null = null;
  public currentSettings!: TitleSettings;
  public newTime!: number;

  private videoSub!: Subscription;
  private textSub!: Subscription;
  private settingsSub!: Subscription;
  private newTimeSub!: Subscription;

  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoSub = this.videoService.currentVideo.subscribe({
      next: (video) => (this.currentVideo = video),
    });

    this.textSub = this.videoService.currentText.subscribe({
      next: (text) => (this.currentText = text ? text : null),
    });

    this.settingsSub = this.videoService.currentSettings.subscribe({
      next: (settings) => (this.currentSettings = settings),
    });

    this.newTimeSub = this.videoService.newTime.subscribe({
      next: (time) => {
        const videoElement = this.videoPlayer.nativeElement;
        videoElement.currentTime = time;
      },
    });
  }

  ngOnDestroy() {
    this.videoSub.unsubscribe();
    this.textSub.unsubscribe();
    this.settingsSub.unsubscribe();
    this.newTimeSub.unsubscribe();
  }

  onTimeUpdate(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.videoService.currentTime.next(video.currentTime);
  }
}
