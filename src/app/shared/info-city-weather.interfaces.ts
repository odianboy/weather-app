export interface InfoCityWeather {
    id: number;
    name: string;
    wind: Wind;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface FavoriteCity {
    value: string;
    viewValue: string;
}

export interface Clouds {
    all: number;
}

export interface CurrentPosition {
    latitude: number;
    longitude: number;
}
