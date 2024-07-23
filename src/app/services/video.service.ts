import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TitleSettings {
  size: string;
  color: string;
  position: string;
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  currentVideo = new BehaviorSubject<string>('clip1.mp4');
  currentTitle = new BehaviorSubject<string>('caption1.srt');
  currentTime = new BehaviorSubject<number>(0);
  currentText = new BehaviorSubject<string | null>(null);
  currentSettings = new BehaviorSubject<TitleSettings>({
    size: 'medium',
    color: '#000',
    position: 'base',
  });

  changeTo(newVideo: string, newTitle: string) {
    this.currentVideo.next(newVideo);
    this.currentTitle.next(newTitle);
  }

  setSettings(settings: TitleSettings) {
    this.currentSettings.next(settings);
    console.log(this.currentSettings.value);
  }
}
