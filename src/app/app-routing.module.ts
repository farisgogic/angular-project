import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: 'map/:selectedRoadId', component: MapComponent },
  { path: '**', component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
