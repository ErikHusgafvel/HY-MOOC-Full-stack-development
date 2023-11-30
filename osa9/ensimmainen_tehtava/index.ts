import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const exerciseApp = express();

exerciseApp.use(express.json());

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

exerciseApp.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hours: number[] = (daily_exercises as any[]).map((hour: any) =>
      Number(hour)
    );

    if (
      isNaN(Number(target)) ||
      hours.filter((hour) => isNaN(hour)).length > 0
    ) {
      return res.status(400).json({
        error: 'malformatted parameters',
      });
    }

    return res.send(calculateExercises(hours, Number(target)));
  } catch (error) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3003;
const EXERCISEPORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

exerciseApp.listen(EXERCISEPORT, () => {
  console.log(`Exercise server running on port ${EXERCISEPORT}`);
});
