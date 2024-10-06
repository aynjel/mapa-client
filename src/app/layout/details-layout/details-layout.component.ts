import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details-layout',
  templateUrl: './details-layout.component.html',
  styleUrl: './details-layout.component.scss',
})
export class DetailsLayoutComponent {
  constructor(protected titleService: Title) {}

  back() {
    window.history.back();
  }
}
