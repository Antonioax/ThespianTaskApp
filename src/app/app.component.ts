import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from "./components/player/player.component";
import { LinksComponent } from "./components/links/links.component";
import { TranscriptComponent } from "./components/transcript/transcript.component";
import { VideoService } from "./services/video.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerComponent, LinksComponent, TranscriptComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private videoService: VideoService){}

  ngOnInit(){
    //this.videoService.init();
  }
}
