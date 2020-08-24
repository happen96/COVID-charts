import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldInfoComponent } from './world-page/world-info.component';
import { MyCountryChartComponent } from './my-country-chart/my-country-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';

const routes: Routes = [
  {path: 'world', component: WorldInfoComponent},
  {path: 'my-country', component: MyCountryChartComponent},
  {path: 'dynamics', component: MyPieChartComponent},
  {path: '**', component: WorldInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
