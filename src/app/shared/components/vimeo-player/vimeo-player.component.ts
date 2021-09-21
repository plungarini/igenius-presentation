import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild
} from '@angular/core';
import Vimeo, { Options } from '@vimeo/player';



@Component({
  selector: 'app-vimeo-player',
  templateUrl: './vimeo-player.component.html',
  styles: [` :host { display: block; } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VimeoPlayerComponent {

  @Input('url') set url(value: string) {
    if (!value) return;
    const id = parseInt(value.split('/')[3]);
    if (!id) return;
    this.playerId = id;
    this.init(id);
  }
  @Input() canSeek = true;
  @Input() percentToEnd = 90;
  @Input() getProgress = false;
  @Input('options') set setOptions(options: Options) {
    if (!options) return;
    for (const prop in options) {
      (this.options as any)[prop] = (options as any)[prop];
    }
  };

  @Output() videoEnded = new EventEmitter<boolean>();
  @Output() halfProgress = new EventEmitter<number>();

  @ViewChild('vimeoPlayer') videoPlayerEl: ElementRef<HTMLDivElement> | undefined;

  options: Options = {
    id: 608509182,
    responsive: true,
  };
  player: Vimeo | undefined;
  playerId: number | null = null;

  private init(id: number): void {
    if (this.videoPlayerEl) {
      this.options.id = id;
      this.player = new Vimeo(this.videoPlayerEl.nativeElement, this.options);
      this.player.unload().then(() => { });
      this.loadVideo(id);
    } else {
      setTimeout(() => {
        if (!this.videoPlayerEl) return;
        this.options.id = id;
        this.player = new Vimeo(this.videoPlayerEl.nativeElement, this.options);
        this.player.unload().then(() => { });
        this.loadVideo(id);
      }, 300);
    }
  }

  private loadVideo(id: number): void {
    if (!id || !this.player) return;
    this.player.loadVideo(id)
      .then(() => {        
        const player = this.player as Vimeo;
        let timeWatched = 0;
        let videoEnded = false;
        let halfProgressEmit = false;

        player.on('timeupdate', (data) => {
          const percent = data.percent * 100;

          if (this.getProgress && !halfProgressEmit) {
            if (percent >= 45 && percent <= 55) {
              this.halfProgress.emit(50);
              halfProgressEmit = true;
            }
          }

          if (percent > this.percentToEnd && !videoEnded) {
            this.videoEnded.emit(true);
            videoEnded = true;
          }
          if (data.seconds - 1 < timeWatched && data.seconds > timeWatched && !this.canSeek) {
            timeWatched = data.seconds;
          }
        });
      
        if (!this.canSeek)
          player.on('seeked', (data) => {
            if (timeWatched < data.seconds) {
              player.setCurrentTime(timeWatched);
            }
          });
      })
      .catch((error: any) => {
        switch (error.name) {
          case 'TypeError':
            console.error('VIMEO:', 'Video id was not a number.');
            break;

          case 'PasswordError':
            console.error('VIMEO:', 'This video is password-protected.');
            break;

          case 'PrivacyError':
            console.error('VIMEO:', 'This video is private or password-protected.');
            break;

          default:
            console.error('VIMEO:', 'Unexpected error:', error);
            break;
        }
      });
    /* LISTENERS */
  }

}
