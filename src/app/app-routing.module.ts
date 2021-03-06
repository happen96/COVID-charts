import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldInfoComponent } from './world-page/world-info.component';
import { MyCountryChartComponent } from './my-country-chart/my-country-chart.component';
import { GrowthDynamicsComponent } from './growth-dynamics/growth-dynamics.component';

const routes: Routes = [
  {path: 'world', component: WorldInfoComponent},
  {path: 'my-country', component: MyCountryChartComponent},
  {path: 'dynamics', component: GrowthDynamicsComponent},
  {path: '**', component: WorldInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
