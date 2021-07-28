import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MapBuilderComponent } from './map-builder/map-builder.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { SidenavContentComponent } from './map-builder/sidenav-content/sidenav-content.component'

@NgModule({
  declarations: [
    AppComponent,
    MapBuilderComponent,
    LoginComponent,
    HomeComponent,
    MapViewerComponent,
    SidenavContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSidenavModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
