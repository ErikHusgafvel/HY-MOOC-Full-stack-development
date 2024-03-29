import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findPatientById(id);
  if (patient) {
    return res.send(patient);
  } else {
    return res.status(404).send('Patient not found');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry({ ...req.body, entries: [] });
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage = +' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
