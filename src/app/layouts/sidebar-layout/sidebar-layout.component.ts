import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.scss',
})
export class SidebarLayoutComponent {
  collapse = true;

  constructor(protected titleService: Title) {}

  sideNavWidth() {
    return this.collapse ? '64px' : '256px';
  }

  setCollapse(collapse: boolean) {
    this.collapse = collapse;
  }
}
