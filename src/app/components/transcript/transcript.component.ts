import { Component, OnInit } from '@angular/core';
import { Title, TitleService } from '../../services/title.service';
import { VideoService } from "../../services/video.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-transcript',
  standalone: true,
  imports: [],
  templateUrl: './transcript.component.html',
})
export class TranscriptComponent implements OnInit {
  transcript: Title[] = [];
  currentIndex: number | null = null;

  titleSub!: Subscription;

  constructor(private titleService: TitleService, private videoService: VideoService) {}

  ngOnInit() {
    this.titleSub = this.videoService.currentTitle.subscribe({next: (title) => {
      this.loadTitles("assets/titles/" + title);
    }});
  }

  loadTitles(title: string) {
    this.titleService.loadTitle(title).subscribe({
      next: (titles) => {
        this.transcript = titles;
        console.log(this.transcript);
      },
      error: (err) => console.log(err),
    });
  }

  toDisplayTime(timestamp: string) {
    const [hours, minutes, secondsMili] = timestamp.split(':');
    const seconds = secondsMili.split(',')[0];

    const displayMinutes = parseInt(hours, 10) * 60 + parseInt(minutes);
    const displaySeconds = parseInt(seconds, 10);

    return (
      displayMinutes.toString().padStart(2, '0') +
      ':' +
      displaySeconds.toString().padStart(2, '0')
    );
  }
}
