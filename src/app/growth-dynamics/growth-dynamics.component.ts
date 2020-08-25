import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { ColorCases } from '../color-cases.enum';

@Component({
  selector: 'app-growth-dynamics',
  templateUrl: './growth-dynamics.component.html',
  styleUrls: ['./growth-dynamics.component.css']
})
export class GrowthDynamicsComponent implements OnInit {

  isLoading = true;
  myCountryInConfirmedCases: any;
  myCountryInDeathsCases: any;
  myCountryInRecoveredCases: any;

  mainChartLabel = [];
  mainChartData = [
    {data: [], label: 'Total Confirmed', fill: true},
  ];

  mainDeathLabel = [];
  mainDeathData = [
    {data: [], label: 'Total Deaths', fill: true},
  ];

  mainRecoveredLabel = [];
  mainRecoveredData = [
    {data: [], label: 'Total Recovered', fill: true},
  ];

  deathColor: string;
  confirmedColor: string;
  recoveredColor: string;

  constructor(
    private countryService: CountriesService
  ) { }

  ngOnInit() {
    this.getColors();
    this.getSummaryInfo();
  }

  getColors() {
    this.deathColor = ColorCases.deathColor;
    this.confirmedColor = ColorCases.confirmedColor;
    this.recoveredColor = ColorCases.recoveredColor;
  }

  private getSummaryInfo() {
    this.isLoading = !this.isLoading;
    this.countryService.getSummeryInfoPerCountry().then((data) => {
      if (data) {
        this.populateCountryInfo(data);
        this.isLoading = !this.isLoading;
      }
    });
  }

  private populateCountryInfo(data) {
    const topTenByByConfirmedCases = this.populateTopByConfirmedCases(data);
    const topTenByByDeathsCases = this.populateTopByDeathsCases(data);
    const topTenByByRecoveredCases = this.populateTopByRecoveredCases(data);

    this.populateTopConfirmed(topTenByByConfirmedCases);
    this.populateTopDeaths(topTenByByDeathsCases);
    this.populateTopRecovered(topTenByByRecoveredCases);
  }

  private populateTopByConfirmedCases(data) {
    const sortCountries = data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    this.myCountryInConfirmedCases = this.getMyCountry(sortCountries);
    return sortCountries.slice(0, 10);
  }

  private populateTopByDeathsCases(data) {
    const sortCountries = data.Countries.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
    this.myCountryInDeathsCases = this.getMyCountry(sortCountries);
    return sortCountries.slice(0, 10);
  }

  private populateTopByRecoveredCases(data) {
    const sortCountries = data.Countries.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
    this.myCountryInRecoveredCases = this.getMyCountry(sortCountries);
    return sortCountries.slice(0, 10);
  }

  private populateTopConfirmed(top) {
    top.map((country, index) => {
      this.mainChartLabel.push(`${country.Country}(${country.CountryCode}) place ${index + 1}`);
      this.mainChartData[0].data.push(country.TotalConfirmed);
    });

    this.mainChartLabel.push(
      `${this.myCountryInConfirmedCases.country.Country}(${this.myCountryInConfirmedCases.country.CountryCode}) place
      ${this.myCountryInConfirmedCases.place}`);
    this.mainChartData[0].data.push(this.myCountryInConfirmedCases.country.TotalConfirmed);
  }

  private populateTopDeaths(top) {
    top.map((country, index) => {
      this.mainDeathLabel.push(`${country.Country}(${country.CountryCode}) place ${index + 1}`);
      this.mainDeathData[0].data.push(country.TotalDeaths);
    });

    this.mainDeathLabel.push(
      `${this.myCountryInDeathsCases.country.Country}(${this.myCountryInDeathsCases.country.CountryCode}) place
      ${this.myCountryInDeathsCases.place}`);
    this.mainDeathData[0].data.push(this.myCountryInDeathsCases.country.TotalDeaths);
  }

  private populateTopRecovered(top) {
    top.map((country, index) => {
      this.mainRecoveredLabel.push(`${country.Country}(${country.CountryCode}) place ${index + 1}`);
      this.mainRecoveredData[0].data.push(country.TotalRecovered);
    });

    this.mainRecoveredLabel.push(
      `${this.myCountryInRecoveredCases.country.Country}(${this.myCountryInRecoveredCases.country.CountryCode}) place
      ${this.myCountryInRecoveredCases.place}`);
    this.mainRecoveredData[0].data.push(this.myCountryInRecoveredCases.country.TotalRecovered);
  }

  private getMyCountry(data) {
    let myCountry: any;
    data.map((country, index) => {
      if (country.Slug === 'ukraine') {
        myCountry = {
          country: country,
          place: index + 1
        };
      }
    });
    return myCountry;
  }
}
