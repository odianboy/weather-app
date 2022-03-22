import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { infoCityWeather } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent implements OnInit {

  apiKey: string;
  cityWeather!: infoCityWeather;
  test: any

  constructor(private http: HttpClient) {
    this.apiKey = 'ae374efe8f142af1fb65f793930356fd';

    // this.getInfoWeather(this.apiKey).subscribe((data) => {
    //   this.cityWeather = {
    //     id: data.id,
    //   }
    // }),

   }

  ngOnInit() {
    this.getInfoWeather(this.apiKey).subscribe((data) => this.test = data)

    console.log(this.test)
  }

  getInfoWeather(apiKey: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=${apiKey}`)
  }

}
