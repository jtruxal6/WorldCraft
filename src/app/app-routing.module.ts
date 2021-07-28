import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapBuilderComponent } from './map-builder/map-builder.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapBuilder', component: MapBuilderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'maps', component: MapViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
