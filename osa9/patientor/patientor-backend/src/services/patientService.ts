/* import { Diagnosis } from '../../types'; */
import { Patient, nonSensitivePatient } from '../../types';
import patientData from '../data/patients';

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): nonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiagnosis,
};
