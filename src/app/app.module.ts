import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SectionCardComponent } from './components/section-card/section-card.component';
import { SectionListComponent } from './components/section-list/section-list.component';
import { AnnouncementCardComponent } from './components/announcement-card/announcement-card.component';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { AnnouncementFormComponent } from './components/announcement-form/announcement-form.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AnnouncementComponent,
    ProfileComponent,
    SectionCardComponent,
    SectionListComponent,
    AnnouncementCardComponent,
    AnnouncementListComponent,
    SigninComponent,
    SignupComponent,
    SectionFormComponent,
    AnnouncementFormComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
