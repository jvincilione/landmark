import { Component } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent {
  public readonly youtubeUrl =
    'https://www.youtube.com/embed/live_stream?channel=UCFUWKbJJw3_duv44jevTxWA';
}
