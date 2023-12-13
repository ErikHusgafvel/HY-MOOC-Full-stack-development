import { useEffect, useState } from 'react';
import DiaryEntryForm from './components/DiaryEntryForm';
import Entries from './components/Entries';
import Notification from './components/Notification';
import { getAllFlights } from './services/flights';
import { nonSensitiveFlightDiaryEntry } from './types';

const App = () => {
  const [flights, setFlights] = useState<nonSensitiveFlightDiaryEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllFlights().then((flights: nonSensitiveFlightDiaryEntry[]) =>
      setFlights(flights)
    );
  }, []);

  return (
    <div>
      <Notification message={error} />
      <DiaryEntryForm
        flights={flights}
        setFlights={setFlights}
        setError={setError}
      />
      <Entries flights={flights} />
    </div>
  );
};

export default App;
