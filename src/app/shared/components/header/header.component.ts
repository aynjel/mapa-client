import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatNavList,
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Mapa</span>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav fixedInViewport="true" mode="side">
        <mat-nav-list>
          <a
            mat-list-item
            *ngFor="let tool of tools"
            [routerLink]="tool.path"
            routerLinkActive="active"
            >{{ tool.name }}</a
          >
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content> </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export class HeaderComponent {
  showFiller = false;
  // tool list
  readonly tools = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
}
