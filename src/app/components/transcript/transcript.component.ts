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
}
