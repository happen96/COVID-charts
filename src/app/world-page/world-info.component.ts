import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import * as moment from 'moment';
import { Country } from '../country.model';

@Component({
  selector: 'app-world-page',
  templateUrl: './world-info.component.html',
  styleUrls: ['./world-info.component.css']
})
export class WorldInfoComponent implements OnInit {

  showCountryChart = false;
  showHelpMessage = false;
  currentDate: string;
  topCountriesLabel = [];
  dateLabels = [];
  countries: Country[];
  trackId: number;

  topChartData = [
    {data: [], label: 'Total Confirmed'},
    {data: [], label: 'Total Deaths'},
    {data: [], label: 'Total Recovered'}
  ];

  countryChartData = [
    {data: [], label: 'Confirmed ', fill: false},
    {data: [], label: 'Deaths', fill: false},
    {data: [], label: 'Recovered', fill: false},
    {data: [], label: 'Active', fill: false}
  ];

  constructor(
    private countryService: CountriesService
  ) { }

  ngOnInit() {
    this.getSummaryInfo();
  }

  private getSummaryInfo() {
    this.countryService.getSummeryInfoPerCountry().then((data) => {
      if (data) {
        this.currentDate = moment(data.Date).format('LL');
        this.populateCountryInfo(data);
      }
    });
  }

  private populateCountryInfo(data) {

    const sortCountries = data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    this.countries = sortCountries;
    const firstTen = sortCountries.slice(0, 10);

    firstTen.map((country) => {
      this.topCountriesLabel.push(country.Country);
      this.topChartData[0].data.push(country.TotalConfirmed);
      this.topChartData[1].data.push(country.TotalDeaths);
      this.topChartData[2].data.push(country.TotalRecovered);
    });
  }

  private showChart(countrySlug, index) {
    this.fetchChartsData();
    this.countryService.getCountryInfo(countrySlug).then((data) => {
      if (data) {
        this.showCountryChart = !this.showCountryChart;
        this.trackId = index;
        data.map((day) => {
          this.dateLabels.push(moment(day.Date).format('LL'));
          this.countryChartData[0].data.push(day.Confirmed);
          this.countryChartData[1].data.push(day.Deaths);
          this.countryChartData[2].data.push(day.Recovered);
          this.countryChartData[3].data.push(day.Active);
        });
      } else {
        this.showHelpMessage = !this.showHelpMessage;
      }
    });
  }

  private fetchChartsData() {
    this.dateLabels = [];
    this.showCountryChart = false;
    this.countryChartData.map((item) => {
      item.data = [];
    });
  }
}
