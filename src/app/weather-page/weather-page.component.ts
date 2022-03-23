import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoCityWeather, FavoriteCity, CurrentPosition } from '../shared/info-city-weather.interfaces';
import { WeatherService } from '../shared/weather.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, switchMap, merge, takeUntil } from 'rxjs';
import { cities } from '../shared/cities.const';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent implements OnDestroy{

  cityWeather$: Observable<InfoCityWeather>;
  currentCity$: BehaviorSubject<FavoriteCity | CurrentPosition>;
  currentPosition$: Subject<CurrentPosition>;
  destroy$: Subject<void>;

  favoriteCity: FavoriteCity[] = cities;
  selectControl: FormControl;

  isChangeDegree: boolean;
  isCurrentPosition: boolean;


  constructor(private weatherService: WeatherService) {
    this.selectControl = new FormControl();
    this.currentCity$ = new BehaviorSubject<FavoriteCity | CurrentPosition>(cities[0]);
    this.currentPosition$ = new Subject();
    this.destroy$ = new Subject()

    this.isChangeDegree = false;
    this.isCurrentPosition = false;

    this.selectControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value) => {
      this.currentCity$.next(value);
    })

    this.cityWeather$ = merge(this.currentPosition$, this.currentCity$).pipe(
      switchMap((city: any) => {
        
        if (this.isCurrentPosition) {
          this.isCurrentPosition = !this.isCurrentPosition;
          return this.weatherService.getInfoWeatherCurrentPosition(city);
        } else {
          return this.weatherService.getInfoWeather(city.value);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
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

    navigator.geolocation.getCurrentPosition(position => {

      this.currentPosition$.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude});
    })
  }
}
