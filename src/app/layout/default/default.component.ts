import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  collapse = true;

  constructor(protected titleService: Title) {}

  sideNavWidth() {
    return this.collapse ? '64px' : '256px';
  }

  setCollapse(collapse: boolean) {
    this.collapse = collapse;
  }
}
