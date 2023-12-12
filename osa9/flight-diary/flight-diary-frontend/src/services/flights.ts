import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { nonSensitiveFlightDiaryEntry, NewFlightDiaryEntry } from '../types';

export const getAllFlights = () => {
  return axios
    .get<nonSensitiveFlightDiaryEntry[]>(apiBaseUrl)
    .then((response) => response.data);
};

export const createFlight = (object: NewFlightDiaryEntry) => {
  return axios
    .post<NewFlightDiaryEntry>(apiBaseUrl, object)
    .then((response) => response.data);
};
