import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-loader',
  templateUrl: './progress-loader.component.html',
  styleUrl: './progress-loader.component.scss',
})
export class ProgressLoaderComponent {
  @Input() message: string = 'Loading...';
}
