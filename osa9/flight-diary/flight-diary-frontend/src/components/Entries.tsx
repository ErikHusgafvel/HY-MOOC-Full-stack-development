import { nonSensitiveFlightDiaryEntry } from '../types';

interface Props {
  flights: nonSensitiveFlightDiaryEntry[];
}

const Entries = ({ flights }: Props) => (
  <div>
    <h2>Diary entries</h2>
    {flights.map((flightEntry: nonSensitiveFlightDiaryEntry) => {
      return (
        <div key={flightEntry.id}>
          <h3>{flightEntry.date}</h3>
          visibility: {flightEntry.visibility} <br />
          weather: {flightEntry.weather}
        </div>
      );
    })}
  </div>
);

export default Entries;
