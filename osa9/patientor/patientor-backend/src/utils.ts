import { PatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(text);
};

const isObject = (obj: unknown): obj is object => {
  return typeof obj === 'object' || obj instanceof Object;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseBirthdate = (birthdate: unknown): string => {
  if (!birthdate || !isString(birthdate) || !isDate(birthdate)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return birthdate;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const toNewPatientEntry = (obj: unknown): PatientEntry => {
  if (!obj || !isObject(obj)) {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in obj &&
    'dateOfBirth' in obj &&
    'ssn' in obj &&
    'gender' in obj &&
    'occupation' in obj
  ) {
    const newPatientEntry: PatientEntry = {
      name: parseName(obj.name),
      dateOfBirth: parseBirthdate(obj.dateOfBirth),
      ssn: parseSSN(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
      entries: [],
    };
    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
