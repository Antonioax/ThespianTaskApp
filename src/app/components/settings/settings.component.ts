import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleSettings, VideoService } from '../../services/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  public currentSettings!: TitleSettings;

  private settingsSub!: Subscription;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.settingsSub = this.videoService.currentSettings.subscribe({
      next: (settings) => (this.currentSettings = settings),
    });
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
  }

  onChangeSize(event: Event) {
    const selectSize = event.target as HTMLSelectElement;
    let settings = this.currentSettings;
    settings.size = selectSize.value;
    this.videoService.setSettings(settings);
  }

  onChangeColor(event: Event) {
    const selectColor = event.target as HTMLInputElement;
    let settings = this.currentSettings;
    settings.color = selectColor.value;
    this.videoService.setSettings(settings);
  }

  onChangePosition(event: Event) {
    const selectSize = event.target as HTMLSelectElement;
    let settings = this.currentSettings;
    settings.position = selectSize.value;
    this.videoService.setSettings(settings);
  }
}
