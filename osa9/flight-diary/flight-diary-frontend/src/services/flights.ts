import axios from 'axios';
import { apiBaseUrl } from '../constants';
import {
  FlightDiaryEntry,
  nonSensitiveFlightDiaryEntry,
  NewFlightDiaryEntry,
} from '../types';

export const getAllFlights = () => {
  return axios
    .get<nonSensitiveFlightDiaryEntry[]>(apiBaseUrl)
    .then((response) => response.data);
};

export const createFlight = (object: NewFlightDiaryEntry) => {
  return axios
    .post<FlightDiaryEntry>(apiBaseUrl, object)
    .then((response) => response.data);
};
