import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SectionCardComponent } from './components/section-card/section-card.component';
import { SectionListComponent } from './components/section-list/section-list.component';
import { AnnouncementCardComponent } from './components/announcement-card/announcement-card.component';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { AnnouncementFormComponent } from './components/announcement-form/announcement-form.component';
import { UserComponent } from './pages/user/user.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { DefaultComponent } from './layout/default/default.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { appEffects, appStore } from './store/app.store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SectionPageComponent } from './module/section/pages/section-page/section-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionPageComponent,
    DashboardComponent,
    AnnouncementComponent,
    ProfileComponent,
    SectionCardComponent,
    SectionListComponent,
    AnnouncementCardComponent,
    AnnouncementListComponent,
    SectionFormComponent,
    AnnouncementFormComponent,
    UserComponent,
    SidenavComponent,
    DefaultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appStore, {}),
    EffectsModule.forRoot(appEffects),
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
