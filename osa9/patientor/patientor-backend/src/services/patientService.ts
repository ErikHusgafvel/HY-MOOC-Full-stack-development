import { Patient, nonSensitivePatient, PatientEntry } from '../types';
import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: PatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
