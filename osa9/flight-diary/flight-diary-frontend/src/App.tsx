import { useEffect, useState } from 'react';
import DiaryEntryForm from './components/DiaryEntryForm';
import Entries from './components/Entries';
import { getAllFlights } from './services/flights';
import { nonSensitiveFlightDiaryEntry } from './types';

const App = () => {
  const [flights, setFlights] = useState<nonSensitiveFlightDiaryEntry[]>([]);

  useEffect(() => {
    getAllFlights().then((flights: nonSensitiveFlightDiaryEntry[]) =>
      setFlights(flights)
    );
  }, []);

  return (
    <div>
      <DiaryEntryForm flights={flights} setFlights={setFlights} />
      <Entries flights={flights} />
    </div>
  );
};

export default App;
