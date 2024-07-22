import { Component, OnInit } from '@angular/core';
import { Title, TitleService } from '../../services/title.service';

@Component({
  selector: 'app-transcript',
  standalone: true,
  imports: [],
  templateUrl: './transcript.component.html',
})
export class TranscriptComponent implements OnInit {
  transcript: Title[] = [];
  currentIndex: number | null = null;

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.loadTitles('assets/titles/caption1.srt');
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
