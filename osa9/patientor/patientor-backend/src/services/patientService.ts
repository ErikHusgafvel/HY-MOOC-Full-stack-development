import { Patient, NonSensitivePatient, PatientEntry } from '../types';
import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
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

const findPatientById = (id: string): Patient | undefined => {
  const entry = patientData.find((patient) => patient.id === id);
  return entry; // error handling taken care in '../routes/patients'
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findPatientById,
};
