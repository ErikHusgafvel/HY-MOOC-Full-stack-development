import * as React from 'react';
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
}

const DiaryEntryForm = ({ flights, setFlights }: Props) => {
  const [date, setDate] = React.useState('');
  const [weather, setWeather] = React.useState('');
  const [visibility, setVisibility] = React.useState('');
  const [comment, setComment] = React.useState('');

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault;
    const diaryEntryToAdd: NewFlightDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };
    createFlight(diaryEntryToAdd).then((data) => {
      setFlights(flights.concat(data));
    });
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
