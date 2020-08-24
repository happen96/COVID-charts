import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldInfoComponent } from './world-page/world-info.component';
import { MyCountryChartComponent } from './my-country-chart/my-country-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldInfoComponent,
    MyCountryChartComponent,
    MyPieChartComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
