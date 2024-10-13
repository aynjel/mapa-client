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
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchComponent } from './components/search/search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SectionComponent } from './pages/section/section.component';
import { SectionTabsComponent } from './components/section-tabs/section-tabs.component';
import { MatTableModule } from '@angular/material/table';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TableComponent } from './components/table/table.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LessonComponent } from './pages/lesson/lesson.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonCardComponent } from './components/lesson-card/lesson-card.component';
import { LessonFormComponent } from './components/lesson-form/lesson-form.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetailsComponent } from './pages/announcement/details/details.component';
import { DetailsLayoutComponent } from './layout/details-layout/details-layout.component';
import { LessonDetailsComponent } from './pages/lesson/lesson-details/lesson-details.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { ProgressLoaderComponent } from './shared/components/progress-loader/progress-loader.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';
import { MoreInfoComponent } from './shared/components/more-info/more-info.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { SectionCreateFormComponent } from './components/section-create-form/section-create-form.component';
import { ListItemsComponent } from './components/list-items/list-items.component';

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
    SectionFormComponent,
    AnnouncementFormComponent,
    UserComponent,
    SidenavComponent,
    DefaultComponent,
    SearchComponent,
    SectionComponent,
    SectionTabsComponent,
    NotFoundComponent,
    TableComponent,
    UserListComponent,
    LessonComponent,
    LessonListComponent,
    LessonCardComponent,
    LessonFormComponent,
    AlertComponent,
    DetailsComponent,
    DetailsLayoutComponent,
    LessonDetailsComponent,
    SidebarLayoutComponent,
    PageLayoutComponent,
    ProgressLoaderComponent,
    MoreInfoComponent,
    CreateFormComponent,
    SectionCreateFormComponent,
    ListItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBadgeModule,
    MatBottomSheetModule,
    PdfViewerModule,
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
