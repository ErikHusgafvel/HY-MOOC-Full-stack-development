import { Patient, NonSensitivePatient, PatientEntry } from '../types';
import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
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

const findById = (id: string): Patient | undefined => {
  const entry = patientData.find((patient) => patient.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
};
