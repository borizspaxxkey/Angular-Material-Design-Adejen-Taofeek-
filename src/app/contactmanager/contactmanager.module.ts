import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

/// 3rd Party Library
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Services
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';

const routes: Routes = [
  {
    path: '', component: ContactmanagerAppComponent,
    children: [
      { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NewContactDialogComponent,
    NotesComponent,
    NewContactDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService,
    MatIconRegistry
  ],
  entryComponents: [
    NewContactDialogComponent
  ]
})
export class ContactmanagerModule { }
