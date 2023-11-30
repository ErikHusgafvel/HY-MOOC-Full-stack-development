interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): ResultObject => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((number) => number > 0).length;
  const average = hours.reduce((sum, value) => sum + value, 0) / periodLength;

  const ratingSuccess: number = average / target;
  let rating: number;
  let ratingDescription: string;

  if (ratingSuccess < 0.5) {
    rating = 1;
    ratingDescription = 'poor performance';
  } else if (ratingSuccess < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'excellent work! you rock!';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface MultipleValues {
  value1: number[];
  value2: number;
}

const parseArguments = (args: string[]): MultipleValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target: number = Number(process.argv[2]);
  const hours: number[] = [...process.argv].slice(3).map((value) => {
    return Number(value);
  });

  // input validation
  if (isNaN(target) || hours.filter((number) => isNaN(number)).length > 0) {
    throw new Error('Provided values must be numbers!');
  } else if (target <= 0) {
    throw new Error('Target hour must be greater than zero');
  }

  return { value1: hours, value2: target };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
