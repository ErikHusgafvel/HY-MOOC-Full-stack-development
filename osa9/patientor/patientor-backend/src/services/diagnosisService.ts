import { Diagnosis } from '../../types';
import diagnosisData from '../data/diagnoses';

const getEntries = (): Diagnosis[] => {
  return diagnosisData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
