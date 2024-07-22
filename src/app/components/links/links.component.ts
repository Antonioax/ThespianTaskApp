import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [],
  templateUrl: './links.component.html',
})
export class LinksComponent {
  constructor(private videoService: VideoService) {}

  onChange(newVideo: string) {
    this.videoService.changeTo(newVideo);
  }
}
