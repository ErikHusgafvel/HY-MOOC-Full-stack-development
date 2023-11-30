import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
      res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight),
      });
    } else throw new Error();
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
