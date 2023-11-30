const calculateBmi = (
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
      return 'overweight';
    default:
      return 'obese';
  }
};

console.log(calculateBmi(180, 74));
