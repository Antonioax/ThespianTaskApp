import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  currentVideo = new BehaviorSubject<string>('clip1.mp4');
  currentTitle = new BehaviorSubject<string>("caption1.srt");

  changeTo(newVideo: string, newTitle: string) {
    this.currentVideo.next(newVideo);
    this.currentTitle.next(newTitle);
  }
}