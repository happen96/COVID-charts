import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private appUrl = 'https://api.covid19api.com';

  constructor(private http: HttpClient) { }

  getSummeryInfoPerCountry() {
    const url = this.appUrl + `/summary`;

    return this.http
      .get(url)
      .toPromise()
      .then((data: any) => {
        return data;
      })
      .catch((er: Error) => {
        console.log(er);
      });
  }

  getCountryInfo(slug) {
    const url = this.appUrl + `/country/${slug}`;

    return this.http
      .get(url)
      .toPromise()
      .then((data: any) => {
        return data;
      })
      .catch((er: Error) => {
        console.log(er);
      });
  }
}
