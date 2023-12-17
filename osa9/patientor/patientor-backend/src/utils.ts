import { PatientEntry, Gender, Entry } from './types';

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
  return (typeof obj === 'object' && obj !== null) || obj instanceof Object;
};

const isArray = (obj: unknown): obj is Array<unknown> => {
  console.log('isArray', obj);
  console.log(Array.isArray(obj));
  return Array.isArray(obj);
};

const isEntry = (entry: unknown): boolean => {
  if (
    !entry ||
    !isObject(entry) ||
    !('type' in entry) ||
    !isString(entry.type) ||
    !['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(entry.type)
  )
    return false;

  return true;
};

const areEntries = (entries: Array<unknown>): entries is Array<Entry> => {
  if (entries.length === 0 || entries.every((entry) => isEntry(entry)))
    return true;

  return false;
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

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries || !isArray(entries) || !areEntries(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries;
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
    'occupation' in obj &&
    'entries' in obj
  ) {
    const newPatientEntry: PatientEntry = {
      name: parseName(obj.name),
      dateOfBirth: parseBirthdate(obj.dateOfBirth),
      ssn: parseSSN(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
      entries: parseEntries(obj.entries),
    };
    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
