import { Component, OnInit } from '@angular/core';
import { InfoCityWeather, FavoriteCity, CurrentPosition } from '../shared/info-city-weather.interfaces';
import { WeatherService } from '../shared/weather.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { cities } from '../shared/cities.const';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent {

  cityWeather$: Observable<InfoCityWeather>;
  currentCity$: BehaviorSubject<FavoriteCity>;
  favoriteCity: FavoriteCity[] = cities;
  selectControl: FormControl;
  isChangeDegree: boolean;
  isCurrentPosition: boolean;
  currentPosition$: Subject<CurrentPosition>


  constructor(private weatherService: WeatherService) {
    this.selectControl = new FormControl();
    this.currentCity$ = new BehaviorSubject(cities[0]);
    this.currentPosition$ = new Subject()
    this.isChangeDegree = false;
    this.isCurrentPosition = false;

    this.selectControl.valueChanges.subscribe((value) => {
      this.currentCity$.next(value);
    })

    // this.weatherService.getInfoWeatherCurrentPosition().subscribe((data) => console.log(data)
    // )
    
    this.cityWeather$ = this.currentCity$.pipe(
      switchMap((city) => {
        return this.weatherService.getInfoWeather(city.value);
      })
    )
  }

  getImg(codeImg: string): string {
    return this.weatherService.getImgWeather(codeImg);
  }

  getF(tempK: number): number {
    return this.weatherService.getFahrenheitDegree(tempK);
  }

  getC(tempK: number): number {
    return this.weatherService.getСelsiusDegree(tempK);
  }

  changeDegree() {
    this.isChangeDegree = !this.isChangeDegree;
  }

  currentPositionWeather() {
    this.isCurrentPosition = !this.isCurrentPosition;
    console.log('test', this.isCurrentPosition)
  }
}
