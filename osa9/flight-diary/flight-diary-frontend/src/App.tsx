import { useEffect, useState } from 'react';
import flightService from './services/flights';
import { nonSensitiveFlightDiaryEntry } from './types';

const App = () => {
  const [flights, setFlights] = useState<nonSensitiveFlightDiaryEntry[]>([]);

  useEffect(() => {
    const fetchFlightDiaryList = async () => {
      const flights = await flightService.getAll();
      setFlights(flights);
    };
    void fetchFlightDiaryList();
  }, []);

  return (
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
};

export default App;
