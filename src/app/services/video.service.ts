import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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

  newTime = new Subject<number>();

  init() {
    const savedSettings = localStorage.getItem('settings');

    if (savedSettings) {
      try {
        const parsedSettings: TitleSettings = JSON.parse(savedSettings);
        this.currentSettings.next(parsedSettings);
      } catch (e) {
        console.error('Failed to parse settings from localStorage', e);
      }
    }
  }

  changeTo(newVideo: string, newTitle: string) {
    localStorage.setItem(
      this.currentVideo.value,
      this.currentTime.value.toString()
    );

    this.currentText.next(null);
    this.currentVideo.next(newVideo);
    this.currentTitle.next(newTitle);

    let previousTime = localStorage.getItem(newVideo);
    // TO BE ADDED
  }

  setSettings(settings: TitleSettings) {
    this.currentSettings.next(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  setTime(time: number) {
    console.log('Should have done this: ', time);
    this.newTime.next(time + 0.05);
  }
}
