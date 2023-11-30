export const calculateBmi = (
  heightCentimeters: number,
  weightKilograms: number
): string => {
  const heightMeters = heightCentimeters / 100;
  const bmi = weightKilograms / (heightMeters * heightMeters);

  // find the first expression that is true
  switch (true) {
    case bmi < 18.5:
      return 'Underweight';
    case bmi < 25:
      return 'Normal (healthy weight)';
    case bmi < 30:
      return 'Overweight';
    default:
      return 'Obese';
  }
};

interface MultipleValuesBmi {
  value1: number;
  value2: number;
}

const parseArgumentsBmi = (args: string[]): MultipleValuesBmi => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  // input validation
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values must be numbers!');
  } else if (height <= 0 || weight <= 0) {
    throw new Error('Provided numbers must be positive');
  }

  return { value1: height, value2: weight };
};

try {
  const { value1, value2 } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
