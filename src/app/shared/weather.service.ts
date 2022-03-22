import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { InfoCityWeather, CurrentPosition } from './info-city-weather.interfaces'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherApiUrl: string;
  currentPosition!: CurrentPosition;
  apiKey: string;

  

  constructor(private http: HttpClient) {
    this.weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.apiKey = 'ae374efe8f142af1fb65f793930356fd';
  }

  getInfoWeather(city: string): Observable<any> {
    

    return this.http.get<InfoCityWeather>(this.weatherApiUrl, {
      params: new HttpParams()
        .set('q', city)
        .set('appid', this.apiKey)
    });
  }

  getInfoWeatherCurrentPosition(): Observable<any> {
    this.getPosition()

    return this.http.get<InfoCityWeather>(this.weatherApiUrl, {
      params: new HttpParams()
        .set('lat', this.currentPosition.latitude)
        .set('lon', this.currentPosition.longitude)
        .set('appid', this.apiKey)
    });
  }

  getImgWeather(nameImg: string): string {
    return `http://openweathermap.org/img/wn/${nameImg}@2x.png`;
  }

  getFahrenheitDegree(scaleK: number) {
    return Math.ceil(1.8 * (scaleK - 273) + 32);
  }

  getСelsiusDegree(scaleK: number) {
    return Math.ceil(scaleK - 273);
  }

  getPosition(): void {
    navigator.geolocation.getCurrentPosition(position => {

      this.currentPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      console.log('position', this.currentPosition);

    })

  }
}
