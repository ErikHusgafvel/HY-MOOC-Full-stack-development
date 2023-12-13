export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface FlightDiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewFlightDiaryEntry = Omit<FlightDiaryEntry, 'id'>;

export type nonSensitiveFlightDiaryEntry = Omit<FlightDiaryEntry, 'comment'>;
