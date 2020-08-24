import { Component, OnInit } from '@angular/core';
import {CountriesService} from '../countries.service';
import * as moment from 'moment';

@Component({
  selector: 'app-my-country-chart',
  templateUrl: './my-country-chart.component.html',
  styleUrls: ['./my-country-chart.component.css']
})
export class MyCountryChartComponent implements OnInit {

  lastDateResults: string;
  lastConfirmedCount: number;
  lastDeathsCount: number;
  lastRecoveredCount: number;
  lastActiveCount: number;

  confirmedChartData = [{data: [], label: 'Confirmed ', fill: false}];
  deathChartData = [ {data: [], label: 'Deaths', fill: false, colors: ['#dc3545']}];
  recoveredChartData = [{data: [], label: 'Recovered', fill: false}];
  activeChartData = [{data: [], label: 'Active', fill: false}];
  dateLabels = [];

  constructor(
    private countryService: CountriesService
  ) { }

  ngOnInit() {
    this.getMyCountryInfo();
  }

  getMyCountryInfo() {
    this.countryService.getCountryInfo('ukraine').then((data) => {
      if (data) {
        this.populateHeaderData(data);
        this.populateChartsData(data);
      }
    });
  }

  private populateHeaderData(data) {
    this.lastDateResults = moment(data[data.length - 1].Date).format('LL');
    this.lastConfirmedCount = data[data.length - 1].Confirmed - data[data.length - 2].Confirmed;
    this.lastDeathsCount = data[data.length - 1].Deaths - data[data.length - 2].Deaths;
    this.lastRecoveredCount = data[data.length - 1].Recovered - data[data.length - 2].Recovered;
    this.lastActiveCount = data[data.length - 1].Active - data[data.length - 2].Active;
  }

  private populateChartsData(data) {
    data.map((day) => {
      this.dateLabels.push(moment(day.Date).format('LL'));
      this.confirmedChartData[0].data.push(day.Confirmed);
      this.deathChartData[0].data.push(day.Deaths);
      this.recoveredChartData[0].data.push(day.Recovered);
      this.activeChartData[0].data.push(day.Active);
    });
  }
}


