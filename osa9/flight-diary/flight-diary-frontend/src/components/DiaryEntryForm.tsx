import * as React from 'react';
import axios from '../../node_modules/axios/index';
import { createFlight } from '../services/flights';
import {
  nonSensitiveFlightDiaryEntry,
  NewFlightDiaryEntry,
  Weather,
  Visibility,
} from '../types';

import './DiaryEntryForm.css';

interface Props {
  flights: nonSensitiveFlightDiaryEntry[];
  setFlights: React.Dispatch<
    React.SetStateAction<nonSensitiveFlightDiaryEntry[]>
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const DiaryEntryForm = ({ flights, setFlights, setError }: Props) => {
  const [date, setDate] = React.useState('');
  const [weather, setWeather] = React.useState(Object.values(Weather)[0]);
  const [visibility, setVisibility] = React.useState(
    Object.values(Visibility)[0]
  );
  const [comment, setComment] = React.useState('');

  const setErrorMessage = (message: string, timeoutMs?: number | undefined) => {
    setError(message);
    setTimeout(
      () => {
        setError('');
      },
      timeoutMs ? timeoutMs : 5000
    );
  };

  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryEntryToAdd: NewFlightDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };
    try {
      const nonSensitiveFlightEntry = await createFlight(diaryEntryToAdd);
      setFlights(flights.concat(nonSensitiveFlightEntry));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. ', '');
          console.error(message);
          setErrorMessage(message);
        } else {
          console.error('Unrecognized axios error');
          setErrorMessage('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setErrorMessage('Unknown error');
      }
    }
    setDate('');
    setWeather(Object.values(Weather)[0]);
    setVisibility(Object.values(Visibility)[0]);
    setComment('');
  };

  return (
    <div>
      <form onSubmit={addDiaryEntry}>
        <div>
          <label>
            Date:
            <input
              type="date"
              placeholder={new Date().toISOString().slice(0, 10)}
              max={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={({ target }) => {
                setDate(target.value);
              }}
              required
            />
            <span></span>
          </label>
        </div>
        <div>
          <label>
            Weather:
            {Object.values(Weather).map((value, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="weather"
                  id={value}
                  value={value}
                  checked={weather === value}
                  onChange={() => setWeather(value)}
                />
                {value}
              </label>
            ))}
          </label>
        </div>
        <div>
          <label>
            Visibility:
            {Object.values(Visibility).map((value, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="visibility"
                  id={value}
                  value={value}
                  checked={visibility === value}
                  onChange={() => setVisibility(value)}
                />
                {value}
              </label>
            ))}
          </label>
        </div>
        <div>
          Comment:
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryEntryForm;
