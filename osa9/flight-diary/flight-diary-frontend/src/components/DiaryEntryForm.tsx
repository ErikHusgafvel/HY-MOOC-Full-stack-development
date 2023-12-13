import * as React from 'react';
import axios from '../../node_modules/axios/index';
import { createFlight } from '../services/flights';
import {
  nonSensitiveFlightDiaryEntry,
  NewFlightDiaryEntry,
  Weather,
  Visibility,
} from '../types';

interface Props {
  flights: nonSensitiveFlightDiaryEntry[];
  setFlights: React.Dispatch<
    React.SetStateAction<nonSensitiveFlightDiaryEntry[]>
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const DiaryEntryForm = ({ flights, setFlights, setError }: Props) => {
  const [date, setDate] = React.useState('');
  const [weather, setWeather] = React.useState('');
  const [visibility, setVisibility] = React.useState('');
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
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };
    try {
      const nonSensitiveFlightDiaryEntry = await createFlight(diaryEntryToAdd);
      setFlights(flights.concat(nonSensitiveFlightDiaryEntry));
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
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <div>
      <form onSubmit={addDiaryEntry}>
        <div>
          Date
          <input
            label="Date"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Weather
          <input
            label="Weather"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          Visibility
          <input
            label="Visibility"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          Comment
          <input
            label="Comment"
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
